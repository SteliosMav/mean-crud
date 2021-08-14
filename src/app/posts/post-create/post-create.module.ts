import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Material } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { PostsCreateComponent } from './post-create.component';
import { RouterModule, Routes } from '@angular/router';
import { PostsResolver } from '../post-list/post-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: PostsCreateComponent,
    resolve: {
      posts: PostsResolver,
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    Material,
    ReactiveFormsModule,
  ],
  declarations: [PostsCreateComponent],
  providers: [PostsResolver],
  exports: [RouterModule],
})
export class PostsCreateModule {}
