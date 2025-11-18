import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { sendWelcomeEmail } from '@/lib/nodemailer'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          await connectDB()
          const existingUser = await User.findOne({ email: user.email })

          if (!existingUser) {
            const newUser = new User({
              email: user.email,
              name: user.name,
              image: user.image,
              role: 'user',
              emailVerified: new Date(),
            })
            await newUser.save()
            await sendWelcomeEmail(user.email!, user.name || undefined)
          }
        } catch (error) {
          console.error('Error in signIn callback:', error)
          return false
        }
      }
      return true
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || ''
        session.user.role = (token.role as string) || 'user'
      }
      return session
    },
    async jwt({ token, user, account }) {
      if (account?.provider === 'google' && user?.email) {
        try {
          await connectDB()
          const dbUser = await User.findOne({ email: user.email })
          if (dbUser) {
            token.role = dbUser.role
          } else {
            token.role = 'user'
          }
        } catch (error) {
          console.error('Error in jwt callback:', error)
          token.role = 'user'
        }
      }
      return token
    },
  },
  pages: {
    signIn: '/auth/login',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

