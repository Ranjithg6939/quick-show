import React, { useEffect, useState } from 'react'
import { dummyDashboardData } from '../../assets/assets'
import Loading from '../../Components/Loading'
import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";

import './index.css'
import Title from '../../Components/AdminMaster/Title';
import BlurCircle from '../../Components/BlurCircle';
import { DateFormat } from '../../Library/DateFormate';


const Dashboard = () => {

  const currency = import.meta.env.VITE_CURRENCY

  const  [ dashboardData, setDashboardData] = useState({ 
    totalBooking: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,

  })

  const [loading, setLoading] = useState(true)

  const dashboardCard = [
    {title : 'Total Booking', value: dashboardData.totalBooking || "0", icon: ChartLineIcon},
    {title : 'Total Revenue', value: currency + dashboardData.totalRevenue || "0", icon: CircleDollarSignIcon},
    {title : 'Active Shows', value: dashboardData.activeShows.length || "0", icon: PlayCircleIcon},
    {title : 'Total Users', value: dashboardData.totalUser || "0", icon: UsersIcon}
    
  ]

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData)
    setLoading(false)
  };

  useEffect(() => {
    fetchDashboardData()
  },[])


  return !loading ? (
    <>
      <Title text1="Admin" text2="Dashboard" />
      <div className="dashboard-container">
        <BlurCircle top="-100px" left="0" />
        <div className="dashboard-card">
          {dashboardCard.map((card, index) => (
            <div key={index} className="dashboard-header">
              <div>
                <h1 className="card-title">{card.title}</h1>
                <p className="card-value">{card.value}</p>
              </div>
              <card.icon className="card-icons" />
            </div>
          ))}
        </div>
      </div>
      <p className='active-show-title'>Active Shows</p>
      <div className='active-show'>
        <BlurCircle top='100px' left='-10%'/>
        {dashboardData.activeShows.map((show)=>(
          <div key={show._id} className='active-show-header'>
            <img src={show.movie.poster_path} alt='poster' className='poster-image'/>
            <p className='show-movie-title'>{show.movie.title}</p>
            <div className='currency-container'>
              <p className='show-price'>{currency}{show.showPrice}</p>
              <p className='vote-average'>
                <StarIcon  className='star'/>
                {show.movie.vote_average.toFixed(1)}
              </p>
            </div>
            <p className='show-date-time'>{DateFormat(show.showDateTime)}</p>
          </div>
        ))}

      </div>
    </>
  ) : (
    <Loading />
  );
  
};

export default Dashboard 
