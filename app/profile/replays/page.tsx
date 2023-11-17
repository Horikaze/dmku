import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { columns } from "@/app/components/replayTable/columns";
import { DataTable } from "@/app/components/replayTable/data-table";
import { getLastScore } from "@/app/components/replayTable/forrmatScore";
import prisma from "@/app/lib/prismadb";
import { getServerSession } from "next-auth";
export default async function page() {
  const session = await getServerSession(authOptions);
  let data = await prisma.replay.findMany({
    where: {
      userId: session?.user.info.id,
    },
    orderBy: {
      uploadedDate: "desc",
    },
  });
  
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
