import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacterById, getComicsById } from "../../services/marvelApi";
import { ICharacter } from "../../models/character.model";
import Loading from "../../components/Loading/Loading";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";
import { IComic } from "../../models/comic.modal";
import { useGlobalState } from "../../context/GlobalState";
import "./CharacterDetail.scss";

const CharacterDetail: React.FC = () => {
  const { charactersList } = useGlobalState();
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [comics, setComics] = useState<IComic[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getCharacter = () => {
    return charactersList.find(
      (character: ICharacter) => character.id === Number(id)
    ) || null;
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Get comics first
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
        // Try to get the character from the global state
        const foundCharacter = getCharacter();
        if (!foundCharacter) {
          // If character is not found in the state, fetch from API
          getCharacterById(id as string)
            .then((fetchedCharacter) => {
              setCharacter(fetchedCharacter);
            })
            .catch(() => {
              setError("Error fetching character details");
            });
        } else {
          // If found, set the character
          setCharacter(foundCharacter);
        }

        setIsLoading(false);
      });
  }, [id, charactersList]);

  if (isLoading) return <Loading />;

  return (
    <div className="character-detail">
      {character ? (
        <>
          <div className="character-header-container">
            <div className="character-header">
              <img
                className="character-image"
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
              />
              <div className="character-info">
                <div className="header-title">
                  <h1 className="character-name">{character.name}</h1>
                  <FavoriteButton character={character} />
                </div>
                <p className="character-description">{character.description}</p>
              </div>
            </div>
          </div>

          <div className="character-comics">
            <h2>Comics</h2>
            <div className="comics-list">
              {error ? (
                <p className="error-message">{error}</p>
              ) : (
                comics.map((comic) => (
                  <div key={comic.id} className="comic-card">
                    <img
                      className="comic-image"
                      src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                      alt={comic.title}
                    />
                    <p className="comic-title">{comic.title}</p>
                  </div>
                ))
              )}
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
