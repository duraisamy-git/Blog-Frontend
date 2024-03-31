import React, { useState, useContext, useEffect} from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from "axios";


const EditPost = () => {
const [title, setTitle] = useState('');
const [category, setCategory] = useState('Uncategorized');
const [description, setDescription] = useState('');
const [thumbnail, setThumbnail] = useState('');
const [error, setError] = useState('');

const navigate = useNavigate();
const {id} = useParams();
const {currentUser} = useContext(UserContext);
const token = currentUser?.token;

//redirct to login page for any user who isn't logged in
useEffect(()=>{
  if(!token){
    navigate('/login');
  }
}, []);



const POST_CATEGORIES = ["Agriculture", "Business", "Education", "Entertainment", "Art", "Investment",
"Uncategorized", "Weather"]

useEffect(()=>{
  const getPost = async ()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL }/posts/${id}`);
      setTitle(response.data.title);
      setDescription(response.data.description);
    } catch (error) {
      console.log(error);
    }
  }
  getPost();
}, []);

const editPost = async (e) =>{
  e.preventDefault();

  const postData = new FormData();
  postData.set('title', title);
  postData.set('category', category);
  postData.set('description', description);
  postData.set('thumbnail', thumbnail);
  
  try {
    const response = await axios.patch(`${import.meta.env.VITE_APP_BASE_URL }/posts/${id}`, postData,{
      withCredentials:true, headers: {Authorization: `Bearer ${token}`}});
    
    if(response.status == 200){
      return navigate('/');
    }
  } catch (err) {
    setError(err.response.data.message);
  }
}

  return (
   <section className="create-post">
       <div className="container">
        <h2>Create Post</h2>
        {error && <p className='form__error-message'>{error}</p>}
        <form className=" form create__post_form">
          <input type="text" placeholder='Title' value={title} onChange={e=> setTitle(e.target.value)} autoFocus />
          <select name="category" value={category} onChange={e=> setCategory(e.target.value)} >
            {
              POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
            }
            </select>
            <textarea name="" placeholder='Write Something...' id="" cols="30" rows="10" value={description} onChange={e=>setDescription(e.target.value)}></textarea>
            <input type="file" onChange={e=>setThumbnail(e.target.files[0])}  accept='png. jpg, jpeg'/>
            <button type='submit' onClick={editPost} className='btn primary'>Update</button>
        </form>
       </div>
   </section>
  )
}

export default EditPost;