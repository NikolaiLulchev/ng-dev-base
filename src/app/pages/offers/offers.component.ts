import {Component, OnInit} from '@angular/core';
import {PositionEnum} from "../../core/enums/position.enum";
import {LocationEnum} from "../../core/enums/location.enum";
import {OfferDTO, OfferService} from "../../core/offer.service";

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit{
  position: PositionEnum;
  title: string;
  location: LocationEnum;
  company: string;
  addedOn: Date;
  jobs:OfferDTO[]

  constructor(private offerService:OfferService) {
  }

  ngOnInit(): void {
    this.offerService.getAllOffers$().subscribe({
      next:(jobs => this.jobs=jobs)
    })
    }



  // jobs = [
  //   {
  //     position: PositionEnum.FULLSTACK,
  //     title: 'Full Stack Developer',
  //     location: LocationEnum.PLOVDIV,
  //     company: 'DevBase',
  //     addedOn: Date.parse(String(3-3-2022))
  //   },
  //   {
  //     position: PositionEnum.FULLSTACK,
  //     title: 'Full Stack Developer',
  //     location: LocationEnum.PLOVDIV,
  //     company: 'DevBase',
  //     addedOn: Date.parse(String(2022 - 12 - 12))
  //   },
  //   {
  //     position: PositionEnum.FULLSTACK,
  //     title: 'Full Stack Developer',
  //     location: LocationEnum.PLOVDIV,
  //     company: 'DevBase',
  //     addedOn: Date.parse(String(2022 - 12 - 12))
  //   },
  //   {
  //     position: PositionEnum.FULLSTACK,
  //     title: 'Full Stack Developer',
  //     location: LocationEnum.PLOVDIV,
  //     company: 'DevBase',
  //     addedOn: Date.parse(String(2022 - 12 - 12))
  //   },
  //   {
  //     position: PositionEnum.FULLSTACK,
  //     title: 'Full Stack Developer',
  //     location: LocationEnum.PLOVDIV,
  //     company: 'DevBase',
  //     addedOn: Date.parse(String(2022 - 12 - 12))
  //   },
  //   {
  //     position: PositionEnum.FULLSTACK,
  //     title: 'Full Stack Developer',
  //     location: LocationEnum.PLOVDIV,
  //     company: 'DevBase',
  //     addedOn: Date.parse(String(2022 - 12 - 12))
  //   }
  // ]
}

