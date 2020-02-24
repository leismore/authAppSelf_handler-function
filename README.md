# authAppSelf_handler-function

An Express.js HTTP handler of authentication and authorization services for self-owned LMOS (NodeJS) applications.

## Donation

Buy me a coffee via [![PayPal Donation](https://www.paypalobjects.com/en_AU/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=SPPJPYRY4D6WC&item_name=Give+people+an+option+to+support+my+open+source+software.&currency_code=AUD&source=url)

## Prerequisites

* auth_app_self <https://github.com/leismore/auth_app_self>

## Installation

`npm install @leismore/authappself_handler`

## Examples

```typescript
import * as express           from 'express';
import { generator }          from '@leismore/authappself_handler';
import { LMError }            from '@leismore/lmerror';
import { error_handler_last } from '@leismore/error_handler_last';

const authError        = new LMError( {message: 'authorization failure', code: '1'}, {statusCode: '403'} );
const authAppSelfError = new LMError( {message: 'authorization failure', code: '2'}, {statusCode: '500'} );

const authAppSelf_handler = generator( {hostID: 'HOST_ID', permission: 'APP_PERMISSION'}, 'https://auth_app_self.com',
  {auth: authError, authAppSelf: authAppSelfError} );

let app = express();
app.post('/', authAppSelf_handler);
app.use( error_handler_last );

app.listen( 3000, 'localhost', 511,
  () => {
    console.log('[My App] is working on <localhost:3000>');
  }
);
```

## API Details

### The Generator

```typescript
/**
 * Generate authAppSelf_handler function.
 * @param  hostApp
 * @param  authAppSelf_api  API URL
 * @param  errors           LMError (or sub-class) instances for authorization failure (HTTP 403) and authAppSelf failure (HTTP 500)
 */
function generator( hostApp:         { hostID: string,  permission:  string  },
                    authAppSelf_api: string,
                    errors:          { auth:   LMError, authAppSelf: LMError } ):
  ( req:express.Request, _res:express.Response, next:express.NextFunction ) => void
```

* LMError     = [@leismore/lmerror (NPM)](https://www.npmjs.com/package/@leismore/lmerror)
* authAppSelf = [auth_app_self](https://github.com/leismore/auth_app_self)

### The Authentication / Authorization Handler

```typescript
/**
 * Test HTTP credentials, if allowed, pass to the next handlers.
 * else
 *   Pass a HTTP 403 error to the error handlers.
 * or
 *   Pass a HTTP 500 error to the error handlers, if auth_app_self application is not available.
 */
function authAppSelf_handler(req:express.Request, _res:express.Response, next:express.NextFunction): void
```

## Copyright

MIT License

## Authors

* [Kyle Chine](https://www.kylechine.name) (Initial Author / Feb 24, 2020)
