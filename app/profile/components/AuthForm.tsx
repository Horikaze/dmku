"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "The name must be at least 3 characters." })
      .max(15, { message: "The name must be less than 15 characters." })
      .regex(/^[a-zA-Z0-9_]+$/),
    password: z
      .string()
      .min(3, { message: "The password must be at least 3 characters." })
      .max(15, { message: "The name must be less than 15 characters." })
      .regex(/^[a-zA-Z0-9_]+$/),
    confirmPassword: z
      .string()
      .min(3, { message: "The password must be at least 3 characters." })
      .max(15, { message: "The name must be less than 15 characters." })
      .regex(/^[a-zA-Z0-9_]+$/),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords are not the same.",
    path: ["confirmPassword"],
  });

const AuthForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const pocessForm = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(pocessForm)}
        className="flex flex-col gap-y-2 mt-6"
      >
        <input type="text" {...register("name")} />
        <input type="password" {...register("password")} />
        <input type="password" {...register("confirmPassword")} />
        <button type="submit">OK</button>
      </form>
    </div>
  );
};

export default AuthForm;
