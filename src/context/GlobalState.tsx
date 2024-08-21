import React, { createContext, useState, ReactNode, useContext } from 'react';
import { ICharacter } from '../models/character.model';

interface GlobalStateContextType {
  charactersList: ICharacter[];
  favorites: ICharacter[];
  isFavoriteSelected: boolean;
  setCharactersList: (charactersList: ICharacter[]) => void;
  addFavorite: (character: ICharacter) => void;
  removeFavorite: (id: number) => void;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<ICharacter[]>([]);
  const [charactersList, setCharactersList] = useState<ICharacter[]>([]);
  const [isFavoriteSelected, setIsFavoriteSelected] = useState<boolean>(false);

  const addFavorite = (character: ICharacter) => {
    setFavorites((prevFavorites) => [...prevFavorites, character]);
  };

  const removeFavorite = (id: number) => {
    setFavorites((prevFavorites) => prevFavorites.filter((character) => character.id !== id));
  };

  const contextValue = { favorites, addFavorite, removeFavorite, charactersList, setCharactersList, isFavoriteSelected, setIsFavoriteSelected  };

  return (
    <GlobalStateContext.Provider value={contextValue}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = (): GlobalStateContextType => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
