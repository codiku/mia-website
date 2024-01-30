"use client";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { FieldPassword } from "@/components/ui/field-password";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SIGNIN_MODEL } from "@/libs/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Divider } from "@/components/ui/divider";

type Form = z.infer<typeof SIGNIN_MODEL>;

export default function Signin() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const { mutate: signinMut, isLoading } = useMutation(
    async (form: Form) =>
      signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      }),
    {
      onSuccess: (signinResp) => {
        // signin comes from next-auth
        // We have to manually catch it here.
        if (signinResp?.error) {
          toast.error("Signin failed");
        } else {
          router.refresh();
          router.push(callbackUrl || "/");
          toast.success("You are now signed in");
        }
      },
    }
  );
  const router = useRouter();
  const form = useForm<Form>({
    resolver: zodResolver(SIGNIN_MODEL),
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
        <form className="card" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <h2>Signin</h2>
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
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormMessage className="text-xs" />
            </div>
            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <FieldPassword
                        placeholder="Type your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormMessage className="text-xs" />
            </div>
            <Link href={"/auth/forgot-password"} className="inline-block pl-1">
              Forgot password?
            </Link>
          </div>

          <Button disabled={isLoading} type="submit" className="w-full mt-10">
            Signin
          </Button>
          <Divider>Or continue with</Divider>
          <div className="flex-center mt-5">
            <div
              onClick={async () => {
                signIn("google", {
                  redirect: true,
                  callbackUrl: process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL,
                });
              }}
              className="rounded-full border cursor-pointer p-2 "
            >
              <FcGoogle size={25} />
            </div>
          </div>
          <div className="mt-4 text-sm">
            You already have an account, please
            <Link href={"/auth/signup"} className="ml-1">
              Sign up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
