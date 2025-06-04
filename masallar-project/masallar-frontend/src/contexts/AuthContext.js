import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AlertSnackbar({ open, message, severity, onClose }) {
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <MuiAlert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });


  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });
  const showAlert = (message, severity = 'info') => {
    setAlert({ open: true, message, severity });
  };
  const handleAlertClose = () => {
    setAlert({ ...alert, open: false });
  };

  const register = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:8081/api/users/register', {
            email,
            password
        });
        if (response.data === "REGISTER_SUCCESS") {
          showAlert('Kayıt başarılı!', 'success');
      }
      } catch (error) {
        if (error.response?.data === "EMAIL_EXISTS") {
            showAlert('Bu email adresi ile kayıtlı kullanıcı bulunmaktadır!', 'warning');
        }
    }
};

const login = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:8081/api/users/login', {
            email,
            password
        }); 
        if (response.data) {
            setCurrentUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            return response.data;
        }
      } catch (error) {
        if (error.response?.data === "LOGIN_FAILED") {  
          showAlert('Giriş başarısız: Email veya şifre yanlış!', 'error');
      }
       
    }
};

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    currentUser,
    register,
    login,
    logout,
    showAlert,       
    handleAlertClose 
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AlertSnackbar open={alert.open} message={alert.message} severity={alert.severity} onClose={handleAlertClose} />
    </AuthContext.Provider>
  );
}