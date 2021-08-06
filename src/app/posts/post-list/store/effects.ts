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
    private http: HttpClient,
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
        this.router.navigate(['/']);
        return postsFetched({ posts });
      })
    );
  });

  updatePost$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(actions.postUpdated),
        tap(() => {
          this.router.navigate(['/']);
        }),
        concatMap((action) => {
          return this.postService.updatePost(action.updatedPost.changes);
        })
      );
    },
    { dispatch: false }
  );

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.addPost),
      concatMap((action) => {
        return this.postService.addPost(action.addedPost);
      }),
      map((action) => fetchPosts())
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
