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
import { zodEmailPassword } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Form = z.infer<typeof zodEmailPassword>;

export default function Signup() {
  const router = useRouter();
  const form = useForm<Form>({
    resolver: zodResolver(zodEmailPassword),
  });

  async function onSubmit(values: Form) {
    const data = await axios.post("/api/auth/email-verification", values);
    alert(JSON.stringify(data));
    // router.push("/auth/signin");
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
