import {configureStore} from '@reduxjs/toolkit'
import AuthReducer from '../redux/features/authSlice'
import PostReducer from '../redux/features/postSlice'
const store=configureStore({
    reducer:{
        auth:AuthReducer,
        posts:PostReducer
    }
})

export default store