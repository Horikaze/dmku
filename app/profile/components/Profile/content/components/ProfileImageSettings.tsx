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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { FaImage } from "react-icons/fa";
export default function ProfileImageSettings() {
  const { toast } = useToast();

  const form = useForm();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const imageUrl = data.get("imageUrl") as File;
    const profileBanner = data.get("profileBanner") as File;
    if (imageUrl.name === "" && profileBanner.name === "") {
      toast({
        title: "Error",
        description: `No images are selected`,
      });
      return;
    }

    if (imageUrl.name !== "") {
      if (imageUrl.size > 2048) {
        const sizeInMB = (imageUrl.size / 1024 ** 2).toFixed(2);
        toast({
          title: "Error",
          description: `File size is ${sizeInMB} MB`,
        });
      }
      return;
    }
    if (profileBanner.name !== "") {
      if (imageUrl.size > 2048) {
        const sizeInMB = (imageUrl.size / 1024 ** 2).toFixed(2);
        toast({
          title: "Error",
          description: `File size is ${sizeInMB} MB`,
        });
      }
      return;
    }

    // axios
    //   .post("/api/changeprofileimages", data)
    //   .then(() => {
    //     toast({
    //       description: "Login again to see the changes",
    //     });
    //   })
    //   .catch((e) => {
    //     toast({
    //       description: `Error : ${e}`,
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
            <form onSubmit={onSubmit} className="space-y-2">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        name={field.name}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        disabled={field.disabled}
                        multiple={false}
                        ref={field.ref}
                        accept=".png .jpg .gif"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profileBanner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Banner</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        name={field.name}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        disabled={field.disabled}
                        multiple={false}
                        ref={field.ref}
                        accept=".png .jpg .gif"
                      />
                    </FormControl>
                    <FormDescription>
                      Maximum file size is 2MB. Only png, jpg, gif
                    </FormDescription>
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
