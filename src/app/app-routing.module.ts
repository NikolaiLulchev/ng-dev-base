
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
