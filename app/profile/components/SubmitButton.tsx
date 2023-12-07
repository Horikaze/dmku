"use client";
import ButtonLoader from "@/app/components/ButtonLoader";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  variant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  text: string;
};

export const SubmitButton = ({ variant, text }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant={variant}>
      <ButtonLoader loading={pending} />
      {text}
    </Button>
  );
};
