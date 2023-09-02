'use client'

import { signIn } from "next-auth/react"
import Link from "next/link"
export default function Page() {


  return (
    <div>
      <button onClick={() => signIn()} className="bg-blue-500 px-4 py-1 rounded shadow border">Login</button>
      <Link href={"/login"}>Sign in</Link>
    </div >
  )
}
