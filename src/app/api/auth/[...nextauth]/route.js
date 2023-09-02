import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { sql } from "@vercel/postgres";
import schema from "@/helper/joiregisterschema";
const authOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'credentials',
            type: 'credentials',

            async authorize(credentials, req) {
                const validation = schema.validate(credentials)
                const existinguser = await sql`SELECT id FROM Users where email = ${credentials.email};`;
                if (existinguser.rowCount > 0) {
                    return existinguser
                } else {
                    return null
                }
            },
        })
    ],
    // pages: {
    //     signIn: "/login"
    // }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }