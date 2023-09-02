
'use client'
import Link from 'next/link'
import React from 'react'
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import loginschema from '@/helper/joiloginschema'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'


const Page = () => {
    const router = useRouter()
    const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting } } = useForm(
        {
            resolver: joiResolver(loginschema),
            defaultValues: {
                email: "",
                password: ""
            }

        })
    const onLoginSubmit = async (data) => {
        const res = await signIn("credentials", { ...data, redirect: false })
        if (res.error) {
            alertify.error("invalid credentials")
            return;
        }
        router.replace("/protected")
        reset()
    }
    return (
        <div className='p-2 m-2  flex flex-col items-center  justify-center '>
            <h1 className='text-5xl my-4 text-blue-400'>Login</h1>
            <form className='p-4 shadow-lg border bg-white border-slate-200' onSubmit={handleSubmit((onLoginSubmit))}>
                <div>
                    <label className='block py-2 text-slate-500' htmlFor="email">Email</label>
                    <input id='email' placeholder='Email*' className='border-blue-400 bg-zinc-50 block w-[100%] border outline-blue-500 px-2 py-1 rounded'  {...register('email')} />
                    {errors.email && <p className='text-red-400'>{errors.email.message}</p>}
                </div >
                <div>
                    <label className='block py-2 text-slate-500' htmlFor="password">Password</label>
                    <input type='password' placeholder='Password*' id="password" className='bg-zinc-50 border-blue-400  block w-[100%] border outline-blue-500 px-2 py-1 rounded'  {...register('password')} />
                    {errors.password && <p className='text-red-400'>{errors.password.message}</p>}
                </div>
                {
                    isSubmitting ?
                        <input disabled className='block w-[100%]  bg-slate-500 px-2 py-1 my-4 text-white text-center' value="Logging in..." />
                        : <input className='block w-[100%] hover:bg-blue-600 cursor-pointer bg-blue-500 px-2 py-1 my-4 text-white shaodw rounded' type="submit" value="Log in" />
                }
                <div className='text-center m-2 p-2'>
                    <h4>Dont have account?<Link className='text-blue-500 underline' href={"/register"}> Register here</Link></h4>
                </div>
            </form >
        </div >
    )
}

export default Page