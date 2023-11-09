"use client";
import { UploadButton } from "@/app/ulils/uploadthing";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { FaImage } from "react-icons/fa";
export default function ProfileImageSettings() {
  const { toast } = useToast();
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
          <div className="flex flex-row justify-evenly">
            <div>
              <Label className="text-lg">Profile Image</Label>
              <UploadButton
                endpoint="profileImage"
                onClientUploadComplete={(res) => {
                  toast({
                    title: "Updated",
                    description: "Login again to see the changes",
                  });
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  toast({
                    title: "Error",
                    description: `${error.message}`,
                  });
                }}
              />
            </div>
            <div>
              <Label className="text-lg">Profile Banner</Label>
              <UploadButton
                endpoint="profileBanner"
                onClientUploadComplete={(res) => {
                  toast({
                    title: "Updated",
                    description: "Login again to see the changes",
                  });
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  toast({
                    title: "Error",
                    description: `${error.message}`,
                  });
                }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
