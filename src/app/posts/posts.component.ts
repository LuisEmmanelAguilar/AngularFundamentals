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
        .subscribe(posts => this.posts = posts);
  }

  createPost(input: HTMLInputElement) {
    let post:any = {title: input.value};
    this.posts.splice(0,0, post);

    input.value = "";

    this.service.create(post)
        .subscribe( 
          newPost => {
          post['id'] = newPost;
        }, 
        (error: AppError) => {
          this.posts.splice(0, 1);

          if(error instanceof BadInput) {
            alert('Something in the way...she moves');
          }
          else throw error;
        });
  }

  updatePost(post:any) {
    this.service.update(post)
        .subscribe(
          updatedPost => {
          console.log(updatedPost);
        });
  }

  deletePost(post:any) {
    let index = this.posts.indexOf(post);
    this.posts.splice(index, 1);

    this.service.delete(post)
        .subscribe(
          null,
          (error: AppError) => {
            this.posts.splice(index, 0, post);
            if(error instanceof NotFoundError)
            alert('This post has already been deleted.');
          else throw error;
        });
  }

}
