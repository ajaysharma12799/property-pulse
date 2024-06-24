import { getServerSession } from "next-auth/next";
import authOptions from "@/utils/authOptions";

const getUserSession = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return null;
    }

    return {
      userId: session.user.id,
      user: session.user,
    };
  } catch (error) {
    console.log("getUserSession Error --> ", error);
    return null;
  }
};

export { getUserSession };
