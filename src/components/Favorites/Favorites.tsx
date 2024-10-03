import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../../context/GlobalState';
import CharacterCard from '../CharacterCard/CharacterCard';
import './Favorites.module.scss';
import styles from './Favorites.module.scss';
import SearchBar from '../SearchBar/SearchBar';
import { ICharacter } from '../../models/character.model';

const Favorites: React.FC = () => {
  const { favorites } = useGlobalState();
  const [filteredFavorites, setFilteredFavorites] = useState<ICharacter[]>(favorites);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    setFilteredFavorites(favorites);
  }, [favorites]);

  
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    const filtered = favorites.filter((character) =>
      character.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredFavorites(filtered);
  };

  return (
    <div className="favorites">
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <div>{filteredFavorites.length} RESULTS</div>
      <div className={styles.characterList}>
        {filteredFavorites.length > 0 ? (
          filteredFavorites.map((character) => (
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
