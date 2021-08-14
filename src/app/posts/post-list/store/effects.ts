import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { PostService } from '../../post.service';
import { actions, fetchPosts, postsFetched } from './actions';

@Injectable()
export class postsEffects {
  constructor(
    private actions$: Actions,
    private postService: PostService,
    private router: Router
  ) {}

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.fetchPosts),
      concatMap((action) => {
        return this.postService.getPosts();
      }),
      map((posts) => {
        return postsFetched({ posts });
      })
    );
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.updatePost),
      concatMap((action) => {
        return this.postService.updatePost(action.updatedPost.changes);
      }),
      map((posts) => {
        this.router.navigate(['/']);
        return fetchPosts();
      })
    );
  });

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.addPost),
      concatMap((action) => {
        return this.postService.addPost(action.addedPost);
      }),
      map((action) => {
        this.router.navigate(['/']);
        return fetchPosts();
      })
    );
  });

  deletePost$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(actions.deletePost),
        concatMap((action) => {
          return this.postService.deletePost(action.id);
        })
      );
    },
    { dispatch: false }
  );
}
