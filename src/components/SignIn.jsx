import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {toast} from 'react-toastify'
import AxiosService from './utils/ApiService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SignIn() {
  let [email,setEmail] = useState("")
  let [password,setPassword] = useState("")
  let navigate = useNavigate()
  let handleLogin = async()=>{
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
            navigate('/dashboard')
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
  <div className='login-container d-flex ' >
    <div>
      <img className='login-brand' src='src/assets/markdown_logo.png' />
    </div>
    <div>
    <h1 style={{textAlign:"center"}}>Login Here!</h1>
  <Form className='login-box'>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" onClick={handleLogin}>
        Submit
      </Button>
      <div className=' signup d-flex mt-4'>
      <p className='text-center'>Dont have an account? </p> 
      <Link to="/signup">SignUp</Link>
      </div>
      
    </Form>
  </div>
  </div>
  </>
}

export default SignIn