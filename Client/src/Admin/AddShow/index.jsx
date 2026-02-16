import React, { useEffect, useState } from "react";
import "./index.css";
import { dummyShowsData } from "../../assets/assets";
import Loading from "../../Components/Loading";
import Title from "../../Components/AdminMaster/Title";
import { CheckIcon, DeleteIcon, StarIcon } from "lucide-react";
import { KConverter } from "../../Library/KConverter";

const AddShow = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");

  
  const fetchNowPlayingMovies = async () => {
    setNowPlayingMovies(dummyShowsData);
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

 
  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;

    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];

     
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time].sort() };
      }
      return prev;
    });

    setDateTimeInput("");
  };

 
  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time);

      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }

      return { ...prev, [date]: filteredTimes };
    });
  };

  return nowPlayingMovies.length > 0 ? (
    <>
      <Title text1="Add" text2="Show" />

      <p className="now-playing-movie">Now Playing Movies</p>
      <div className="add-show-contianer">
        <div className="movie-list">
          {nowPlayingMovies.map((movie) => (
            <div
              key={movie.id}
              className="movie-poster-container"
              onClick={() => setSelectedMovie(movie)}
            >
              <div className="movie-poster-header">
                <img
                  src={movie.poster_path}
                  alt="movie-poster"
                  className="movie-poster"
                />
                <div className="votes-count-header">
                  <p className="icon-header">
                    <StarIcon className="icon-star" />
                    {movie.vote_average.toFixed(1)}
                  </p>
                  <p className="vote-count">
                    {KConverter(movie.vote_count)} Votes
                  </p>
                </div>
              </div>

              {selectedMovie?.id === movie.id && (
                <div className="check-mark">
                  <CheckIcon className="check-icon" strokeWidth={2.5} />
                </div>
              )}

              <p className="movie-name">{movie.title}</p>
              <p className="release-date">{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="movie-input">
        <label className="input-label">Show Price</label>
        <div className="price-header">
          <p className="show-currency">{currency}</p>
          <input
            min={0}
            type="number"
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder="Enter Show Price"
            className="show-input"
          />
        </div>
      </div>

      <div className="date-input">
        <label className="date-input-label">Select Date and Time</label>
        <div className="time-header">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="date-time-input"
          />
          <button onClick={handleDateTimeAdd} className="add-time-btn">
            Add Time
          </button>
        </div>
      </div>

      {Object.keys(dateTimeSelection).length > 0 && (
        <div className="display-container">
          <p className="slected-date-time">Selected Date-Time</p>

          <ul className="date-time-list">
            {Object.entries(dateTimeSelection).map(([date, times]) => (
              <li key={date} className="date-time">
                <div className="display-date">
                  <p>{date}</p>

                  <div className="diplay-time">
                    {times.map((time) => (
                      <div key={time} className="time-container">
                        <span>{time}</span>
                        <DeleteIcon
                          onClick={() => handleRemoveTime(date, time)}
                          className="delete-icon"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button className="add-show">Add Show</button>
    </>
  ) : (
    <Loading />
  );
};

export default AddShow;
