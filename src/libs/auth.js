// Third-party Imports
import CredentialProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export const authOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialProvider({
      name: 'Credentials',
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials

        try {
          // Mencari pengguna berdasarkan username
          const user = await prisma.users.findUnique({
            where: { username: username },
          })

          if (!user) {
            throw new Error('Username atau password salah')
          }

          // Memeriksa kecocokan password
          const isValidPassword = await bcrypt.compare(password, user.password)

          if (!isValidPassword) {
            throw new Error('Username atau password salah')
          }

          // Menghapus password dari objek user sebelum mengembalikannya
          const { password: _, ...userWithoutPassword } = user


          return userWithoutPassword

        } catch (e) {
          throw new Error(e.message)
        }
      }
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 6 * 60 * 60
  },

  pages: {
    signIn: '/login'
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.nama
        token.role = user.role
        token.username = user.username
        token.status = user.status
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.role = token.role
        session.user.username = token.username
        session.user.status = token.status
      }

      return session
    }
  },

  debug: process.env.NODE_ENV === 'development',  // Debug mode for development
}
