import { IRepoInfo, IRepoContent } from '../models/repo';
const nodeFetch = require('node-fetch');
require('dotenv').config()

const auth: string = `?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`;

export const GitHubService = {

  fetchAllRepositories: async (username: string) => {
    const repositories: IRepoInfo[] = [];
    await nodeFetch(`https://api.github.com/users/${username}/repos${auth}`).then(async (res: any) => {
      const data: object[] = await res.json();
      data.forEach((d: any) => {
        repositories.push({ name: d.name });
      });
    });
    return repositories;
  },

  fetchRepositoryContent: async (username: string, repo: string) => {
    const content: IRepoContent[] = [];
    await nodeFetch(`https://api.github.com/repos/${username}/${repo}/contents${auth}`).then(async (res: any) => {
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
