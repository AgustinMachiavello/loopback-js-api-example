import {get} from '@loopback/rest';

export class HelloWorldController {
  constructor(){}

  @get('/hello-world', {
    responses: {
      '200': {
        description: 'Hello world description',
        content: {
          'application/json': {
            schema: {
              type: 'string',
            }
          }
        }
      }
    }
  })
  async sayHello(): Promise<Object>{
    return {hello: 'World'};
  }
}
