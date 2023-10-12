"use client";
import { UnsensitiveUser } from "@/app/api/auth/utils";
import { api } from "@/app/configs/axios-config";
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
import { PASSWORD_SCHEMA } from "@/lib/validators";
import { Resp } from "@/types/api-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { register } from "module";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SIGNUP_SCHEMA = z
  .object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: PASSWORD_SCHEMA,
    passwordConfirm: z.string().min(8, "Must be at least 8 characters"),
    resendEmail: z.boolean().optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

type Form = z.infer<typeof SIGNUP_SCHEMA>;

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
    resolver: zodResolver(SIGNUP_SCHEMA),
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
        <h2 className="font-bold mb-5 text-xl">Email sent</h2>
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
        <form
          className="w-96  bg-slate-100 p-6 rounded-sm"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {isEmailSent ? (
            renderEmailSent()
          ) : (
            <>
              <div className="space-y-4">
                <h2 className="font-bold text-xl">Register</h2>
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
              <div className="mt-4 text-sm">
                You already have an account, please
                <Link
                  href="/auth/signin"
                  className="ml-1 underline font-semibold"
                >
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
