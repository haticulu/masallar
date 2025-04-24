import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography 
          variant="h4" 
          sx={{ 
            color: '#666',
            fontFamily: 'Comic Sans MS',
            mb: 2
          }}
        >
          Masal Dünyasına Hoş Geldiniz!
        </Typography>
        <img
              src="/images/masallar/masallarla-buyu.jpg"
              alt="Masallarla Büyü"
              style={{
                width: '40%',
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