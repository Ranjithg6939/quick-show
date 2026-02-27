import React from 'react'

import MovieCard from '../../Components/MovieCard'
import BlurCircle from '../../Components/BlurCircle'
import { useAppContext } from '../../context/AppContext'
import './index.css'

const Movies = () => {

  const {shows} = useAppContext()

  return shows.length > 0 ? (
    <div className="movie-now-show">
      <BlurCircle top="150px" left="0px" />
      <BlurCircle bottom="50px" right="50px" />

      <h1 className="nowshoing-heading">Now Showing</h1>
      <div className="showing-movie">
        {shows.map((movie) => (
          <MovieCard movie={movie} Key={movie._id} />
        ))}
      </div>
    </div>
  ) : (
    <div className='no-movie-container'>
      <h1 className='no-movie'>No Movies Available</h1>
    </div>
  );
}

export default Movies
