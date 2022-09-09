import React,{useState,useEffect} from 'react'
import { register } from '../redux/features/authSlice'
import { useDispatch,useSelector } from 'react-redux'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const{loading,count,error}=useSelector(state=>state.auth)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const initialState={
    name:'',
    email:'',
    password:'',
    cpassword:''
  }
  const validEmail=/^[a-zA-Z]+[a-zA-Z0-9_.]+@[a-zA-Z.]+[a-zA-Z]$/
  const[formState,setFormState]=useState(initialState)
  const{email,name,password,cpassword}=formState

  const handleChange=e=>{
    const{value,name}=e.target 
    setFormState({
      ...formState,[name]:value
    })
  }

  const handleClear=()=>{
    setFormState({
      name:'',
      email:'',
      password:'',
      cpassword:''
    })
  }
  const handleSubmit=e=>{
    e.preventDefault()
    if(cpassword !==password){
      return toast.error('Passwords do not match')
    }
    if(email && password && name && cpassword){
      if(!validEmail.test(email)){
        return toast.error('Please enter a valid email address')
      }
      dispatch(register({formState,navigate,toast}))
    }
    else{
         return toast.error('All fields are Required')
    }
  }

  useEffect(()=>{
    error && toast.error(error)
  },[error,count])
 
  return (
    <div className='w-full min-h-screen flex justify-center items-start bg-blue-900 px-3'>
      <div className='px-3 py-8 mt-[50px] shadow-sm shadow-blue-100 w-full sm:w-[70%] md:w-[50%] bg-white'>
        <div className='w-full flex justify-center items-center border-b-2 border-slate-500'><h4 className='text-xl font-semibold uppercase p-2 text-blue-900'>Register User</h4>
        </div>

        <div className='w-full grid grid-cols-1 md:grid-cols-3 mt-8 md:gap-x-2'>
            <div className='col-span-1 p-1 md:p-2  flex justify-start items-end'>
              <label htmlFor="name" className='uppercase text-sm'>Name</label>
            </div>
            <div className='col-span-2  border-b-2 border-slate-500'>
              <input type="text" className='w-full bg-white  px-2 focus:outline-none text-sm' name='name' value={name} onChange={handleChange} />
            </div>
        </div>


        <div className='w-full grid grid-cols-1 md:grid-cols-3 mt-8 md:gap-x-2'>
            <div className='col-span-1 p-1 md:p-2 flex justify-start items-end'>
              <label htmlFor="email" className='uppercase text-sm'>Email Address</label>
            </div>
            <div className='col-span-2  border-b-2 border-slate-500'>
              <input type="email" className='w-full bg-white py-1 px-2 focus:outline-none text-sm' name='email' value={email} onChange={handleChange}/>
            </div> 
        </div>

        <div className='w-full grid grid-cols-1 md:grid-cols-3 mt-8 md:gap-x-2'>
            <div className='col-span-1 p-1 md:p-2  flex justify-start items-end'>
              <label htmlFor="password" className='uppercase text-sm'>Password</label>
            </div>
            <div className='col-span-2  border-b-2 border-slate-500'>
              <input type="password" className='w-full bg-white py-1 px-2 focus:outline-none text-sm' name='password' value={password} onChange={handleChange} />
            </div>
        </div>

        <div className='w-full grid grid-cols-1 md:grid-cols-3 mt-8 md:gap-x-2'>
            <div className='col-span-1 p-1 md:p-2  flex justify-start items-end'>
              <label htmlFor="password" className='uppercase text-sm'>Confirm Password</label>
            </div>
            <div className='col-span-2  border-b-2 border-slate-500'>
              <input type="password" className='w-full bg-white py-1 px-2 focus:outline-none text-sm' name='cpassword' value={cpassword} onChange={handleChange} />
            </div>
        </div>

        <div className='w-full p-3 flex flex-col justify-center items-center mt-8'>
            <button className='w-[70%] py-2 bg-blue-900 text-blue-50  uppercase text-sm' onClick={handleSubmit}>{loading ?'Loading..':'Register'}</button>

            <button className='w-[70%] py-2 bg-red-600 text-blue-50 mt-4 uppercase text-sm' onClick={handleClear}>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default Register