import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'YOUR_HOSTED_API_URL_HERE/';
@Injectable({
  providedIn: 'root'
})

//export class FetchApiDataService {

  //constructor() { }
//}
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
    );
  }

 
getAllMovies(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

private extractResponseData(res: Response): any {
  const body = res;
  return body || { };
}

getOneMovies(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies' + title, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

getDirector(Name: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies/directors/:Name', {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

getGenre(genreName: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies/genre/:Name', {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

getUser(): Observable<any> {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");
  const url = apiUrl + "users/" + user.userName;
  const headers = new HttpHeaders({
    Authorization: "Bearer " + token,
  });
  return this.http.get(url, { headers }).pipe(
    tap((result: any) => {
    }),
    map(this.extractResponseData),
    catchError((error) => {
      console.error("API Error:", error);
      return this.handleError(error);
    })
  );
}

getFavouriteMovies(userName: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'users/' + userName, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

addFavouriteMovies(userName: string, movieid: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.post(apiUrl + 'users/' + userName + '/movies/' + movieid, null, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

updateUser(userDetails: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.put(apiUrl + 'users/' + userDetails.userName, userDetails, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

deleteUser(): Observable<any> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    "Authorization": `Bearer ${token}`
  });
  return this.http.delete(apiUrl + 'users/' + user.email, { headers: headers, responseType: 'text' })
    .pipe(take(1), catchError(this.handleError));
}

deleteFavoriteMovie(userName: string, movieid: string): Observable<any> {
  const token = localStorage.getItem('token');
  console.log('Deleting movie with ID:', movieid);
  return this.http.delete(apiUrl + 'users/' + userName + '/movies/' + movieid, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

private handleError(error: HttpErrorResponse): any {
  if (error.error instanceof ErrorEvent) {
  console.error('Some error occurred:', error.error.message);
  } else {
  console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`);
  }
  const err = new Error('Something went wrong, please try again later.');
  throwError(() => err);
}
}  