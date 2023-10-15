"use client";
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
import withSession from "@/components/hoc/with-session";
import {
  PASSWORD_MODEL,
  STRING_REQUIRED_MODEL,
  UPDATE_PASSWORD_MODEL,
} from "@/utils/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UPDATE_PASSWORD_FORM_MODEL = z
  .object({
    oldPassword: STRING_REQUIRED_MODEL,
    newPassword: PASSWORD_MODEL,
    newPasswordConfirm: STRING_REQUIRED_MODEL,
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: "Passwords don't match",
    path: ["newPasswordConfirm"],
  });

type Form = z.infer<typeof UPDATE_PASSWORD_FORM_MODEL>;

function UpdatePassword(p: {}) {
  const form = useForm<Form>({
    resolver: zodResolver(UPDATE_PASSWORD_FORM_MODEL),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });
  const newPassword = form.watch("newPassword");
  // Revalidate confirm password when password changes
  useEffect(() => {
    if (newPassword !== form.getValues().newPasswordConfirm) {
      form.setError("newPasswordConfirm", {
        type: "manual",
        message: "Passwords don't match",
      });
    } else {
      form.clearErrors("newPasswordConfirm");
    }
  }, [form, newPassword]);

  async function onSubmit(values: Form) {}
  return (
    <div className="flex-center mt-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" w-96 bg-white p-8"
        >
          <div className="space-y-4">
            <h2>Reset password</h2>
            <div>
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old password</FormLabel>
                    <FormControl>
                      <FieldPassword placeholder="Old password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <FieldPassword placeholder="New password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="newPasswordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password (confirm)</FormLabel>
                    <FormControl>
                      <FieldPassword
                        placeholder="New password (confirm)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button className="mt-10 w-full">Update password</Button>
        </form>
      </Form>
    </div>
  );
}

export default withSession(UpdatePassword);
