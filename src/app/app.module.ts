import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsCreateComponent } from './posts/post-create/post-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { PostsResolver } from './posts/post-list/post-list.resolver';
import {
  EntityDataModule,
  EntityDataService,
  EntityDefinitionService,
  EntityMetadataMap,
} from '@ngrx/data';
import { PostEntityService } from './posts/post-list/store/post-entity.service';
import { PostsDataService } from './posts/post-list/store/posts-data.service';

const entityMetadata: EntityMetadataMap = {
  Post: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
};

@NgModule({
  declarations: [
    AppComponent,
    PostsCreateComponent,
    HeaderComponent,
    PostListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    AppRoutingModule,

    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictActionSerializability: true,
          strictStateSerializability: true,
        },
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot(),
    EntityDataModule.forRoot({ entityMetadata }),
  ],
  providers: [PostsResolver, PostEntityService, PostsDataService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private postsDataService: PostsDataService
  ) {
    eds.registerMetadataMap(entityMetadata);

    entityDataService.registerService('Post', postsDataService);
  }
}
