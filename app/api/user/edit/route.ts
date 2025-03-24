import prisma from "@/lib/prismadb";
import { apiResponse, handleApiError } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    console.log("The Route is Correct");
    const { id, username, image } = await req.json();

    //Update user in the database
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username,
        image,
      },
    });

    return apiResponse("User Updated", true, 200);
  } catch (error) {
    return handleApiError(error);
  }
}
