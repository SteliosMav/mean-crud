import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/posts/post-list/store/reducers';
import { addPost, updatePost } from '../post-list/store/actions';
import { selectLoading, selectPost } from '../post-list/store/selectors';

import { Post } from '../post.model';
import { mimeType } from './mime-typ.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostsCreateComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  form: FormGroup;
  imgPreview: string;

  loading$: Observable<boolean>;

  post$: Observable<Post>;

  private paramsId: string = '';

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
            tap((post: Post) => {
              this.imgPreview = post.imagePath;
              this.form.setValue({
                title: post.title,
                content: post.content,
                image: post.imagePath,
              });
            })
          )
          .subscribe();
      }
    );
  }

  onSubmit(): null | void {
    if (this.form.invalid) {
      return;
    }
    if (this.paramsId === '') {
      this.store.dispatch(addPost({ addedPost: this.form.value }));
      this.form.reset();
    } else {
      const postToUpdate = { ...this.form.value, id: this.paramsId };
      this.store.dispatch(
        updatePost({
          updatedPost: { id: postToUpdate.id, changes: postToUpdate },
        })
      );
    }
  }

  onPickImg(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imgPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(selectLoading));
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
    this.checkEdit();
  }
  ngOnDestroy(): void {
    this.checkParamsSubscription.unsubscribe();
  }
}
