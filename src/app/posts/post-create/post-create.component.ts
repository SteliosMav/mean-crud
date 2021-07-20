import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostsCreateComponent implements OnInit, OnDestroy {
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public post: Post = {
    title: '',
    content: '',
  };

  private params: string = '';

  public isLoading: boolean = false;

  checkParamsSubscription: Subscription;

  checkEdit() {
    this.checkParamsSubscription = this.route.paramMap.subscribe(
      (result: any): void => {
        if (result.params.id === undefined) {
          return;
        }
        this.params = result.params.id;
        this.isLoading = true;
        this.postService.getPost(this.params).subscribe(
          (result) => {
            this.post.title = result.post.title;
            this.post.content = result.post.content;
            this.isLoading = false;
          },
          (err) => {
            this.isLoading = false;
          }
        );
      }
    );
  }

  onSubmit(form: NgForm): null | void {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.post = form.form.value;
    if (this.params === '') {
      this.postService.addPost(this.post);
    } else {
      this.post.id = this.params;
      this.postService.updatePost(this.post);
    }
    form.resetForm();
  }

  ngOnInit(): void {
    this.checkEdit();
  }
  ngOnDestroy() {
    this.checkParamsSubscription.unsubscribe();
  }
}
