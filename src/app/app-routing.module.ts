import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  {
    path: 'create',
    loadChildren: () =>
      import('./posts/post-create/post-create.module').then(
        (m) => m.PostsCreateModule
      ),
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('./posts/post-create/post-create.module').then(
        (m) => m.PostsCreateModule
      ),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
