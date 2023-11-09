"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaImage } from "react-icons/fa";
import * as z from "zod";
export default function ProfileImageSettings() {
  const ACCEPTED_MIME_TYPES = ["image/gif", "image/jpeg", "image/png"];
  const MB_BYTES = 2000000; // Number of bytes in a megabyte.

  const { toast } = useToast();
  const formSchema = z.object({
    imageUrl: z
      .instanceof(Blob)
      .optional()
      .or(z.literal(undefined))
      .superRefine((f, ctx) => {
        if (f === undefined) {
          return false;
        }
        if (!ACCEPTED_MIME_TYPES.includes(f.type)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `File must be one of [${ACCEPTED_MIME_TYPES.join(
              ", "
            )}] but was ${f.type}`,
          });
          if (f.size > 3 * MB_BYTES) {
            ctx.addIssue({
              code: z.ZodIssueCode.too_big,
              type: "array",
              message: `The file must not be larger than ${
                3 * MB_BYTES
              } bytes: ${f.size}`,
              maximum: 3 * MB_BYTES,
              inclusive: true,
            });
          }
        }
      }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // axios
    //   .post("/api/changeprofile", values)
    //   .catch((e) => {
    //     console.log(e);
    //   })
    //   .then(() => {
    //     toast({
    //       description: "Login again to see the changes",
    //     });
    //   });
  }
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <FaImage
            size={24}
            className="hover:cursor-pointer opacity-30 mix-blend-plus-lighter hover:opacity-70"
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Profile images settings</DialogTitle>
            <DialogDescription>
              Customize your profile images here!
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nickname</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        name={field.name}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        disabled={field.disabled}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public nickname.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row justify-between">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
