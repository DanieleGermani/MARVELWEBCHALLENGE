export interface IThumbnail {
  path: string;
  extension: string;
}

export interface IComicSummary {
  resourceURI: string;
  name: string;
}

export interface IComicList {
  available: number;
  collectionURI: string;
  items: IComicSummary[];
  returned: number;
}

export interface ISeriesSummary {
  resourceURI: string;
  name: string;
}

export interface ISeriesList {
  available: number;
  collectionURI: string;
  items: ISeriesSummary[];
  returned: number;
}

export interface IStorySummary {
  resourceURI: string;
  name: string;
  type: string;
}

export interface IStoryList {
  available: number;
  collectionURI: string;
  items: IStorySummary[];
  returned: number;
}

export interface IEventSummary {
  resourceURI: string;
  name: string;
}

export interface IEventList {
  available: number;
  collectionURI: string;
  items: IEventSummary[];
  returned: number;
}

export interface IUrl {
  type: string;
  url: string;
}

export interface ICharacter {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: IThumbnail;
  resourceURI: string;
  comics: IComicList;
  series: ISeriesList;
  stories: IStoryList;
  events: IEventList;
  urls: IUrl[];
}
