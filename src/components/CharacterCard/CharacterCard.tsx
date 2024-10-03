import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CharacterCard.module.scss';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { ICharacter } from '../../models/character.model';

type CharacterCardProps = {
  character: ICharacter;
};

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const navigate = useNavigate();

  return (
    <div  className={styles.characterCard}>
      <div className={styles.imgContainer}>
      <img
        onClick={() => navigate(`/character/${character.id}`)}
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
        className={styles.characterImage}
      />
      </div>
      <div className={styles.cardFooter}>
        <h3 className={styles.characterName}>{character.name}</h3>
        <FavoriteButton character={character} />
      </div>
    </div>
  );
};

export default CharacterCard;
