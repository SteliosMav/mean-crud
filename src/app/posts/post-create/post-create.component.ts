import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Observable, of, Subscription } from 'rxjs';
import { AppState } from 'src/app/posts/post-list/store/reducers';
import { addPost, postUpdated } from '../post-list/store/actions';
import { selectPost } from '../post-list/store/selectors';

import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostsCreateComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  public post: Post = {
    title: '',
    content: '',
  };

  post$: Observable<Post>;

  private paramsId: string = '';

  public isLoading: boolean = false;

  checkParamsSubscription: Subscription;

  checkEdit(): null | void {
    this.checkParamsSubscription = this.route.paramMap.subscribe(
      (result: any): null | void => {
        if (result.params.id === undefined) {
          return;
        }
        this.paramsId = result.params.id;
        this.post$ = this.store.pipe(select(selectPost(this.paramsId)));
      }
    );
  }

  onSubmit(form: NgForm): null | void {
    if (form.invalid) {
      return;
    }
    this.post = form.form.value;
    if (this.paramsId === '') {
      const newDate = new Date().toString();
      this.store.dispatch(
        addPost({ addedPost: { ...this.post, dateCreated: newDate } })
      );
      this.isLoading = true;
      form.resetForm();
    } else {
      //    **** To avoid extra requests if nothing was changed ****
      //
      // if (
      //   post.content === this.post.content &&
      //   post.title === this.post.title
      // ) {
      //   this.router.navigate(['/']);
      // } else if (!this.test) {
      //   this.test = !this.test;
      //   const postToUpdate = { ...this.post, id: this.paramsId };
      //   console.log(postToUpdate);
      //   this.store.dispatch(
      //     postUpdated({
      //       updatedPost: { id: postToUpdate.id, changes: postToUpdate },
      //     })
      //   );
      // }
      const postToUpdate = { ...this.post, id: this.paramsId };
      this.store.dispatch(
        postUpdated({
          updatedPost: { id: postToUpdate.id, changes: postToUpdate },
        })
      );
    }
  }

  ngOnInit(): void {
    this.checkEdit();
  }
  ngOnDestroy(): void {
    this.checkParamsSubscription.unsubscribe();
  }
}
