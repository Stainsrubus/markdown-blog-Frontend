import React from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import SignUp from '../components/SignUp'
import SignIn from '../components/Signin'
import Create from '../components/Create'
import Dashboard from '../components/Dashboard'
import Blog from '../components/Blog'
import Home from '../components/Home'
import Header from '../components/Header'
import View_more from '../components/view_more_dshbrd'
import Viewmorehm from '../components/view_more_home'
import Admin_Dashboard from '../components/admin/admin_dashboard'
import Createuser from '../components/admin/create_user'
import EditUser from '../components/admin/edit_user'
function AppRoutes() {
  return <Routes>
    <Route path='/create' element={<><Header/><Create/></>}/>
    <Route path='/dashboard' element={<><Header /><Dashboard/></>}/>
    <Route path='/admin_dashboard' element={<><Header /><Admin_Dashboard/></>}/>
    <Route path='/createuser' element={<><Header />< Createuser/></>}/>
    <Route path='/edituser/:userId' element={<><Header />< EditUser/></>}/>

    <Route path='/viewmore/:id' element={<><Header/><View_more/></>}/>
    <Route path='/viewmorehome/:id' element={<><Header/><Viewmorehm/></>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/home' element={<><Header/><Home/></>}/>
    <Route path='/blog/:id' element={<><Header/><Blog/></>}/>
    <Route path='/' element={<SignIn/>}/>
    <Route path='/*' element={<Navigate to = '/'/>}/>
    </Routes>
}

export default AppRoutes