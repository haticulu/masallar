import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Home from './pages/Home';
import MasalList from './components/MasalList';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import StarBackground from './components/StarBackground';
import ForgotPassword from './components/ForgotPassword';



function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#ff7f50' : '#1976d2', 
      },
      background: {
        default: darkMode ? '#fff5e6' : '#fff',    
        paper: darkMode ? '#ffe0b2' : '#fff',      
      },
      text: {
        primary: darkMode ? '#8b4513' : '#333',    
        secondary: darkMode ? '#cd853f' : '#666',   
      }
    },
    typography: {
      fontFamily: 'Comic Sans MS, Arial, sans-serif',
      h1: {
        fontFamily: 'Brush Script MT, cursive',
      },
      h2: {
        fontFamily: 'Brush Script MT, cursive',
      },
      h3: {
        fontFamily: 'Brush Script MT, cursive',
      },
      h4: {
        fontFamily: 'Brush Script MT, cursive',
      },
      h5: {
        fontFamily: 'Comic Sans MS, Arial, sans-serif',
      },
      h6: {
        fontFamily: 'Comic Sans MS, Arial, sans-serif',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '20px',
            textTransform: 'none',
            fontFamily: 'Comic Sans MS, Arial, sans-serif',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '15px',
            overflow: 'hidden',
          },
        },
      },
    },
  });

 
  React.useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={darkMode ? 'dark-mode' : 'light-mode'}></div>
      <AuthProvider>
        <Router>
          <StarBackground darkMode={darkMode} />
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Routes>
            <Route path="/" element={<Navigate to="/anasayfa" />} />
            <Route path="/anasayfa" element={<Home darkMode={darkMode} />} />
            <Route path="/dinle" element={<MasalList type="dinle" darkMode={darkMode} />} />
            <Route path="/oku" element={<MasalList type="oku" darkMode={darkMode} />} />
            <Route path="/giris" element={<Login darkMode={darkMode} />} />
            <Route path="/forgot-password" element={<ForgotPassword darkMode={darkMode}/>} />
            <Route path="/favoriler" element={<MasalList type="favoriler" darkMode={darkMode} />} />
            <Route path="/gecmis" element={<MasalList type="gecmis" darkMode={darkMode} />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;