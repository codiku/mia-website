"use client";
import { api } from "@/app/configs/axios-config";
import {
  AlertDialog,
  AlertDialogAction,
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

export default function Account() {
  const router = useRouter();
  const { mutate: deleteAccount, isLoading } = useMutation(
    async () =>
      api.delete<Resp<{}>>("/api/auth/delete-account", {
        headers: { isToastDisabled: true },
      }),
    {
      onSuccess: async ({ data }) => {
        if (!data.error) {
          await signOut({ redirect: false });
          router.refresh();
          router.push("/");
          toast.success(data.message);
        }
      },
    }
  );
  const session = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    session?.data && (
      <div className="flex-center">
        <div className="space-y-4  mt-20 bg-slate-100 p-6 rounded-sm">
          <h2 className="font-bold text-2xl">Profil</h2>
          {session.status === "authenticated" && (
            <>
              <div>{JSON.stringify(session.data)}</div>
            </>
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
    )
  );
}
