import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../../assets/assets";
import Loading from "../../Components/Loading";
import Title from "../../Components/AdminMaster/Title";
import { DateFormat } from "../../Library/DateFormate";
import { useAppContext } from "../../context/AppContext";
import "./index.css";

const ListBooking = () => {

  const { axios, getToken, user } = useAppContext();

  const currency = import.meta.env.VITE_CURRENCY;

  const [bookings, setBookings] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getAllbookings = async () => {
    try {
      const { data } = await axios.get("/api/admin/all-bookings", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      setBookings(data.bookings)

    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  };

  useEffect(() => {
    if(user){
      getAllbookings()
    }
  }, [user]);

  return !isLoading ? (
    <>
      <Title text1="List" text2="Booking" />
      <div className="list-booking-container">
        <table className="list-booking-table">
          <thead>
            <tr className="table-row">
              <th className="table-header">User Name</th>
              <th className="table-header">Movie Name</th>
              <th className="table-header">Show Time</th>
              <th className="table-header">Seats</th>
              <th className="table-header">Amount</th>
            </tr>
          </thead>

          <tbody className="table-body">
            {bookings.map((item, index) => (
              <tr key={index} className="body-table-row">
                <td className="table-data">{item.user.name}</td>
                <td className="table-data">{item.show.movie.title}</td>
                <td className="table-data">{DateFormat(item.show.showDateTime)}</td>
                <td className="table-data">{Object.keys(item.bookedSeats).map(seat => item.bookedSeats[seat]).join(',')}</td>
                 <td className="table-data">{currency} {item.amount}</td>
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

export default ListBooking;
