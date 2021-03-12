# authAppSelf_handler-function

An Express.js HTTP handler of authentication and authorization services for self-owned LMOS (NodeJS) applications.

## Donation

Buy me a coffee via [![PayPal Donation](https://www.paypalobjects.com/en_AU/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=SPPJPYRY4D6WC&item_name=Give+people+an+option+to+support+my+open+source+software.&currency_code=AUD&source=url)

## Prerequisites

* auth_app_self <https://github.com/leismore/auth_app_self>

## Installation

`npm install @leismore/authappself_handler`

## Test

`npm test`

## Examples

```typescript
import express = require('express');
import { Response as Resp, ResData as RespData } from '@leismore/response';
import { generator, GeneratorHostApp, GeneratorErrors, ExpressHandler } from '@leismore/authappself_handler';
import { LMError } from '@leismore/lmerror';
import { error_handler_last } from '@leismore/error_handler_last';

const app  = express();
const port = 8081;
const API  = 'http://AUTH_APP_SELF_AUTHORIZER_URL';

const authError        = new LMError( {message: 'authorization failure', code: '1'}, {statusCode: '403'} );
const authAppSelfError = new LMError( {message: 'auth_app_self failure', code: '2'}, {statusCode: '503'} );
const gErrors:GeneratorErrors     = {auth:authError, authAppSelf:authAppSelfError};
const gHostApp:GeneratorHostApp   = {hostID:'YOUR_HOST_APP_ID', permission:'YOUR_PERMISSION_NAME'};
const get_handler1:ExpressHandler = generator(gHostApp, API, gErrors);

const get_handler2:ExpressHandler = (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const resp = new Resp(res);
    let data:RespData = { statusCode: '200',
      headers: {'Content-Type': 'application/json'}, body: {'result': 'OK'} };
    resp.send(data);
};

app.get('/', get_handler1, get_handler2 );
app.use(error_handler_last);

app.listen(port, () => {
  console.log(`@leismore/authappself_handler testing server, listening at http://localhost:${port}`);
});
```

## API Details

### Types

**ExpressHandler**

```typescript
import { Request, Response, NextFunction } from 'express';
type ExpressHandler = (req:Request, res:Response, next:NextFunction) => void;
```

**GeneratorHostApp**

```typescript
type GeneratorHostApp = { hostID: string, permission: string };
```

**GeneratorErrors**

```typescript
import { LMError } from '@leismore/lmerror';
type GeneratorErrors = { auth:LMError, authAppSelf:LMError };
```

### The Generator

```typescript
/**
 * Generate authAppSelf_handler function.
 * @param  hostApp
 * @param  authAppSelf_api  auth_app_self:authorizer API
 * @param  errors           LMError (or sub-class) instances for authorization failure (HTTP 403) and authAppSelf failure (HTTP 503)
 */
function generator( hostApp:         GeneratorHostApp,
                    authAppSelf_api: string,
                    errors:          GeneratorErrors ): ExpressHandler
```

* LMError     = [@leismore/lmerror (NPM)](https://www.npmjs.com/package/@leismore/lmerror)
* authAppSelf = [auth_app_self](https://github.com/leismore/auth_app_self)

### The Authentication / Authorization Handler

```typescript
/**
 * Test the HTTP credential, if valid, pass to the next handler.
 * else
 *   Pass a LMError object to the next error handler.
 */
function authAppSelf_handler(req:express.Request, res:express.Response, next:express.NextFunction): void
```

* [Express.js](http://expressjs.com)

## Copyright

GNU Affero General Public License v3.0

## Authors

* [Kyle Chine](https://www.kylechine.name) (Initial Author / Feb 24, 2020)
