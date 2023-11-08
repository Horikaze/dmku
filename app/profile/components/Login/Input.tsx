"use client";
import clsx from "clsx";
import { useCallback } from "react";
import { FieldValues, FieldErrors, UseFormRegister } from "react-hook-form";
import toast from "react-hot-toast";

type formSchemaProps = {
  nickname: string;
  password: string;
  confirmPassword: string;
};
interface InputProps {
  label: string;
  id: "password" | "confirmPassword" | "nickname";
  type?: string;
  required?: boolean;
  register: UseFormRegister<formSchemaProps>;
  errors: FieldErrors;
  disabled?: boolean;
  placeholder?: string;
}

const Input = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
  placeholder,
}: InputProps) => {
  return (
    <div>
      <label
        className="block text-sm font-medium leading-6 text-white"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          placeholder={placeholder}
          id={id}
          autoComplete={id}
          disabled={disabled}
          {...register(id)}
          className={clsx(
            `
          form-input block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
          placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6
          `,
            errors[id] ? "focus:ring-rose-500" : "focus:ring-sky-600",
            disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
};

export default Input;
