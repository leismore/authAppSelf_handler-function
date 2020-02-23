/**
 * parse_httpAuth function: Parse HTTP Authorization header.
 * @throw {AASHError}
 */

import * as auth        from 'basic-auth';
import { AuthenInputs } from './type/AuthenInputs';
import { AASHError }    from './AASHError';

const ERROR = new AASHError({message: 'invalid credential', code: '1'}, {statusCode: '403'});

function parse_httpAuth(httpAuth:string): AuthenInputs
{
  let credential:AuthenInputs;

  let parsed = auth.parse(String(httpAuth));
  if (parsed === undefined)
  {
    throw ERROR;
  }
  else
  {
    credential = {
      appID: parsed.name,
      token: parsed.pass
    };

    if (credential.appID.length === 0 || credential.token.length === 0)
    {
      throw ERROR;
    }
    else
    {
      return credential;
    }
  }
}

export { parse_httpAuth };
