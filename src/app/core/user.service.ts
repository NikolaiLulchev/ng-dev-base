import { Injectable } from '@angular/core';
import {IBaseUser} from "./interfaces/baseUser";
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";

export interface CreateUserDto { username: string, email: string, password: string, tel?: string }

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser!: IBaseUser;
  url = 'http://localhost:8080/api/v1/users/'

  get isLogged() {
    return !!this.currentUser;
  }

  constructor(private http: HttpClient) {
  }

  // login$(userData: { email: string, password: string }): Observable<IBaseUser> {
  //   // @ts-ignore
  //   // @ts-ignore
  //   return this.httpClient
  //     .post<IBaseUser>(`${environment.apiUrl}/login`, userData, { withCredentials: true, observe: 'response' })
  //     .pipe(
  //       tap(response => console.log(response)),
  //       map(response => response.body),
  //       tap(user => this.currentUser = user)
  //     )
  // }

  getProfile$(): Observable<IBaseUser> {
    return this.http.get<IBaseUser>(`${environment.apiUrl}/users/profile`, { withCredentials: true })
      .pipe(tap(user => this.currentUser = user))
  }

  logout(): void {
  }

  register$(userData: CreateUserDto): Observable<IBaseUser> {
    return this.http.post<IBaseUser>(`${environment.apiUrl}/register`, userData, { withCredentials: true })
  }

  loadUsers():Observable<IBaseUser[]>{
    return this.http.get<IBaseUser[]>(this.url, { withCredentials: true });
  }
}
