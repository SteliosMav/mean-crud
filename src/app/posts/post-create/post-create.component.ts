import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Observable, of, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
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

  // public post: Post = {
  //   title: '',
  //   content: '',
  // };

  form: FormGroup;

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
        this.store
          .pipe(
            select(selectPost(this.paramsId)),
            tap((post) => {
              this.form.setValue({ title: post.title, content: post.content });
            })
          )
          .subscribe();
      }
    );
  }

  onPickImg(event: Event) {
    console.log((event.target as HTMLInputElement).files);
  }

  onSubmit(): null | void {
    if (this.form.invalid) {
      return;
    }
    //this.post = form.form.value;
    if (this.paramsId === '') {
      this.store.dispatch(addPost({ addedPost: this.form.value }));
      this.isLoading = true;
      this.form.reset();
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
      const postToUpdate = { ...this.form.value, id: this.paramsId };
      this.store.dispatch(
        postUpdated({
          updatedPost: { id: postToUpdate.id, changes: postToUpdate },
        })
      );
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
    });
    this.checkEdit();
  }
  ngOnDestroy(): void {
    this.checkParamsSubscription.unsubscribe();
  }
}
