
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Signup from './pages/signup'
import Home from './pages/home'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/index'


function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Signup />} />
            <Route path='/home' element={<Home />} />
            <Route path='/register' index element={<Signup />}></Route>
            <Route path='/login' element={<Login />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: '1px' }}
        toastOptions={{
          success: {
            duration: 2000
          },
          error: {
            duration: 3000
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',

          }
        }}
      />
    </>
  )
}

export default App
