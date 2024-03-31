import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import Register from './Pages/Register/Register.jsx';
import Login from './Pages/Login/Login.jsx'
import PostDetail from './Pages/PostDetail.jsx';
import Logout from './Pages/Logout.jsx'
import EditPost from './Pages/EditPost.jsx'
import DeletePost from './Pages/DeletePost.jsx'
import DashBoard from './Pages/DashBoard/DashBoard.jsx'
import CategoryPosts from './Pages/CategoryPosts.jsx'
import CreatePost from './Pages/CreatePost/CreatePost.jsx'
import Authors from './Pages/Author/Authors.jsx';
import Home from './Pages/Home/Home.jsx'
import UserProfile from './Pages/UserProfile/UserProfile.jsx'
import AuthorPost from './Pages/AuthorPosts.jsx'
import UserProvider from './context/userContext.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserProvider> <Layout/></UserProvider>,
    errorElement: <ErrorPage />,
    children : [
      {index: true, element: <Home />},
      {path: "posts/:id", element: <PostDetail />},
      {path: "register", element: <Register />},
      {path: "login", element: <Login />},
      {path: "profile/:id", element: <UserProfile />},
      {path: "posts/:id", element: <PostDetail />},
      {path: "authors", element: <Authors/>},
      {path: "create", element: <CreatePost/>},
      {path: "posts/categories/:category", element: <CategoryPosts />},
      {path: "myposts/:id", element: <DashBoard />},
      {path: "posts/users/:id", element: <AuthorPost />},
      {path: "posts/:id/edit", element: <EditPost />},
      {path: "posts/:id/delete", element: <DeletePost />},
      {path: "logout", element: <Logout />},


      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
