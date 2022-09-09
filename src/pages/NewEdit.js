import React,{useState,useEffect, useCallback} from 'react'
import ReactImageBase64 from 'react-image-base64'
import { useNavigate,useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { createPost,editPost} from '../redux/features/postSlice'
import {useDispatch,useSelector} from 'react-redux'
import { getPostById } from '../services/api'

const NewEdit = () => { 

    const{id}=useParams()    
    const dispatch=useDispatch() 
    const navigate=useNavigate()
    const{error,loading,count}=useSelector(state=>state.posts)
    const initialState={
        title:'' ,
        description:'' 
    }  
    const[formState,setFormState]=useState(initialState)
    const[disabled,setDisabled]=useState(true)
    const{title,description}=formState

    const handleChange=e=>{
        const{name,value}=e.target
        setFormState({
            ...formState,[name]:value
        })
    }
    const clearForm=()=>{
        setFormState({
            title:'',
            description:''
        }) 
    }

    useEffect(()=>{
      if(title.length > 3 && description.length > 10){
        setDisabled(false)
      }else{
        setDisabled(true)
      }
    },[title,description])

    const handleSubmit=e=>{ 
      e.preventDefault()
      if(title && description){
       if(id){
          dispatch(editPost({id,formState,navigate,toast}))
       }else{
        dispatch(createPost({formState,toast,navigate}))
       }
      }else{
        return toast.error('Please fill all fields to Create New Post')
      }
    }

    useEffect(()=>{
      error &&  toast.error(error)
    },[count,error])

    const getPost=useCallback(()=>{
      getPostById(id).then(res=>{
        setFormState({ 
          title:res.data.title,
          description:res.data.description 
        })
      }).catch(error=>{
        return toast.error(error.response.data.message)
      })
    },[id]) 

    useEffect(()=>{ 
      id && getPost()
    },[id,getPost])

    return (
        <div className='w-full min-h-screen flex justify-center items-start bg-blue-900 px-3'>
          <div className='px-3 py-8 mt-[50px] shadow-sm shadow-blue-100 w-full sm:w-[70%] md:w-[50%] bg-white'>
            <div className='w-full flex justify-center items-center border-b-2 border-slate-500'><h4 className='text-xl font-semibold uppercase p-2 text-blue-900'>{id ? 'Update Post':'New Post'}</h4>
            </div>
    
            <div className='w-full grid grid-cols-1 md:grid-cols-3 mt-8 md:gap-x-2'>
                <div className='col-span-1 p-1 md:p-2  flex justify-start items-end'>
                  <label htmlFor="name" className='uppercase text-sm'>title</label>
                </div>
                <div className='col-span-2  border-b-2 border-slate-500'>
                  <input type="text" className='w-full bg-white  px-2 focus:outline-none text-sm' value={title} name='title' onChange={handleChange} />
                </div>
            </div>
    
    
            <div className='w-full grid grid-cols-1 md:grid-cols-3 mt-8 md:gap-x-2'>
                <div className='col-span-1 p-1 md:p-2 flex justify-start items-end'>
                  <label htmlFor="email" className='uppercase text-sm'>Image</label>
                </div>
                <div className='col-span-2  border-b-2 border-slate-500'>
                  <ReactImageBase64  maxFileSize={10485760}  multiple={false} className='w-full bg-white py-1 px-2 focus:outline-none text-sm' handleChange={data=>setFormState({...formState,image:data.fileData})}/>
                </div> 
            </div>
    
            <div className='w-full grid grid-cols-1 md:grid-cols-3 mt-8 md:gap-x-2'>
                <div className='col-span-1 p-1 md:p-2  flex justify-start items-end'>
                  <label htmlFor="password" className='uppercase text-sm'>Description</label>
                </div>
                <div className='col-span-2  border-b-2 border-slate-500'>
                  <textarea cols='10' rows='6' className='w-full bg-white border-x-2 border-slate-300 py-1 px-2 focus:outline-none text-sm' name='description' value={description} onChange={handleChange} ></textarea>
                </div>
            </div>  
     
            
    
            <div className='w-full p-3 flex flex-col justify-center items-center mt-8'>
                <button type='button' disabled={disabled} className={`w-[70%] py-2 bg-blue-900   uppercase text-sm ${disabled ?'text-blue-500':'text-blue-50'} `} onClick={handleSubmit}>{id ? 'Update Post':'Create Post'}</button>
    
                <button className='w-[70%] py-2 bg-red-600 text-blue-50 mt-4 uppercase text-sm' onClick={clearForm}>Reset</button>
            </div>
          </div>
        </div>
      )
}

export default NewEdit