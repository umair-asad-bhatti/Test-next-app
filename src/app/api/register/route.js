import { NextResponse } from "next/server";
import schema from "@/helper/joiregisterschema";
export async function POST(request) {
    const body = await request.json();
    const validation = schema.validate(body)
    if (validation.error) {
        return NextResponse.json({ "errors": validation.error.details[0], body })
    }
    //TODO ==> save data to db for user registration
    return NextResponse.json({ body })
}