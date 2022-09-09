import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Redirect = () => {

    const navigate=useNavigate()
    const[count,setCount]=useState(5)

    useEffect(()=>{
        const interval=setInterval(()=>{
            setCount((prevCount)=>--prevCount)
        },1000)
        count===0 && navigate('/login')
        return ()=>clearInterval(interval)
    },[count,navigate])

  return (
    <div className='w-full flex justify-center items-center'>
      <h6 className='text-xl font-semibold'>Redirecting in {count} seconds</h6>
    </div>
  )
}

export default Redirect