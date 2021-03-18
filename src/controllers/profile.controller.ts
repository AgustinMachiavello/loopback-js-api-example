import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Profile} from '../models';
import {HelloworldRepository} from '../repositories';

export class ProfileController {
  constructor(
    @repository(HelloworldRepository)
    public helloworldRepository : HelloworldRepository,
  ) {}

  @post('/profiles')
  @response(200, {
    description: 'Profile model instance',
    content: {'application/json': {schema: getModelSchemaRef(Profile)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profile, {
            title: 'NewProfile',
            exclude: ['id'],
          }),
        },
      },
    })
    profile: Omit<Profile, 'id'>,
  ): Promise<Profile> {
    return this.helloworldRepository.create(profile);
  }

  @get('/profiles/count')
  @response(200, {
    description: 'Profile model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Profile) where?: Where<Profile>,
  ): Promise<Count> {
    return this.helloworldRepository.count(where);
  }

  @get('/profiles')
  @response(200, {
    description: 'Array of Profile model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Profile, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Profile) filter?: Filter<Profile>,
  ): Promise<Profile[]> {
    return this.helloworldRepository.find(filter);
  }

  @patch('/profiles')
  @response(200, {
    description: 'Profile PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profile, {partial: true}),
        },
      },
    })
    profile: Profile,
    @param.where(Profile) where?: Where<Profile>,
  ): Promise<Count> {
    return this.helloworldRepository.updateAll(profile, where);
  }

  @get('/profiles/{id}')
  @response(200, {
    description: 'Profile model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Profile, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Profile, {exclude: 'where'}) filter?: FilterExcludingWhere<Profile>
  ): Promise<Profile> {
    return this.helloworldRepository.findById(id, filter);
  }

  @patch('/profiles/{id}')
  @response(204, {
    description: 'Profile PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profile, {partial: true}),
        },
      },
    })
    profile: Profile,
  ): Promise<void> {
    await this.helloworldRepository.updateById(id, profile);
  }

  @put('/profiles/{id}')
  @response(204, {
    description: 'Profile PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() profile: Profile,
  ): Promise<void> {
    await this.helloworldRepository.replaceById(id, profile);
  }

  @del('/profiles/{id}')
  @response(204, {
    description: 'Profile DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.helloworldRepository.deleteById(id);
  }
}
