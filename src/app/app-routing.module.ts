import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {AddOfferComponent} from "./pages/add-offer/add-offer.component";
import {OffersComponent} from "./pages/offers/offers.component";
import {AdminPanelComponent} from "./pages/admin-panel/admin-panel.component";
import {AdminGuard} from "./admin-guard.service";
import {EditProfileComponent} from "./pages/edit-profile/edit-profile.component";
import {ProfileGuard} from "./profile-guard.service";
import {OfferGuard} from "./offer-guard.service";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'users',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [ProfileGuard]
      },
      {
        path: 'edit',
        component: EditProfileComponent
      }
    ]
  },
  {
    path: 'offers',
    children: [
      {
        path: '',
        component: OffersComponent
      },
      {
        path: 'add',
        component: AddOfferComponent,
        canActivate: [OfferGuard]
      },

    ]
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    canActivate: [AdminGuard]
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
