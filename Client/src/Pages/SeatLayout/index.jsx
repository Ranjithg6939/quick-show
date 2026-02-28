import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import toast from "react-hot-toast";
import Loading from "../../Components/Loading";
import isoTimeFormat from "../../Library/isoTimeFormate";
import BlurCircle from "../../Components/BlurCircle";
import "./index.css";
import { useAppContext } from "../../context/AppContext";


const SeatLayout = () => {
  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];

  const { id, date } = useParams();


  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const [occupiedSeats, setOccupiedSeats] = useState([]);

  const { axios, getToken, user } = useAppContext();

 
  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`);
      if (data.success) {
        setShow(data); 
      } else {
        toast.error("Show not found");
      }
    } catch (error) {
      toast.error("Failed to load show",error);
    }
  };


  const getOccupiedSeats = async () => {
    try {
      const { data } = await axios.get(
        `/api/booking/seats/${selectedTime.showId}`
      );
      if (data.success) setOccupiedSeats(data.occupiedSeats);
    } catch (error) {
      console.log(error);
    }
  };

 
  const handleSeatClick = (seatId) => {
    if (!selectedTime) return toast.error("Select time first ⏰");

    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5)
      return toast.error("Max 5 seats only 🎟️");

    if (occupiedSeats.includes(seatId))
      return toast.error("Seat already booked");

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };


  const bookTickets = async () => {
    try {
      if (!user) return toast.error("Login first");

      if (!selectedTime || !selectedSeats.length)
        return toast.error("Select time & seats");

      const { data } = await axios.post(
        "/api/booking/create",
        { showId: selectedTime.showId, selectedSeats },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        window.location.href = data.url
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  useEffect(() => {
    if (selectedTime) getOccupiedSeats();
  }, [selectedTime]);

 
const renderSeats = (row, count = 9) => (
  <div key={row} className="seats-container">
    <div className="seats-header">
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`;
        return (
          <button
            key={seatId}
            onClick={() => handleSeatClick(seatId)}
            className={`seat
              ${selectedSeats.includes(seatId) ? "selected" : ""}
              ${occupiedSeats.includes(seatId) ? "occupied" : ""}
            `}
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
        {show.dateTime?.[date]?.map((item) => (
          <div
            key={item.time}
            onClick={() => {
              setSelectedTime(item);
              toast.success(`Selected ${isoTimeFormat(item.time)}`);
            }}
            className={`timer-item-container timer-hover ${
              selectedTime?.time === item.time ? "selected-time" : ""
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
      <BlurCircle bottom="0" right="0" />

      <h1 className="select-your-seat">Select your seat</h1>

      <img src={assets.screenImage} alt="screen" className="screen-image" />
      <p className="screen-side">SCREEN SIDE</p>

      <div className="select-seats-layout">
        <div className="seats-row-top">
          {groupRows[0].map((row) => renderSeats(row))}
        </div>

        <div className="seats-row">
          {groupRows.slice(1).map((group, idx) => (
            <div key={idx}>
              {group.map((row) => renderSeats(row))}
            </div>
          ))}
        </div>
      </div>

      <button onClick={bookTickets} className="proceed-btn">
        Proceed to Checkout
        <ArrowRightIcon className="proceed-icon" />
      </button>
    </div>
  </div>
);
}
export default SeatLayout;

