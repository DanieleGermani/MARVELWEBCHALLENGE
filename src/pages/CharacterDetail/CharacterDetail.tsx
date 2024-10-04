import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacterById, getComicsById } from "../../services/marvelApi";
import { ICharacter } from "../../models/character.model";
import Loading from "../../components/Loading/Loading";
import { IComic } from "../../models/comic.modal";
import { useGlobalState } from "../../context/GlobalState";
import CharacterDetailHeader from "../../components/CharacterDetailHeader/CharacterDetailHeader";
import ComicsDetailList from "../../components/ComicsDetailList/ComicsDetailList";

const CharacterDetail: React.FC = () => {
  const { charactersList } = useGlobalState();
  const { id } = useParams<{ id: string }>();

  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [comics, setComics] = useState<IComic[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacter = async (id: string): Promise<ICharacter | null> => {
    const cachedCharacter = charactersList.find(
      (character: ICharacter) => character.id === Number(id)
    ) || null;

    if (cachedCharacter) {
      return cachedCharacter;
    } else {
      try {
        const fetchedCharacter = await getCharacterById(id);
        return fetchedCharacter;
      } catch {
        setError("Error fetching character details");
        return null;
      }
    }
  };

  const fetchComics = async (id: string): Promise<IComic[]> => {
    try {
      const comicsResponse = await getComicsById(id);
      if (comicsResponse.length) {
        return comicsResponse;
      } else {
        setError("Comics not found - Empty state");
        return [];
      }
    } catch {
      setError("Error fetching comics details");
      return [];
    }
  };

  const loadCharacterAndComics = async () => {
    setIsLoading(true);
    setError(null);

    const [characterResponse, comicsResponse] = await Promise.all([
      fetchCharacter(id as string),
      fetchComics(id as string),
    ]);

    if (characterResponse) {
      setCharacter(characterResponse);
    }
    setComics(comicsResponse);
    setIsLoading(false);
  };

  useEffect(() => {
    if (id) {
      loadCharacterAndComics();
    }
  }, [id]);

  if (isLoading) return <Loading />;

  return (
    <div className="character-detail">
      {character ? (
        <>
          <CharacterDetailHeader character={character} />
          <ComicsDetailList comics={comics} error={error} />
        </>
      ) : (
        <p>Character not found</p>
      )}
    </div>
  );
};

export default CharacterDetail;
