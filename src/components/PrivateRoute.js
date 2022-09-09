import Redirect from "./Redirect"
import { useSelector } from "react-redux/es/hooks/useSelector"

const PrivateRoute=({children})=>{
  const{user}=useSelector(state=>state.auth)
  return user ? children : <Redirect/>
}

export default PrivateRoute