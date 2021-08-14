import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable, of, Subscription } from 'rxjs';
import { deletePost } from 'src/app/posts/post-list/store/actions';

import { Post } from '../post.model';
import { PostService } from '../post.service';
import { selectAllPosts } from './store/selectors';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  constructor(private postService: PostService, private store: Store) {}

  public posts$: Observable<Post[]>;

  public postsExist: boolean;

  private inputChangeSub: Subscription;

  onDelete(id: string) {
    this.store.dispatch(deletePost({ id }));
  }

  private reload() {
    this.posts$ = this.store.pipe(select(selectAllPosts));
    this.inputChangeSub = this.postService.inputChanged.subscribe((posts) => {
      const postsObs = of(posts);
      this.posts$ = postsObs.pipe();
    });
  }

  convertDate(inputDate) {
    let date = new Date(inputDate);
    let year = date.getFullYear();
    let month: number | string = date.getMonth() + 1;
    let dt: number | string = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }

    return `${dt}/${month}/${year}`;
  }

  checkIfUpdated(cr, up) {
    const crMs = Date.parse(cr);
    const upMs = Date.parse(up);
    if (crMs + 5000 < upMs) {
      return true;
    }
    return false;
  }

  sortByDate(order: string) {
    this.posts$ = this.posts$.pipe(
      map((posts) => {
        return posts.sort((a, b) => {
          const ad = new Date(a.createdAt).getTime();
          const bd = new Date(b.createdAt).getTime();
          if (order === 'asc') {
            return bd - ad;
          } else return ad - bd;
        });
      })
    );
  }

  ngOnInit(): void {
    this.reload();
  }

  ngOnDestroy() {
    this.inputChangeSub.unsubscribe();
  }
}
