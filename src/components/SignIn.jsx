import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {toast} from 'react-toastify'
import AxiosService from './utils/ApiService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logoImage from "src/assets/markdown_logo.png"

function SignIn() {
  let [email,setEmail] = useState("")
  let [password,setPassword] = useState("")
  let navigate = useNavigate()
  const pageStyles = {
    background: 'url("https://images.freecreatives.com/wp-content/uploads/2016/03/Galaxy-Nebula-Background.jpg")',
    backgroundSize: 'cover',
  };
  const handleLogin = async(event)=>{
    event.preventDefault(); 
    if (!email || !password) {
      toast.error('Please fill all the fields');
      return; // Stop further execution if fields are empty
    }
    try {
      let res = await AxiosService.post(`/user/login`,{
        email,
        password
      })
  
      if(res.status===200)
      {
        toast.success(res.data.message)
        sessionStorage.setItem('token',res.data.token)
        sessionStorage.setItem('userData',JSON.stringify(res.data.userData))
        
        if(res.data.userData.role === 'admin')
        {
            navigate('/admin_dashboard')
        }
        else
        {
            navigate('/home')
        }
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  return <>
  <div className='wrapper  container-fluid' >
  <div className='login-container container container-fluid d-flex ' >
    <div>
      <img className='login-brand' src={logoImage} alt='Markdown Logo' />
    </div>
    <div className='form-container' >
    <h1 style={{textAlign:"center"}}>Login Here!</h1>
  <Form className='login-box'style={pageStyles} onSubmit={handleLogin}>
      <Form.Group className=" mb-3">
        <Form.Control className='input-box' type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control  className='input-box'type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      <Button variant='primary' className='btn' type='submit'>
  Submit
</Button>
      <div className=' signup d-flex mt-4'>
      <p className='text-center'>Dont have an account? </p> 
      <Link to="/signup" style={{textDecoration:"none",color:"white",fontWeight:"bolder"}}> ꧁ SignUp ꧂ </Link>
      </div>
      
    </Form>
  </div>
  </div>
  </div>
  </>
}

export default SignIn