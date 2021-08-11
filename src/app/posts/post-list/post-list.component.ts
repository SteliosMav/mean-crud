import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { deletePost } from 'src/app/posts/post-list/store/actions';

import { Post } from '../post.model';
import { PostService } from '../post.service';
import { selectAllPosts } from './store/selectors';

import { MatInputModule } from '@angular/material/input';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  constructor(private postService: PostService, private store: Store) {}

  public posts$: Observable<Post[]>;

  public postsExist: boolean;

  onChange(event) {
    const value = event.target.value.toLowerCase();
    this.posts$ = this.store.pipe(
      select(selectAllPosts),
      map((posts) => {
        return posts.filter((post) => {
          return post.title.toLowerCase().includes(value);
        });
      })
    );
  }

  onDelete(id: string) {
    this.store.dispatch(deletePost({ id }));
  }

  private reload() {
    this.posts$ = this.store.pipe(select(selectAllPosts));
  }

  ngOnInit(): void {
    this.reload();
  }

  ngOnDestroy() {}
}
