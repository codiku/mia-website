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
import { ZodError, ZodIssue, z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { Divider } from "@/components/ui/divider";
import { FieldPassword } from "@/components/ui/field-password";

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
let POSSIBLE_ERRORS: ZodIssue[] = [];
try {
  PASSWORD_MODEL.parse("");
} catch (err) {
  POSSIBLE_ERRORS = (err as ZodError).issues;
}

export default function Signup() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const formDataRef = useRef<Form>();
  const [disabledEmailButton, setDisabledEmailButton] = useState(false);
  const [currentZodIssues, setCurrentZodIssues] = useState<ZodIssue[]>([]);

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
    try {
      PASSWORD_MODEL.parse(password);
      setCurrentZodIssues([]);
    } catch (err) {
      setCurrentZodIssues((err as ZodError).issues);
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

  const shoudCrossPasswordError = (possibleIssue: ZodIssue) => {
    const element = currentZodIssues.find(
      (currIssue) => currIssue.message === possibleIssue.message
    );
    return element == undefined;
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
                            placeholder="Enter your password"
                            {...field}
                          />
                        </FormControl>
                        <ul className="text-xs font-light">
                          {password &&
                            currentZodIssues.length > 0 &&
                            POSSIBLE_ERRORS.map((possibleError, i) => (
                              <li
                                key={i}
                                className={`text-red-500 font-medium ${
                                  shoudCrossPasswordError(possibleError)
                                    ? "line-through"
                                    : ""
                                }`}
                              >
                                {possibleError.message}
                              </li>
                            ))}
                        </ul>
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
