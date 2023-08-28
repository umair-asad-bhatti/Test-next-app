import { NextResponse } from 'next/server'
import loginschema from '@/helper/joiregisterschema'
export async function POST(request) {
    const body = await request.json()
    // *=> validating the login details
    const validation = loginschema.validate(body)
    if (validation.error) {
        return NextResponse.json({ "errors": validation.error.details[0] })
    }

    //TODO ==> CHECK IN DB AND LOGIN IF EXISTS
    return NextResponse.json({ email, pasword } = body)
}