import { Component } from '@angular/core';
import {PositionEnum} from "../../core/enums/position.enum";
import {LocationEnum} from "../../core/enums/location.enum";
import {LevelEnum} from "../../core/enums/level.enum";
import {TechEnum} from "../../core/enums/tech.enum";

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent {
  positions=Object.values(PositionEnum);
  locations=Object.values(LocationEnum);
  description: string;
  experience=Object.values(LevelEnum);
  techStack=Object.values(TechEnum);
  title: string;

}
