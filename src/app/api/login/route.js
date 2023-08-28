import { NextResponse } from 'next/server'
import loginschema from '@/helper/joiloginschema'
import { sql } from '@vercel/postgres'
export async function POST(request) {
    const body = await request.json()

    const validation = loginschema.validate(body)
    if (validation.error) {
        return NextResponse.json({ "errors": validation.error.details[0] })
    }
    const existinguser = await sql`SELECT id FROM Users where email = ${body.email};`;
    if (existinguser.rowCount > 0) {
        return NextResponse.json({ sucess: "success", msg: "logged in successfully" })
    }
    return NextResponse.json({ error: 'error', 'msg': 'user does not exists' })
}