export interface IComic {
    id: number;
    digitalId: number;
    title: string;
    issueNumber: number;
    variantDescription: string;
    description: string;
    modified: string;
    isbn: string;
    upc: string;
    diamondCode: string;
    ean: string;
    issn: string;
    format: string;
    pageCount: number;
    textObjects: ITextObject[];
    resourceURI: string;
    urls: IUrl[];
    series: ISeries;
    variants: IVariant[];
    collections: any[];
    collectedIssues: any[];
    dates: IDateObject[];
    prices: IPrice[];
    thumbnail: IImage;
    images: IImage[];
    creators: ICreators;
    characters: ICharacters;
    stories: IStories;
    events: IEvents;
  }
  
  export interface ITextObject {
    type: string;
    language: string;
    text: string;
  }
  
  export interface IUrl {
    type: string;
    url: string;
  }
  
  export interface ISeries {
    resourceURI: string;
    name: string;
  }
  
  export interface IVariant {
    resourceURI: string;
    name: string;
  }
  
  export interface IDateObject {
    type: string;
    date: string;
  }
  
  export interface IPrice {
    type: string;
    price: number;
  }
  
  export interface IImage {
    path: string;
    extension: string;
  }
  
  export interface ICreators {
    available: number;
    collectionURI: string;
    items: ICreator[];
    returned: number;
  }
  
  export interface ICreator {
    resourceURI: string;
    name: string;
    role: string;
  }
  
  export interface ICharacters {
    available: number;
    collectionURI: string;
    items: ICharacter[];
    returned: number;
  }
  
  export interface ICharacter {
    resourceURI: string;
    name: string;
  }
  
  export interface IStories {
    available: number;
    collectionURI: string;
    items: IStory[];
    returned: number;
  }
  
  export interface IStory {
    resourceURI: string;
    name: string;
    type: string;
  }
  
  export interface IEvents {
    available: number;
    collectionURI: string;
    items: IEvent[];
    returned: number;
  }
  
  export interface IEvent {
    resourceURI: string;
    name: string;
  }
  