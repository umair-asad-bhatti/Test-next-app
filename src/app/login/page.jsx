
'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import loginschema from '@/helper/joiloginschema'

const Page = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm(
        {
            resolver: joiResolver(loginschema),

        })
    const onLoginSubmit = async (data) => {
        console.log(data);

    }
    return (
        <div className='p-2 m-2  flex flex-col items-center  justify-center '>
            <h1 className='text-5xl my-4 text-blue-500'>Login</h1>
            <form className='p-4 shadow-lg border border-slate-200' onSubmit={handleSubmit((onLoginSubmit))} style={{ "max-width": "400px", "width": "400px" }}>
                <div>
                    <label className='block py-2 text-slate-500' htmlFor="email">Email</label>
                    <input id='email' placeholder='Email*' className='border-blue-400  block w-[100%] border outline-blue-500 px-2 py-1 rounded'  {...register('email')} />
                    {errors.email && <p className='text-red-400'>{errors.email.message}</p>}
                </div >
                <div>
                    <label className='block py-2 text-slate-500' htmlFor="password">Password</label>
                    <input type='password' placeholder='Password*' id="password" className='border-blue-400  block w-[100%] border outline-blue-500 px-2 py-1 rounded'  {...register('password')} />
                    {errors.password && <p className='text-red-400'>{errors.password.message}</p>}
                </div>
                {
                    !isSubmitting &&
                    <input className='block w-[100%] hover:bg-blue-600 cursor-pointer bg-blue-500 px-2 py-1 my-4 text-white shaodw rounded' type="submit" value="submit" />
                }
            </form >
        </div >
    )
}

export default Page