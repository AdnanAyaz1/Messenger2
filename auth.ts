import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prismadb";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    GitHub,
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: { email: email as string, provider: "credentials" },
        });

        if (!user || user.provider !== "credentials") {
          throw new Error("The Email or the Password is incorrect");
        }

        const isValid = await bcrypt.compare(
          password as string,
          user.password as string
        );
        if (!isValid) {
          throw new Error("The Email or the Password is incorrect");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.username,
          image: user.image,
          provider: "credentials",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        if (account.provider !== "credentials") {
          const providerAccountId = account.providerAccountId;
          const provider = account.provider;

          let existingUser = await prisma.user.findFirst({
            where: {
              provider: provider as string,
              providerAccountId: providerAccountId as string,
            },
          });

          if (!existingUser) {
            existingUser = await prisma.user.create({
              data: {
                username: user?.name as string,
                email: user?.email as string,
                image: user?.image as string,
                provider,
                providerAccountId,
              },
            });
          }

          token.sub = existingUser.id;
        }
      }
      if (account?.provider === "credentials") {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },
  },
});
