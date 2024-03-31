import React, { useState, useContext, useEffect} from 'react';
import "./createpost.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import axios from "axios";


const CreatePost = () => {
  
const [title, setTitle] = useState('');
const [category, setCategory] = useState('Uncategorized');
const [description, setDescription] = useState('');
const [thumbnail, setThumbnail] = useState('');
const [error, setError] = useState('');

const navigate = useNavigate();

const {currentUser} = useContext(UserContext);
const token = currentUser?.token;

//redirct to login page for any user who isn't logged in
useEffect(()=>{
  if(!token){
    navigate('/login');
  }
}, []);


const modules = {
  toolbar:[
    [{'header':[1,2,3,4,5,6,false]}],
    ['bold','italic', 'underline','strike','blockquote'],
    [{'list':'ordered'},{'list':'bullet'},{'indent':'-1'},{'indent':'+1'}],
    ['link','image'],
    ['clean']
  ],
}

const formats = [
  'header',
  'bold', 'italic', 'undeline', 'strike', 'blockquote','list','bullet', 'indent',
  'link', 'image'
]

const POST_CATEGORIES = ["Agriculture", "Business", "Education", "Entertainment", "Art", "Investment",
"Uncategorized", "Weather"]


const createPost = async (e)=>{
  e.preventDefault();
  
  const postData = new FormData();
  postData.set('title', title);
  postData.set('category', category);
  postData.set('description', description);
  postData.set('thumbnail', thumbnail);
  
  try {
    const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL }/posts`, postData,{
      withCredentials:true, headers: {Authorization: `Bearer ${token}`}});
    
    if(response.status == 201){
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
       {error &&  <p className='form__error-message'>{error}</p>}
        <form className=" form create__post_form" >
          <input type="text" placeholder='Title' value={title} onChange={e=> setTitle(e.target.value)} autoFocus />
          <select name="category" value={category} onChange={e=> setCategory(e.target.value)} >
            {
              POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
            }
            </select>
           <textarea name="" placeholder='Write Something...' id="" cols="30" rows="10" value={description} onChange={e=>setDescription(e.target.value)}></textarea>
            <input type="file" onChange={e=>setThumbnail(e.target.files[0])}  accept='png, jpg, jpeg'/>
            <button type='submit' className='btn primary' onClick={createPost} >Create</button>
        </form>
       </div>
   </section>
  )
}

export default CreatePost;