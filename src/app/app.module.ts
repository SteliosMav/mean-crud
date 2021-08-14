import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { postReducer } from './posts/post-list/store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { postsEffects } from './posts/post-list/store/effects';
import { PostsResolver } from './posts/post-list/post-list.resolver';
import { SearchPost } from './posts/post-list/search-post/search-post.component';
import { Material } from './material.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, PostListComponent, SearchPost],
  imports: [
    AppRoutingModule,
    FormsModule,
    Material,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot(
      { posts: postReducer },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          // strictActionSerializability: true,
          //strictStateSerializability: true,
        },
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([postsEffects]),
  ],
  providers: [PostsResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
