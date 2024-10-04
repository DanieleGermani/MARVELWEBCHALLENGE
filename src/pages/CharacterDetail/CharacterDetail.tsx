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

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getComicsById(id as string)
      .then((response: IComic[]) => {
        if (response.length) {
          setComics(response);
        } else {
          setError("Comics not found - Empty state");
        }
      })
      .catch(() => {
        setError("Error getting comics details");
      })
      .finally(() => {
        const character = charactersList.find(
          (character: ICharacter) => character.id === Number(id)
        ) || null;

        if (!character) {
          setIsLoading(true);
          getCharacterById(id as string)
          .then(character => {
            setCharacter(character);
          }).finally(() => {
            setIsLoading(false);
          });
        } else {
          setCharacter(character);
          setIsLoading(false);
        }
      });
  }, [id, charactersList]);

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
