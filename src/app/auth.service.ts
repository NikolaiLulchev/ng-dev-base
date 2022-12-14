import { Injectable } from '@angular/core';
import {IBaseUser} from "./core/interfaces/baseUser";
import {BehaviorSubject, catchError, filter, of, Subscription, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$$ = new BehaviorSubject<undefined | null | IBaseUser>(undefined);
  user$ = this.user$$.asObservable().pipe(
    filter((val): val is IBaseUser | null => val !== undefined)
  );

  user: IBaseUser | null = null;

  get isLoggedIn() {
    return this.user !== null;
  }

  subscription: Subscription;

  constructor(private http: HttpClient) {
    this.subscription = this.user$.subscribe(user => {
      this.user = user;
    });
  }

  // register(username: string, email: string, password: string, rePassword: string, tel?: string) {
  //   return this.http.post<IBaseUser>(`${environment.apiUrl}/register`, { username, email, password, rePassword, tel })
  //     .pipe(tap(user => this.user$$.next(user)));
  // }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/login`, { username, password }, {withCredentials: true})
      .pipe(tap(user => this.user$$.next(user)));
  }

  logout() {
    return this.http.post<void>(`${environment.apiUrl}/logout`, {}, {withCredentials: true})
      .pipe(tap(() => this.user$$.next(null)));;
  }

  getProfile(id:number) {
    return this.http.get<IBaseUser>(`${environment.apiUrl}/users/${id}`, {withCredentials: true})
      .pipe(
        tap(user => this.user$$.next(user)),
        catchError((err) => {
          this.user$$.next(null);
          return of(err); // [off];
        })
      );
  }

  // setProfile(username: string, email: string, tel?: string) {
  //   return this.http.put<IBaseUser>('/api/users/profile', { username, email, tel })
  //     .pipe(tap(user => this.user$$.next(user)));
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
