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

import { Resp } from "@/types/api-type";
import { useMutation } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { EMAIL_MODEL, PASSWORD_MODEL } from "@/libs/models";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { withAuth } from "@/components/hoc/with-auth";
import Link from "next/link";
import { api } from "@/configs/ky-config";
import { useTranslations } from "next-intl";

const ACCOUNT_FORM_MODEL = z.object({
  email: EMAIL_MODEL,
  password: PASSWORD_MODEL,
});
type Form = z.infer<typeof ACCOUNT_FORM_MODEL>;

export default withAuth(function Account() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const t = useTranslations("Auth.account");
  const form = useForm<Form>({
    resolver: zodResolver(ACCOUNT_FORM_MODEL),
    defaultValues: {
      email: session?.user?.email!,
      password: "",
    },
  });
  const { mutate: deleteAccount, isLoading } = useMutation(
    async () => api.delete("/api/auth/delete-account").json<Resp<{}>>(),
    {
      onSuccess: async (response) => {
        await signOut({ redirect: false });
        router.push("/");
        router.refresh();
      },
    }
  );

  async function onSubmit(values: Form) {}

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
            disabled={isLoading}
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
