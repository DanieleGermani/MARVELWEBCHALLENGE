import React from 'react';
import CharacterCard from '../CharacterCard/CharacterCard';
import './CharacterList.module.scss';
import { ICharacter } from '../../models/character.model';

type CharacterListProps = {
  characters: ICharacter[];
};

const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  return (
    <div className="character-list">
      <div>{characters.length} RESULTS</div>
      {characters.map(character => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
};

export default CharacterList;
