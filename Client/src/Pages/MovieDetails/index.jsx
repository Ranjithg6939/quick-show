import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyShowsData, dummyDateTimeData } from "../../assets/assets";
import  BlurCircle  from "../../Components/BlurCircle";
import {  Heart, PlayCircleIcon, StarIcon } from "lucide-react";
import TimeFormate from "../../Library/TimeFormate";
import DateSelect from "../../Components/DateSelect";
import MovieCard from "../../Components/MovieCard";
import Loading from "../../Components/Loading";


import "./index.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const navigate = useNavigate()

  const getShow = async () => {
    const movieData = dummyShowsData.find((show) => show._id === id);
    if (movieData) {
      setShow({
        movie: movieData,
        dateTime: dummyDateTimeData,
      });
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);
  

  return show ? (
    <div className="movies-detaills-container">
      <div className="movies-details">
        <img
          className="movie-poster"
          src={show.movie.poster_path}
          alt={show.movie.title}
        />

        <div className="movie-header">
          <BlurCircle top="-100px" left="-100px" />
          <p className="movie-language">ENGLISH</p>
          <h1 className="movie-name">{show.movie.title}</h1>
          <div className="rating">
            <StarIcon className="rating-icon" />
            {show.movie.vote_average.toFixed(1)} User Rating
          </div>
          <p className="movie-desc">{show.movie.overview}</p>
          <p className="show-desc">
            {TimeFormate(show.movie.runtime)} •{" "}
            {show.movie.genres.map((genre) => genre.name).join(" , ")} •{" "}
            {show.movie.release_date.split("-")[0]}
          </p>
          <div className="watch-button-container">
            <button className="watch-trailer-btn">
              Watch Trailer
              <PlayCircleIcon className="play-trailer-icon" />
            </button>
            <a className="tickets" href="#deteSelect">
              Buy Tickets
            </a>
            <button className="heart-button">
              <Heart className="heart-icon" />
            </button>
          </div>
        </div>
      </div>
      <p className="cast-text">Your Favorite Cast</p>
      <div className="cast-container">
        <div className="cast-data">
          {show.movie.casts.slice(0, 11).map((cast, index) => (
            <div key={index}>
              <img
                className="cast-profile"
                src={cast.profile_path}
                alt="cast-profie"
              />
              <p className="cast-name">{cast.name}</p>
            </div>
          ))}
        </div>
      </div>
      <DateSelect dateTime={show.dateTime} id={id} />

      <p className="you-also-like">You Also Like</p>
      <div className="you-also-like-container">
        {dummyShowsData.slice(0, 4).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
      <div className="show-btn-container">
        <button
          onClick={() => {
            navigate("/movies");
            window.scrollTo(0, 0); 
          }}
          className="show-more-btn"
        >
          Show More
        </button>
      </div>
    </div>
  ): 
  (<Loading />)
};

export default MovieDetails;
