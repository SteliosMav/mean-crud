import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { Post } from '../post.model';
import { PostEntityService } from './store/post-entity.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store,
    private postEntityService: PostEntityService
  ) {}

  public posts$: Observable<Post[]>;

  onDelete(post: Post) {
    this.postEntityService.delete(post);
  }

  private reload() {
    this.posts$ = this.postEntityService.entities$;
  }

  ngOnInit(): void {
    this.reload();
  }

  ngOnDestroy() {}
}
