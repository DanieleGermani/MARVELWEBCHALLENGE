import React from "react";
import { ICharacter } from "../../models/character.model";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import "./CharacterDetailHeader.scss";

interface CharacterDetailHeaderProps {
  character: ICharacter;
}

const CharacterDetailHeader: React.FC<CharacterDetailHeaderProps> = ({ character }) => {
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
          {/* <p className="character-description">{character.description}</p>
           */}
           <p className="character-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt natus voluptatum nostrum unde error eaque totam accusantium, ullam assumenda modi quis? Ut illum quasi adipisci accusamus maiores distinctio consequatur nihil!</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailHeader;
