import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AxiosService from '../utils/ApiService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Createuser() {
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCreated, setIsCreated] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !firstName || !lastName) {
      toast.error('Please fill all the fields');
      return;
    }

    try {
      let res = await AxiosService.post(`/user/signup`, {
        firstName,
        lastName,
        email,
        password
      });

      if (res.status === 201) {
        toast.success(res.data.message);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setIsCreated(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create user');
        }
  };
  const pageStyles = {
    background: 'white'
  };

  return (
    <>
      {isCreated ? (
        <Navigate to="/admin_dashboard" replace={true} />
      ) : (
        <div className='wrapper container-fluid' style={pageStyles}>
          <div className='form-container'>
            <div>
              <h1 style={{ textAlign: 'center' }}>Create User!</h1>
            </div>

            <Form className='create-box'>
              <Form.Group className='mb-3'>
                <Form.Control
                  className='create-input-box'
                  type='text'
                  placeholder='Enter First Name '
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
        <Form.Control  className='create-input-box' type="text" placeholder="Enter Last Name" onChange={(e)=>setLastName(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control  className='create-input-box' type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control  className='create-input-box' type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
              <Button className='btn' variant='primary' onClick={handleSignup}>
                Create
              </Button>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}

export default Createuser;
