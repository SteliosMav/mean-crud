import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostService implements OnInit, OnDestroy {
  constructor() {}

  private posts: Post[] = [];

  private postsUpdated = new Subject<Post[]>();

  getPosts(): Post[] {
    return [...this.posts];
  }
  addPost(post: Post): void {
    this.posts.push(post);
    this.postsUpdated.next(this.getPosts());
  }
  getPostsUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  ngOnInit() {}
  ngOnDestroy() {}
}
