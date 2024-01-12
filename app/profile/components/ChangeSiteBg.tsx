"use client";

import ButtonLoader from "@/app/components/ButtonLoader";
import { UploadButton } from "@/app/ulils/uploadthing";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function ChangeSiteBg() {
  const { toast } = useToast();
  return (
    <div className="flex flex-col self-end">
      <Label className="text-center mb-1">Site BG</Label>
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
        endpoint="siteBG"
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
  );
}
