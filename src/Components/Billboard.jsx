import { Box, Button, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { BsPlayCircleFill } from 'react-icons/bs';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const Billboard = () => {

    const movies=[
        {
           "title":"Big Buck Bunny",
           "description":"Three rodents amuse themselves by harassing creatures of the forest. However, when they mess with a bunny, he decides to teach them a lesson.",
           "videoUrl":"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
           "thumbnailUrl":"https://upload.wikimedia.org/wikipedia/commons/7/70/Big.Buck.Bunny.-.Opening.Screen.png",
           "genre":"Comedy",
           "duration":"10 minutes"
        },
        {
           "title":"Sintel",
           "description":"A lonely young woman, Sintel, helps and befriends a dragon, whom she calls Scales. But when he is kidnapped by an adult dragon, Sintel decides to embark on a dangerous quest to find her lost friend Scales.",
           "videoUrl":"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
           "thumbnailUrl":"http://uhdtv.io/wp-content/uploads/2020/10/Sintel-3.jpg",
           "genre":"Adventure",
           "duration":"15 minutes"
        },
        {
           "title":"Tears of Steel",
           "description":"In an apocalyptic future, a group of soldiers and scientists takes refuge in Amsterdam to try to stop an army of robots that threatens the planet.",
           "videoUrl":"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
           "thumbnailUrl":"https://mango.blender.org/wp-content/uploads/2013/05/01_thom_celia_bridge.jpg",
           "genre":"Action",
           "duration":"12 minutes"
        },
        {
           "title":"Elephant's Dream",
           "description":"Friends Proog and Emo journey inside the folds of a seemingly infinite Machine, exploring the dark and twisted complex of wires, gears, and cogs, until a moment of conflict negates all their assumptions.",
           "videoUrl":"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
           "thumbnailUrl":"https://download.blender.org/ED/cover.jpg",
           "genre":"Sci-Fi",
           "duration":"15 minutes"
        }
     ]

     
     const videoRef = useRef(null);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const currentMovie = movies[currentMovieIndex];

  useEffect(() => {
    const video = videoRef.current;
    video.src = currentMovie.videoUrl;
    video.muted = true;

    const playNextVideo = () => {
      setCurrentMovieIndex((currentMovieIndex + 1) % movies.length);
    };

    const handleLoadedMetadata = () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.play();
    };

    video.addEventListener('ended', playNextVideo);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('ended', playNextVideo);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [currentMovie, currentMovieIndex, movies]);

  return (
    <Box>
      <video
        ref={videoRef}
        width="100%"
        height="50px"
        style={{ objectFit: 'cover' }}
      >

      </video>
      <Box zIndex={"0"}
        fontFamily={"cursive"}
        position="absolute"
        top={{lg:"32%",base:"18%",md:"26%"}}
        left={{lg:"35%",base:"52%",md:"38%"}}
        transform="translate(-50%, -50%)"
        textAlign="center"
        color="white"
        textShadow="1px 1px 2px rgba(0, 0, 0, 0.6)" >
        <Box w={{lg:"60%",base:"100%",md:"60%",sm:"100%"}} display={{lg:"grid",md:"grid",sm:"grid",base:"none"}} gap={{lg:"21px",base:"21px",sm:"11px"}} textAlign={"left"} justifyContent={"center"} alignItems={"center"} >
        <Heading fontSize={{lg:"48px",base:"18px",md:"38px"}} >{currentMovie.title}</Heading>
        <Text fontSize={{lg:"18px",base:"11px",md:"18px"}} > {currentMovie.description}</Text>
        <Box display={"flex"} gap={"11px"} >
            <Button gap={"4px"} display={{lg:"flex",base:"none",md:"flex",sm:"none"}}   > <BsPlayCircleFill  /> Play </Button>
            <Button display={{lg:"flex",base:"none",md:"flex",sm:"none"}} gap={"4px"} > <AiOutlineInfoCircle/> More info </Button>
        </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Billboard;