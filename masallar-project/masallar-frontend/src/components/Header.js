import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  IconButton
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DarkModeIcon from '@mui/icons-material/DarkMode'; 
import WbSunnyIcon from '@mui/icons-material/WbSunny'; 

const Header = ({ darkMode, setDarkMode }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

 
  const buttonStyle = {
    color: darkMode ? 'rgba(230, 198, 57, 0.86)' : 'white',
    border: `1px solid ${darkMode ? 'rgba(230, 198, 57, 0.86)' : 'white'}`,
    '&:hover': {
      color: darkMode ? '#ff7f50' : '#FFB6C1',
      backgroundColor: darkMode 
        ? 'rgba(255,127,80,0.1)'
        : 'rgba(255,255,255,0.1)'
    },
    fontFamily: 'Comic Sans MS',
    fontSize: '16px',
    textTransform: 'none',
    padding: '8px 16px',
    borderRadius: '20px'
  };

  return (
    <AppBar position="static" sx={{ 
      background: darkMode 
        ? 'linear-gradient(90deg,rgba(1, 6, 26, 0.93),rgb(3, 6, 22),rgb(3, 33, 51))' 
        : 'linear-gradient(90deg, #FF0000,rgba(255, 166, 0, 0.92), #FFFF00, #8B00FF, #00FF00, #0000FF, #4B0082)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <Toolbar sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        padding: '10px 0',
      }}>
        <Box sx={{ 
          display: 'flex', 
          width: '100%',
          justifyContent: 'center',
          marginBottom: '10px',
          alignItems: 'center',
          gap: 2
        }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontFamily: 'Brush Script MT, cursive',
              color: darkMode ? 'rgba(209, 198, 47, 0.86)' : '#FFA500', 
              textShadow: darkMode 
                ? '2px 2px 4px rgba(0, 0, 0, 0.2)'
                : '2px 2px 4px rgba(0,0,0,0.2)',
              fontSize: '48px'
            }}
          >
            Masal Dünyası
          </Typography>
          
          <IconButton 
            onClick={() => setDarkMode(!darkMode)}
            sx={{ 
              color: 'yellow',
              border: '1px solid white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.86)'
              }
            }}
          >
            {darkMode ? <WbSunnyIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center'
        }}>
          <Box sx={{ display: 'flex', gap: 2, color:'white' }}>
            {[
              { title: 'Ana Sayfa', path: '/anasayfa' },
              { title: 'Masal Dinle', path: '/dinle' },
              { title: 'Masal Oku', path: '/oku' }
            ].map((item) => (
              <Button 
                key={item.path}
                component={Link} 
                to={item.path}
                sx={buttonStyle}
              >
                {item.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {currentUser ? (
              <>
                <Button 
                  component={Link} 
                  to="/favoriler"
                  sx={buttonStyle}
                >
                  Favoriler
                </Button>
                <Button 
                  component={Link} 
                  to="/gecmis"
                  sx={buttonStyle}
                >
                  Dinleme Geçmişi
                </Button>
                <Button 
                  onClick={handleLogout}
                  sx={buttonStyle}
                >
                  Çıkış Yap
                </Button>
              </>
            ) : (
              <Button 
                component={Link} 
                to="/giris"
                sx={buttonStyle}
              >
                GİRİŞ YAP
              </Button>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;