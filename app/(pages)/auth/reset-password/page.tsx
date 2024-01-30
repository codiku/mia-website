"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PASSWORD_MODEL } from "@/libs/models";
import { Resp } from "@/types/api-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FieldPassword } from "@/components/ui/field-password";
import ky from "ky";

const RESET_PASSWORD_MODEL = z
  .object({
    password: PASSWORD_MODEL,
    passwordConfirm: z.string().min(1),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

type Form = z.infer<typeof RESET_PASSWORD_MODEL>;

export default function ResetPassword() {
  const router = useRouter();
  const { mutate: resetPassword, isLoading } = useMutation(
    async (data: { token: string; password: string }) =>
      ky
        .patch("/api/auth/reset-password", {
          headers: { isToastDisabled: "true" },
          json: { token: data.token, password: data.password },
        })
        .json<Resp<{}>>(),
    {
      onSuccess: async (response) => {
        await signOut({
          redirect: false,
        });
        if (!response.error) {
          router.push("/auth/signin");
          toast.success("Password has been updated");
        }
      },
    }
  );
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const form = useForm<Form>({
    resolver: zodResolver(RESET_PASSWORD_MODEL),
    mode: "onChange",
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit({ password }: Form) {
    if (token) {
      resetPassword({ token, password });
    } else {
      toast.error("Invalid token");
    }
  }

  return (
    <div className="flex-center mt-20">
      <Form {...form}>
        <form className="card" onSubmit={form.handleSubmit(onSubmit)}>
          <h2>Reset your password</h2>
          <div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <FieldPassword
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <ul className="text-xs font-light">
                    <li>At least 8 characters</li>
                    <li>At least one lowercase letter</li>
                    <li>At least one number</li>
                  </ul>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormMessage className="text-xs" />
          </div>
          <div>
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <FieldPassword
                      placeholder="Type your password again"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormMessage className="text-xs" />
          </div>

          <Button disabled={isLoading} type="submit" className="w-full mt-10">
            Reset password
          </Button>
        </form>
      </Form>
    </div>
  );
}
