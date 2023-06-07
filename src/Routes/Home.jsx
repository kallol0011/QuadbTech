import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../Styles/Style.css"
import Navbar from '../Components/Navbar';
import Billboard from '../Components/Billboard';
import { useColorModeValue } from '@chakra-ui/react';

const getData = () => {
  return axios.get(`https://api.tvmaze.com/search/shows?q=all`)
}

const Home = () => {
  const [shows, setShows] = useState([])

  const fontTheme = useColorModeValue("white", "white")

  const Theme = useColorModeValue("rgb(15, 16, 21)", "rgb(245,238,231)")

  useEffect(() => {
    getData().then((res) => setShows(res.data))
  }, [])

  console.log(shows[0]?.show.image.medium)

  return (
    <>
      <div className="container">
        <Navbar />

        <Billboard />

        <ul className="card-list" style={{ backgroundColor: Theme }} >
          {shows?.map((show) => (
            <li className="card" style={{ color: fontTheme }} key={show.show.id}>
              <Link to={`/movie/${show.show.id}`}>
                <div className="card__image-container">
                  <img className="card__image" src={show.show.image.medium} alt={show.show.name} />
                  <div className="card__overlay">
                    <h3 className="card__title">{show.show.name}</h3>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>


      </div>

    </>
  );
};

export default Home;