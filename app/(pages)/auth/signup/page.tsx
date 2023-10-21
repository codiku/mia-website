"use client";
import { UnsensitiveUser } from "@/utils/user";
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
import { EMAIL_MODEL, PASSWORD_MODEL } from "@/utils/models";
import { Resp } from "@/types/api-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { Divider } from "@/components/ui/divider";

const SIGNUP_MODEL = z
  .object({
    email: EMAIL_MODEL,
    password: PASSWORD_MODEL,
    passwordConfirm: z.string().min(1, "Required"),
    resendEmail: z.boolean().optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

type Form = z.infer<typeof SIGNUP_MODEL>;

export default function Signup() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const formDataRef = useRef<Form>();
  const [disabledEmailButton, setDisabledEmailButton] = useState(false);

  const { mutate: signup, isLoading } = useMutation(
    async (formData: Form) =>
      api.post<Resp<UnsensitiveUser>>("/api/auth/register/", formData),
    {
      onSuccess: () => {
        setIsEmailSent(true);
      },
    }
  );

  const form = useForm<Form>({
    resolver: zodResolver(SIGNUP_MODEL),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    mode: "onChange",
  });
  const password = form.watch("password");

  // Submit either a signup or a resend email
  async function onSubmit(values: Form) {
    if (!formDataRef.current) {
      formDataRef.current = values;
      signup({ ...values });
    } else {
      signup({ ...values, resendEmail: true });
      setDisabledEmailButton(true);
      setTimeout(() => {
        setDisabledEmailButton(false);
      }, 30000);
    }
  }

  // Revalidate confirm password when password changes
  useEffect(() => {
    if (password !== form.getValues().passwordConfirm) {
      form.setError("passwordConfirm", {
        type: "manual",
        message: "Passwords don't match",
      });
    } else {
      form.clearErrors("passwordConfirm");
    }
  }, [form, password]);

  const renderEmailSent = () => {
    return (
      <div>
        <h2 className="mb-5">Email sent</h2>
        <p>Check your inbox and click the link to activate your account.</p>
        <p>
          <br />
          You can close this window.
        </p>

        <h2 className="mt-20">{"Didn't receive the email ?"}</h2>
        <Button
          type="submit"
          variant={"outline"}
          disabled={isLoading || disabledEmailButton}
          className="w-full mt-10"
        >
          {isLoading
            ? "Loading..."
            : disabledEmailButton
            ? "Wait 15 secondes before sending again"
            : "Send email again"}
        </Button>
      </div>
    );
  };
  return (
    <div className="flex-center mt-20">
      <Form {...form}>
        <form className="card" onSubmit={form.handleSubmit(onSubmit)}>
          {isEmailSent ? (
            renderEmailSent()
          ) : (
            <>
              <div className="space-y-4">
                <h2>Register</h2>
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
                          <Input
                            type="password"
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
              </div>

              <Button
                disabled={isLoading}
                type="submit"
                className="w-full mt-10"
              >
                Sign up
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
                  className="rounded-full border  cursor-pointer p-2 "
                >
                  <FcGoogle size={25} />
                </div>
              </div>

              <div className="mt-4 text-sm">
                You already have an account, please
                <Link href="/auth/signin" className="ml-1">
                  Sign in
                </Link>
              </div>
            </>
          )}
        </form>
      </Form>
    </div>
  );
}
