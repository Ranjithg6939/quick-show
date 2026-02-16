import React, { useEffect, useState } from "react";
import "./index.css";
import { dummyBookingData } from "../../assets/assets";
import Loading from "../../Components/Loading";
import BlurCircle from "../../Components/BlurCircle";
import TimeFormate from "../../Library/TimeFormate";
import { DateFormat } from "../../Library/DateFormate";

const MyBooking = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyBookings = async () => {
    setBookings(dummyBookingData);
    setIsLoading(false);
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mybooking-container">
      <BlurCircle top="100px" left="100px" />
      <BlurCircle bottom="0px" left="600px" />
      <div></div>

      <h1 className="my-booking-text">My Bookings</h1>
      {bookings.map((item, index) => (
        <div key={index} className="booking-container">
          <div className="booking-movie-image">
            <img
              className="booking-image"
              src={item.show.movie.poster_path}
              alt="movie-poster"
            />
            <div className="booking-title-container">
              <p className="booking-title">{item.show.movie.title}</p>
              <p className="movie-total-time">
                {TimeFormate(item.show.movie.runtime)}
              </p>
              <p className="movie-total-time">
                {DateFormat(item.show.showDateTime)}
              </p>
            </div>
          </div>
          <div className="booking-amount-container">
            <div className="price-header">
              <p className="booking-amount">
                {currency}
                {item.amount}
              </p>
              {!item.isPaid && <button className="pay-button">Pay Now</button>}
            </div>
            <div className="total-seat-container">
              <p>
                <span className="seat-count">Total Tickets : </span>{" "}
                {item.bookedSeats.length}
              </p>

              <p>
                <span className="seat-count">Seat Number :</span>{" "}
                {item.bookedSeats.join(", ")}
              </p>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBooking;
