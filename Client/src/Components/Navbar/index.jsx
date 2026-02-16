import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from "lucide-react";

import "./index.css";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {

  const [isOpen,SetIsOpen] = useState(false)
  const {user} = useUser()
  const {openSignIn} =useClerk()

  const navigate = useNavigate()

  return (
    <div className="navbar-container">
      <Link to="/" className="link-logo">
        <img className="logo-image" src={assets.logo} alt="logo" />
      </Link>

      <div
        onClick={() => SetIsOpen(!isOpen)}
        className={`menu-item ${isOpen ? "open" : "close"}`}
      >
        <XIcon className="x-icon" />

        <Link
          onClick={() => {
            window.scrollTo(0, 0);
            SetIsOpen(false);
          }}
          className="menu-link"
          to="/"
        >
          Home
        </Link>
        <Link
          onClick={() => {
            window.scrollTo(0, 0);
            SetIsOpen(false);
          }}
          className="menu-link"
          to="/movies"
        >
          Movies
        </Link>
        <Link
          onClick={() => {
            window.scrollTo(0, 0);
            SetIsOpen(false);
          }}
          className="menu-link"
          to="/"
        >
          Theatre
        </Link>
        <Link
          onClick={() => {
            window.scrollTo(0, 0);
            SetIsOpen(false);
          }}
          className="menu-link"
          to="/"
        >
          Release
        </Link>
        <Link
          onClick={() => {
            window.scrollTo(0, 0);
            SetIsOpen(false);
          }}
          className="menu-link"
          to="/favorite"
        >
          Favourite
        </Link>
      </div>

      <div className="nav-item">
        <SearchIcon className="search-icon" />
        {!user ? (
          <button onClick={openSignIn} className="login-btn">
            Login
          </button>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<TicketPlus width={15} />}
                onClick={() => navigate("/my-booking")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
      </div>

      <MenuIcon onClick={() => SetIsOpen(!isOpen)} className="menu-icon" />
    </div>
  );
}

export default Navbar
