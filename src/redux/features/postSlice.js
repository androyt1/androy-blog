import ApiService from "../../services/api";
import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'

export const allPosts=createAsyncThunk('allPosts',async(rejectWithValue)=>{
    try {
        const response=await ApiService.allPosts()
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const createPost=createAsyncThunk('new-post',async({formState,toast,navigate},{rejectWithValue})=>{
   try {
    const response=await ApiService.newPost(formState)
    toast.success('Post Successfully Created')
    navigate('/dashboard')
    return response.data
   } catch (error) {
    return rejectWithValue(error.response.data)
   }
})

export const allUserPosts=createAsyncThunk('users-posts',async(rejectWithValue)=>{
    try {
        const response=await ApiService.userPosts()
        return response.data
    } catch (error) {
        
    }
})

export const editPost=createAsyncThunk('update-post',async({id,formState,navigate,toast},{rejectWithValue})=>{
    try {
        const response=await ApiService.updatePost(id,formState)
        toast.success('Post Successfully Updated')
        navigate('/dashboard')
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
}) 
 
export const deletePost=createAsyncThunk('delete-post',async({id,toast},{rejectWithValue})=>{
   try {
    const response=await ApiService.deletePost(id)
    toast.success('Post Successfully deleted')
    return response.data
   } catch (error) {
        return rejectWithValue(error.response.data)
   }
})

const postSlice=createSlice({
    name:'post',
    initialState:{
        posts:[],
        userPosts:[],
        post:null,
        error:'',
        loading:'',
        count:''
    },
    extraReducers:{
        [allPosts.pending]:(state)=>{
            state.loading=true
        },
        [allPosts.fulfilled]:(state,action)=>{
            state.loading=false 
            state.posts=action.payload.posts
        },
        [allPosts.rejected]:(state,action)=>{
            state.loading=false
            state.error=action.payload.message
        },
        [createPost.pending]:(state)=>{
            state.loading=true
        },
        [createPost.fulfilled]:(state,action)=>{
            state.loading=false 
            state.post=action.payload
        },
        [createPost.rejected]:(state,action)=>{
            state.loading=false
            state.error=action.payload.message
            state.count=state.count + 1
        },
        [allUserPosts.pending]:(state)=>{
            state.loading=true
        },
        [allUserPosts.fulfilled]:(state,action)=>{
            state.loading=false
            state.userPosts=action.payload
        },
        [allUserPosts.rejected]:(state,action)=>{
            state.loading=false 
            state.error=action.payload.message
        },
        [editPost.pending]:(state)=>{
            state.loading=true
        },
        [editPost.fulfilled]:(state,action)=>{
            state.loading=false
            const{arg:{id}}=action.meta
            if(id){
                state.posts=state.posts.map((item)=>item._id===id ? action.payload:item)
                state.userPosts=state.userPosts.map((item)=>item._id===id ? action.payload:item)
            }
        },
        [editPost.rejected]:(state,action)=>{
            state.loading=false
            state.error=action.payload.message
        } ,
        [deletePost.pending]:(state)=>{
            state.loading=true
        },
        [deletePost.fulfilled]:(state,action)=>{ 
            state.loading=false 
            const{arg:{id}}=action.meta
            if(id){
                state.posts=state.posts.filter((item)=>item._id !==id)
                state.userPosts=state.userPosts.filter((item)=>item._id !==id)
            }
        },
        [deletePost.rejected]:(state,action)=>{
            state.loading=false
            state.error=action.payload.message
        }
    }
})

export default postSlice.reducer