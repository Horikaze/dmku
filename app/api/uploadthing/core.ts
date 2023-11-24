import prisma from "@/app/lib/prismadb";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UTApi } from "uploadthing/server";
import { authOptions } from "../auth/[...nextauth]/auth";
const f = createUploadthing();
const utapi = new UTApi();
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  profileImage: f({ image: { maxFileSize: "2MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await getServerSession(authOptions);
      console.log(user);
      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      console.log("123");
      return {
        email: user.user.email!,
        currentProfileImage: user.user.info.imageUrl!,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.email);

      console.log("file url", file.url);

      if (metadata.email == undefined) {
        throw new Error("Problem with auth");
      }
      console.log(file);
      console.log("test");
      await prisma.profile.update({
        where: {
          email: metadata.email,
        },
        data: {
          imageUrl: file.url,
        },
      });

      if (metadata.currentProfileImage) {
        const parts = metadata.currentProfileImage.split("/");
        const fileName = parts[parts.length - 1];
        await utapi.deleteFiles(fileName);
      }

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.email };
    }),
  profileBanner: f({ image: { maxFileSize: "2MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await getServerSession(authOptions);
      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return {
        email: user.user.email!,
        currentProfileBanner: user.user.info.profileBanner!,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.email);

      console.log("file url", file.url);
      if (metadata.email == undefined) {
        throw new Error("Problem with auth");
      }

      await prisma.profile.update({
        where: {
          email: metadata.email,
        },
        data: {
          profileBanner: file.url,
        },
      });
      if (metadata.currentProfileBanner) {
        const parts = metadata.currentProfileBanner.split("/");
        const fileName = parts[parts.length - 1];
        await utapi.deleteFiles(fileName);
      }

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.email };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
