"use client";
import { FORGOT_PASSWORD_SCHEMA } from "@/app/api/auth/forgot-password/schemas";
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
import { api } from "@/configs/ky-config";
import { Resp } from "@/types/api-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Form = z.infer<typeof FORGOT_PASSWORD_SCHEMA>;

export default function ForgotPassword() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [disabledEmailButton, setDisabledEmailButton] = useState(false);
  const t = useTranslations("Auth.forgot-password");
  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: async (formValues: Form) =>
      api
        .post("/api/auth/forgot-password", { json: formValues })
        .json<Resp<{}>>(),
    onSuccess: () => {
      setIsEmailSent(true);
    },
  });

  const form = useForm<Form>({
    resolver: zodResolver(FORGOT_PASSWORD_SCHEMA),
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
        <h2 className="mb-5">{t("emailSent")}</h2>
        <p>{t("checkInbox")}</p>
        <p>
          <br />
          {t("closeWindow")}
        </p>
        <h2 className="mt-20">{t("didNotReceiveEmail")}</h2>
        <Button
          type="submit"
          variant={"outline"}
          disabled={isPending || disabledEmailButton}
          className="w-full mt-10"
        >
          {isPending
            ? t("loading")
            : disabledEmailButton
              ? t("waitBeforeSending")
              : t("sendEmailAgain")}
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
              <h2>{t("title")}</h2>
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("email")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("email")} {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormMessage className="text-xs" />
              </div>
              <Button
                disabled={isPending}
                type="submit"
                className="w-full mt-10"
              >
                {t("sendEmail")}
              </Button>
            </>
          )}
        </form>
      </Form>
    </div>
  );
}
