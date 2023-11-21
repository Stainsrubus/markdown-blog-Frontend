import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import useLogout from './hooks/useLogout'
import { useEffect,useState } from 'react';
import { Button } from 'react-bootstrap';
import { Logouticon } from '../assets/icons';

function Header() {
    let userData = JSON.parse(sessionStorage.getItem('userData'))
    let [role,setRole] = useState("")
    let logout = useLogout()

    useEffect(()=>{
        if(!userData)
        {
            logout()
        }
        else
        {
            setRole(userData.role)
        }
    },[])
  return (
  <header>
    <Navbar expand="lg" className="navbar-dark bg-dark ">
      <Container>
        <Navbar.Brand className='brand-name'> <img src='src/assets/markdown_logo.png' className='brand-icon'/>Markdown Viewer</Navbar.Brand>
        <Nav>
        <Nav.Item className="d-flex flex-row align-items-center"><h4>{`Hi!  ${userData.firstName} ${userData.lastName} `}</h4><h6>{role==="admin"?`(${userData.role})`:null}</h6></Nav.Item>
        </Nav>
        <div className='d-flex  gap-4 nav-items'>
          <Nav className="me-auto header-nav-items d-flex flex-row gap-4">
            {
                role==="admin"?<AdminNavLinks/>:<UserNavLinks/>
            }
          </Nav>
          <Nav>
            
            <Nav.Item onClick={logout} ><Button> <Logouticon />Logout</Button></Nav.Item>
          </Nav>
          </div>
      </Container>
    </Navbar>
    </header>
  );
}

function AdminNavLinks(){
    let navigate = useNavigate()
    let logout = useLogout()
    return <>
            <Nav.Item onClick={()=>navigate('/dashboard')}>Dashboard</Nav.Item>
    </>
}

function UserNavLinks(){
    let navigate = useNavigate()
    let logout = useLogout()
    return <>
            <Nav.Item className='nav-links' onClick={()=>navigate('/home')}>Home</Nav.Item>
            <Nav.Item className='nav-links' onClick={()=>navigate('/dashboard')}>Dashboard</Nav.Item>
            <Nav.Item className='nav-links' onClick={()=>navigate('/create')}>Create</Nav.Item>
    </>
}

export default Header;