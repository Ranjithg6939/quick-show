import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../../assets/assets'
import './index.css'

const AdminNavbar = () => {
  return (
    <div>
        <Link to="/">
        <img src={assets.logo} alt='admin-logo'className='admin-logo'/>
        </Link>
      
    </div>
  )
}

export default AdminNavbar
