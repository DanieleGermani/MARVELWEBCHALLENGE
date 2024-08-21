import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CharacterCard.module.scss';
import FavoriteButton from '../FavoriteButton/FavoriteButton';

type CharacterCardProps = {
  character: any;
};

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const navigate = useNavigate();

  return (
    <div className="character-card">
      <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
      <h3>{character.name}</h3>
      <FavoriteButton character={character} />
      <button onClick={() => navigate(`/character/${character.id}`)}>
        View Details
      </button>
    </div>
  );
};

export default CharacterCard;
