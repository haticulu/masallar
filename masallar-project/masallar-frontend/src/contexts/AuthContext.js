import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const register = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:8081/api/users/register', {
            email,
            password
        });
        alert('Kayıt başarılı!'); // Basit alert mesajı
        return true;
      } catch (error) {
        if (error.response?.status === 401) {
          alert('Giriş başarısız: Email veya şifre yanlış!');
        } else if (error.response?.status === 400) {
          alert('Bu email adresi ile kayıtlı kullanıcı bulunmaktadır!');
        } else {
          alert('Bir hata oluştu. Lütfen tekrar deneyiniz.');
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
          alert('Giriş başarısız: Email veya şifre yanlış!');
        } else {
          alert('Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyiniz.');
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
    </AuthContext.Provider>
  );
}