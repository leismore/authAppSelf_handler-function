// Authorization

import { default as axios, AxiosRequestConfig } from 'axios';
import { AuthorInputs }                         from './type/AuthorInputs';
import * as CONFIG                              from '../config.json';
const TIMEOUT         = CONFIG.auth_app_self.timeout;

/**
 * Authorization
 * @param  api - auth_app_self API URL
 */
async function author(input:AuthorInputs, api:string):Promise<any>
{
  let configAxios:AxiosRequestConfig = {
    url: api,
    method: 'POST',
    data: {
      hostID:     input.hostID,
      permission: input.permission
    },
    timeout: TIMEOUT,
    withCredentials: true,
    auth: {
      username: input.authen.appID,
      password: input.authen.token
    },
    validateStatus: (statusCode:number) => {
      if (statusCode === 403)
      {
        return true;
      }
      else
      {
        return (statusCode >= 200 && statusCode < 300);
      }
    }
  };

  return axios(configAxios);
}

export { author };
