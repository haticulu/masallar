import React, { useState } from 'react';
import { Container, Typography, Box, IconButton } from '@mui/material';
/* import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff'; */

const Home = () => {
  /* const [isMusicPlaying, setIsMusicPlaying] = useState(true);

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
    const audio = document.getElementById('background-music');
    if (audio) {
      if (isMusicPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    }
  }; */

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center' }}>
        {/* <IconButton
          onClick={toggleMusic}
          sx={{
            position: 'fixed',
            top: 20,
            right: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
          }}
        >
          {isMusicPlaying ? <VolumeUpIcon /> : <VolumeOffIcon />}
        </IconButton> */}
        <Typography 
          variant="h4" 
          sx={{ 
            color: '#666',
            fontFamily: 'Comic Sans MS',
            mb: 0
          }}
        >
          Masal Dünyasına Hoş Geldiniz!
        </Typography>
        <img
          src="/images/masallar/masallarla-buyu.jpg"
          alt="Masallarla Büyü"
          style={{
            width: '45%',
            maxWidth: '800px',
            height: 'auto',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            objectFit: 'cover'
          }}
        />
        <Typography 
          variant="h5" 
          sx={{ 
            fontFamily: 'Comic Sans MS',
            color: '#666',
            mb: 2 
          }}
        >
          Burada hayal gücünüzü zenginleştirecek birbirinden güzel masallar bulacaksınız.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;