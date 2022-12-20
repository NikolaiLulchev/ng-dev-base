import {Component} from '@angular/core';
import {PositionEnum} from "../../core/enums/position.enum";
import {LocationEnum} from "../../core/enums/location.enum";

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent {
  position: PositionEnum;
  title: string;
  location: LocationEnum;
  company: string;
  addedOn: Date;

  jobs = [
    {
      position: PositionEnum.FULLSTACK,
      title: 'Full Stack Developer',
      location: LocationEnum.PLOVDIV,
      company: 'DevBase',
      addedOn: Date.parse(String(2022 - 12 - 12))
    },
    {
      position: PositionEnum.FULLSTACK,
      title: 'Full Stack Developer',
      location: LocationEnum.PLOVDIV,
      company: 'DevBase',
      addedOn: Date.parse(String(2022 - 12 - 12))
    },
    {
      position: PositionEnum.FULLSTACK,
      title: 'Full Stack Developer',
      location: LocationEnum.PLOVDIV,
      company: 'DevBase',
      addedOn: Date.parse(String(2022 - 12 - 12))
    },
    {
      position: PositionEnum.FULLSTACK,
      title: 'Full Stack Developer',
      location: LocationEnum.PLOVDIV,
      company: 'DevBase',
      addedOn: Date.parse(String(2022 - 12 - 12))
    },
    {
      position: PositionEnum.FULLSTACK,
      title: 'Full Stack Developer',
      location: LocationEnum.PLOVDIV,
      company: 'DevBase',
      addedOn: Date.parse(String(2022 - 12 - 12))
    },
    {
      position: PositionEnum.FULLSTACK,
      title: 'Full Stack Developer',
      location: LocationEnum.PLOVDIV,
      company: 'DevBase',
      addedOn: Date.parse(String(2022 - 12 - 12))
    }
  ]
}

