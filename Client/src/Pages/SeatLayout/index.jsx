import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyDateTimeData, dummyShowsData } from "../../assets/assets";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import toast from "react-hot-toast";

import Loading from "../../Components/Loading";
import isoTimeFormat from "../../Library/isoTimeFormate";
import BlurCircle from "../../Components/BlurCircle";

import "./index.css";

const SeatLayout = () => {
  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];

  const { id, date } = useParams();
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);

 
  useEffect(() => {
    if (!id) return;

    const foundShow = dummyShowsData.find((show) => show._id === id);

    if (foundShow) {
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData,
      });
    }
  }, [id]);

  /* ✅ Seat click handler */
  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast("Please select time first ⏰");
    }

    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return toast("You can only select 5 seats 🎟️");
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId],
    );
  };


  const renderSeats = (row, count = 9) => (
    <div key={row} className="seats-container">
      <div className="seats-header">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row} ${i + 1}`;
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              className={`seat ${
                selectedSeats.includes(seatId) ? "selected" : ""
              }`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  if (!show) return <Loading />;

  return (
    <div className="seat-layout-container">
      <div className="timer-container">
        <p className="timer-text">Available Timings</p>
        <div className="timer-header">
          {show.dateTime[date]?.map((item) => (
            <div
              key={item.time}
              onClick={() => setSelectedTime(item)}
              className={`timer-item-container ${
                selectedTime?.time === item.time
                  ? "selected-time"
                  : "timer-hover"
              }`}
            >
              <ClockIcon className="clock-timer-icon" />
              <p className="timer-item">{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>


      <div className="seat-layout">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0px" right="0px" />

        <h1 className="select-your-seat">Select Your Seat</h1>

        <img className="screen-image" src={assets.screenImage} alt="screen" />
        <p className="screen-side">SCREEN SIDE</p>

        <div className="select-seats-layout">
          <div className="seats-row-top">
            {groupRows[0].map((row) => renderSeats(row))}
          </div>

          <div className="seats-row">
            {groupRows.slice(1).map((group, index) => (
              <div key={index}>{group.map((row) => renderSeats(row))}</div>
            ))}
          </div>
        </div>

        
        <button onClick={() => navigate("/my-booking")} className="proceed-btn">
          Proceed To Checkout
          <ArrowRightIcon className="proceed-icon" />
        </button>
      </div>
    </div>
  );
};

export default SeatLayout;
