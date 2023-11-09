import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const data = await req.formData();
    const imageUrl = data.get("imageUrl") as File;
    const profileBanner = data.get("profileBanner") as File;

    if (imageUrl.name === "" && profileBanner.name === "") {
      return new NextResponse("No images are selected", { status: 403 });
    }
    if (imageUrl.name !== "") {
      if (imageUrl.size > 2048) {
        //make changes
      }
    }
    if (profileBanner.name !== "") {
      if (profileBanner.size > 2048) {
        //make changes
      }
    }
    return new NextResponse("Updated", { status: 200 });
  } catch (error) {
    console.log(error, "CHANGE PROFILE IMAGES ERROR");
    return new NextResponse("Internal error", { status: 500 });
  }
};
