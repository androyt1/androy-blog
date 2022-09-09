import React,{useEffect} from 'react'
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import PrivateRoute from './components/PrivateRoute'
import { Toaster } from 'react-hot-toast'
import { setUser } from './redux/features/authSlice'
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import NewEdit from './pages/NewEdit'

const App = () => {

  const dispatch=useDispatch()
  const user=JSON.parse(localStorage.getItem('profile'))
  useEffect(()=>{
    dispatch(setUser(user))
  },[dispatch,user])

  return (
    <>   
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
      <Route path='/new-post' element={<PrivateRoute><NewEdit/></PrivateRoute>}/>
      <Route path='/update-post/:id' element={<PrivateRoute><NewEdit/></PrivateRoute>}/>
    </Routes>
    <Toaster/>
    </BrowserRouter>
    </>
  )
}

export default App