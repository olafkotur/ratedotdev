const _ = require('lodash');
import { ILanguage, ILanguageMap, ILanguageWeight, ILanguageWeightWithSize } from "../models/language";
import { IRepoContent } from "../models/repo";
import { languageMap } from "../imports/global";

export const LanguageService = {

  findLanguagesFromContent: (content: IRepoContent[]) => {
    const languages: ILanguage[] = [];
    const ignored: string[] = [];

    content.forEach((file: IRepoContent) => {
      const extension: string = '.' + file.name.split('.')[1];
      const map: ILanguageMap = languageMap.find((m) => m.extension === extension);

      if (map) {
        languages.push({ name: map.language, size: file.size });
      } else {
        ignored.push(extension)
      }
    });

    return { languages, ignored }
  },

  calcRepoLanguageWeight: (languages: ILanguage[]) => {
    const weight: ILanguageWeightWithSize[] = [];
    let totalSize: number = 0;
    languages.forEach((lang: ILanguage) => totalSize += lang.size);
    languages.forEach((lang: ILanguage) => {
      weight.push({ name: lang.name, weight: lang.size / totalSize * 100, size: lang.size });
    });

    return weight;
  },

  calcUserLanguageWeight: (reposWeight: ILanguageWeightWithSize[][]) => {
    const weight: ILanguageWeight[] = [];
    let totalSize: number = 0;
    reposWeight.forEach((repo: ILanguageWeightWithSize[]) => {
      repo.forEach((lang: ILanguageWeightWithSize) => {
        totalSize += lang.size;
      });
    });

    reposWeight.forEach((repo: ILanguageWeightWithSize[]) => {
      repo.forEach((lang: ILanguageWeightWithSize) => {
        weight.push({ name: lang.name, weight: lang.size / totalSize * 100 });
      });
    });

    return weight;
  },

  filterDuplicateLanguages: (userWeight: ILanguageWeight[]) => {
    const names = [];
    userWeight.forEach((w: ILanguageWeight) => {
      if (!names.includes(w.name)) {
        names.push(w.name);
      }
    });

    const weights = new Array(names.length).fill(0);
    userWeight.forEach((w: ILanguageWeight) => {
      if (names.includes(w.name)) {
        const i = names.indexOf(w.name);
        weights[i] = weights[i] + w.weight;
      }
    });

    const weight: ILanguageWeight[] = names.map((name: string, i: number) => {
      return { name, weight: weights[i] }
    });
    return weight;
  },
}
