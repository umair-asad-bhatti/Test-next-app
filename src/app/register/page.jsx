'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi';
import schema from '@/helper/joiregisterschema';
const Page = () => {
    const { register, setError, clearErrors, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: joiResolver(schema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirm_password: ""
        }
    })
    const onSubmit = async (data) => {
        clearErrors()
        const response = await fetch('/api/register', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        const server_data = await response.json();
        if (server_data.errors) {
            console.log(server_data);
            setError(server_data.errors.context.key, { type: server_data.errors.type, message: server_data.errors.message });
            return;
        }
        console.log(server_data);
        reset()
        return;
    }
    return (
        <div className='p-2 m-2  flex flex-col items-center  justify-center '>

            <h1 className='text-5xl my-4 text-blue-500'>Register Here</h1>
            <form className='p-4 shadow-lg border md:w-[400px] lg:w-[500px] w-auto border-slate-200' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className='block py-2 text-slate-500' htmlFor="">First Name</label>
                    <input id='firstname' placeholder='first name*' className='  block w-[100%] border outline-blue-500 px-2 py-1 rounded'  {...register('firstname')} />
                    {errors.firstname && <p className='text-red-400'>{errors.firstname.message}</p>}
                </div >
                <div>
                    <label className='block py-2 text-slate-500' htmlFor="lastname">Last Name</label>
                    <input placeholder='last name*' id="lastname" className='  block w-[100%] border outline-blue-500 px-2 py-1 rounded'  {...register('lastname')} />
                    {errors.lastname && <p className='text-red-400'>{errors.lastname.message}</p>}

                </div>
                <div>
                    <label className='block py-2 text-slate-500' htmlFor="email">Email</label>
                    <input placeholder='email*' id="email" className=' border  block w-[100%] outline-blue-500 px-2 py-1 rounded'  {...register('email')} />
                    {errors.email && <p className='text-red-400'>{errors.email.message}</p>}
                </div>
                <div>
                    <label className='block py-2 text-slate-500' htmlFor="password">Password</label>
                    <input type='password' placeholder='password*' id="password" className=' border block w-[100%]  outline-blue-500 px-2 py-1 rounded'  {...register('password')} />
                    {errors.password && <p className='text-red-400'>{errors.password.message}</p>}
                </div>
                <div>
                    <label className='block py-2 text-slate-500' htmlFor="confirm password">Confirm Password</label>
                    <input placeholder='Confirm password*' type='password' id="confirm password" className=' border  block w-[100%] outline-blue-500 px-2 py-1 rounded'  {...register('confirm_password')} />
                    {errors.confirm_password && <p className='text-red-400 '>{errors.confirm_password.message}</p>}

                </div>
                {
                    isSubmitting ?
                        <input disabled type='submit' value={"submitting..."} className='block w-[100%] bg-slate-500 px-2 py-1 my-4 text-white shaodw rounded' />
                        :
                        <input className='block w-[100%] hover:bg-blue-600 cursor-pointer bg-blue-500 px-2 py-1 my-4 text-white shaodw rounded' type="submit" value={'submit'} />
                }

            </form >
        </div >
    )
}

export default Page