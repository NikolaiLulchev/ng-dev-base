import {NgModule} from '@angular/core';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";

const modules = [
  MatSlideToggleModule,
  MatToolbarModule,
  MatBottomSheetModule
];


@NgModule({
  declarations: [],
  imports: [modules],
  exports: [modules]
})
export class MaterialModule {
}
