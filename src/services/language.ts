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
    console.log("REPOS WEIGHT");
    console.log(reposWeight);

    const weight: ILanguageWeight[] = [];
    const totalSize: number = 0;
    reposWeight.forEach((repo: ILanguageWeightWithSize[]) => {
      repo.forEach((lang: ILanguageWeightWithSize) => {
        lang.size += totalSize;
      });
    });

    reposWeight.forEach((repo: ILanguageWeightWithSize[]) => {
      repo.forEach((lang: ILanguageWeightWithSize) => {
        weight.push({ name: lang.name, weight: lang.size / totalSize * 100 });
      });
    });

    console.log("USER WEIGHT");
    console.log(weight);

    return weight;
  },
}