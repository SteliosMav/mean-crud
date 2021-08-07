import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Post } from '../../post.model';

@Injectable()
export class PostEntityService extends EntityCollectionServiceBase<Post> {
  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('Post', serviceElementFactory);
  }
}
