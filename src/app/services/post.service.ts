import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';
import { NotFoundError } from '../common/not-found-error';
import { map, retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<any>(this.url)
    .pipe(
      catchError(this.handleError)
    );
  }

  createPost(post:any) {
    return this.http.post(this.url, post)
      .pipe(
        catchError(this.handleError)
    );
  }

  updatePost(post:any) {
    return this.http.patch(this.url + '/' + post.id,({ isRead: true }))
      .pipe(catchError(this.handleError)
    );
  }

  deletePost(id:any) {
    return this.http.delete(this.url + '/' + id)
      .pipe(
        catchError((this.handleError))
    );
  }

  private handleError(error: Response) {

    if(error.status === 400)
      return throwError(new BadInput(error));
    
    if(error.status === 404)
      return throwError(new NotFoundError());
    return throwError(new AppError(error));
  }

}
