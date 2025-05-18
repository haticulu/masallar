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

const Login = () => {
  const [tab, setTab] = useState(0);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tab === 0) { // Giriş
        await login(email, password);
        navigate('/anasayfa');
    } else { // Kayıt
        await register(email, password);
        // Başarılı kayıt sonrası giriş tabına geç
        setTab(0);
        setEmail('');
        setPassword('');
    }
};

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
            type="password"
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
        </Box>
      </Box>
    </Container>
  );
};

export default Login;