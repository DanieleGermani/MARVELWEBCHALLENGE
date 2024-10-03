import React from "react";
import { ICharacter } from "../../models/character.model";
import { useGlobalState } from "../../context/GlobalState";
import selected from '../../assets/icons/selected.svg';
import unselected from '../../assets/icons/unselected.svg';
import styles from './FavoriteButton.module.scss';

interface FavoriteButtonProps {
  character: ICharacter;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ character }) => {
  const { addFavorite, removeFavorite, favorites } = useGlobalState();
  const isFavorite = favorites.some((fav) => fav.id === character.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  return (
    <div className={styles.favoriteButton} onClick={handleFavoriteToggle}>
      {isFavorite 
        ? <img src={selected} alt="selected" />
        : <img src={unselected} alt="unselected" />
        }
    </div>
  );
};

export default FavoriteButton;
