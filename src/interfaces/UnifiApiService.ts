import { AxiosResponse, AxiosInstance } from 'axios';
import { Request } from 'express';

export interface UnifiApiService {
  login: (unifiApiClient: AxiosInstance) => Promise<AxiosResponse>;
  authorise: (
    unifiApiClient: AxiosInstance,
    req: Request,
  ) => Promise<AxiosResponse>;
  logout: (unifiApiClient: AxiosInstance) => Promise<AxiosResponse>;
}
