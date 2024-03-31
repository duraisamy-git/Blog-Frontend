import React, { useState, useContext, useEffect } from 'react';

import { GrView } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./dashboard.css";
import { UserContext } from '../../context/userContext';
import axios from "axios";
import Loader from "../../components/Loader";
import DeletePost from '../DeletePost';




const DashBoard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {id} = useParams();

const {currentUser} = useContext(UserContext);
const token = currentUser?.token;

//redirct to login page for any user who isn't logged in
useEffect(()=>{
  if(!token){
    navigate('/login');
  }
}, []);

useEffect(()=>{
  const fetchPost = async ()=>{
    setIsLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL }/posts/users/${id}`,{
        withCredentials:true, headers: {Authorization: `Bearer ${token}`}});
        setPosts(response.data);
      
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  fetchPost();
}, [id])

  if(isLoading){
    return <Loader />
  }
  
  return (
    <section className="dashborad">
     {
      posts.length ? <div className=" container dashboard__container">
        {
          posts.map(post=>{
            return <article key={post.id} className='dashboard__post'>
              <div className="dashboard__post-info">
                <div className="dashborad__post-thumbnail">
                <img src={`${import.meta.env.VITE_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" />
                </div>
                <h5>{post.title}</h5>
              </div>
              <div className="dashboard__post-actions">
                <Link to={`/posts/${post._id}`} className='btn sm '><GrView/></Link>
                <Link to={`/posts/${post._id}/edit`} className='btn sm primary'><FaEdit /> </Link>
                <DeletePost postID={post._id} />

              </div>
            
            </article>
          })
        }
      </div>: <h2 className='center'>You have no posts yet.</h2>
     }

    </section>
    
  )
}

export default DashBoard;