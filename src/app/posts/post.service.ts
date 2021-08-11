import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppState } from './post-list/store/reducers';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  private posts: Post[] = [];
  private url: string = 'http://localhost:3000/api/posts/';

  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    return this.http.get<{ message: string; posts: Post[] }>(this.url).pipe(
      map((resData): Post[] => {
        return resData.posts.map((post: Post): Post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
          };
        });
      })
    );
  }
  addPost(post: Post) {
    return this.http.post<{ message: string; post: Post }>(this.url, post).pipe(
      tap((result) => {
        console.log(result);
      })
    );
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
    return this.http.put<any>(`${this.url}${post.id}`, post);
  }

  deletePost(id: string) {
    return this.http.delete<{ message: string }>(`${this.url}${id}`);
  }

  getPostsUpdatedListener() {
    return this.postsUpdated.asObservable();
  }
}
