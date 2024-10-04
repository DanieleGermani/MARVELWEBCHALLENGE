import React from 'react';
import CharacterCard from '../CharacterCard/CharacterCard';
import { ICharacter } from '../../models/character.model';
import styles from './CharacterList.module.scss';

type CharacterListProps = {
  characters: ICharacter[];
};

const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  return (
    <div className={styles.characterList}>
      {characters.map((character, index) => (
        <CharacterCard 
          key={character.id} 
          character={character} 
          delay={index}
        />
      ))}
    </div>
  );
};

export default CharacterList;
