import {Injectable} from '@angular/core';
import {IUser} from "./interfaces/user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {environment} from "../../environments/environment";

export interface CreateUserDto {
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  role: string,
  firstName: string,
  lastName: string
}

export interface UpdateUserDto {
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  role: string,
  firstName: string,
  lastName: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: any;

  get isLogged() {
    return !!this.currentUser;
  }

  constructor(private http: HttpClient) {
  }

  // login$(userData: { username: string, password: string }): Observable<IUser> {
  //
  //   return this.http
  //     .post<any>(`${environment.apiUrl}users/login`, userData, { withCredentials: true, observe: 'response' })
  //     .pipe(
  //       tap(response => console.log(response)),
  //       map(response => response.body),
  //       tap(user => this.currentUser = user)
  //     )
  // }

  getProfile$(): Observable<IUser> {
    return this.http.get<IUser>(`${environment.apiUrl}/users/profile`, {withCredentials: true})
      .pipe(tap(user => this.currentUser = user))
  }

  // logout(): void {
  // }

  register$(userData: CreateUserDto): Observable<IUser> {
    return this.http.post<IUser>(`${environment.apiUrl}/users/register`, userData, {withCredentials: true})
  }

  loadUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${environment.apiUrl}/users`, {withCredentials: true});
  }

  isAdmin() {
//TODO lulchevn
    return true;
  }
}
