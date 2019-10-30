export interface ILanguage {
  name: string;
  size: number;
}

export interface ILanguageMap {
  extension: string;
  language: string;
}

export interface IFindLanguagesRes {
  languages: ILanguage[];
  ignored: string[];
}

export interface ILanguageWeight {
  name: string;
  weight: number;
}

export interface ILanguageWeightWithSize extends ILanguageWeight {
  size: number;
}