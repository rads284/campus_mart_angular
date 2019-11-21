import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Course } from './hero';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class HeroService {
  private hello;
  private c:Course[] = [];
  private heroesUrl = 'http://127.0.0.1:7000/courses';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  // testService(){
  //   return this.http.get("http://127.0.0.1:7000/courses").subscribe(
  //     data=>{ this.hello=data;
  //             // console.log(this.hello);
  //             this.hello.forEach(element => {
  //               let tc = new Course();
  //             this.c.push(Object.assign(tc, element));
  //             });
  //             return (this.c);
  //    }
  //   );
  // }
  /** GET heroes from the server */
  getHeroes (): Observable<Course[]> {
    return this.http.get<Course[]>(this.heroesUrl);
  }

  uploadDoc(id, fileToUpload){
    const formData: FormData = new FormData();
    formData.append('id',id);
    formData.set('fileKey', fileToUpload, fileToUpload.name);
    // console.log(formData);
    const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
    return this.http.post(`http://127.0.0.1:7000/fupload`,formData);
  }

  searchDoc(queryStr: String,start,end){
      return this.http.get(`http://127.0.0.1:7000/suggest?query=${queryStr}&start=${start}&end=${end}`);
  }

  categoriseDoc(fileToUpload){
    const formData: FormData = new FormData();
    formData.set('fileKey', fileToUpload, fileToUpload.name);
    // console.log(formData);
    const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
    return this.http.post(`http://127.0.0.1:7000/categorise`,formData);
  }
  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Course> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Course[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Course>(`getHero id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Course> {
    const url = `http://127.0.0.1:7000/courseinfo?id=${id}`;
    return this.http.get<Course>(url);
  }

  longPoll(id: number): Observable<Course> {
    const url = `http://127.0.0.1:7000/long_poll?id=${id}`;
    return this.http.get<Course>(url);
  }

  // openPDF(filename:string) {
  //   const url = `http://127.0.0.1:7000/open_pdf?fname=${filename}`;
  //   // return this.http.get(url);
  //   return this.http.get(url, { responseType: ResponseContentType.Blob }).map(
  //  (res) => {
  //          return new Blob([res.blob()], { type: 'application/pdf' })
  //      });
  // }
  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Course[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Course[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Course[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addHero (hero: Course): Observable<Course> {
    return this.http.post<Course>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Course) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Course>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero (hero: Course | number): Observable<Course> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Course>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Course>('deleteHero'))
    );
  }

  /** PUT: update the hero on the server */
  updateHero (hero: Course): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
