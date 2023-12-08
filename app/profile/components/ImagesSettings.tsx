"use client";
import ButtonLoader from "@/app/components/ButtonLoader";
import { UploadButton } from "@/app/ulils/uploadthing";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
export default function ImagesSettings() {
  const { toast } = useToast();
  const { update } = useSession();
  return (
    <div className="flex flex-row justify-evenly">
      <div>
        <Label className="text-lg">Profile Image</Label>
        <UploadButton
          appearance={{
            button({ isUploading, ready, uploadProgress }) {
              return buttonVariants({ variant: "default" });
            },
          }}
          content={{
            button({ isUploading, ready, uploadProgress }) {
              if (isUploading) {
                return (
                  <>
                    <ButtonLoader loading={true} /> <p>{uploadProgress}%</p>
                  </>
                );
              }

              return "Upload File";
            },
          }}
          endpoint="profileImage"
          onClientUploadComplete={async (res) => {
            console.log(res);
            await update({ image: res[0].url });
            toast({
              title: "Updated",
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
          appearance={{
            button({ isUploading, ready, uploadProgress }) {
              return buttonVariants({ variant: "default" });
            },
          }}
          content={{
            button({ isUploading, ready, uploadProgress }) {
              if (isUploading) {
                return (
                  <>
                    <ButtonLoader loading={true} /> <p>{uploadProgress}%</p>
                  </>
                );
              }

              return "Upload File";
            },
          }}
          endpoint="profileBanner"
          onClientUploadComplete={async (res) => {
            toast({
              title: "Updated",
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
  );
}
