import CryptoJS from "crypto-js";
import { ICharacter } from "../models/character.model";
import { IComic } from "../models/comic.modal";

const BASE_URL = "https://gateway.marvel.com/v1/public";
const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_PUBLIC_KEY;
const API_PRIVATE_KEY = process.env.REACT_APP_MARVEL_API_PRIVATE_KEY;
const ts = new Date().getTime().toString();
const hash = CryptoJS.MD5(ts + API_PRIVATE_KEY + API_PUBLIC_KEY).toString();

export const getCharactersList = async (searchTerm: string = ''): Promise<ICharacter[]> => {
  try {
    const params = searchTerm.length ? `nameStartsWith=${searchTerm}` : `limit=50&offset=50`
    const response = await fetch(
      `${BASE_URL}/characters?ts=${ts}&apikey=${API_PUBLIC_KEY}&hash=${hash}&${params}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const charactersList = await response.json();
    localStorage.setItem(
      "charactersList",
      JSON.stringify(charactersList.data.results)
    );
    return charactersList.data.results;
  } catch (error) {
    console.error("Error fetching characters:", error);
    return [];
  }
};

export const getComicsById = async (id: string): Promise<IComic[]> => {
  try {
    const cachedComics = localStorage.getItem(`comics_${id}`);
    if (cachedComics) {
      return JSON.parse(cachedComics);
    }

    const response = await fetch(`${BASE_URL}/characters/${id}/comics?ts=${ts}&apikey=${API_PUBLIC_KEY}&hash=${hash}&limit=20`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch comics: ${response.statusText}`);
    }
    
    const { data } = await response.json();
    const sortedComics = sortComicsByDate(data.results);

    localStorage.setItem(`comics_${id}`, JSON.stringify(sortedComics));
    return sortedComics.slice(0, 20);
  } catch (error) {
    console.error('Error fetching comics:', error);
    return [];
  }
};

export const getCharacterById = async (id: string): Promise<ICharacter | null> => {
  try {
    const response = await fetch(`${BASE_URL}/characters/${id}?ts=${ts}&apikey=${API_PUBLIC_KEY}&hash=${hash}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch character: ${response.statusText}`);
    }
    
    const { data } = await response.json();
    return data.results.length > 0 ? data.results[0] : null;
  } catch (error) {
    console.error('Error fetching character:', error);
    return null;
  }
};

const sortComicsByDate = (results: IComic[]): IComic[] => {
  return results.sort((a: IComic, b: IComic) => {
    const dateA = new Date(a.dates.find(date => date.type === 'onsaleDate')?.date || '');
    const dateB = new Date(b.dates.find(date => date.type === 'onsaleDate')?.date || '');
    return dateA.getTime() - dateB.getTime();
  });
};
