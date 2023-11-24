"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { FaDiscord } from "react-icons/fa6";
import * as z from "zod";
type Variant = "LOGIN" | "REGISER";

const AuthForm = () => {
  const { toast } = useToast();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const router = useRouter();
  const formSchema = z
    .object({
      password: z
        .string()
        .min(3, { message: "The password must be at least 3 characters." })
        .max(15, { message: "The name must be less than 15 characters." }),
      confirmPassword: z
        .string()
        .max(15, { message: "The name must be less than 15 characters." })
        .optional()
        .or(z.literal("")),
      nickname: z
        .string()
        .min(3, { message: "The name must be at least 3 characters." })
        .max(15, { message: "The name must be less than 15 characters." }),
    })
    .superRefine((i, ctx) => {
      if (variant === "REGISER" && i.password !== i.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Passwords are not the same.`,
          path: ["confirmPassword"],
        });
      }
    });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      nickname: "",
    },
  });

  const toggleVariants = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISER");
    } else if (variant === "REGISER") {
      setVariant("LOGIN");
    }
  }, [variant]);
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      }).then((callback) => {
        if (callback?.error) {
          console.log("Invalid credencials");
        }
        if (callback?.ok && !callback.error) {
          router.refresh();
        }
      });
    }

    if (variant === "REGISER") {
      axios
        .post("/api/register", data)
        .then(() => {
          signIn("credentials", data);
          router.refresh();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const socialAction = (action: string) => {
    signIn(action, {
      redirect: false,
    }).then((callback) => {
      if (callback?.error) {
        toast({
          title: "Error",
          description: "Invalid credentials",
        });
      }
      if (callback?.ok && !callback.error) {
        console.log("Logged");
      }
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 flex w-full max-w-md flex-col rounded-md border bg-card px-7 py-3"
      >
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nickname</FormLabel>
              <FormControl>
                <Input placeholder="Nickname" {...field} />
              </FormControl>
              <FormDescription>
                This is your nickname and login.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormDescription>
                This is your nickname and login.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {variant === "REGISER" && (
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Confirm password" {...field} />
                </FormControl>
                <FormDescription>
                  This is your nickname and login.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit">Submit</Button>
        <div className="relative flex justify-center items-center py-2">
          <Separator className="absolute bg-primary" />
          <div className="absolute w-32 h-2 bg-card"></div>
          <p className="absolute text-sm ">or continue with</p>
        </div>
        <div className="flex">
          <Button
            onClick={() => {
              socialAction("discord");
            }}
            type="button"
            variant={"default"}
            className="w-full"
          >
            <FaDiscord size={18} />
          </Button>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 ">
          <div>
            {variant === "LOGIN" ? "New to Dmku?" : "Already have a account?"}
          </div>
          <div onClick={toggleVariants} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create a account" : "Login"}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AuthForm;
