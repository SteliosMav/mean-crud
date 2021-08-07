import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { deletePost } from 'src/app/posts/post-list/store/actions';

import { Post } from '../post.model';
import { PostService } from '../post.service';
import { PostEntityService } from './store/post-entity.service';
import { selectAllPosts } from './store/selectors';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  constructor(
    private postService: PostService,
    private store: Store,
    private postEntityService: PostEntityService
  ) {}

  public posts$: Observable<Post[]>;

  public postsExist: boolean;

  onDelete(id: string) {
    this.store.dispatch(deletePost({ id }));
  }

  private reload() {
    this.posts$ = this.store.pipe(select(selectAllPosts));
  }

  ngOnInit(): void {
    //this.postEntityService.getAll();
    //this.reload();
  }

  ngOnDestroy() {}
}
