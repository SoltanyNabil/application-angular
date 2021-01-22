import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Post } from 'src/app/interfaces/Post';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
export class CmsComponent implements OnInit {
  posts: Post[];
  cols = [
    { field: 'id', header: 'Id#' },
    { field: 'title', header: 'Title' },
    { field: 'publishedDate', header: 'Published Date' },
    { field: 'author', header: 'Author' }
];
  displayModal:boolean =false;
  mode = 'add';
  postForm: FormGroup;
  
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};

  constructor(private dataService: DataService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {

    this.postForm =  new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
    });

    this.onGetPosts();
  }

  onGetPosts(){
    this.posts = [];
    this.dataService.getPosts().subscribe((data:Array<Post>) => {
      console.log("all data", data);
      this.posts = data;
      
    },(err: any) => {
      console.log('Failure Response');
    })
  }

  addPost(){
    this.mode = 'add';
    this.postForm.reset();
    this.displayModal =true;
    this.postForm.patchValue({
      imageUrl : 'https://source.unsplash.com/1600x900/?it,tech'
    });

    console.log('add'); 
  }
  confirmAddPost(){
    console.log(' confirm update');
    let newPost = {
        title : this.postForm.value.title,
        content : this.postForm.value.content,
        publishedDate : Math.round(+new Date()/1000),
        nbVisit : '0',
        author : this.postForm.value.author,
        imageUrl:this.postForm.value.imageUrl
    }
    console.log("new post", newPost);
    this.dataService.addPost(newPost).subscribe(data=>{
      console.log(data);
      this.messageService.add({severity:'success', summary:'Add', detail:'Post added successfully!'});
      this.displayModal=false;
      this.postForm.reset();
      this.onGetPosts();
    });
    
  }

  editPost(row){
    this.mode = 'update';
    this.displayModal =true;
    console.log('update', row); 
    
    this.postForm.patchValue({
      title : row.title,
      content : row.content,
      author : row.author,
      imageUrl : 'row.imageUrl'
    });
  }

  confirmUpdatePost(){
    console.log(' confirm update'); 
    let newPost = {
      title : this.postForm.value.title,
      content : this.postForm.value.content,
      publishedDate : Math.round(+new Date()/1000),
      nbVisit : '0',
      author : this.postForm.value.author,
      imageUrl: this.postForm.value.imageUrl
  }
  this.dataService.updatePost(newPost).subscribe(data=>{
    console.log(data);
    this.messageService.add({severity:'success', summary:'Update', detail:'Post updated successfully!'});
    this.displayModal=false;
    this.postForm.reset();
    this.onGetPosts();
  })
  }

  deletePost(row){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        console.log('delete', row);
        this.dataService.deletePost(row.id).subscribe(data=> {
          this.messageService.add({severity:'success', summary:'Service Message', detail:'post deleted successfully'});
          this.onGetPosts();
        });

      }
  });

  }
}
