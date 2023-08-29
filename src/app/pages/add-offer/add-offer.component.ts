import {Component, OnInit} from '@angular/core';
import {PositionEnum} from "../../core/enums/position.enum";
import {LocationEnum} from "../../core/enums/location.enum";
import {LevelEnum} from "../../core/enums/level.enum";
import {TechEnum} from "../../core/enums/tech.enum";
import {FormBuilder, FormGroup} from "@angular/forms";
import {OfferDTO, OfferService} from "../../core/offer.service";
import {IUser} from "../../core/interfaces/user";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {
  addOfferForm: FormGroup;
  positions = Object.keys(PositionEnum);
  locations = Object.keys(LocationEnum);
  description: string;
  experience = Object.keys(LevelEnum);
  techStack = Object.keys(TechEnum);
  title: string;
  company: string;
  currentUser: IUser;

  constructor(private formBuilder: FormBuilder, private offerService: OfferService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.authenticate().subscribe({
      next: (user) => {
        this.currentUser = user;
        console.log("current user " + JSON.stringify(user))

        if (this.currentUser) {
          this.addOfferForm = this.formBuilder.group({
            position: [''],
            title: [''],
            location: [''],
            description: [''],
            level: [''],
            techStack: [''],
            company: ['']
          });
        }
        console.log("Form initialized:", this.addOfferForm);
      },
      error: (err) => {
        console.error(err)
      }
    });
  }


  onSubmit() {
    console.log('Form values:', this.addOfferForm.value);

    const offer: OfferDTO = {
      addedOn: undefined,
      id: null,
      isActive: false,
      username: this.currentUser.username,
      company: this.addOfferForm.value.company,
      position: this.addOfferForm.value.position,
      title: this.addOfferForm.value.title,
      location: this.addOfferForm.value.location,
      description: this.addOfferForm.value.description,
      level: this.addOfferForm.value.level,
      techStack: this.addOfferForm.value.techStack
    };
    console.log('Offer object:', offer);

    this.offerService.addOffer$(offer).subscribe();
  }
}
