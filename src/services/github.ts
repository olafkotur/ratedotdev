import { IRepoInfo, IRepoContent } from '../models/github';
const nodeFetch = require('node-fetch');

const GitHubService = {
  fetchAllRepositories: async (username: string) => {
    const repositories: IRepoInfo[] = [];
    await nodeFetch(`https://api.github.com/users/${username}/repos`).then(async (res: any) => {
      const data: object[] = await res.json();
      data.forEach((d: any) => {
        repositories.push({ name: d.name });
      });
    });
    return repositories;
  },

  fetchRepositoryContent: async (username: string, repo) => {
    const content: IRepoContent[] = [];
    await nodeFetch(`https://api.github.com/repos/${username}/${repo}/contents`).then(async (res: any) => {
      const data: object[] = await res.json();
      data.forEach((d: any) => {
        content.push({
          name: d.name,
          type: d.type,
          size: d.size
        });
      });
    });
    return content;
  }
}


// DANGER: Testing only
const username = 'olafkotur';
GitHubService.fetchAllRepositories(username).then((repos: any) => {
  GitHubService.fetchRepositoryContent(username, repos[0].name).then((content: any) => {
    console.log(repos[0].name);
    console.log(content);
  });
});