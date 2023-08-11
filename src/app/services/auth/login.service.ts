import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import{ Observable, throwError, catchError, BehaviorSubject, tap } from 'rxjs';
import { User } from './user';
import { UserDetails } from './userDetails';
import { AuthResponse } from './authResponse';
import { RegisterRequest } from './registerRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> =new BehaviorSubject<User>({id:0, email:'', token:'', status:'apto'});
  private userDataSubject: BehaviorSubject<UserDetails | null> = new BehaviorSubject<UserDetails | null>(null);
  

  constructor(private http: HttpClient) { }

  login(credentials:LoginRequest):Observable<AuthResponse>{
    return this.http.post<AuthResponse>('http://localhost:8080/auth/login', credentials).pipe(
    tap(() => {
      this.currentUserLoginOn.next(true);
    }),
    catchError(this.handleError)
  );
}

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error.status, error.error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }

  setUserData(userData: UserDetails) {
    this.userDataSubject.next(userData);
}

getUserData(): Observable<UserDetails | null> {
    return this.userDataSubject.asObservable();
}

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('http://localhost:8080/auth/register', userData).pipe(
      tap(() => {
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    this.currentUserLoginOn.next(false);
  }
}