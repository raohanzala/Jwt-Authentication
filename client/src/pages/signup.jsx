import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { AuthContext } from '../context'

const signup = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const {register, token} = useContext(AuthContext)

  console.log(token)
  const handleSubmit = (e)=> {
    e.preventDefault()
    register(name, email, password)
  }




  return (
    <div className='p-5 shadow-lg max-w-[400px] m-auto text-center border rounded-lg'>
      <h1 className='text-4xl font-semibold mb-10'>Register</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5 '>
        <div className='flex gap-5'>
          <label htmlFor="name" className='text-xl'>Name :</label>
          <input type="text" placeholder='Enter your name' required value={name} onChange={(e) => setName(e.target.value)} className='border p-2 rounded-md' />
        </div>
        <div className='flex gap-5'>
          <label htmlFor="email" className='text-xl'>Email :</label>
          <input type="email" placeholder='Enter your email' required value={email} onChange={(e) => setEmail(e.target.value)} className='border p-2 rounded-md' />
        </div>
        <div className='flex gap-5'>
          <label htmlFor="password" className='text-xl'>Password :</label>
          <input type="password" placeholder='Enter your password' required value={password} onChange={(e) => setPassword(e.target.value)} className='border p-2 rounded-md' />
        </div>

        <p className='text-sm'>Already have an account ? <Link to='/login' className='text-[blue]'>Login</Link></p>
        <button className='bg-black p-3 text-white font-semibold rounded-md uppercase'>Register</button>


      </form>
    </div>
  )
}

export default signup