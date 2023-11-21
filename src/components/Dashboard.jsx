import React from 'react'
import { useEffect,useState } from 'react'
import AxiosService from './utils/ApiService'
import { toast } from 'react-toastify'
import Dashboard_tile from './common/dashboard_tile'
import useLogout from './hooks/useLogout'


function Dashboard() {
    let [blogs,setBlogs] = useState([])
    let logout = useLogout()
   
    let getBlogs = async()=>{
        try{
            let res=await AxiosService.get('/blogs/user')
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
    useEffect(()=>{
        getBlogs()
      },[])
      return <div className='container-fluid'>
        <div className='blogs-wrapper'>
          {
            blogs.map((e)=>{
              return <Dashboard_tile blog={e} key={e._id}/>
            })
          }
        </div>
      </div>
    }

export default Dashboard
