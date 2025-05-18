import React from 'react';
import '../styles/StarAnimation.css';

const StarBackground = ({ darkMode }) => {
  if (!darkMode) return null;

  return (
    <div className="stars">
      
      {[...Array(10)].map((_, index) => (
        <div key={`star-${index}`} className="star" />
      ))}
      
     
      {[...Array(10)].map((_, index) => (
        <div key={`moon-${index}`} className="moon" />
      ))}
    </div>
  );
};

export default StarBackground;