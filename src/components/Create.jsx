import React from 'react'
import ReactMarkdown from "react-markdown";
import { useState } from 'react';
import '../index.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AxiosService from './utils/ApiService';
import { useNavigate } from 'react-router-dom';
import useLogout from './hooks/useLogout';
import { toast } from 'react-toastify';

function Create() {
  const [description, setDescription] = useState("");
  let [title,setTitle] = useState("")
  let navigate = useNavigate()
  let logout = useLogout()
  

  let createBlog = async()=>{
    try {
      let res = await AxiosService.post('/blogs/create',{title,description})
      if(res.status===201)
      {
        toast.success(res.data.message)
        navigate('/dashboard')
      }
    } catch (error) {
      toast.error(error.response.data.message)
      if( error.response.status===401)
      {
        logout()
      }
    }}
    return (
      
      <main>  
        <section className="markdown ">
        <Form>
            <Form.Group className="mb-3 ">
              <Form.Label>Title</Form.Label>
              <Form.Control  className='input' type="text" placeholder="Enter Title"  onChange={(e)=>setTitle(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control className='input'  as="textarea" placeholder="Description" onChange={(e) => setDescription(e.target.value)}/>
            </Form.Group>
            <article className="result">
            <h5># Markdown Preview</h5>
            <ReactMarkdown>{description}</ReactMarkdown>
          </article>
            <Button variant="primary" onClick={()=>createBlog()}>
            Submit
            </Button>
      
        </Form>
        </section>
       
      </main>
      
    );
}

export default Create
