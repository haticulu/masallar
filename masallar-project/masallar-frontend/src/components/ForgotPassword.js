import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { showAlert } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/api/password-reset', {
        email: email,
        newPassword: newPassword
      });
      if (response.data === "PASSWORD_RESET_SUCCESS") {
        showAlert('Şifreniz başarıyla güncellendi', 'success');
        setTimeout(() => {
            navigate('/giris');
        }, 1000);
    }
} catch (error) {
    if (error.response?.data === "USER_NOT_FOUND") {
        showAlert('Kullanıcı bulunamadı', 'error');
    } 
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
          Şifre Yenileme
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-posta"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="Yeni Şifre"
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Şifreyi Güncelle
          </Button>
          
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;