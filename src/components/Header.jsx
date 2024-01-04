import { useEffect, useState } from 'react';
import useLogout from './hooks/useLogout';
import NavBar from './navbar';
import Sidebar from './admin/sidebar';
function Header() {
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const [role, setRole] = useState('');
  const logout = useLogout();

  useEffect(() => {
    if (!userData) {
      logout();
    } else {
      setRole(userData.role || ''); 
    }
  }, [userData, logout]);

  return (
    <header className='header'>
      {role === 'admin' ? <Sidebar /> : <NavBar />}
    </header>
  );
}

export default Header;
