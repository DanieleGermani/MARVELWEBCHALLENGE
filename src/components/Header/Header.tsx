import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import heart from '../../assets/icons/selected.svg';
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
      <img className="home-button" onClick={() => handleNavigation(false)} src={logo} alt="Logo" />
      </div>
      <div className="header-right">
        <img className="favorites-button" onClick={() => handleNavigation(true)} src={heart} alt="favorites" />
        <div>{favorites.length}</div>
      </div>
    </header>
  );
};

export default Header;
