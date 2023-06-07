import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Navbar from '../Components/Navbar';
import "../Styles/Summary.css"
import { Box, Button, FormLabel, Input, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

const Summary = () => {

    const [show, setShow] = useState(null);
    
    const params = useParams();
  let showId  = params.id;
console.log(showId)

const { isOpen, onOpen, onClose } = useDisclosure()

const Theme =useColorModeValue("rgb(15, 16, 21)", "rgb(245,238,231)")
const fontTheme =useColorModeValue("white", "black")

const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  let movie=JSON.parse(localStorage.getItem("movie_name"))

  const [movieName, setMovieName] = useState(movie);

const setText=useRef(null)

useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await axios.get(`https://api.tvmaze.com/search/shows?q=all`);
        const shows = response.data;

        // Find the show with the specified ID
        const singleShow = shows.find((item) => item.show.id === parseInt(showId));
        setShow(singleShow.show);
        localStorage.setItem("movie_name",JSON.stringify(singleShow.show.name))
      } catch (error) {
        console.log(error);
      }
    }

    if (!show) {
        fetchShow();
      }
    
      setText.current.innerHTML=` ${show?.summary}`


  }, [showId,show]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();
    let formData={
        id:Math.floor(Math.random()+Date.now()),
        name,
        email,
        movieName
    }
    localStorage.setItem('FormData',JSON.stringify(formData));
    console.log(formData)
    
    alert("Congratulations! Your movie ticket has been successfully booked")
    
  };

    return (
        <>

           <div className="mainbox" style={{backgroundColor:Theme,color:fontTheme}} >
            <Navbar/>
            <div className='childBox' >
                 <div>
                 <img src={show?.image.medium} alt="" />
                 </div>
                 <div className='texts' >
                    <p className="name" >Name : {show?.name}</p>
                    <p className="genres" >Genres : {show?.genres[0]} &nbsp;{show?.genres[1]} &nbsp; {show?.genres[2]} &nbsp; {show?.genres[3]}</p>
                    <p className="rating" >Reating : {show?.rating.average}</p>
                    <p className="language" >language : {show?.language}</p>
                    <div className="summary"  ref={setText} ></div>

                <Button onClick={onOpen} borderRadius={"21px"} bg={"rgb(111, 16, 162)"}
                 _hover={{bg:"rgb(143, 64, 186)"}}
                color={"white"} className="ticketbutton" >Book ticket </Button>
                 </div>
              

            </div>
        

    {/* ////////////  modal /////////////// */}

<Box>

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>
      <Text>Booking Form</Text>

    </ModalHeader>
    <ModalCloseButton />
    <ModalBody mb={"21px"}>
    <Box>
      <form onSubmit={handleFormSubmit}>
        <Box>
          <FormLabel htmlFor="name">Name:</FormLabel>
          <Input type="text" id="name" required value={name} onChange={handleNameChange} />
        </Box>
        <Box>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Input type="email" id="email" required value={email} onChange={handleEmailChange} />
        </Box>
        <Box>
          <FormLabel htmlFor="movieName">Movie Name:</FormLabel>
          <Input type="text" id="movieName" value={movieName} readOnly />
        </Box>
        <Button mt={"18px"} colorScheme={"purple"} w={"100%"} type="submit">Book Ticket</Button>
      </form>
    </Box>
    </ModalBody>

    
  </ModalContent>
</Modal>

          </Box>
             
            </div>   
        </>
    );
};

export default Summary;