import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { logout } from '../redux/features/authSlice'
import jwt_decode from "jwt-decode";

const Navbar = () => {

  const dispatch=useDispatch()
  const{user}=useSelector(state=>state.auth)
 

  const logoutUser=()=>{
    dispatch(logout()) 
  }

  const token=user && user.accessToken
 
  const verify=token && jwt_decode(token)
  if(token && verify){
    if(verify.exp * 1000 < new Date().getTime()){
      logoutUser()
   }
  }

  return (
    <div className='w-full h-[60px] flex justify-between items-center px-3 bg-slate-100 shadow-md shadow-slate-600 z-10 sticky top-0 left-0'>
      <span className='text-xl font-semibold'>AuthLog</span>
      <ul>
        {
          user &&  <li className='hidden md:inline-block mr-10 text-sm'><span className='font-semibold'>logged in as {user.name}</span></li>
        }
        <li className='inline-block ml-4 text-sm'><NavLink to='/'>Home</NavLink></li>
        {
        user && 
          <>
          <li className='inline-block ml-4 text-sm'><NavLink to='/dashboard'>Dashboard</NavLink></li>
          <li className='inline-block ml-4 text-sm'><NavLink to='/new-post'>New Post</NavLink></li>
          </>

        }
         {
        !user && <>
         <li className='inline-block ml-4 text-sm'><NavLink to='/login'>Login</NavLink></li>
        <li className='inline-block ml-4 text-sm'><NavLink to='/register'>Register</NavLink></li>
        </>
       }
       {
        user && <li className='inline-block ml-4 text-sm'><button onClick={logoutUser}>Logout</button></li>
       }
      </ul>
    </div>
  )
}

export default Navbar