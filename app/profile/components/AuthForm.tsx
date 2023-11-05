"use client";
import Input from "@/app/profile/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FaDiscord, FaGithub, FaAngleRight } from "react-icons/fa6";
import * as z from "zod";
import AuthSocialButton from "./AuthSocialButton";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import router from "next/router";
type Variant = "LOGIN" | "REGISER";

const AuthForm = () => {
  const user = useSession();
  console.log(user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const formSchema = useMemo(() => {
    return z
      .object({
        password: z
          .string()
          .min(3, { message: "The password must be at least 3 characters." })
          .max(15, { message: "The name must be less than 15 characters." }),
        confirmPassword: z
          .string()
          .max(15, { message: "The name must be less than 15 characters." }),
        name: z
          .string()
          .min(3, { message: "The name must be at least 3 characters." })
          .max(15, { message: "The name must be less than 15 characters." })
          .optional()
          .or(z.literal("")),
        email: z.string().email(),
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
  }, [variant]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      name: "",
      email: "",
    },
  });

  const toggleVariants = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISER");
    } else if (variant === "REGISER") {
      setVariant("LOGIN");
      setValue("confirmPassword", "");
    }
  }, [setValue, variant]);
  const pocessForm = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) console.log("Invalid credencials");
          if (callback?.ok && !callback.error) {
            console.log("logged");
            // router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === "REGISER") {
      axios
        .post("/api/register", data)
        .then(() => {
          signIn("credentials", data);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) console.log("Invalid credentials");
        if (callback?.ok && !callback.error) console.log("Logged in!");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      onSubmit={handleSubmit(pocessForm)}
      className="flex w-full max-w-md flex-col gap-y-2 mt-6 rounded-md bg-[#2a303c] px-7 py-3 "
    >
      {variant === "REGISER" ? (
        <Input
          label="Nickname"
          register={register}
          id="name"
          errors={errors}
          disabled={isLoading}
        />
      ) : null}
      <Input
        label="Email"
        register={register}
        id="email"
        errors={errors}
        disabled={isLoading}
      />
      <Input
        errors={errors}
        register={register}
        id="password"
        type="password"
        disabled={isLoading}
        label="Password"
      />
      {variant === "REGISER" ? (
        <Input
          errors={errors}
          register={register}
          id="confirmPassword"
          type="password"
          disabled={isLoading}
          label="Confirm Password"
        />
      ) : null}
      <div className="flex row-auto justify-end">
        <button
          type="button"
          className={`bg-slate-100 hover:bg-slate-300 transition flex flex-row text-sm items-center py-2 px-4 rounded-lg mt-2
          ${isLoading && "opacity-50"}
          `}
          onClick={() => signOut()}
        >
          Wyloguj
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-slate-100 hover:bg-slate-300 transition flex flex-row text-sm items-center py-2 px-4 rounded-lg mt-2
          ${isLoading && "opacity-50"}
          `}
        >
          <p>continue</p>
          <FaAngleRight className="w-4 h-4" />
        </button>
      </div>
      <div className="mt-2 ">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border bg-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-[#2a303c] px-2 text-slate-100">
              Or continue with
            </span>
          </div>
        </div>
        <div className="mt-6 flex gap-2">
          <AuthSocialButton
            icon={FaDiscord}
            onClick={() => socialAction("discord")}
          />
          <AuthSocialButton
            icon={FaGithub}
            onClick={() => socialAction("github")}
          />
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-400">
          <div>
            {variant === "LOGIN" ? "New to Dmku?" : "Already have a account?"}
          </div>
          <div onClick={toggleVariants} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create a account" : "Login"}
          </div>
        </div>
      </div>
    </form>
  );
};

export default AuthForm;
