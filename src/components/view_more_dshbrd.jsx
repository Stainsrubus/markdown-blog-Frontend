import AxiosService from './utils/ApiService'
import { toast } from 'react-toastify'
import useLogout from './hooks/useLogout'
import { useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from "react-markdown";
import { useParams } from 'react-router-dom'

function viewmore() {
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
      return <main>  
      <section className="markdown">
      <Form>      
          <article className="result">
          <h5># Markdown Preview</h5>
          <ReactMarkdown>{description}</ReactMarkdown>
        </article>
        &nbsp;
        <Button  className=' m-2 '   onClick={()=>navigate('/dashboard')}>Go Back!</Button>
    
      </Form>
        
    </section>
    </main>
    }

export default viewmore