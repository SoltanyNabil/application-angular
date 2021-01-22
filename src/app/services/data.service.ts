import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/Post';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  localApi = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { 
  }

  getPosts(): Observable<Array<Post>>{
    return this.http.get<Array<Post>>(this.localApi + `/posts`);
  }
  

  getPostsPaginated(page, size, sortBy): Observable<Array<Post>>{
    return this.http.get<Array<Post>>(this.localApi + `/posts/paginated/${page}/${size}/${sortBy}`);
  }

  addPost(post){
    return this.http.post(this.localApi + `/posts`, post);
  }

  updatePost(post){
    return this.http.put(this.localApi + `/posts`, post);
  }

  deletePost(id){
    return this.http.delete(this.localApi + `/posts/${id}`);
  }
}
