import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostService } from '../../post.service';
import { selectAllPosts } from '../store/selectors';

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.scss'],
})
export class SearchPost implements OnInit, OnDestroy {
  constructor(private store: Store, private postService: PostService) {}

  private storeSub = new Subscription();

  onChange(event) {
    const value = event.target.value.toLowerCase();
    this.storeSub = this.store
      .pipe(
        select(selectAllPosts),
        map((posts) => {
          return posts.filter((post) => {
            return post.title.toLowerCase().includes(value);
          });
        })
      )
      .subscribe((posts) => {
        this.postService.inputChanged.next(posts);
      });
  }

  ngOnInit() {}
  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
