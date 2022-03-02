import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';
import { NotFoundError } from '../common/not-found-error';
import { map, retry, catchError } from ‘rxjs/operators’;
import { Observable, throwError } from ‘rxjs’;

@Injectable({
  providedIn: 'root'
})

export class PostService {

  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<any>(this.url);
  }

  createPost(post:any) {
    return this.http.post(this.url, post)
    .pipe(
      catchError((error: Response) => {
        if(error.status === 400)
          return Observable.throw(new BadInput(error));

        return Observable.throw(new AppError(error));
      })
    );
  }

  updatePost(post:any) {
    return this.http.patch(this.url + '/' + post.id,({ isRead: true }));
  }

  deletePost(id:any) {
    return this.http.delete(this.url + '/' + id)
      .pipe(
        catchError((error: Response) => {
          if(error.status === 404)
            return Observable.throwError(new NotFoundError());
          return Observable.throwError(new AppError(error));
        })
      );  
    
  }

}
