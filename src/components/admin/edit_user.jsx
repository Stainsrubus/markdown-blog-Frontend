import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AxiosService from '../utils/ApiService';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FormLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function EditUser() {
    const { userId } = useParams();
    let navigate = useNavigate()
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const pageStyles = {
      background: 'white'
    };
    useEffect(() => {
      const fetchUserById = async () => {
          try {
              const res = await AxiosService.get(`/user/getuser/${userId}`);
              if (res.status === 200) {
                const userData = res.data.user;
                  setUser(userData);
              }
          } catch (error) {
              console.error(error);
              toast.error('Failed to fetch user');
          }
      };

      if (userId) {
          fetchUserById();
      }
  }, [userId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
        await AxiosService.put(`/user/edituser/${userId}`, user);
        toast.success('User updated successfully');
        navigate('/admin_dashboard')
    } catch (error) {
        toast.error('Failed to update user');
        console.error(error);
    }
};


const handleInputChange = (e) => {
  const { name, value } = e.target;
  setUser(prevUser => ({
      ...prevUser,
      [name]: value
  }));
};

    return (
        <div className='wrapper  container-fluid' style={pageStyles}>
    <div className='form-container'>
      <div>
      <h1 style={{textAlign:"center"}}>Edit User!</h1>
      </div>

  <Form className='create-box 'onSubmit={handleFormSubmit}>
  <Form.Group className="mb-3">
  <FormLabel>First Name</FormLabel>
        <Form.Control  className='create-input-box' type="text" placeholder="Enter First Name " value={user.firstName} name="firstName" onChange={handleInputChange}/>
      </Form.Group>
      <Form.Group className="mb-3">
      <FormLabel>Last Name</FormLabel>
        <Form.Control  className='create-input-box' type="text" placeholder="Enter Last Name" value={user.lastName} name="lastName" onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="mb-3">
      <FormLabel>Email</FormLabel>
        <Form.Control  className='create-input-box' type="email" placeholder="Enter email" value={user.email} name="email" onChange={handleInputChange} />
      </Form.Group>

     
      <Button className='btn' variant="primary" type="submit">
        Update
      </Button>  
    </Form>
  </div>
  </div>
 
    );
}

export default EditUser;
