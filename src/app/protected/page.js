'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import { signOut } from 'next-auth/react'
const Page = () => {
    const session = useSession()
    console.log(session);
    if (session.status == 'authenticated')
        return (
            <div>protected page

                <button onClick={() => signOut()}>Logout</button>
            </div>
        )
    if (session.status == 'loading') {
        return <div>loading</div>
    }
    else {
        return (
            <>
                <button onClick={() => signIn()} className="bg-blue-500 px-4 py-1 rounded shadow border">Login</button>
                <div>please sigin in to see the protected page  </div>
            </>
        )
    }
}

export default Page