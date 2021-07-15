import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  constructor(private postService: PostService) {}

  // posts = [
  //   { title: 'First Post', content: 'This is the content of the current post' },
  //   {
  //     title: 'Second Post',
  //     content: 'This is the content of the current post',
  //   },
  //   { title: 'Third Post', content: 'This is the content of the current post' },
  // ];

  posts: Post[] = [];

  private postsUpdatedSubscription: Subscription;

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
    this.postsUpdatedSubscription = this.postService
      .getPostsUpdatedListener()
      .subscribe((newPosts: Post[]) => {
        this.posts = newPosts;
      });
  }

  ngOnDestroy() {
    this.postsUpdatedSubscription.unsubscribe();
  }
}
