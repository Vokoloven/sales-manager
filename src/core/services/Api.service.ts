import axios from 'axios';
import { firstValueFrom, tap } from 'rxjs';
import {
  CONTENT_TYPE,
  HTTP_HEADER,
  HTTP_RESPONSE_STATUS
} from '@/core/constants/apiService.constant';
import { URL } from '@/core/constants/url.constant';
import { Singleton } from '@/core/decorators/Singleton.decorator';
import { refreshTokenMutation } from '@/core/mutations/RefreshToken.mutation';
import { getTokens, setTokens } from '../actions/tokens.action';
import { TOKENS_INITIAL_STATE } from '../constants/tokens.constant';
import { enviromentService } from './Enviroment.service';
import { tanstackQueryService } from './TanstackQuery.service';
import type { TToken } from '../models/tokenService.model';
import type { TGet, TDelete, TPatch, TPost, TPut } from '@/core/models/apiService.model';
import type { AxiosInstance, AxiosError } from 'axios';

@Singleton
class ApiService {
  private readonly axiosInstance: AxiosInstance;
  private isRefreshingToken = false;
  private refreshSubscribers: VoidFunction[] = [];
  private cachedTokens: TToken = { ...TOKENS_INITIAL_STATE };

  public constructor() {
    this.axiosInstance = axios.create({
      baseURL: enviromentService.baseUrl,
      headers: {
        [HTTP_HEADER.ContentType]: CONTENT_TYPE.JSON,
        [HTTP_HEADER.Accept]: CONTENT_TYPE.JSON
      },
      timeout: 10000
    });

    this.axiosInstance.interceptors.request.use(
      async (request) => {
        if (!this.cachedTokens.accessToken) {
          const tokens = await getTokens();
          this.cachedTokens = tokens;
        }

        if (this.cachedTokens.accessToken) {
          request.headers.Authorization = `Bearer ${this.cachedTokens.accessToken}`;
        }

        return request;
      },

      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config;

        if (
          error.response &&
          error.response.status >= HTTP_RESPONSE_STATUS.badRequest &&
          originalRequest?.url === URL.tokenRefresh
        ) {
          await setTokens(TOKENS_INITIAL_STATE).finally(() => {
            this.cachedTokens = { ...TOKENS_INITIAL_STATE };
            tanstackQueryService.queryClient.clear();
            this.isRefreshingToken = false;
          });

          throw new Error('Failed refresh token');
        }

        if (originalRequest && error.response?.status === HTTP_RESPONSE_STATUS.unauthorized) {
          if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;
            try {
              await firstValueFrom(
                refreshTokenMutation.refreshToken().pipe(
                  tap({
                    next: (value) => {
                      this.cachedTokens = value.data;
                      this.isRefreshingToken = false;
                    }
                  })
                ).observer$
              );
              this.onRefreshSubscriber();
              return await this.axiosInstance(originalRequest);
            } catch (error) {
              this.isRefreshingToken = false;
              return Promise.reject(error as AxiosError);
            }
          }

          return new Promise((resolve) => {
            this.addSubscriber(() => {
              resolve(this.axiosInstance(originalRequest));
            });
          });
        }

        return Promise.reject(error);
      }
    );
  }

  public get api() {
    return this.axiosInstance;
  }

  private addSubscriber = (cb: VoidFunction) => {
    this.refreshSubscribers.push(cb);
  };

  private onRefreshSubscriber = () => {
    this.refreshSubscribers.forEach((cb) => {
      cb();
    });
    this.refreshSubscribers = [];
  };

  public get = <T>({ url, config }: TGet) => this.api.get<T>(url, config);

  public post = <T>({ url, config, dto }: TPost) => this.api.post<T>(url, dto, config);

  public patch = <T>({ url, config, dto }: TPatch) => this.api.patch<T>(url, dto, config);

  public put = <T>({ url, config, dto }: TPut) => this.api.put<T>(url, dto, config);

  public delete = <T>({ url, config }: TDelete) => this.api.delete<T>(url, config);
}

const apiService = new ApiService();

export { apiService };
