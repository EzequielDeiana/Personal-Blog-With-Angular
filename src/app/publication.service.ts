import { Injectable } from '@angular/core';
import { PUBLICATIONS } from './mock-publications';
import { Publication } from './publication';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private publicationsUrl = 'api/publications'

  getPublications(): Observable<Publication[]>{
    return this.http.get<Publication[]>(this.publicationsUrl)
    .pipe(catchError(this.handleError<Publication[]>('getPublications', [])));
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    }
  }

  getPublication(id: number): Observable<Publication>{
    const url = `${this.publicationsUrl}/${id}`;
    return this.http.get<Publication>(url).pipe(tap(_ => console.log(`fetched publication from id: ${id}`)),
    catchError(this.handleError<Publication>(`getPublication id=${id}`))
    );
  }

  addPublication(publication: Publication): Observable<Publication>{
    return this.http.post<Publication>(this.publicationsUrl, publication, this.httpOptions).pipe(tap((newPublication: Publication) => console.log(`added Publication with id= ${newPublication.id} \n name= ${newPublication.name} \n text= ${newPublication.text}`)),
    catchError(this.handleError<Publication>('addPublication')))
  }

  deletePublication(id: number): Observable<Publication>{
    const url = `${this.publicationsUrl}/${id}`;
    return this.http.delete<Publication>(url, this.httpOptions).pipe(
      tap(_ => console.log(`Deleted publication id= ${id}`)),
      catchError(this.handleError<Publication>('deletedPublication'))
    )
  }

  modifyPublication(publication: Publication): Observable<any>{
    return this.http.put(this.publicationsUrl, publication, this.httpOptions).pipe(
      tap(_=> console.log(`updated publication with id = ${publication.id}`)),
      catchError(this.handleError<any>('updatePublication'))
    );
  }

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }
}
