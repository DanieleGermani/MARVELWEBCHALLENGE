import React, { useState, useEffect } from "react";
import CharacterList from "../../components/CharacterList/CharacterList";
import { getCharactersList } from "../../services/marvelApi";
import SearchBar from "../../components/SearchBar/SearchBar";
import Loading from "../../components/Loading/Loading";
import Favorites from "../../components/Favorites/Favorites";
import { ICharacter } from "../../models/character.model";
import { useGlobalState } from "../../context/GlobalState";

const Home: React.FC = () => {
  const { setCharactersList, isFavoriteSelected } =
    useGlobalState();
  const [filteredCharacters, setFilteredCharacters] = useState<ICharacter[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    searchCharactersListByName();
  }, []);

  const searchCharactersListByName = async (term: string = '') => {
    setLoading(true);
    try {
      const data = await getCharactersList(term); 
      setCharactersList(data);
      setFilteredCharacters(data);
    } catch {
      setError("Error al obtener personajes");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setTimeout(() => {
      searchCharactersListByName(term);
    }, 1000);
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
