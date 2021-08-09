import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Observable, pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Post } from '../../post.model';

@Injectable()
export class PostsDataService extends DefaultDataService<Post> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Post', http, httpUrlGenerator);
  }

  getAll(): Observable<Post[]> {
    return this.http.get('/api/posts').pipe(map((res) => res['posts']));
  }
  update(body): Observable<any> {
    return this.http
      .put(`/api/posts/${body['id']}`, {
        title: body.changes.title,
        content: body.changes.content,
      })
      .pipe(map((res) => res['posts']));
  }
  add(post) {
    return this.http.post('/api/posts', post).pipe(map((res) => res['post']));
  }
  delete(post) {
    return this.http.delete<number>(`/api/posts/${post}`);
  }
}
