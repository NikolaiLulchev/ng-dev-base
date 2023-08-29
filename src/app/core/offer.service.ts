import {Injectable} from '@angular/core';
import {ITechStack} from "./interfaces/techStack";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {IUser} from "./interfaces/user";

export interface CompanyDTO {
  id: number,
  name: String,
  users: IUser[]
}

export interface OfferDTO {
  id: number,
  username: string,
  position: string,
  title: string,
  location: string,
  description: string,
  addedOn: Date,
  isActive: boolean,
  level: string,
  techStack: ITechStack[],
  company: CompanyDTO
}

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) {
  }

  getCompany$(username: string): Observable<{}> {
    return this.http.get(`${environment.apiUrl}/company`, {withCredentials: true})
  }

  getAllOffers$(location?: string, position?: string, level?: string): Observable<OfferDTO[]> {
    let params = new HttpParams();
    if (location) {
      params = params.set('location', location);
    }
    if (position) {
      params = params.set('position', position);
    }
    if (level) {
      params = params.set('level', level);
    }
    return this.http.get<OfferDTO[]>(`${environment.apiUrl}/offers`, {params, withCredentials: true});
  }

  // getAllOffers$(): Observable<OfferDTO[]> {
  //   return this.http.get<OfferDTO[]>(`${environment.apiUrl}/offers`, {withCredentials: true});
  // }

  getOfferById$(offerId: number): Observable<OfferDTO> {
    return this.http.get<OfferDTO>(`${environment.apiUrl}/offers/${offerId}`, {withCredentials: true});
  }

  addOffer$(offer: OfferDTO): Observable<OfferDTO> {
    return this.http.post<OfferDTO>(`${environment.apiUrl}/offers/add`, offer, {withCredentials: true})
  }
}
