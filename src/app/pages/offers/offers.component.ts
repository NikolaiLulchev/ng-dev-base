import {Component, OnInit} from '@angular/core';
import {PositionEnum} from "../../core/enums/position.enum";
import {LocationEnum} from "../../core/enums/location.enum";
import {OfferDTO, OfferService} from "../../core/offer.service";

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  positions: PositionEnum;
  title: string;
  locations: LocationEnum;
  company: string;
  addedOn: Date;
  jobs: OfferDTO[];

  pageSize = 6;
  pageIndex = 0;

  constructor(private offerService: OfferService) {
  }

  ngOnInit(): void {
    this.offerService.getAllOffers$().subscribe({
      next: (jobs) => this.jobs = jobs,
    });
  }
}

