import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on Successfully SignedIN
    async signIn({ profile }: any) {
      // 1. Connect DB
      await connectDB();

      // 2. Check If User already exist
      const userExist = await User.findOne({ email: profile.email });

      // 3. If not then add User to DB
      if (!userExist) {
        // Truncase Username if too long
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }

      // 4. Return true to allow SignIN
      return true;
    },

    // Modify Session Object
    async session({ session }: any) {
      // 1. Get User from DB
      const user = await User.findOne({ email: session.user.email });

      // 2. Assign UserID to Session
      session.user.id = user._id.toString();

      // 3. Return Session
      return session;
    },
  },
};

export default authOptions;
