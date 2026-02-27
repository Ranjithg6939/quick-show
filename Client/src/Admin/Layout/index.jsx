import React, { useEffect } from 'react'
import AdminNavbar from '../../Components/AdminMaster/AdminNavbar'
import AdminSidebar from '../../Components/AdminMaster/AdminSidebar'
import { Outlet } from "react-router-dom";
import { useAppContext } from '../../context/AppContext';
import "./index.css";
import Loading from '../../Components/Loading';

const Layout = () => {
  const { isAdmin, fetchIsAdmin} = useAppContext()

  useEffect(()=>{
    fetchIsAdmin()
  },[])
  return isAdmin ? (
    <>
    <AdminNavbar />
    <div className='layout-header'>
      <AdminSidebar />
      <div className='outlet-container'>
        <Outlet />
      </div>
    </div>
    </>) :(<Loading />)
}

export default Layout
