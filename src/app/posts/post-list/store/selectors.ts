import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './reducers';
import * as fromPosts from './reducers';

export const selectPostsState = createFeatureSelector<PostsState>('posts');

export const selectLoading = createSelector(selectPostsState, (posts) => {
  return posts.loading;
});

export const selectAllPosts = createSelector(
  selectPostsState,
  fromPosts.selectAll
);

export const selectPost = (postId: string) =>
  createSelector(selectPostsState, (posts) => {
    return posts.entities[postId];
  });

export const arePostsFetched = createSelector(selectPostsState, (state) => {
  return state.arePostsFetched;
});
