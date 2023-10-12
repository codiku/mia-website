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
import { Input } from "@/components/ui/input";
import { SIGNIN_SCHEMA } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Form = z.infer<typeof SIGNIN_SCHEMA>;

export default function Signin() {
  const { mutate: signinMut, isLoading } = useMutation(
    async (form: Form) =>
      signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      }),
    {
      onSuccess: (signinResp) => {
        // signin comes from next-auth and probably does not use axios behind the scene
        // So the error is not catch by the axios interceptor in axios-config.ts
        // We have to manually catch it here.
        if (signinResp?.error) {
          toast.error("Signin failed");
        } else {
          router.refresh();
          router.push("/");
          toast.success("You are know signed in");
        }
      },
    }
  );
  const router = useRouter();
  const form = useForm<Form>({
    resolver: zodResolver(SIGNIN_SCHEMA),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData: Form) {
    signinMut(formData);
  }

  return (
    <div className="flex-center mt-20">
      <Form {...form}>
        <form
          className="w-96  bg-slate-100 p-6 rounded-sm"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-4">
            <h2 className="font-bold text-xl">Signin</h2>
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormMessage />
            </div>
            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormMessage />
            </div>
            <Link
              href={"/auth/forgot-password"}
              className="underline text-sm inline-block pl-1"
            >
              Forgot password ?
            </Link>
          </div>

          <Button disabled={isLoading} type="submit" className="w-full mt-10">
            Sign in
          </Button>
          <div className="mt-4 text-sm">
            You already have an account, please
            <Link
              href={"/auth/signup"}
              className="ml-1 underline font-semibold"
            >
              Sign up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
