import { GitHubService } from './services/github';
import { LanguageService } from './services/language';
import { IRepoInfo, IRepoContent } from './models/repo';
import { IFindLanguagesRes, ILanguageWeight, ILanguageWeightWithSize } from './models/language';

const username = 'olafkotur';

async function main() {
  const repos: IRepoInfo[] = await GitHubService.fetchAllRepositories(username)
  const reposWeight: ILanguageWeightWithSize[][] = [];

  repos.forEach(async (repo: IRepoInfo) => {
    const content: IRepoContent[] = await GitHubService.fetchRepositoryContent(username, repo.name);
    const langs: IFindLanguagesRes = LanguageService.findLanguagesFromContent(content);
    const weight: ILanguageWeightWithSize[] = LanguageService.calcRepoLanguageWeight(langs.languages);
    reposWeight.push(weight);
  });

  const userWeight: ILanguageWeight[] = LanguageService.calcUserLanguageWeight(reposWeight);
  console.log(userWeight);

} main();