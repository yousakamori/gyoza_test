import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { db } from '@/lib/db'

export const authOptions: NextAuthOptions = {
  // TODO: type
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null
        }

        const { email, password } = credentials

        const dbUser = await db.user.findFirst({
          where: {
            email,
          },
        })

        if (!dbUser) {
          return null
        }

        const compared = await bcrypt.compare(password, dbUser.passwordDigest)

        return compared ? dbUser : null
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      console.log('🤢call session', 'token => ', token, 'session => ', session)
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.role = token.role
      }

      return session
    },
    // jwt コールバックが呼び出され、セッション コールバックでブラウザにデータを渡します。
    // TODO: type
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (dbUser) {
        console.log('💽 db user', dbUser, token)
        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          picture: dbUser.image,
          role: dbUser.role,
        }
      }

      // token.id = user?.id

      console.log('👩🏻‍💻 token user', token)
      return token
    },
  },
}
