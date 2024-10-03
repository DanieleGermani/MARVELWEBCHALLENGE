import React, { useState, useEffect } from "react";
import CharacterList from "../../components/CharacterList/CharacterList";
import "./Home.module.scss";
import { getCharactersList } from "../../services/marvelApi";
import SearchBar from "../../components/SearchBar/SearchBar";
import Loading from "../../components/Loading/Loading";
import Favorites from "../../components/Favorites/Favorites";
import { ICharacter } from "../../models/character.model";
import { useGlobalState } from "../../context/GlobalState";

const Home: React.FC = () => {
  const { setCharactersList, charactersList, isFavoriteSelected } = useGlobalState(); 
  const [filteredCharacters, setFilteredCharacters] = useState<ICharacter[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);;

  useEffect(() => {
    getCharactersList()
      .then((data) => {
        setCharactersList(data);
        setFilteredCharacters(data);
      })
      .catch(() => setError("Error getting characters"))
      .finally(() => setLoading(false));
          // Se omite setCharactersList en el array de dependencias porque es estable y no cambia entre renders
  }, [setCharactersList]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    const filtered = charactersList.filter((character) =>
      character.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCharacters(filtered);
  };

  if (isLoading) return <Loading />;
  if (error) return <p>{error}</p>;

  return isFavoriteSelected ? (
    <Favorites />
  ) : (
    <div className="home">
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <div>{filteredCharacters.length} RESULTS</div>
      <CharacterList characters={filteredCharacters} />
    </div>
  );
};

export default Home;
