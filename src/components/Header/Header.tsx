import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../../context/GlobalState';
import './Header.scss'; 

const Header: React.FC = () => {
  const { favorites } = useGlobalState();

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="home-button">Home</Link>
      </div>
      <div className="header-right">
        <button className="home-button"> Favorites ({favorites.length})</button>
      </div>
    </header>
  );
};

export default Header;
