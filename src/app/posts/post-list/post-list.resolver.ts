import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, finalize, first, map, tap } from 'rxjs/operators';
import { fetchPosts } from 'src/app/posts/post-list/store/actions';
import { AppState } from 'src/app/posts/post-list/store/reducers';
import { PostEntityService } from './store/post-entity.service';
import { arePostsFetched } from './store/selectors';

@Injectable()
export class PostsResolver implements Resolve<any> {
  constructor(
    private store: Store<AppState>,
    private postEntityService: PostEntityService
  ) {}

  loading = false;

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.postEntityService.getAll().pipe(map((courses) => !!courses));

    // return this.store.pipe(
    //   select(arePostsFetched),
    //   tap((postsFetched) => {
    //     if (!postsFetched && !this.loading) {
    //       this.loading = true;
    //       this.store.dispatch(fetchPosts());
    //     }
    //   }),
    //   filter((postsFetched) => !!postsFetched),
    //   first(),
    //   finalize(() => (this.loading = false))
    // );
  }
}
