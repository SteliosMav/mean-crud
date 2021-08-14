import { createReducer, on } from '@ngrx/store';
import { actions } from './actions';
import { Post } from '../../post.model';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface AppState {
  posts: PostsState;
}

export interface PostsState extends EntityState<Post> {
  arePostsFetched: boolean;
  loading: false;
}

export const adapter = createEntityAdapter<Post>();

export const initialPostsState = adapter.getInitialState({
  arePostsFetched: false,
  loading: false,
});

export const { selectAll } = adapter.getSelectors();

export const postReducer = createReducer(
  initialPostsState,
  on(actions.addPost, (state, action) => {
    return { ...state, loading: true };
  }),
  on(actions.postsFetched, (state, action) => {
    return {
      ...adapter.setAll(action.posts, state),
      arePostsFetched: true,
      loading: false,
    };
  }),
  on(actions.updatePost, (state, action) => {
    return { ...adapter.updateOne(action.updatedPost, state), loading: true };
  }),
  on(actions.fetchPosts, (state, action) => {
    return { ...state, arePostsFetched: false, loading: true };
  }),
  on(actions.deletePost, (state, { id }) => {
    return adapter.removeOne(id, state);
  })
);
