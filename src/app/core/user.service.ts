import {Injectable} from '@angular/core';
import {IBaseUser} from "./interfaces/baseUser";
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

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: any;
  url = 'http://localhost:8080/api/v2/users/'

  get isLogged() {
    return !!this.currentUser;
  }

  constructor(private http: HttpClient) {
  }

  login$(userData: { username: string, password: string }): Observable<IBaseUser> {

    return this.http
      .post<any>(`${environment.apiUrl}users/login`, userData, { withCredentials: true, observe: 'response' })
      .pipe(
        tap(response => console.log(response)),
        map(response => response.body),
        tap(user => this.currentUser = user)
      )
  }

  getProfile$(id:string): Observable<IBaseUser> {
    return this.http.get<IBaseUser>(`${environment.apiUrl}/users/profile/${id}`, {withCredentials: true})
      .pipe(tap(user => this.currentUser = user))
  }

  logout(): void {
  }

  register$(userData: CreateUserDto): Observable<IBaseUser> {
    return this.http.post<IBaseUser>(`${environment.apiUrl}/users/register`, userData, {withCredentials: true})
  }

  loadUsers(): Observable<IBaseUser[]> {
    return this.http.get<IBaseUser[]>(`${environment.apiUrl}/users`, {withCredentials: true});
  }
}
