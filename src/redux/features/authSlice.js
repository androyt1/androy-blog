import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import ApiService from '../../services/api'


export const login=createAsyncThunk('login',async({formState,navigate,toast},{rejectWithValue})=>{
    try {
        const response=await ApiService.login(formState)
        toast.success('User logged in Successfully')
        navigate('/dashboard')
        return response.data
    } catch (error) {       
        return rejectWithValue(error.response.data)    
    }
})

export const register=createAsyncThunk('register',async({formState,navigate,toast},{rejectWithValue})=>{
    try {
        const response=await ApiService.register(formState)
        toast.success('User Successfully Created')
        navigate('/dashboard')
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const initialState={
    user:null,
    loading:false,
    error:'',
    isSuccess:false,
    count:0
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload 
        },
        logout:(state,action)=>{
            state.user=null
            localStorage.clear()
        }
    },
    extraReducers:{
        [login.pending]:(state)=>{
            state.loading=true
        },
        [login.fulfilled]:(state,action)=>{
            state.loading=false
            state.user=action.payload
            state.user && localStorage.setItem('profile',JSON.stringify(action.payload))
            state.isSuccess=true
        },
        [login.rejected]:(state,action)=>{              
            state.loading=false
            state.error=action.payload.message      
            state.isSuccess=false 
            state.count=++state.count        
        }, [login.pending]:(state)=>{
            state.loading=true
        },
        [register.pending]:(state)=>{
            state.loading=true
        },
        [register.fulfilled]:(state,action)=>{
            state.loading=false
            state.user=action.payload
            state.user && localStorage.setItem('profile',JSON.stringify(action.payload))
            state.isSuccess=true
        },
        [register.rejected]:(state,action)=>{              
            state.loading=false
            state.error=action.payload.message      
            state.isSuccess=false 
            state.count=++state.count        
        }
    }
})

export const{setUser,logout}=authSlice.actions
export default authSlice.reducer