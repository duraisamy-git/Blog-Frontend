import React, {useContext, useEffect, useState} from 'react'
import { Link, useNavigate, useLocation} from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { MdDelete } from 'react-icons/md';
import axios from "axios";
import Loader from '../components/Loader';


const DeletePost = ({postID : id}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] =useState(false);

const {currentUser} = useContext(UserContext);
const token = currentUser?.token;

//redirct to login page for any user who isn't logged in
useEffect(()=>{
  if(!token){
    navigate('/login');
  }
}, []);

const removePost = async ()=>{
  setIsLoading(true);
  try {
    const response = await axios.delete(`${import.meta.env.VITE_APP_BASE_URL }/posts/${id}`,{
      withCredentials:true, headers: {Authorization: `Bearer ${token}`}});
      if(response.status == 200){
        if(location.pathname == `/myposts/${currentUser.id}`){
          navigate(0);
        }else{
          navigate('/');
        }
      }
      setIsLoading(false);
  } catch (error) {
    console.log("Couldn't delete post.");
  }
}
if(isLoading){
  return <Loader />
}

  return (
    <Link className='btn sm danger' onClick={()=>removePost()}><MdDelete/></Link>
  )
}

export default DeletePost