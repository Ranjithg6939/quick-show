import React from "react";
import Navbar from "./Components/Navbar";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Movies from "./Pages/Movies";
import MovieDetails from "./Pages/MovieDetails";
import SeatLayout from "./Pages/SeatLayout";
import MyBooking from "./Pages/MyBooking";
import Favorite from "./Pages/Favorite";
import { Toaster } from "react-hot-toast";
import Footer from "./Components/Footer";
import Layout from "./Admin/Layout";
import Dashboard from "./Admin/Dashboard";
import AddShow from "./Admin/Addshow";
import ListShows from "./Admin/ListShows";
import ListBooking from "./Admin/ListBooking";
import { useAppContext } from "./context/AppContext";
import { SignIn } from "@clerk/clerk-react";
import "./index.css";
import Loading from "./Components/Loading";

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const { user, isAdmin } = useAppContext();

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: {
            background: "rgba(17, 24, 39, 0.9)",
            color: "#fff",
            padding: "14px 18px",
            borderRadius: "12px",
            backdropFilter: "blur(8px)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            fontWeight: "500",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
        <Route path="/my-booking" element={<MyBooking />} />
        <Route path="/loading/:nextUrl" element={<Loading />} />

        <Route path="/favorite" element={<Favorite />} />
        <Route
          path="/admin/*"
          element={
            user ? (
              <Layout />
            ) : (
              <div className="signin-container">
                <SignIn fallbackRedirectUrl="/admin" />
              </div>
            )
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="add-shows" element={<AddShow />} />
          <Route path="list-shows" element={<ListShows />} />
          <Route path="list-bookings" element={<ListBooking />} />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
