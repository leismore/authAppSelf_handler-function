import { assert } from 'chai';
import axios from 'axios';
import * as CONFIG from './config.json';

describe('@leismore/authappself_handler', function(){
    it('The server should return {result: OK} (application/json)', function(){
        return axios.get('http://localhost:8081',
          { auth: { username: CONFIG.tester_client.appID,
                    password: CONFIG.tester_client.token }
          })
        .then( res => {
            assert( (String(res.headers['content-type']).includes('application/json') &&
              res.data.result === 'OK'), 'incorrect content' );
        })
        .catch( e=> {
            assert(false, 'server failure');
        });
    });
});
