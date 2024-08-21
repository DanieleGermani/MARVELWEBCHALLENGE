import React from 'react';
import { useGlobalState } from '../../context/GlobalState';
import CharacterCard from '../CharacterCard/CharacterCard';
import './Favorites.module.scss';

const Favorites: React.FC = () => {
  const { favorites } = useGlobalState();

  return (
    <div className="favorites">
      <div className="character-list">
        {favorites.length > 0 ? (
          favorites.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))
        ) : (
          <p>No favorites yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
