import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../context/GlobalState';
import './Header.scss'; 

const Header: React.FC = () => {
  const { favorites, setIsFavoriteSelected } = useGlobalState();
  const navigate = useNavigate();

  const handleNavigation = (isFavoriteClicked: boolean) => {
    setIsFavoriteSelected(isFavoriteClicked);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-left">
      <button className="home-button" onClick={() => handleNavigation(false)}>Home</button>
      </div>
      <div className="header-right">
        <button onClick={() => handleNavigation(true)} className="home-button"> Favorites ({favorites.length})</button>
      </div>
    </header>
  );
};

export default Header;
