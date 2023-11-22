import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { columns } from "@/app/components/replayTable/columns";
import { DataTable } from "@/app/components/replayTable/data-table";
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
    <div className="w-full">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
