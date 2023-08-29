import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {BehaviorSubject, EMPTY, Observable, throwError} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {IUser} from "./core/interfaces/user";
import {environment} from "../environments/environment";
import {CreateUserDto, UpdateUserDto} from "./core/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentUser = new BehaviorSubject<IUser>(undefined);
  currentUser$ = this._currentUser.asObservable();
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));
  isAdmin$ = this.currentUser$.pipe(
    map(user => user && user.role.some(role => role === 'ADMIN'))
  );

  constructor(private httpClient: HttpClient) {
    this.currentUser$.subscribe(currentUser => {
      console.log(currentUser);
    });
  }

  get isLogged() {
    return !!this.currentUser$;
  }

  login$(userData: { username: string, password: string }): Observable<IUser> {
    return this.httpClient
      .post<IUser>(`${environment.apiUrl}/users/login`, userData, {withCredentials: true, observe: 'response'})
      .pipe(
        map((response: HttpResponse<IUser>) => response.body),
        catchError((err: HttpErrorResponse) => {
          console.error(err);
          return throwError(err);
        }),
        tap(user => this.handleLogin(user))
      );
  }

  logout$(): Observable<void> {
    return this.httpClient
      .post<void>(`${environment.apiUrl}/users/logout`, {}, {withCredentials: true})
      .pipe(
        tap(() => {
          this.handleLogout();
        })
      );
  }

  register$(userData: CreateUserDto): Observable<IUser> {
    return this.httpClient.post<IUser>(`${environment.apiUrl}/users/register`, userData, {withCredentials: true})
  }

  update$(userId: number, userData: UpdateUserDto): Observable<IUser> {
    return this.httpClient.patch<IUser>(`${environment.apiUrl}/users/${userId}`, userData, {withCredentials: true})
  }

  authenticate(): Observable<IUser> {
    return this.httpClient
      .get<IUser>(`${environment.apiUrl}/users/profile`, {withCredentials: true})
      .pipe(tap(currentProfile => this.handleLogin(currentProfile)), catchError((err) => {
        return EMPTY;
      }))
  }

  handleLogin(newUser: IUser) {
    console.log("login handled")
    this._currentUser.next(newUser);
  }

  handleLogout() {
    console.log("logout handled")
    this._currentUser.next(undefined);
  }

  loadUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`${environment.apiUrl}/users`, {withCredentials: true});
  }
}
