import {Component, OnInit} from '@angular/core';
import {PositionEnum} from "../../core/enums/position.enum";
import {LocationEnum} from "../../core/enums/location.enum";
import {OfferDTO, OfferService} from "../../core/offer.service";
import {PageEvent} from "@angular/material/paginator";
import {LevelEnum} from "../../core/enums/level.enum";

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  // positions = Object.keys(PositionEnum);
  // locations = Object.keys(LocationEnum);
  // levels=Object.values(LevelEnum);
  jobs: OfferDTO[];

  currentPageIndex = 0;
  pageSize = 6;

  location: string;
  position: string;
  level: string;
  company: string

  constructor(private offerService: OfferService) {
    this.jobs = []
  }

  ngOnInit(): void {
    this.loadOffers();
  }

  filterOffers(location?: string, position?: string, level?: string): void {
    this.location = location ? LocationEnum[location] : this.location;
    this.position = position ? PositionEnum[position] : this.position;
    this.level = level ? LevelEnum[level] : this.level;
    this.currentPageIndex = 0;
    this.loadOffers();
  }


  onPageChange(event: PageEvent): void {
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadOffers();
  }

  private loadOffers(): void {
    this.offerService.getAllOffers$(this.location, this.position, this.level).subscribe({
      next: (jobs) => this.jobs = jobs
    });
  }
}
