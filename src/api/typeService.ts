import { AxiosResponse } from "axios";

export type Response<T> = Promise<AxiosResponse<T> | T>;
export type ServiceFunction<T> = (data?: any) => Response<T>;

export interface IService {
  [key: string]: ServiceFunction<any> | string;
}

export abstract class Service implements IService {
  [key: string]: ServiceFunction<any> | string;
}
