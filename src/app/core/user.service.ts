import {Injectable} from '@angular/core';

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

  // get isLogged() {
  //   return !!this.currentUser;
  // }
  //
  // constructor(private http: HttpClient) {
  // }
  //
  //
  // getProfile$(): Observable<IUser> {
  //   return this.http.get<IUser>(`${environment.apiUrl}/users/profile`, {withCredentials: true})
  //     .pipe(tap(user => this.currentUser = user))
  // }

  // logout(): void {
  // }

  // register$(userData: CreateUserDto): Observable<IUser> {
  //   return this.http.post<IUser>(`${environment.apiUrl}/users/register`, userData, {withCredentials: true})
  // }

  // loadUsers(): Observable<IUser[]> {
  //   return this.http.get<IUser[]>(`${environment.apiUrl}/users`, {withCredentials: true});
  // }

}
