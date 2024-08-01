import React from 'react'
import './notfound.css'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className="notfound">
        <div className="notfoundcontainer">
            <h2>Page Not Found</h2>
            <button onClick={()=>navigate(`/`)}>Go To Home</button>
        </div>
    </div>
  )
}

export default NotFound