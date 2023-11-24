import prisma from "@/app/lib/prismadb";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UTApi } from "uploadthing/server";
import { authOptions } from "../auth/[...nextauth]/auth";
const f = createUploadthing();
const utapi = new UTApi();

export const ourFileRouter = {
  profileImage: f({ image: { maxFileSize: "2MB" } })
    .middleware(async ({ req }) => {
      const user = await getServerSession(authOptions);

      if (!user) throw new Error("Unauthorized");

      return {
        email: user.user.email!,
        currentProfileImage: user.user.info.imageUrl!,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
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

      try {
        if (metadata.currentProfileImage) {
          const parts = metadata.currentProfileImage.split("/");
          const fileName = parts[parts.length - 1];
          await utapi.deleteFiles(fileName);
        }
      } catch (error) {
        console.log(error);
      }

      return { uploadedBy: metadata.email };
    }),
  profileBanner: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await getServerSession(authOptions);

      if (!user) throw new Error("Unauthorized");

      return {
        email: user.user.email!,
        currentProfileBanner: user.user.info.profileBanner!,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
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
      try {
        if (metadata.currentProfileBanner) {
          const parts = metadata.currentProfileBanner.split("/");
          const fileName = parts[parts.length - 1];
          await utapi.deleteFiles(fileName);
        }
      } catch (error) {
        console.log(error);
      }

      return { uploadedBy: metadata.email };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
