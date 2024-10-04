import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import selected from "../../assets/icons/selected.svg";
import unselected from "../../assets/icons/unselected.svg";
import { useGlobalState } from "../../context/GlobalState";
import "./Header.scss";

const Header: React.FC = () => {
  const { favorites, setIsFavoriteSelected } = useGlobalState();
  const navigate = useNavigate();

  const handleNavigation = (isFavoriteClicked: boolean) => {
    setIsFavoriteSelected(isFavoriteClicked);
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-left">
        <img
          className="home-button"
          onClick={() => handleNavigation(false)}
          src={logo}
          alt="Logo"
        />
      </div>
      <div className="header-right">
        {favorites.length ? (
          <div>
            <img
              className="favorites-button"
              onClick={() => handleNavigation(true)}
              src={selected}
              alt="selected"
            />
            <div>{favorites.length}</div>
          </div>
        ) : (
          <img className="favorites-button" src={unselected} alt="unselected" />
        )}
      </div>
    </header>
  );
};

export default Header;
