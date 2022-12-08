import {NgModule} from '@angular/core';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatToolbarModule} from "@angular/material/toolbar";

const MaterialComponents = [
  MatSlideToggleModule,
  MatToolbarModule
];


@NgModule({
  declarations: [],
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule {
}
