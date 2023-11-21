import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ReactMarkdown from "react-markdown";
import AxiosService from '../utils/ApiService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';


function dashboard_tile({blog}) {
  let userData = JSON.parse(sessionStorage.getItem('userData'))
  console.log(userData.firstName,userData.lastName)
  let navigate = useNavigate()

  let deleteBlog = async()=>{
    console.log("error")
     try { 
       let res = await AxiosService.delete(`/blogs/${blog._id}` )
       if(res.status===201)
       {
         toast.success(res.data.message)
       }
     } catch (error) {
       toast.error(error.response.data.message)
       if( error.response.status===401)
       {
      logout()
        }
    }}
// let deleteBlog = async () => {
//     try {
//       let res = await AxiosService.delete(`/blogs/:${params.id}`);
//       if (res?.data?.message) {
//         toast.success(res.data.message);
//         // Perform any other necessary actions upon successful deletion
//       } else {
//         toast.error('Failed to delete the blog post');
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'An error occurred while deleting the blog post');
//       if (error.response?.status === 401) {
//         logout();
//       }
//     }
//   };
  return <>
  
    <div className='blog-container'>
   
    <Card className="text-center card container-fluid">
      <Card.Header> <Card.Title>{blog.title}</Card.Title></Card.Header>
      <Card.Body>
       
        <Card.Text>
          <ReactMarkdown children={blog.description}/>
         
        </Card.Text>
        <Button variant="primary" key={blog._id} onClick={()=>navigate(`/blog/:${blog.id}`)}>view more</Button>
      </Card.Body>
      <Card.Footer className="card-footer  text-muted">
     <Button key={blog._id} onClick={()=>navigate(`/blog/${blog._id}`)} >Edit</Button>
     <Button key={blog._id}  onClick={deleteBlog} >Delete</Button>
     </Card.Footer>
    </Card>

    </div>
  </>

}

export default dashboard_tile
