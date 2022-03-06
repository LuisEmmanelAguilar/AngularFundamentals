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
    this.service.getAll()
        .subscribe(
          response => {
          this.posts = response;
        });
  }

  createPost(input: HTMLInputElement) {
    let post:any = {title: input.value};
    input.value = "";

    this.service.create(post)
        .subscribe( 
          response => {
          post['id'] = (response);
          this.posts.splice(0,0, post);
        }, 
        (error: AppError) => {
          if(error instanceof BadInput) {
            alert('Something in the way...she moves');
          }
          else throw error;
        });
  }

  updatePost(post:any) {
    this.service.update(post)
        .subscribe(
          response => {
          console.log(response);
        });
  }

  deletePost(post:any) {
    this.service.delete(post)
        .subscribe(
          response => {
          let index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
        }, 
        (error: AppError) => {
          if(error instanceof NotFoundError)
            alert('This post has already been deleted.');
          else throw error;
        });
  }

}
