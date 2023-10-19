"use client";
import { api } from "@/configs/axios-config";
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
import { EMAIL_MODEL, PASSWORD_MODEL } from "@/utils/models";
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
import withSession from "@/components/hoc/with-session";
import Link from "next/link";

const ACCOUNT_FORM_MODEL = z.object({
  email: EMAIL_MODEL,
  password: PASSWORD_MODEL,
});
type Form = z.infer<typeof ACCOUNT_FORM_MODEL>;

function Account() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log("***", session);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<Form>({
    resolver: zodResolver(ACCOUNT_FORM_MODEL),
    defaultValues: {
      email: session?.user?.email!,
      password: "",
    },
  });
  const { mutate: deleteAccount, isLoading } = useMutation(
    async () =>
      api.delete<Resp<{}>>("/api/auth/delete-account", {
        headers: { isToastDisabled: true },
      }),
    {
      onSuccess: async ({ data }) => {
        await signOut({ redirect: false });
        router.refresh();
        router.push("/");
        toast.success(data.message);
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
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
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
            Delete account
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  return (
    <div className="flex-center">
      <div className="space-y-4 w-96 mt-20 bg-white p-6 rounded-sm">
        <h2>Account</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        type="email"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        {session?.user?.password === undefined && (
          <Link
            href="/auth/account/update-password"
            className="ml-1 block mt-4"
          >
            Update password
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
          Logout
        </Button>
        <Button
          onClick={() => setIsDialogOpen(true)}
          variant={"destructive"}
          className="block mt-10"
        >
          Delete account
        </Button>
        {confirmDialog}
      </div>
    </div>
  );
}

export default withSession(Account);
