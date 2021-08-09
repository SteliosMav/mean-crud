import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
import { PostEntityService } from './store/post-entity.service';

@Injectable()
export class PostsResolver implements Resolve<any> {
  constructor(private postEntityService: PostEntityService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.postEntityService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.postEntityService.getAll();
        }
      }),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
