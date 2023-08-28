import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import schema from "@/helper/joiregisterschema";
export async function POST(request) {
    const body = await request.json();
    const validation = schema.validate(body)
    if (validation.error) {
        return NextResponse.json({ "errors": validation.error.details[0], body })
    }
    const existinguser = await sql`SELECT id FROM Users where email=${body.email}`
    if (existinguser.rowCount > 0) {
        return NextResponse.json({ error: "error", msg: "user already exists" })
    }
    //* save data to db for user registration
    const result = await sql`INSERT INTO Users (firstname,lastname,email,password) VALUES (${body.firstname},${body.lastname},${body.email},${body.password})`
    return NextResponse.json({ success: "success", msg: "user created" })
}