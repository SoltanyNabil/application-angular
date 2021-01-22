import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/Post';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  posts: Array<Post> = [];
  page = 0;
  size = 8;
  sortBy = 'publishedDate';
  totalPages= 0;
  lastPage= false;
  isLoding = false;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.onGetPosts();
  }

  onScroll() {
    console.log('scrolled!!');
    this.isLoding = true;
    if(!this.lastPage){
      this.page++;
      this.onGetPostsPaginated();
    }else{
      console.log("last page");
      
    }

  }

  onGetPosts(){
    this.dataService.getPostsPaginated(0,8,'publishedDate').subscribe((data:Array<Post>) => {
      console.log("all data", data);
      this.totalPages = data['totalPages'];
      
      this.posts = data['content'];
     console.log("Posts => ", this.posts);
      
    },(err: any) => {
      console.log('Failure Response');
    })
  }

  onGetPostsPaginated(){
    //setTimeout(() => {
      this.dataService.getPostsPaginated(this.page, this.size, this.sortBy).subscribe((data:Array<Post>) => {

        console.log("Posts paginated=> ", data);
        this.lastPage = data['last'];
        this.posts = this.posts.concat(data['content']);
        this.isLoding = false;
        
      },(err: any) => {
        console.log('Failure Response');
      });
  //  }, 2000);

  }

}
