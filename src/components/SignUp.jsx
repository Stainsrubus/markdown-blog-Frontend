import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {toast} from 'react-toastify'
import AxiosService from './utils/ApiService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SignUp() {
  let [firstName,setfirstName] = useState("")
  let [lastName,setlastName] = useState("")
  let [email,setEmail] = useState("")
  let [password,setPassword] = useState("")
  let navigate = useNavigate()
  const pageStyles = {
    background: 'url("https://images.freecreatives.com/wp-content/uploads/2016/03/Galaxy-Nebula-Background.jpg")',
    backgroundSize: 'cover',
  };
  let handleSignup = async()=>{
    if (!email || !password) {
      toast.error('Please fill all the fields');
      return; // Stop further execution if fields are empty
    }
    try {
      let res = await AxiosService.post(`/user/signup`,{
        firstName,
        lastName,
        email,
        password
      })
      if(res.status===201){
        toast.success(res.data.message)
        sessionStorage.setItem('token',res.data.token)
        sessionStorage.setItem('userData',JSON.stringify(res.data.userData))
        navigate('/login')
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  return <>
  <div className='wrapper  container-fluid' >
  <div className='login-container container container-fluid d-flex ' >
    <div>
      <img className='login-brand' src='src/assets/markdown_logo.png' />
    </div>
    <div className='form-container'>
      <div>
      <h1 style={{textAlign:"center"}}>Register Here!</h1>
      </div>

  <Form className='signin-box 'style={pageStyles}>
  <Form.Group className="mb-3">
        <Form.Control  className='input-box' type="text" placeholder="Enter First Name " onChange={(e)=>setfirstName(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control  className='input-box' type="text" placeholder="Enter Last Name" onChange={(e)=>setlastName(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control  className='input-box' type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control  className='input-box' type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      <Button className='btn' variant="primary" onClick={handleSignup}>
        Submit
      </Button>  
      <div className=' signup d-flex mt-4'>
      
      <Link to="/signin"  style={{textDecoration:"none",color:"white",fontWeight:"bolder"}}> ← Back To Login</Link>
      </div>
    </Form>
  </div>
  </div>
  </div>
  </>
}

export default SignUp