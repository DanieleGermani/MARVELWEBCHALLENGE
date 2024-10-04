import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CharacterCard.module.scss';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { ICharacter } from '../../models/character.model';

type CharacterCardProps = {
  character: ICharacter;
  delay: number;
};

const CharacterCard: React.FC<CharacterCardProps> = ({ character, delay }) => {
  const navigate = useNavigate();

  const style = {
    animationDelay: `${delay * 0.1}s`,
  };

  return (
    <div className={`${styles.characterCard} ${styles.animatedCard}`} style={style}>
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
