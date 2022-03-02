import { Component, OnInit } from '@angular/core';
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
        .subscribe(response => {
          this.posts = response;
        });
  }

  createPost(input: HTMLInputElement) {
    let post:any = {title: input.value};
    input.value = "";

    this.service.createPost(post)
        .subscribe( response => {
          post['id'] = (response);
          this.posts.splice(0,0, post);
        });
  }

  updatePost(post:any) {
    this.service.updatePost(post)
        .subscribe(response => {
          console.log(response);
        })

  }

  deletePost(post:any) {
    this.service.deletePost(post)
        .subscribe(response => {
          let index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
        })
  }

}
