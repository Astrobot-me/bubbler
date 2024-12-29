import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/options";
import { User } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession(authOption);
    const user: User = session?.user;
    if (!session || !user) {
      return Response.json(
        {
          success: false,
          message: "User not Logged in ! Please log in",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    return Response.json(
      {
        success: true,
        message: "This feature is under development",
      },
      {
        status: 200,
      }
    );
  }
}
