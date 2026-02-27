import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "lucide-react";
import TimeFormate from "../../Library/TimeFormate";
import { useAppContext } from "../../context/AppContext";

const MovieCard = ({ movie }) => {

  const { image_base_url } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="movie-card-container">
      <img
        onClick={() => {
          navigate(`/movies/${movie._id}`);
          window.scrollTo(0, 0);
        }}
        className="movie-image"
        src={image_base_url+movie.backdrop_path}
        alt="movie-image"
      />
      <p className="movie-title">{movie.title}</p>
      <p className="movie-date">
        {new Date(movie.release_date).getFullYear()} ·{" "}
        {movie.genres
          .slice(0, 2)
          .map((genre) => genre.name)
          .join(" | ")}{" "}
        · {TimeFormate(movie.runtime)}
      </p>

      <div className="ticket">
        <button
          onClick={() => {
            navigate(`/movies/${movie._id}`);
            window.scrollTo(0, 0);
          }}
          className="buy-ticket"
        >
          Buy Ticket
        </button>

        <p className="rating">
          <StarIcon className="star-icon" />
          {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
