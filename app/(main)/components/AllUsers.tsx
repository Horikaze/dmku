import prisma from "@/app/lib/prismadb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function AllUsers() {
  const users = await prisma.profile.findMany({
    take: 20,
    orderBy: {
      nickname: "desc",
    },
  });

  return (
    <Card className="md:w-96 w-full">
      <CardHeader>
        <CardTitle>All users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-1  overflow-y-scroll h-[600px]">
          {users.map((user) => (
            <Link
              href={`user/${user.id}`}
              prefetch={false}
              className="flex border gap-x-2 justify-between items-center p-3 rounded-md hover:bg-secondary"
              key={user.id}
            >
              <div className="flex gap-x-2 items-center">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={user.imageUrl || "/images/placeholder.jpg"}
                    alt="avatar"
                  />
                  <AvatarFallback>:3</AvatarFallback>
                </Avatar>
                <p>{user.nickname}</p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
