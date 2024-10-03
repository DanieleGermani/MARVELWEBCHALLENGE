import React from 'react';
import { useGlobalState } from '../../context/GlobalState';
import CharacterCard from '../CharacterCard/CharacterCard';
import './Favorites.module.scss';
import styles from './Favorites.module.scss';
import SearchBar from '../SearchBar/SearchBar';

const Favorites: React.FC = () => {
  const { favorites } = useGlobalState();

  return (
    <div className="favorites">
      {/* <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} /> */}
      <div>{favorites.length} RESULTS</div>
      <div className={styles.characterList}>
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
