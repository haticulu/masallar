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

  // Alert state and helpers
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
        showAlert('Kayıt başarılı!', 'success');
        return true;
      } catch (error) {
        if (error.response?.status === 401) {
          showAlert('Giriş başarısız: Email veya şifre yanlış!', 'error');
        } else if (error.response?.status === 400) {
          showAlert('Bu email adresi ile kayıtlı kullanıcı bulunmaktadır!', 'warning');
        } else {
          showAlert('Bir hata oluştu. Lütfen tekrar deneyiniz.', 'error');
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
        if (error.response?.status === 401) {
          showAlert('Giriş başarısız: Email veya şifre yanlış!', 'error');
        } else {
          showAlert('Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyiniz.', 'error');
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
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AlertSnackbar open={alert.open} message={alert.message} severity={alert.severity} onClose={handleAlertClose} />
    </AuthContext.Provider>
  );
}