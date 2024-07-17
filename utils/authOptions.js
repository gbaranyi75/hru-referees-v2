import connectDB from "@/config/database";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
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
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        //Check if the user exists.
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        await connectDB();

        try {
          const user = await User.findOne({
            email: credentials.email,
          });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err) {
          console.error(err);
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    // Invoked on successful signin
    async signIn({ profile, credentials }) {
      // 1. Connect to database
      await connectDB();
      // 2. Check if user exists
      const userExists = profile
        ? await User.findOne({ email: profile.email })
        : await User.findOne({ email: credentials.email });
      // 3. If not, then add user to database
      if (!userExists) {
        // Truncate user name if too long
        const username = profile.name.slice(0, 25);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
          role: "user",
          displayName: profile.name,
          password: "google",
        });
      }
      // 4. Return true to allow sign in
      return true;
    },
    // Modifies the session object
    async session({ session, token }) {
      // 1. Get user from database
      const user = await User.findOne({ email: session.user.email });
      if (!user) console.log("Something went wrong");
      // 2. Assign the user id to the session
      session.user.id = user._id.toString();
      session.user.role = user.role;
      // 3. return session
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    error: "/error",
    signIn: "/auth/belepes",
  },
};
