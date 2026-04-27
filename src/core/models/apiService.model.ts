import type { AxiosRequestConfig } from 'axios';

type TGet = {
  url: string;
  config?: AxiosRequestConfig;
};

type TPost = TGet & { dto?: unknown };

type TPatch = TPost;

type TPut = TPost;

type TDelete = TGet;

export type { TGet, TPost, TPatch, TPut, TDelete };
