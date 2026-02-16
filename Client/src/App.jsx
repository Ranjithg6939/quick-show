import React from "react";
import Navbar from "./Components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
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


const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith("/admin");
  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/movies/:id" element={<MovieDetails />}></Route>
        <Route path="/movies/:id/:date" element={<SeatLayout />}></Route>
        <Route path="/my-booking" element={<MyBooking />}></Route>
        <Route path="/favorite" element={<Favorite />}></Route>
        <Route path="/admin/*" element={<Layout />}>
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
