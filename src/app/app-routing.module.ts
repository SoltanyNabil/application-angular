import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CmsComponent } from './components/cms/cms.component';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';


const routes: Routes = [
  { path: '', component: HomeComponent, children :  [
    { path: '', redirectTo: 'blog', pathMatch: 'full' },
    { path: 'blog', component: PostsListComponent},
    { path: 'post', component: PostComponent},
  ] },
  { path: 'cms', component: CmsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
