"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { withAuth } from "@/hoc/with-auth";
import { EMAIL_SCHEMA, PASSWORD_SCHEMA } from "@/libs/schema";
import { Resp } from "@/types/api-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ACCOUNT_FORM_SCHEMA = z.object({
  email: EMAIL_SCHEMA,
  password: PASSWORD_SCHEMA,
});
type Form = z.infer<typeof ACCOUNT_FORM_SCHEMA>;

export default withAuth(function Account() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const t = useTranslations("Auth.account");
  const form = useForm<Form>({
    resolver: zodResolver(ACCOUNT_FORM_SCHEMA),
    defaultValues: {
      email: session?.user?.email!,
      password: "",
    },
  });
  const { mutate: deleteAccount, isPending } = useMutation({
    mutationFn: async () =>
      api.delete("/api/auth/delete-account").json<Resp<{}>>(),
    onSuccess: async () => {
      await signOut({ redirect: false });
      router.push("/");
      router.refresh();
    },
  });

  async function onSubmit(values: Form) { }

  const confirmDialog = (
    <AlertDialog open={isDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {t("actionCannotBeUndone")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <Button
            disabled={isPending}
            onClick={() => deleteAccount()}
            variant={"destructive"}
          >
            {t("deleteAccount")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  return (
    <div className="flex-center">
      <div className="mt-20 card">
        <h2>{t("title")}</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("email")}</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        type="email"
                        placeholder={t("email")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        {session?.user?.type === "credentials" && (
          <Link
            href="/auth/account/update-password"
            className="ml-1 block mt-4"
          >
            {t("updatePassword")}
          </Link>
        )}
        <Button
          className="block"
          onClick={() =>
            signOut({
              redirect: true,
              callbackUrl: "/auth/signin",
            })
          }
          variant={"outline"}
        >
          {t("logout")}
        </Button>
        <Button
          onClick={() => setIsDialogOpen(true)}
          variant={"destructive"}
          className="block mt-10"
        >
          {t("deleteAccount")}
        </Button>
        {confirmDialog}
      </div>
    </div>
  );
});
