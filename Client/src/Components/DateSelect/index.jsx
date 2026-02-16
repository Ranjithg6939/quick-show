import React, { useState } from "react";
import BlurCircle from "../BlurCircle";
import { ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import "./index.css";
import { useNavigate } from "react-router-dom";

const DateSelect = ({ dateTime, id }) => {
  
  const Navigate = useNavigate()

  const [selected, setSelected] = useState(null);

  const onBookHanler = () => {
    if(!selected){ 
      return toast ('Please Select a Date')

    }
    Navigate(`/movies/${id}/${selected}`) 
    window.scrollTo(0, 0);

  }

  

 

  return (
    <div id="deteSelect" className="date-container">
      <div className="date-select">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="0px" />

        <div>
          <p className="choose-date">Choose Date</p>

          <div className="date-inner-container">
            <ChevronLeft className="chevron" />
            <span className="date-section">
              {Object.keys(dateTime).map((date) => (
                <button
                  key={date}
                  className={`date-button ${
                    selected === date ? "selected" : ""
                  }`}
                  onClick={() => setSelected(date)}
                >
                  <span>{new Date(date).getDate()}</span>
                  <span>
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </span>
                </button>
              ))}
            </span>

            <ChevronRight className="chevron" />
          </div>
        </div>

        <button onClick={onBookHanler} className="book-now">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;
