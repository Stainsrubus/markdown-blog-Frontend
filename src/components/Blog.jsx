import React, { useEffect, useState } from 'react'
import BlogTile from '../components/common/blog_tile'
import { useParams } from 'react-router-dom'
import useLogout from './hooks/useLogout'
import {toast} from 'react-toastify'
import AxiosService from './utils/ApiService'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from "react-markdown";

function Blog() {  let userData = JSON.parse(sessionStorage.getItem('userData'))
  return <>
    <div>
      {
        userData.role==='admin'?<AdminBlog/>:<EditBlog/>
      }
      
    </div>
  </>
}
function EditBlog(){
  let params = useParams()
  let [title,setTitle] = useState("")
  let [description,setDescription] = useState("")
  let [blog,setBlog] = useState({})
  let navigate = useNavigate()
  let logout = useLogout()

  let getBlog = async()=>{
    try {
      let res = await AxiosService.get(`/blogs/${params.id}`)
      if(res.status===200)
      {
          setTitle(res.data.blog.title)
          setDescription(res.data.blog.description)
          setBlog(res.data.blog)
      }
    } catch (error) {
      toast.error(error.response.data.message)
      if(error.response.status===401)
      {
        logout()
      }
    }
  }

  useEffect(()=>{
    if(params.id)
    {
      getBlog()
    }
    else
    {
      logout()
    }
  },[])
  let editblog = async()=>{
    try {
      let res = await AxiosService.put(`/blogs/edit/${blog._id}`,{
        title,description
      })
      if(res.status===200)
      {
        toast.success(res.data.message)
        navigate('/dashboard')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      if(error.response.status===401)
      {
        logout()
      }
    }
  }
  return (
      
    <main>  
      <section className="markdown">
      <Form>
          <Form.Group className="mb-3 ">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={title} placeholder="Enter Title"  onChange={(e)=>setTitle(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control value={description} as="textarea" placeholder="Description" onChange={(e) => setDescription(e.target.value)}/>
          </Form.Group>
          <article className="result">
          <h5># Markdown Preview</h5>
          <ReactMarkdown>{description}</ReactMarkdown>
        </article>
        <Button variant="primary" className='m-4' onClick={()=>editblog()}>
          Submit
        </Button>
        &nbsp;
        <Button variant="primary" className=' m-2 '   onClick={()=>navigate('/dashboard')}>Cancel</Button>
    
      </Form>
        
    </section>
    </main>
    
  );
}

function AdminBlog(){
  let params = useParams()
  let [blog,setBlog] = useState({})
  let getBlog = async()=>{
    try {
      let res = await AxiosService.get(`/blogs/${params.id}`)
      if(res.status===200)
      {
          setBlog(res.data.blog)
      }
    } catch (error) {
      toast.error(error.response.data.message)
      if(error.response.status===401)
      {
        logout()
      }
    }
  }

  useEffect(()=>{
    if(params.id)
    {
      getBlog()
    }
    else
    {
      logout()
    }
  },[])

 
  return <div>
    <div className='blogs-wrapper'><BlogTile blog={blog}/></div>
    <div style={{textAlign:"center"}}>
     {
       blog.status!=='pending'?<Button variant='warning' onClick={()=>changeStatus("pending")}>Pending</Button>:<></>
     }
     &nbsp;
     {
      blog.status!=='approved'?<Button variant='success' onClick={()=>changeStatus("approved")}>Approve</Button>:<></>
     }
     &nbsp;
     {
      blog.status!=='rejected'?<Button variant='danger' onClick={()=>changeStatus("rejected")}>Reject</Button>:<></>
     }
    </div>
  </div>
}
export default Blog