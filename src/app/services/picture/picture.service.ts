import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Picture } from './model/picture';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PictureService {

  private baseUrl = 'http://localhost:8080/api/v1/votacion/pictures';

  constructor(private http: HttpClient) { }

  getAllPictures(token: string): Observable<Picture[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Picture[]>(this.baseUrl, { headers });
  }
  
  voteForPicture(pictureId: number, token: string): Observable<Picture> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const voteUrl = `${this.baseUrl}/${pictureId}/vote`;

    return this.http.post<Picture>(voteUrl, null, { headers });
  }

  createPicture(newPicture: Picture, token: string): Observable<Picture> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Picture>(this.baseUrl, newPicture, { headers });
  }
}