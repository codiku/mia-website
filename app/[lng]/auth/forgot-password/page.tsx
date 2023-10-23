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
import { FORGOT_PASSWORD_MODEL } from "@/utils/models";
import { Resp } from "@/types/api-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Form = z.infer<typeof FORGOT_PASSWORD_MODEL>;

export default function ForgotPassword() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [disabledEmailButton, setDisabledEmailButton] = useState(false);

  const { mutate: forgotPassword, isLoading } = useMutation(
    async (formData: Form) => {
      return api.post<Resp<{}>>("/api/auth/forgot-password", formData);
    },
    {
      onSuccess: () => {
        setIsEmailSent(true);
      },
    }
  );

  const form = useForm<Form>({
    resolver: zodResolver(FORGOT_PASSWORD_MODEL),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(values: Form) {
    forgotPassword({ ...values });
    if (isEmailSent) {
      setDisabledEmailButton(true);
      setTimeout(() => {
        setDisabledEmailButton(false);
      }, 30000);
    }
  }

  const renderEmailSent = () => {
    return (
      <div>
        <h2 className="mb-5">Email sent</h2>
        <p>Check your inbox and click the link to reset your password.</p>
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
            ? "Wait 30 secondes before sending again"
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
              <h2>Request a password reset</h2>
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

              <Button
                disabled={isLoading}
                type="submit"
                className="w-full mt-10"
              >
                Send me an email
              </Button>
            </>
          )}
        </form>
      </Form>
    </div>
  );
}
