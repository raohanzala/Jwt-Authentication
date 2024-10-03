import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context'
import Spinner from './Spinner'

const home = () => {


  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(5)
  const { logout, allUsers, fetchUsers, token, isLoading, setIsLoading } = useContext(AuthContext);



const handlePageChange = (newPage)=> {
  setCurrentPage(newPage)
}

useEffect(() => {

    if (token) {
      fetchUsers(currentPage, limit, setCurrentPage, setTotalPages );
    }
    setIsLoading(false)
}, [token, currentPage, limit]);

  
  return (
    <>
            <div className="text-center text-lg font-bold mt-6">You are successfully Registered Or Logged in</div>
            <button 
                onClick={()=> logout()} 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Logout
            </button>

            <div className="mt-8 overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-md">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-2 px-4 border-r">S.NO</th>
                            <th className="py-2 px-4 border-r">ID</th>
                            <th className="py-2 px-4 border-r">Name</th>
                            <th className="py-2 px-4">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? <tr> <td colSpan="4" className='py-16'> <Spinner/> </td> </tr> : allUsers?.length > 0 ? (
                            allUsers.map((user, index) => (
                                <tr key={user._id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4 border-r text-center">{(currentPage - 1) * limit + index + 1}</td>
                                    <td className="py-2 px-4 border-r">{user._id}</td>
                                    <td className="py-2 px-4 border-r">{user.name}</td>
                                    <td className="py-2 px-4">{user.email}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-4 px-4 text-center">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-4">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className="bg-blue-500 hover:bg-blue- cursor-pointer text-white font-bold py-2 px-4 rounded mr-2"
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded ml-2"
                >
                    Next
                </button>
            </div>
        
  </>
  )
}

export default home
