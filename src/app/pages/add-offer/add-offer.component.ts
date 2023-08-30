import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OfferDTO, OfferService} from '../../core/offer.service';
import {AuthService} from '../../auth.service';
import {IUser} from '../../core/interfaces/user';
import {LevelEnum, LocationEnum, PositionEnum, TechEnum} from '../../core/enums';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {
  addOfferForm: FormGroup;
  currentUser: IUser;

  positions = Object.keys(PositionEnum);
  locations = Object.keys(LocationEnum);
  experience = Object.keys(LevelEnum);
  techStack = Object.keys(TechEnum);

  constructor(
    private formBuilder: FormBuilder,
    private offerService: OfferService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.authenticate().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.initializeForm();
        console.log('current user', JSON.stringify(user));
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  initializeForm(): void {
    this.addOfferForm = this.formBuilder.group({
      companyName: [''],
      title: [''],
      position: [''],
      location: [''],
      description: [''],
      level: [''],
      techStack: ['']
    });
    console.log('Form initialized:', this.addOfferForm);
  }

  onSubmit(): void {
    console.log('Form values:', this.addOfferForm.value);

    const offer: OfferDTO = {
      addedOn: undefined,
      id: null,
      isActive: false,
      username: this.currentUser.username,
      ...this.addOfferForm.value
    };
    console.log('Offer object:', offer);

    this.offerService.addOffer$(offer).subscribe();
  }
}
