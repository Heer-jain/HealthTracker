import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const RefreshHandler = ({setIsAuthentcated}) => {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('token')){
            setIsAuthentcated(true)
            if(location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/home'){
                navigate('/home', {replace: false})
            }
        }
    },[location, navigate, setIsAuthentcated])

  return (
    <div></div>
  )
  
}

export default RefreshHandler
