import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostsResolver } from './posts/post-list/post-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
    resolve: {
      posts: PostsResolver,
    },
  },
  { path: 'create', component: PostsCreateComponent },
  { path: 'edit/:id', component: PostsCreateComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
