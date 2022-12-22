import {Component, OnInit} from '@angular/core';
import {PositionEnum} from "../../core/enums/position.enum";
import {LocationEnum} from "../../core/enums/location.enum";
import {OfferDTO, OfferService} from "../../core/offer.service";
import {PageEvent} from "@angular/material/paginator";

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
  jobs: OfferDTO[] = [];
  pageSize = 6;
  pageEvent: PageEvent = {} as PageEvent;  // initialize as an empty object

  displayedJobs: OfferDTO[];

  updateDisplayedJobs() {
    const startIndex = this.pageEvent.pageIndex * this.pageEvent.pageSize;
    this.displayedJobs = this.jobs.slice(startIndex, startIndex + this.pageEvent.pageSize);
  }

  constructor(private offerService:OfferService) {
  }

  ngOnInit(): void {
    this.offerService.getAllOffers$().subscribe({
      next:(jobs => this.jobs=jobs)
    })
    this.updateDisplayedJobs();
  }
}

