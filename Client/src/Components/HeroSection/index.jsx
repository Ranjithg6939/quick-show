import React from "react";
import "./index.css";
import { assets } from "../../assets/assets";
import { ArrowRight, CalendarIcon, ClockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";


const HeroSection = () => {

  const navigate = useNavigate()

  return (
    <div className="hero-container">
      <img className="marvel-logo" src={assets.marvelLogo} alt="marvel-logo" />

      <h1 className="movie-name">
        Guardians <br /> of the Galaxy
      </h1>

      <div className="movie-meta">
        <span className="movie-genre">Action | Adventure | Sci-Fi</span>

        <div className="movie-year">
          <CalendarIcon className="cal-icon" />
          <span className="text">2018</span>
        </div>

        <div className="movie-duration">
          <ClockIcon className="cal-icon" />
          <span className="text">2h 16m</span>
        </div>
      </div>
      <p className="movie-desc">
        In a post-apocalyptic world where cities ride on wheels
        <br /> and consume each other to survive, two people meet
        <br /> in London and try to stop a conspiracy.
      </p>
      <button onClick={() => navigate("/movies")} className="explore-btn">
        Explore Movies
        <ArrowRight className="arrow-icon" />
      </button>
    </div>
  );
}

export default HeroSection;
