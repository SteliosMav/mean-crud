import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  constructor(private postService: PostService, private router: Router) {}

  public posts: Post[] = [];

  public isLoading = false;

  private postsUpdatedSubscription: Subscription;

  onDelete(id: string) {
    this.postService.deletePost(id);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPosts();
    this.postsUpdatedSubscription = this.postService
      .getPostsUpdatedListener()
      .subscribe(
        (newPosts: Post[]) => {
          this.posts = newPosts;
          this.isLoading = false;
        },
        (err) => {
          this.isLoading = false;
        }
      );
  }

  ngOnDestroy() {
    this.postsUpdatedSubscription.unsubscribe();
  }
}
