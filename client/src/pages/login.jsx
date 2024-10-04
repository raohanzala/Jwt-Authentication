import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { AuthContext } from '../context'
import Spinner from './Spinner'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [isCodeSent, setIsCodeSent] = useState(false)
    const [verificationCode, setVerificationCode] = useState('')
    const { login, token, setIsLoading, isLoading } = useContext(AuthContext)

    console.log(token)

    const handleSubmit = async (e) => {
        e.preventDefault()
        toast.dismiss()
        try {
            setIsLoading(true)
            const response = await axios.post('http://localhost:3001/send-mail', { login: true, email, password })
            if (response.data.success) {
                setIsCodeSent(true)
                toast.success(response.data.message)
                setIsLoading(false)
            } else {
                setIsLoading(false)
                toast.error(response.data.message)
            }
            console.log(response)

        } catch (error) {
            setIsLoading(false)
            console.log(error)
            toast.error(error.message)
        }

    }

    const handleVerifyCode = async () => {
        toast.dismiss()
        try {
            setIsLoading(true)
            const response = await axios.post('http://localhost:3001/verify-code', { email, code: verificationCode })
            console.log(response)
            if (response.data.success) {
                toast.success(response.data.message)
                login(email, password)
                setIsLoading(false)
            } else {
                setIsLoading(false)
                toast.error(response.data.message)
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <div className='p-5 shadow-lg max-w-[400px] m-auto text-center border rounded-lg'>
            <h1 className='text-4xl font-semibold mb-10'>Login</h1>
            {isLoading ? <Spinner /> : (!isCodeSent ?
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

                </form> : (<div className='flex flex-col gap-5'>
                    <h2 className='text-2xl mb-5'>Verify Email</h2>
                    <input
                        type="text"
                        placeholder='Enter verification code'
                        required
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className='border p-2 rounded-md'
                    />
                    <button onClick={handleVerifyCode} className='bg-black p-3 text-white font-semibold rounded-md uppercase'>Verify Code</button>
                    <p className='text-sm'>Check your email for the verification code.</p>
                </div>))}
        </div>
    )

}

export default Login