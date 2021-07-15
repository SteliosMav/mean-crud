import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostsComponent implements OnInit {
  constructor(private postService: PostService) {}

  enteredTitle: string = '';
  enteredContent: string = '';

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: Post = form.form.value;
    this.postService.addPost(post);
    form.resetForm();
  }

  ngOnInit(): void {}
}
