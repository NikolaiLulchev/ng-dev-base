import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CompanyDTO, OfferDTO, OfferService} from '../../core/offer.service'; // Import CompanyDTO
import {AuthService} from '../../auth.service';
import {IUser} from '../../core/interfaces/user';
import {LevelEnum, LocationEnum, PositionEnum, TechEnum} from '../../core/enums';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {
  addOfferForm: FormGroup;
  currentUser: IUser;
  currentCompany: CompanyDTO; // Define the variable to hold the current company

  positions = Object.keys(PositionEnum);
  locations = Object.keys(LocationEnum);
  experience = Object.keys(LevelEnum);
  techStack = Object.keys(TechEnum);

  constructor(
    private formBuilder: FormBuilder,
    private offerService: OfferService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authService.authenticate().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.initializeForm();
        this.getCompanyForUser(); // Call the method here
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

    this.offerService.addOffer$(offer).subscribe({
      next: () => {
        // Redirect to the page that displays all offers
        this.router.navigate(['/offers']); // Make sure to inject Router into your component
      },
      error: (error) => {
        console.error('Error adding offer:', error);
      }
    });
  }


  getCompanyForUser(): void {
    this.offerService.getCompany$(this.currentUser.username).subscribe({
      next: (company) => {
        this.currentCompany = company;
        if (this.currentCompany) {
          this.addOfferForm.get('companyName').setValue(this.currentCompany.name);
          this.addOfferForm.get('companyName').disable(); // Disable the field if company is available
        } else {
          this.addOfferForm.get('companyName').enable(); // Enable the field if no company is associated
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
