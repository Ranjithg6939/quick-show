import React, { useState, useEffect } from "react";
import "./index.css";
import { dummyBookingData } from "../../assets/assets";
import Loading from "../../Components/Loading";
import Title from "../../Components/AdminMaster/Title";
import { DateFormat } from "../../Library/DateFormate";
import { useAppContext } from "../../context/AppContext";

const ListShows = () => {

  const { axios, getToken, user } = useAppContext();

  const currency = import.meta.env.VITE_CURRENCY

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      const { data } = await axios.get("/api/admin/all-shows", {
        headers: { Authorization: `Bearer ${await getToken()}` }})
        setShows(data.shows)
        setLoading(false)  
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if(user){
      getAllShows();
    }
    
  }, [user]);

  return !loading ? (
    <>
      <Title text1="List" text2="Shows" />
      <div className="list-show-container">
        <table className="show-table">
          <thead>
            <tr className="table-row">
              <th className="table-header">Movie Name</th>
              <th className="table-header">Show Time</th>
              <th className="table-header">Total Bookings</th>
              <th className="table-header">Earning</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {shows.map((show, index) => (
              <tr key={index} className="body-table-row">
                <td className="table-data">{show.movie.title}</td>
                <td className="table-data">{DateFormat(show.showDateTime)}</td>
                <td className="table-data">{Object.keys(show.occupiedSeats).length}</td>
                <td className="table-data">{currency} {Object.keys(show.occupiedSeats).length * show.showPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ListShows;
