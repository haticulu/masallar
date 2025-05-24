import React, { useState } from 'react';
import axios from 'axios'; 
import { 
  Container, 
  Box, 
  TextField, 
  Button, 
  Typography,
  Tabs,
  Tab 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';

const Login = () => {
  const [tab, setTab] = useState(0);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tab === 0) { 
        await login(email, password);
        navigate('/anasayfa');
    } else { 
        await register(email, password);
        
        setTab(0);
        setEmail('');
        setPassword('');
    }
};
const [showPassword, setShowPassword] = useState(false);

  return (
    <Container maxWidth="sm">
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: 'white',
        border: '2px solid #b8860b'
      }}>
        <Typography variant="h4" sx={{ mb: 3, fontFamily: 'Comic Sans MS', color: 'coral' }}>
          {tab === 0 ? 'Giriş Yap' : 'Kayıt Ol'}
        </Typography>

        <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} sx={{ mb: 3 }}>
          <Tab label="GİRİŞ  YAP" sx={{ fontFamily: 'Comic Sans MS' }} />
          <Tab label="KAYIT OL" sx={{ fontFamily: 'Comic Sans MS' }} />
        </Tabs>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#b8860b',
                  borderWidth: 2,
                },
                '&:hover fieldset': {
                  borderColor: '#ff9800',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff6b4a',
                  borderWidth: 2,
                },
              },
            }}
          />
          <TextField
  margin="normal"
  required
  fullWidth
  label="Şifre"
  type={showPassword ? 'text' : 'password'}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  sx={{
    mb: 3,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#b8860b',
        borderWidth: 2,
      },
      '&:hover fieldset': {
        borderColor: '#ff9800',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ff6b4a',
        borderWidth: 2,
      },
    },
  }}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          onClick={() => setShowPassword((show) => !show)}
          edge="end"
         
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
  }}
/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: 'coral',
              '&:hover': { backgroundColor: '#ff6b4a' },
              fontFamily: 'Comic Sans MS'
            }}
          >
           
            {tab === 0 ? 'Giriş Yap' : 'Kayıt Ol'}
          </Button>
          {tab === 0 && (
  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
    <Typography
      component={Link}
      to="/forgot-password"
      variant="body2"
      color="primary"
      sx={{
        textDecoration: 'none',
        fontWeight: 500,
        cursor: 'pointer',
        '&:hover': { textDecoration: 'underline' }
      }}
    >
      Şifremi Unuttum
    </Typography>
  </Box>
)}
        </Box>
      </Box>
    </Container>
  );
};

export default Login;