import {StoryblokStory} from 'storyblok-generate-ts'

export interface BestSellersStoryblok {
  title?: string;
  _uid: string;
  component: "bestSellers";
  [k: string]: any;
}

export interface BodyStoryblok {
  bloks?: (BestSellersStoryblok | BodyStoryblok | HeaderStoryblok | PageStoryblok | ProdottoStoryblok)[];
  _uid: string;
  component: "body";
  [k: string]: any;
}

export interface HeaderStoryblok {
  title?: string;
  description?: string;
  _uid: string;
  component: "header";
  [k: string]: any;
}

export interface PageStoryblok {
  body?: (BestSellersStoryblok | BodyStoryblok | HeaderStoryblok | PageStoryblok | ProdottoStoryblok)[];
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface AssetStoryblok {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  focus?: string;
  [k: string]: any;
}

export type MultiassetStoryblok = {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  [k: string]: any;
}[];

export interface ProdottoStoryblok {
  name?: string;
  description?: string;
  previewText?: string;
  price?: string;
  mainImage?: AssetStoryblok;
  images?: MultiassetStoryblok;
  ARModel?: AssetStoryblok;
  top_seller?: boolean;
  best_offer?: boolean;
  new_entry?: boolean;
  _uid: string;
  component: "prodotto";
  [k: string]: any;
}
