import React from "react";
import { ICharacter } from "../../models/character.model";
import { useGlobalState } from "../../context/GlobalState";

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
    <button onClick={handleFavoriteToggle}>
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;
