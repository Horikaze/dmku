"use client";
import { gamesString } from "@/app/constants/games";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { IoSettingsSharp } from "react-icons/io5";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
export default function ProfileSettings() {
  const ACCEPTED_MIME_TYPES = ["image/gif", "image/jpeg", "image/png"];
  const MB_BYTES = 2000000; // Number of bytes in a megabyte.

  const { toast } = useToast();
  const formSchema = z.object({
    nickname: z.string().min(3).max(15).optional().or(z.literal("")),
    password: z.string().min(3).max(15).optional().or(z.literal("")),
    discord: z.string().min(3).max(15).optional().or(z.literal("")),
    game: z.string().min(2).max(15).optional().or(z.literal("")),
    bio: z.string().min(2).max(250).optional().or(z.literal("")),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
      password: "",
      discord: "",
      game: "",
      bio: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    axios
      .post("/api/changeprofile", values)
      .catch((e) => {
        console.log(e);
      })
      .then(() => {
        toast({
          description: "Login again to see the changes",
        });
      });
  }

  const session = useSession();
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <IoSettingsSharp
            size={24}
            className="hover:cursor-pointer opacity-30 mix-blend-plus-lighter hover:opacity-70"
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Profile Settings</DialogTitle>
            <DialogDescription>Customize your profile here!</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nickname</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          session.data?.user.info.nickname || "Nickname"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public nickname.
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                    <FormDescription>Change your password.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discord"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discord</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          session.data?.user.info.discord || "Discord"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Change your discord.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="game"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Favorite game</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              session.data?.user.info.favoriteGame || "Game"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gamesString.map((game) => (
                          <SelectItem key={game} value={game}>
                            {game}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Change your favorite game</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={session.data?.user.info.bio || "Bio"}
                        className="resize-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      I don&apos;t know, type something here.
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
