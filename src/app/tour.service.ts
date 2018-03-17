import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Tour } from './tour';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TourService {

  private toursUrl = 'api/tours';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET tours from the server */
  getTours (): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.toursUrl)
      .pipe(
        tap(tours => this.log(`fetched tours`)),
        catchError(this.handleError('getTours', []))
      );
  }

  /** GET tour by id. Return `undefined` when id not found */
  getTourNo404<Data>(id: number): Observable<Tour> {
    const url = `${this.toursUrl}/?id=${id}`;
    return this.http.get<Tour[]>(url)
      .pipe(
        map(tours => tours[0]), // returns a {0|1} element array
        tap(t => {
          const outcome = t ? `fetched` : `did not find`;
          this.log(`${outcome} tour id=${id}`);
        }),
        catchError(this.handleError<Tour>(`getTour id=${id}`))
      );
  }

  /** GET tour by id. Will 404 if id not found */
  getTour(id: number): Observable<Tour> {
    const url = `${this.toursUrl}/${id}`;
    return this.http.get<Tour>(url).pipe(
      tap(_ => this.log(`fetched tour id=${id}`)),
      catchError(this.handleError<Tour>(`getTour id=${id}`))
    );
  }

  /* GET tours whose name contains search term */
  searchTours(term: string): Observable<Tour[]> {
    if (!term.trim()) {
      // if not search term, return empty tour array.
      return of([]);
    }
    return this.http.get<Tour[]>(`api/tours/?name=${term}`).pipe(
      tap(_ => this.log(`found tours matching "${term}"`)),
      catchError(this.handleError<Tour[]>('searchTours', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new tour to the server */
  addTour (tour: Tour): Observable<Tour> {
    return this.http.post<Tour>(this.toursUrl, tour, httpOptions).pipe(
      tap((tour: Tour) => this.log(`added tour w/ id=${tour.id}`)),
      catchError(this.handleError<Tour>('addTour'))
    );
  }

  /** DELETE: delete the tour from the server */
  deleteTour (tour: Tour | number): Observable<Tour> {
    const id = typeof tour === 'number' ? tour : tour.id;
    const url = `${this.toursUrl}/${id}`;

    return this.http.delete<Tour>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted tour id=${id}`)),
      catchError(this.handleError<Tour>('deleteTour'))
    );
  }

  /** PUT: update the tour on the server */
  updateTour (tour: Tour): Observable<any> {
    return this.http.put(this.toursUrl, tour, httpOptions).pipe(
      tap(_ => this.log(`updated tour id=${tour.id}`)),
      catchError(this.handleError<any>('updateTour'))
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

  /** Log a TourService message with the MessageService */
  private log(message: string) {
    this.messageService.add('TourService: ' + message);
  }
}
