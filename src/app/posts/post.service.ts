import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable, Subject, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppState } from './post-list/store/reducers';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  private posts: Post[] = [];
  private url: string = 'http://localhost:3000/api/posts/';

  private postsUpdated = new Subject<Post[]>();

  public inputChanged = new Subject<Post[]>();

  getPosts() {
    return this.http.get<{ message: string; posts: Post[] }>(this.url).pipe(
      map((resData): Post[] => {
        return resData.posts;
      })
    );
  }
  addPost(post: Post) {
    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('content', post.content);
    postData.append('image', post.image, post.title);
    return this.http.post<{ message: string; post: Post }>(this.url, postData);
  }
  getPost(id: string): Observable<{ message: string; post: Post }> {
    return this.http.get<{ message: string; post: Post }>(this.url + id);
  }

  // *** Is the below type declaration redundant? ***
  //
  // getPost(id: string): Observable<{ message: string; post: Post }> {
  //   return this.http.get<{ message: string; post: Post }>(this.url + id);
  // }

  updatePost(post: Partial<Post>) {
    let postData: Post | FormData | Partial<Post>;
    if (typeof post.image === 'object') {
      postData = new FormData();
      postData.append('title', post.title);
      postData.append('content', post.content);
      postData.append('image', post.image, post.title);
    } else {
      postData = post;
    }
    return this.http.put<any>(`${this.url}${post.id}`, postData);
  }

  deletePost(id: string) {
    return this.http.delete<{ message: string }>(`${this.url}${id}`);
  }

  getPostsUpdatedListener() {
    return this.postsUpdated.asObservable();
  }
}
