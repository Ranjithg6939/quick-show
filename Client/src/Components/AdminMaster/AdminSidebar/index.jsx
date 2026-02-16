import React from 'react'
import { assets } from '../../../assets/assets';
import {
  LayoutDashboardIcon,
  PlusSquareIcon,
  ListIcon,
  ListCollapseIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import './index.css'






const AdminSidebar = () => {

  const user = {
    firstName: 'Admin',
    lastName: 'User',
    imageUrl: assets.profile,
  }

  const adminNavlinks = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboardIcon },
    { name: "Add Shows", path: "/admin/add-shows", icon: PlusSquareIcon },
    { name: "List Shows", path: "/admin/list-shows", icon: ListIcon },
    { name: "List Bookings", path: "/admin/list-bookings", icon: ListCollapseIcon },
  ];


  return (
    <div className="admin-sidebar">
      <img src={user.imageUrl} alt="user-image" className="user-image" />
      <p className="user-name">
        {user.firstName} {user.lastName}
      </p>
      <div className="admin-nav-link">
        {adminNavlinks.map((link, index) => (
          <NavLink
            key={index} to={link.path} end
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            {({ isActive }) => (
              <>
                <link.icon className="link-icon" />
                <p className="link-name">{link.name}</p>
                <span className={`nav-indicator${isActive ? " active" : ""}`} />
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default AdminSidebar;
