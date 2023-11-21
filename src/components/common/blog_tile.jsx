import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ReactMarkdown from "react-markdown";

function Blog_tile({blog}) {
  let userData = JSON.parse(sessionStorage.getItem('userData'))
  console.log(userData.firstName,userData.lastName)

  let getUserName= async()=>{
    try{
        let res=await AxiosService.get('/user')
        if(res.status===200)
        {
            setBlogs(res.data.blogs)
        }
    }
    catch(error){
        toast.error(error.response.data.message)
        if(error.response.status===401)
        {
          logout()
        }
    }
}
  return <>
  
    <div className='blog-container'>
    <Card className="text-center card container-fluid">
      <Card.Header> <Card.Title>{blog.title}</Card.Title></Card.Header>
      <Card.Body>
       
        <Card.Text>
          <ReactMarkdown children={blog.description}/>
         
        </Card.Text>
        <Button variant="primary">view more</Button>
      </Card.Body>
      <Card.Footer className="card-footer  text-muted">
       <div ><h6>Created By:{userData.firstName}{userData.lastName}</h6></div>
     <div> <h6>Created At:{blog.createdAt}</h6></div>
     </Card.Footer>
    </Card>
    </div>
  </>

}

export default Blog_tile
