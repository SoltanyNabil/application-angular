import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { HomeComponent } from './components/home/home.component';
import { CmsComponent } from './components/cms/cms.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostsListComponent,
    HomeComponent,
    CmsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    InfiniteScrollModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule 


  ],
  providers: [
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
