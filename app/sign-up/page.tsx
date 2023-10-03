"use client";
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
import { zodEmailPassword } from "../utils/validators";

type Form = z.infer<typeof zodEmailPassword>;

export default function Signup() {
  const form = useForm<Form>({
    resolver: zodResolver(zodEmailPassword),
  });

  async function onSubmit(values: Form) {
    // const response = await fetch("/api/user", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(values),
    // });
    // const data = await response.json();
    // console.log(data);
    alert("sub");
  }

  return (
    <div className="flex-center mt-20">
      <Form {...form}>
        <form
          className="w-96  bg-slate-100 p-6 rounded-sm"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-4">
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
                      <Input placeholder="Enter your password" {...field} />
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
            <Link href="/auth/signin" className="ml-1 underline font-semibold">
              Sign in
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
