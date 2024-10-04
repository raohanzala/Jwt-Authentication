import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const AuthContext = createContext()

export const AuthProvider = ({children})=> {

    const [allUsers, setAllUsers] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') || null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const login = async (email, password) => {
      toast.dismiss()

        try {
            const response = await axios.post('http://localhost:3001/login', { email, password })
            console.log(response)

            if (response.data.success) {
                setToken(response.data.token)
                localStorage.setItem('token', response.data.token)
                toast.success('You are successfully Login')
                navigate('/home')
            } else {
             toast.error(response.data.message)

            }
        } catch (error) {
                console.log(error)
                toast.error(error.message)
        }
    }

    const logout= ()=> {        
            setToken(null)
            localStorage.removeItem('token')
            toast.success('Logout successfully')
            navigate('/login')
    }

      const register = async (name , email, password) => {
        try{
    
          const response = await axios.post('http://localhost:3001/register', { name, email, password })
          if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            toast.success('Registration successful!');
            navigate('/home');
          } else {
            toast.error(response.data.message);
          }
        }
          catch(error) {
            console.error(error)
            toast.error('Registration failed. Please try again');
          }
      }

      const fetchUsers = async (page , limit, setCurrentPage, setTotalPages) => {
        try {
          toast.dismiss()
          const response = await axios.get(`http://localhost:3001/getUsers?page=${page}&limit=${limit}`);
          setAllUsers(response.data.allUsers);
          setTotalPages(response.data.totalPages)
          setCurrentPage(page)
          
        } catch (error) {
          toast.dismiss()
          console.error(error)
          toast.error(error.message);
        }
    
      }

    //   useEffect(() => {
    //     if (token) {
    //       fetchUsers();
    //     }
    //   }, [token]);


    return (
        <AuthContext.Provider value={{login, logout, register, token, allUsers, isLoading, setIsLoading, fetchUsers}}>
            {children}
        </AuthContext.Provider>
    )
}
