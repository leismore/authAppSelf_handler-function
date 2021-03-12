import express = require('express');
import { Response as Resp, ResData as RespData } from '@leismore/response';
import { generator, GeneratorHostApp, GeneratorErrors, ExpressHandler } from '../src/index';
import { LMError } from '@leismore/lmerror';
import { error_handler_last } from '@leismore/error_handler_last';
import { get_handler as head_handler } from '@leismore/get_handler';
import * as CONFIG from './config.json';

const app  = express();
const port = 8081;
const API  = CONFIG.authAppSelf.authorAPI;

const authError        = new LMError( {message: 'authorization failure', code: '1'}, {statusCode: '403'} );
const authAppSelfError = new LMError( {message: 'auth_app_self failure', code: '2'}, {statusCode: '503'} );
const gErrors:GeneratorErrors     = {auth:authError, authAppSelf:authAppSelfError};
const gHostApp:GeneratorHostApp   = {hostID:CONFIG.tester_host.appID, permission:CONFIG.permissions[0]};
const get_handler1:ExpressHandler = generator(gHostApp, API, gErrors);

const get_handler2:ExpressHandler = (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const resp = new Resp(res);
    let data:RespData = { statusCode: '200',
      headers: {'Content-Type': 'application/json'}, body: {'result': 'OK'} };
    resp.send(data);
};

app.head('/', head_handler);
app.get('/', get_handler1, get_handler2 );
app.use(error_handler_last);

app.listen(port, () => {
  console.log(`@leismore/authappself_handler testing server, listening at http://localhost:${port}`);
});
