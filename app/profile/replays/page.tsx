import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { columns } from "@/app/components/replayTable/columns";
import { DataTable } from "@/app/components/replayTable/data-table";
import prisma from "@/app/lib/prismadb";
import { getServerSession } from "next-auth";
import DeleteReplay from "../components/DeleteReplay";
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
    <div className="w-full flex flex-col gap-y-3 overflow-x-scroll">
      <div className="flex justify-end">
        <DeleteReplay />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
