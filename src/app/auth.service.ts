import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {BehaviorSubject, EMPTY, Observable} from "rxjs";
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
  )



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
        map(response => response.body),
      )
  }

  logout$(): Observable<void> {
    return this.httpClient
      .post<void>(`${environment.apiUrl}/users/logout`, {}, {withCredentials: true})
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
    this._currentUser.next(newUser);
  }

  handleLogout() {
    this._currentUser.next(undefined);
  }



  loadUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`${environment.apiUrl}/users`, {withCredentials: true});
  }


}
