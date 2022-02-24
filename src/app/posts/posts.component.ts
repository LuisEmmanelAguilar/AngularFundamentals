import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
  })

export class PostsComponent {

  posts: any[] = [];
  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient ) { 
    this.http.get<any[]>(this.url)
        .subscribe((response) => {
          this.posts = response;
        });
  }

  createPost(input: HTMLInputElement) {
    let post:any = {title: input.value};
    input.value = "";

    this.http.post(this.url, post)
        .subscribe( response => {
          post['id'] = (response);
          this.posts.splice(0,0, post);
        });
  }

  updatePost(post:any) {
    this.http.patch(this.url + '/' + post.id,({ isRead: true }))
        .subscribe(response => {
          console.log(response);
        })

  }

  deletePost(post:any) {
    this.http.delete(this.url + '/' + post.id)
        .subscribe(response => {
          let index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
        })
  }

}
