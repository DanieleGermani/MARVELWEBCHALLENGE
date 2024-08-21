import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CharacterDetail.module.scss";
import { getComicsById } from "../../services/marvelApi";
import { ICharacter } from "../../models/character.model";
import Loading from "../../components/Loading/Loading";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";
import { IComic } from "../../models/comic.modal";
import { useGlobalState } from "../../context/GlobalState";

const CharacterDetail: React.FC = () => {
  const { charactersList } = useGlobalState(); 
  
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<ICharacter | null>(null); // Cambiar a `ICharacter | null`
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
        const character = charactersList.find((character: ICharacter) => character.id === Number(id)) || null;
        setCharacter(character);
        setIsLoading(false);
      });
  }, [id, charactersList]);

  if (isLoading) return <Loading />;

  return (
    <div className="character-detail">
      {character ? (
        <>
          <div className="character-header">
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
            />
            <div className="character-info">
              <h1>{character.name}</h1>
              <p>{character.description}</p>
              <FavoriteButton character={character} />
            </div>
          </div>

          <div className="character-comics">
            <h2>Comics</h2>
            <div className="comics-list">
              {error ? <p>{error}</p> : comics.map((comic) => (
                <div key={comic.id} className="comic-card">
                  <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />
                  <p>{comic.title}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>Character not found</p>
      )}
    </div>
  );
};

export default CharacterDetail;
