import { createReducer, on } from '@ngrx/store';
import { actions } from './actions';
import { Post } from '../../post.model';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
export interface AppState {
  posts: PostsState;
}

export interface PostsState extends EntityState<Post> {
  arePostsFetched: boolean;
}

export const adapter = createEntityAdapter<Post>();

export const initialPostsState = adapter.getInitialState({
  arePostsFetched: false,
});

export const { selectAll } = adapter.getSelectors();

export const postReducer = createReducer(
  initialPostsState,
  on(actions.postsFetched, (state, action) => {
    return { ...adapter.setAll(action.posts, state), arePostsFetched: true };
  }),
  on(actions.postUpdated, (state, action) => {
    return { ...adapter.updateOne(action.updatedPost, state) };
  }),
  on(actions.fetchPosts, (state, action) => {
    return { ...state, arePostsFetched: false };
  }),
  on(actions.deletePost, (state, { id }) => {
    return adapter.removeOne(id, state);
  })
);
