import { AxiosResponse } from 'axios';

import { AxiosClient, IProjectService } from '@/services/types';
import { AccountInfo } from '@/store/StoreTypes';
import { ArticleFilterType } from '@/types/ArticleTypes';

class ProjectService implements IProjectService {
  // @ts-ignore
  #axiosClient: AxiosClient;

  get axiosClient() {
    return this.#axiosClient as AxiosClient;
  }

  async init(axiosClient) {
    this.#axiosClient = axiosClient;
  }

  async getArticles(): Promise<AxiosResponse<any>> {
    try {
      const res = await this.#axiosClient.get('/articles');

      return res;
    } catch (err: any) {
      return err;
    }
  }

  async getMyArticles(): Promise<AxiosResponse<any>> {
    try {
      const res = await this.#axiosClient.get('/articles/my');

      return res;
    } catch (err: any) {
      return err;
    }
  }

  async getCollectedArticles(): Promise<AxiosResponse<any>> {
    try {
      const res = await this.#axiosClient.get('/articles/collected');

      return res;
    } catch (err: any) {
      return err;
    }
  }

  async searchArticles(
    searchValue: string,
    type: ArticleFilterType,
  ): Promise<AxiosResponse<any>> {
    try {
      const res = await this.#axiosClient.get(`/search/${type}/${searchValue}`);

      return res;
    } catch (err: any) {
      return err;
    }
  }

  async getArticleInfo(id: string): Promise<AxiosResponse<any>> {
    try {
      const res = await this.#axiosClient.get(`/articles/${id}`);

      return res;
    } catch (err: any) {
      return err.response.data.error;
    }
  }

  async updateUserInfo({
    address,
    name,
    bio,
  }): Promise<AxiosResponse<AccountInfo>> {
    try {
      const res = await this.#axiosClient.patch<AccountInfo, unknown>(
        `/users/${address}`,
        {
          name,
          bio,
        },
      );

      return res;
    } catch (err: any) {
      return err;
    }
  }

  async getNftInformation({
    tokenAddress,
    tokenId,
    network,
  }): Promise<AxiosResponse<never> | { isError: boolean } | null> {
    try {
      const res = await this.#axiosClient.get(
        `/${tokenAddress}/${tokenId}?chain=${network}`,
        {},
        {
          baseURL: 'https://api.nftport.xyz/v0/nfts',
          headers: {
            Authorization: process.env.REACT_APP_NFT_AUTH_TOKEN,
          },
        },
      );

      return res.data as any;
    } catch (err) {
      if (err) {
        return {
          isError: true,
        };
      }
    }

    return null;
  }
}

export const projectService = new ProjectService();
