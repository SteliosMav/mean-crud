import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, of, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PostEntityService } from '../post-list/store/post-entity.service';

import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsCreateComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private postEntityService: PostEntityService,
    private router: Router
  ) {}

  public post: Post = {
    title: '',
    content: '',
  };

  post$: Observable<Post>;

  private paramsId: string = '';

  public isLoading: Observable<any>;

  checkParamsSubscription: Subscription;

  checkEdit(): null | void {
    this.checkParamsSubscription = this.route.paramMap.subscribe(
      (result: any): null | void => {
        if (result.params.id === undefined) {
          return;
        }
        this.paramsId = result.params.id;
        this.post$ = this.postEntityService.collection$.pipe(
          map((collection) => {
            return collection.entities[this.paramsId];
          })
        );
      }
    );
  }

  onSubmit(form: NgForm): null | void {
    if (form.invalid) {
      return;
    }
    this.post = form.form.value;
    if (this.paramsId === '') {
      this.postEntityService.add(this.post).subscribe(() => {
        this.router.navigate(['/']);
      });
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
      this.postEntityService.update(postToUpdate);
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.checkEdit();
    this.isLoading = this.postEntityService.loading$;
  }
  ngOnDestroy(): void {
    this.checkParamsSubscription.unsubscribe();
  }
}
