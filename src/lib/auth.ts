// https://next-auth.js.org/getting-started/typescript#module-augmentation
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { db } from '@/lib/db'

export const authOptions: NextAuthOptions = {
  // TODO: type
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: 'jwt',
  },
  // pages: {
  //   signIn: '/login',
  // },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',

      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    // TODO: type
    async session({ token, session }: any) {
      console.log('🤢call session', 'token => ', token, 'session => ', session)
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    // TODO: type
    async jwt({ token, user }: any) {
      console.log('😁call jwt', 'token => ', token, 'user => ', user)
      token.id = user.id
      return token

      // const dbUser = await db.user.findFirst({
      //   where: {
      //     email: token.email,
      //   },
      // })

      // if (!dbUser) {
      //   token.id = user.id
      //   return token
      // }

      // return {
      //   id: dbUser.id,
      //   name: dbUser.name,
      //   email: dbUser.email,
      //   picture: dbUser.image,
      // }
    },
  },
}
