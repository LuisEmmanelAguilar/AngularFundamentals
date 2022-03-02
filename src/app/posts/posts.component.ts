import { Component, OnInit } from '@angular/core';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';
import { NotFoundError } from '../common/not-found-error';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
  })

export class PostsComponent implements OnInit{

  posts: any[] = [];

  constructor(private service: PostService ) { 
  }

  ngOnInit() {
    this.service.getPosts()
        .subscribe(
          response => {
          this.posts = response;
        }, 
        error => {
          alert('An unexpected error ocurred.');
          console.log(error);
        });
  }

  createPost(input: HTMLInputElement) {
    let post:any = {title: input.value};
    input.value = "";

    this.service.createPost(post)
        .subscribe( 
          response => {
          post['id'] = (response);
          this.posts.splice(0,0, post);
        }, 
        (error: AppError) => {
          if(error instanceof BadInput)
          alert('An unexpected error ocurred.');
          console.log(error);
        });
  }

  updatePost(post:any) {
    this.service.updatePost(post)
        .subscribe(
          response => {
          console.log(response);
        }, 
        error => {
          alert('An unexpected error ocurred.');
          console.log(error);
        });
  }

  deletePost(post:any) {
    this.service.deletePost(post)
        .subscribe(
          response => {
          let index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
        }, 
        (error: AppError) => {
          if(error instanceof NotFoundError)
            alert('This post has already been deleted.');
          else{
            alert('An unexpected error ocurred.');
            console.log(error);
            }
        });
  }

}
