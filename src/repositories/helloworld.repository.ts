import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {HelloworldDataSource} from '../datasources';
import {Profile, ProfileRelations} from '../models';

export class HelloworldRepository extends DefaultCrudRepository<
  Profile,
  typeof Profile.prototype.id,
  ProfileRelations
> {
  constructor(
    @inject('datasources.helloworld') dataSource: HelloworldDataSource,
  ) {
    super(Profile, dataSource);
  }
}
