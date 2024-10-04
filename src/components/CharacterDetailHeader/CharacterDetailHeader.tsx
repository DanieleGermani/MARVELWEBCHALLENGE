import React from "react";
import { ICharacter } from "../../models/character.model";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import "./CharacterDetailHeader.scss";

interface CharacterDetailHeaderProps {
  character: ICharacter;
}

const CharacterDetailHeader: React.FC<CharacterDetailHeaderProps> = ({
  character,
}) => {
  return (
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
          <p className="character-description"> {character.description ? character.description : 'not description'}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailHeader;
