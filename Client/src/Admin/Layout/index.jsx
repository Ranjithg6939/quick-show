import React from 'react'
import AdminNavbar from '../../Components/AdminMaster/AdminNavbar'
import AdminSidebar from '../../Components/AdminMaster/AdminSidebar'
import { Outlet } from "react-router-dom";

import './index.css'

const Layout = () => {
  return (
    <>
    <AdminNavbar />
    <div className='layout-header'>
      <AdminSidebar />
      <div className='outlet-container'>
        <Outlet />
      </div>
    </div>
    </>
  )
}

export default Layout
