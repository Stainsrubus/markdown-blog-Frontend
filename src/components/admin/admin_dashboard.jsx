import { useState, useEffect } from 'react';
import AxiosService from '../utils/ApiService'; 
import { toast } from 'react-toastify';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const [adminUsers, setAdminUsers] = useState([]);
    const [regularUsers, setRegularUsers] = useState([]);
    const navigate = useNavigate();
    const getUsers = async () => {
        try {
            let res = await AxiosService.get('/user/getusers'); 
            if (res.status === 200) {
                const usersData = res.data.users || []; 
                const admin = res.data.users.filter(user => user.role === 'admin');
                const regular = res.data.users.filter(user => user.role === 'user');
                
                setAdminUsers(admin); 
                setRegularUsers(regular); 
            }
        } catch (error) {
            toast.error('Failed to fetch users');
        }
    };
    const handleDeleteUser = async (userId) => {
        try {
            let res = await AxiosService.delete(`/user/deleteuser/${userId}`);
            if (res.status === 200) {
                toast.success('User deleted successfully');
                getUsers();
            }
        } catch (error) {
            toast.error('Failed to delete user');
        }
    };
    useEffect(() => {
        getUsers(); 
    }, []);

    const renderUserTable = (users) => (
    <div className='container'>
        <Table striped bordered hover className='text-center dashboard-table '> 
            <thead>
                <tr>
                    <th className='sno'>S No</th>
                    <th className='id'>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Edit</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={user._id}>
                        <td className='sno'>{index + 1}</td>
                        <td className='id'>{user._id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td><button  onClick={()=>navigate(`/edituser/${user._id}`)}><i className="fa-solid fa-user-pen" ></i></button></td>
                        <td><button  onClick={() => handleDeleteUser(user._id)}><i className="fa-solid fa-trash-can"></i></button></td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </div>
    );

    return (
        <div className='admin-dashboard container-fluid'>
            <div className='container'>
                <h1>Admin List</h1>
                {renderUserTable(adminUsers)}
            </div>
            <div className='container'>
                <h1>User List</h1>
                {renderUserTable(regularUsers)}
            </div>
        </div>
    );
}

export default AdminDashboard;
