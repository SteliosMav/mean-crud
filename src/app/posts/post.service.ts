import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostService implements OnInit, OnDestroy {
  constructor(private http: HttpClient, private router: Router) {}

  private posts: Post[] = [];
  private url: string = 'http://localhost:3000/api/posts/';

  private postsUpdated = new Subject<Post[]>();

  getPosts(): void {
    this.http
      .get<{ message: string; posts: Post[] }>(this.url)
      .pipe(
        map((resData): Post[] => {
          return resData.posts.map((post: Post): Post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        })
      )
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.postsUpdated.next([...this.posts]);
      });
  }
  addPost(post: Post): void {
    this.http
      .post<{ message: string; post: Post }>(this.url, post)
      .subscribe((resData) => {
        post.id = resData.post.id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }
  getPost(id: string): Observable<{ message: string; post: Post }> {
    return this.http.get<{ message: string; post: Post }>(this.url + id);
  }

  // *** Is the below type declaration redundant? ***
  //
  // getPost(id: string): Observable<{ message: string; post: Post }> {
  //   return this.http.get<{ message: string; post: Post }>(this.url + id);
  // }

  updatePost(post: Post) {
    this.http.put<{ post: Post }>(`${this.url}${post.id}`, post).subscribe(
      (result) => {
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deletePost(id: string) {
    this.http.delete<void>(`${this.url}${id}`).subscribe(
      (res) => {
        this.posts = this.posts.filter((post) => post.id != id);
        this.postsUpdated.next([...this.posts]);
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }

  getPostsUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  ngOnInit() {}
  ngOnDestroy() {}
}
