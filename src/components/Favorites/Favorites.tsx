import React, { useEffect, useState } from "react";
import { useGlobalState } from "../../context/GlobalState";
import CharacterCard from "../CharacterCard/CharacterCard";
import SearchBar from "../SearchBar/SearchBar";
import { ICharacter } from "../../models/character.model";
import styles from "./Favorites.module.scss";

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
    <div className={styles.favorites}>
      <h1>FAVORITES</h1>

      {favorites.length > 0 ? (
        <>
          <SearchBar
            searchTerm={searchTerm}
            result={filteredFavorites.length}
            onSearchChange={handleSearchChange}
          />

          {filteredFavorites.length > 0 ? (
            <div className={styles.characterList}>
              {filteredFavorites.map((character, index) => (
                <CharacterCard delay={index} key={character.id} character={character} />
              ))}
            </div>
          ) : (
            <p>No matches found for "{searchTerm}".</p>
          )}
        </>
      ) : (
        <p>No favorites yet.</p>
      )}
    </div>
  );
};

export default Favorites;
