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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Resp } from "@/types/api-type";
import { useState } from "react";
const SIGNUP_SCHEMA = z
  .object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z.string().min(8, "The password must be at least 8 characters"),
    passwordConfirm: z
      .string()
      .min(8, "The password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

type Form = z.infer<typeof SIGNUP_SCHEMA>;

export default function Signup() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const form = useForm<Form>({
    resolver: zodResolver(SIGNUP_SCHEMA),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit(values: Form) {
    await api.post<Resp<UnsensitiveUser>>("/api/auth/register/", values);
    setIsEmailSent(true);
  }

  return (
    <div className="flex-center mt-20">
      {isEmailSent ? (
        <div>
          <h2 className="font-bold mb-5 text-xl">Email sent</h2>
          <p>Check your inbox and click the link to activate your account.</p>
          <p>
            <br />
            You can close this window.
          </p>
        </div>
      ) : (
        <Form {...form}>
          <form
            className="w-96  bg-slate-100 p-6 rounded-sm"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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

            <Button type="submit" className="w-full mt-10">
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
          </form>
        </Form>
      )}
    </div>
  );
}
