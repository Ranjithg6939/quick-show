import React from 'react'
import './index.css'
import {ArrowRight} from 'lucide-react'
import { useNavigate } from "react-router-dom";
import BlurCircle from '../BlurCircle';
import MovieCard from '../MovieCard';
import { useAppContext } from '../../context/AppContext';

const FeaturedSection = () => {

    const navigate = useNavigate()
    const {shows} = useAppContext()
  return (
    <div className="feature-container">
      <div className="feature-header">
        <BlurCircle top="0" right="-80px" />
        <p className="now-showing">Now Showing</p>
        <button onClick={() => navigate("/movies")} className="view-all">
          View All
          <span className="arrow">
            <ArrowRight />
          </span>
        </button>
      </div>
      <div className='movie-cards'>
        {shows.slice(0,4).map((show)=>(
          <MovieCard key={show._id} movie={show}/>
        ))}

      </div>
      <div className="button-container">
        <button
          onClick={() => {
            navigate("/movies");
            setTimeout(() => {
              window.scrollTo(0, 0);
            }, 50)
          }}
          className="show-more-btn"
        >
          Show More
        </button>
      </div>
    </div>
  );
}

export default FeaturedSection