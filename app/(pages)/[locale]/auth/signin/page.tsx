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
import { SIGNIN_SCHEMA } from "@/libs/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Divider } from "@/components/ui/divider";
import { useTranslations } from "next-intl";

type Form = z.infer<typeof SIGNIN_SCHEMA>;

export default function Signin() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const t = useTranslations("Auth.signin");
  const { mutate: signinMut, isPending } = useMutation({
    mutationFn: async (form: Form) =>
      signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      }),
    onSuccess: (signinResp) => {
      if (signinResp?.error) {
        toast.error("Signin failed");
      } else {
        router.refresh();
        router.push(callbackUrl || "/");
        toast.success("You are now signed in");
      }
    },
  });
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
        <form className="card" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <h2>{t("title")}</h2>
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("email")}</FormLabel>
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
                    <FormLabel>{t("password")}</FormLabel>
                    <FormControl>
                      <FieldPassword
                        placeholder={t("typeYourPassword")}
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
              {t("forgotPassword")}
            </Link>
          </div>

          <Button disabled={isPending} type="submit" className="w-full mt-10">
            {t("signIn")}
          </Button>
          <Divider>{t("orContinueWith")}</Divider>
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
            {t("alreadyHaveAccount")}
            <Link href={"/auth/signup"} className="ml-1">
              {t("signUp")}
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
