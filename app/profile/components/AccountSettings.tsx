"use client";
import ButtonLoader from "@/app/components/ButtonLoader";
import { gamesString } from "@/app/constants/games";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
export default function AccountSettings() {
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
  const [loading, setLoading] = useState(false);
  const { data: session, update } = useSession();
  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    axios
      .post("/api/changeprofile", values)
      .then(() => {
        toast({
          title: "Updated",
        });
        if (values.nickname?.length! >= 1) {
          update();
        }
      })
      .catch((e) => {
        toast({
          title: "Error",
          description: `${e}`,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full">
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nickname</FormLabel>
              <FormControl>
                <Input
                  placeholder={session?.user.info.nickname || "Nickname"}
                  {...field}
                />
              </FormControl>
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
                  placeholder={session?.user.info.discord || "Discord"}
                  {...field}
                />
              </FormControl>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={session?.user.info.favoriteGame || "Game"}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[300px]">
                  {gamesString.map((game) => (
                    <SelectItem key={game} value={game}>
                      {game}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  placeholder={session?.user.info.bio || "Bio"}
                  className="resize-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-end pt-2">
          <Button type="submit">
            <ButtonLoader loading={loading} />
            <p>Save</p>
          </Button>
        </div>
      </form>
    </Form>
  );
}
