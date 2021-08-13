import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Post } from '../../post.model';

export const fetchPosts = createAction('[Post List] Fetch Posts');

export const postsFetched = createAction(
  '[Post List] Posts Fetched',
  props<{ posts: Post[] }>()
);

export const updatePost = createAction(
  '[Post Form] Update Post',
  props<{ updatedPost: Update<Post> }>()
);

export const addPost = createAction(
  '[Post Form] Add Post',
  props<{ addedPost: Post }>()
);

export const deletePost = createAction(
  '[Post List] Delete Post',
  props<{ id: string }>()
);

import * as actions from './actions';

export { actions };
