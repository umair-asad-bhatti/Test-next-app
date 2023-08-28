import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
export async function GET(request) {
    try {

        const result = await sql`CREATE TABLE Users ( id serial primary key,firstname text not null,lastname text not null,email text not null unique, password text not null);`;
        return NextResponse.json({ result }, { stauts: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { stauts: 500 });
    }

}


// export async function GET(request) {
//     try {
//         const result =
//             await sql`CREATE TABLE Pets ( Name varchar(255), Owner varchar(255) );`;
//         return NextResponse.json({ result }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ error }, { status: 500 });
//     }
// }