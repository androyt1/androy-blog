import React,{useEffect} from 'react'
import { allUserPosts,deletePost } from '../redux/features/postSlice'
import { useSelector,useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import {toast} from 'react-hot-toast'

const Dashboard = () => {
  const dispatch=useDispatch()
  const{userPosts}=useSelector(state=>state.posts)
 
  useEffect(()=>{
    dispatch(allUserPosts())   
  },[dispatch]) 
 
  const handleDelete=(id)=>{
    if(window.confirm('Are you sure you want to delete this post?')){
      dispatch(deletePost({id,toast}))
    }
  }

  return (
    <div className='px-3 w-full py-5 space-y-10'>    
      {
        userPosts?.map(post=>(
        <div key={post._id} className='w-full grid grid-cols-1 md:grid-cols-3 shadow-md shadow-slate-500 p-5'>
          <div className='col-span-1'>
            <img src={post?.image} alt="" className='object-cover h-full w-full' />
          </div>
          <div className='col-span-2 grid grid-cols-1 md:p-16'>
              <div className='w-full flex flex-col justify-center items-start'>
                <span className='uppercase text-xl mb-1 font-semibold text-slate-700 pt-2'>{post?.title}</span>
                <span className='text-xs leading-relaxed'>{post?.description}</span>
              </div>
              <div className='w-full flex justify-start mt-3 md:mt-6 items-center space-x-4 '>
              <button className='w-[25%] py-2 text-xs font-semibold bg-green-700 text-slate-50 flex justify-center items-center'>View</button>
                <Link to={`/update-post/${post?._id}`} className='w-[25%] py-2 text-xs font-semibold bg-blue-700 text-slate-50 flex justify-center items-center'>Edit</Link>
                <button className='w-[25%] py-2 text-xs font-semibold bg-red-700 text-slate-50 flex justify-center items-center' onClick={()=>handleDelete(post?._id)}>Delete</button>
              </div>
          </div>
        </div>))
      }
  </div>
  )
}

export default Dashboard