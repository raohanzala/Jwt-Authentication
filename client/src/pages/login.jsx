import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { AuthContext } from '../context'

const Login=()=> {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const {login, token} = useContext(AuthContext)

    console.log(token)

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    // useEffect(()=> {
    //     if(token){
    //         toast('You are already logged in')
    //     navigate('/register')
    //     }
    // }, [])

        return (
            <div className='p-5 shadow-lg max-w-[400px] m-auto text-center border rounded-lg'>
                <h1 className='text-4xl font-semibold mb-10'>Login</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-5 '>
                    <div className='flex gap-5'>
                        <label htmlFor="email" className='text-xl'>Email :</label>
                        <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} className='border p-2 rounded-md' />
                    </div>
                    <div className='flex gap-5'>
                        <label htmlFor="email" className='text-xl'>Password :</label>
                        <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} className='border p-2 rounded-md' />
                    </div>

                    <p className='text-sm'>Create an Account <Link to='/register' className='text-[blue]'>Register Here</Link></p>
                    <button className='bg-black p-3 text-white font-semibold rounded-md uppercase'>Login</button>

                </form>
            </div>
        )
    
}

    export default Login