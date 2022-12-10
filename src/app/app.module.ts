import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import {HeaderComponent} from './core/header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {AboutComponent} from './pages/about/about.component';
import {OffersComponent} from './pages/offers/offers.component';
import {AddOfferComponent} from './pages/add-offer/add-offer.component';
import {AdminPanelComponent} from './pages/admin-panel/admin-panel.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {FooterComponent} from './core/footer/footer.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from "@angular/forms";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatRadioModule} from "@angular/material/radio";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    OffersComponent,
    AddOfferComponent,
    AdminPanelComponent,
    ProfileComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule
  ],
  exports: [FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
