import prisma from "@/app/lib/prismadb";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import CCTable from "@/app/components/CCTable";

export default async function TablePage() {
  const session = await getServerSession(authOptions);
  const tableData = await prisma.ranking.findFirst({
    where: {
      userIdRankingPoints: session?.user.info.id,
    },
  });
  if (!tableData) {
    return (
      <div>
        <p>xD</p>
      </div>
    );
  }
  return <CCTable tableData={tableData!} />;
}
