import en from './languages/en.json';

export type LocalizationKey = keyof typeof en;
export const translationsArray: {
  [key: string]: {
    [key in LocalizationKey]: string;
  };
} = {
  en,
};

export const translations: {
  [key in LocalizationKey]: string;
} = translationsArray.en;
