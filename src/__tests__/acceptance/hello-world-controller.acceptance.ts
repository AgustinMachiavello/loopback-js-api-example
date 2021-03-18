import {Client, expect} from '@loopback/testlab';
import {LoopbackApiApplication} from '../..';
import {setupApplication} from './test-helper';

describe('HelloWorldController', () => {
  let app: LoopbackApiApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  it('invokes GET /hello-world', async () => {
    const res = await client.get('/hello-world').expect(200);
    expect(res.body).to.containEql({hello: 'World'});
  });

  after(async () => {
    await app.stop();
  });

});
