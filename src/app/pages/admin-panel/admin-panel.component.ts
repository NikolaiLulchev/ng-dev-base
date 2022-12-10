import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IBaseUser} from "../../core/interfaces/baseUser";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  users:IBaseUser[] = [];
  displayedColumns = ['username', 'level', 'role', 'action'];

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  // onLoadUsers(){  }

  onLoadUsers() {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    }

    // @ts-ignore
    fetch('http://localhost:8080/api/v1/users/', requestOptions).
    then(response => response.json()).
    then(json => {
      this.users = json;
    }).
    catch(error => console.log('error', error))
  }
}
