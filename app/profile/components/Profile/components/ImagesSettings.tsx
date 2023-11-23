"use client";
import { UploadButton } from "@/app/ulils/uploadthing";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
export default function ImagesSettings() {
  const { toast } = useToast();
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
          appearance={{
            button({ isUploading, ready, uploadProgress }) {
              return buttonVariants({ variant: "default" });
            },
          }}
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
  );
}