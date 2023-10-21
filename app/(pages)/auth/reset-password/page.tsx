"use client";
import { api } from "@/configs/axios-config";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PASSWORD_MODEL } from "@/utils/models";
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

export const RESET_PASSWORD_MODEL = z
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
      api.post<Resp<{}>>(
        "/api/auth/reset-password",
        {
          token: data.token,
          password: data.password,
        },
        { headers: { isToastDisabled: true } }
      ),
    {
      onSuccess: async ({ data }) => {
        await signOut({
          redirect: false,
        });
        if (!data.error) {
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

  async function onSubmit({ password, passwordConfirm }: Form) {
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
          <h2>Request a password reset</h2>
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
                    <li>At least 1 lowercase, 1 uppercase,</li>
                    <li>At least 1 number, 1 special character</li>
                  </ul>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormMessage />
          </div>

          <Button disabled={isLoading} type="submit" className="w-full mt-10">
            Reset password
          </Button>
        </form>
      </Form>
    </div>
  );
}
