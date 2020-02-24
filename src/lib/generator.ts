/**
 * Generate authAppSelf_handler
 */

import * as express       from 'express';
import { LMError }        from '@leismore/lmerror';
import { author }         from '../lib/author';
import { AuthorInputs }   from '../lib/type/AuthorInputs';
import { AuthenInputs }   from '../lib/type/AuthenInputs';
import { parse_httpAuth } from '../lib/parse_httpAuth';

function generator( hostApp:         { hostID: string,  permission:  string  },
                    authAppSelf_api: string,
                    errors:          { auth:   LMError, authAppSelf: LMError } ):
  ( req:express.Request, _res:express.Response, next:express.NextFunction ) => void
{
  function authAppSelf_handler(req:express.Request, _res:express.Response, next:express.NextFunction):void
  {
    let authenInputs:AuthenInputs;
    let authorInputs:AuthorInputs;

    // Parse HTTP Authorization header
    try
    {
      let httpAuthor = req.get('Authorization');
      if (httpAuthor === undefined)
      {
        next( errors.auth );
        return;
      }
      else
      {
        authenInputs = parse_httpAuth(httpAuthor);
      }
    }
    catch (e)
    {
      errors.auth.addPrevious(e);
      next( errors.auth );
      return;
    }

    // Query auth_app_self
    authorInputs = {
      authen:     authenInputs,
      hostID:     hostApp.hostID,
      permission: hostApp.permission
    };

    author(authorInputs, authAppSelf_api).then(r => {
      if (r.status === 403)
      {
        next( errors.auth );
        return;
      }
      if (r.data.result === true)
      {
        next();
        return;
      }
      else
      {
        next( errors.auth );
        return;
      }
    }).catch(e => {
      errors.authAppSelf.addPrevious(e);
      next( errors.authAppSelf );
      return;
    });
  }

  return authAppSelf_handler;
}

export { generator };
