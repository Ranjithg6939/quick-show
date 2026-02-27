import React, { useEffect, useState } from "react";
import "./index.css";
import Loading from "../../Components/Loading";
import BlurCircle from "../../Components/BlurCircle";
import TimeFormate from "../../Library/TimeFormate";
import { DateFormat } from "../../Library/DateFormate";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const MyBooking = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const { axios, getToken, user, image_base_url } = useAppContext();

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyBookings = async () => {
    try {
      const { data } = await axios.get("/api/user/booking", {
        headers: { Authorization: `Bearer ${await getToken()}` },
        
      });

      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getMyBookings();
    }
  }, [user]);

  return !isLoading ? (
    <div className="mybooking-container">
      <BlurCircle top="100px" left="100px" />
      <div>
        <BlurCircle bottom="0px" left="600px" />
      </div>
      <h1 className="my-booking-text">My Bookings</h1>

      {bookings.map((item, index) => (
        <div key={index} className="booking-container">
          <div className="booking-movie-image">
            <img
              src={image_base_url + item.show.movie.poster_path}
              alt="poster"
              className="booking-image"
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
            <div className="price-tag-header">
              <p className="booking-amount">
                {currency}
                {item.amount}
              </p>
              {!item.isPaid && (
                <Link to={item.paymentLink} className="pay-button">
                  Pay Now
                </Link>
              )}
            </div>
            <div className="total-seat-container">
              <p>
                <span className="seat-counts">Total Tickets:</span>{" "}
                {item.bookedSeats.length}
              </p>
              <p>
                <span className="seat-counts">Seat Number:</span>{" "}
                {item.bookedSeats.join(", ")}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <Loading />
  );
};

export default MyBooking;