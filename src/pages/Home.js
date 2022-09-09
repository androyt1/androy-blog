import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux/es/exports'
import { allPosts } from '../redux/features/postSlice'
import {Link} from 'react-router-dom'
import {GrLike} from 'react-icons/gr'

const Home = () => {

  const dispatch=useDispatch()
  const{posts}=useSelector(state=>state.posts)
  useEffect(()=>{
    dispatch(allPosts())
  },[dispatch]) 
  return (
    <div className='px-3 w-full py-5 space-y-10'>    
      {
        posts?.map(post=>(
        <div key={post._id} className='w-full grid grid-cols-1 md:grid-cols-3 shadow-md shadow-slate-300 p-5'>
          <div className='col-span-1'>
            <img src={post?.image} alt="" className='object-cover h-full w-full' />
          </div>
          <div className='col-span-2 grid grid-cols-1 md:p-16 '>
              <div className='w-full flex flex-col justify-center items-start '>
                <span className='uppercase text-xl mb-1 font-semibold text-slate-700 pt-2'>{post?.title}</span>
                <span className='text-xs leading-relaxed'>{post?.description}</span>
                <span className='font-semibold text-sm'>By {post?.name}</span>
               
              </div>
             <div className=' w-full h-full flex md:justify-start justify-between items-center md:space-x-12 mt-3'>
                  <GrLike className='text-xl my-2 shadow-md shadow-slate-100'/>
                  <button className='px-16 py-2 text-slate-800 text-xs font-semibold shadow-md shadow-slate-900'>View</button>
             </div>
          </div>
        </div>))
      }
  </div>
  )
} 

export default Home