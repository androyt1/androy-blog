import axios from 'axios'

const Api=axios.create({
    baseURL:'https://androy-blog.herokuapp.com/api/v1'
})

Api.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).accessToken}`
    }
    return req
})

const login=formState=>Api.post('/auth/signin',formState)
const register=formState=>Api.post('/auth/signup',formState)
const newPost=formState=>Api.post('/post',formState)
const allPosts=()=>Api.get('/post')
export const getPostById=id=>Api.get(`/get-post/${id}`)
const userPosts=()=>Api.get('/user-posts')
const updatePost=(id,formState)=>Api.put(`/post/${id}`,formState)
const deletePost=id=>Api.delete(`/delete-post/${id}`)

const ApiService={ 
    login,register,allPosts,newPost,userPosts,updatePost,deletePost
}

export default ApiService