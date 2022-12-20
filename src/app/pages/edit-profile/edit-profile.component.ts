import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GenderEnum} from "../../core/enums/gender.enum";
import {LevelEnum} from "../../core/enums/level.enum";
import {TechEnum} from "../../core/enums/tech.enum";
import {IUser} from "../../core/interfaces/user";
import {UserService} from "../../core/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  editForm: FormGroup;
  genderOptions = Object.values(GenderEnum);
  experienceLevelOptions = Object.values(LevelEnum);
  techStackOptions = Object.values(TechEnum);

  currentUser: IUser;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
  }

  ngOnInit() {

    this.userService.getProfile$().subscribe({
      next: (user) => {
        this.currentUser = user;
        console.log("edit user " + JSON.stringify(user))
        if (this.currentUser) {
          this.editForm = this.formBuilder.group({
            username: [this.currentUser.username],
            email: [this.currentUser.email],
            gender: [this.currentUser.gender],
            experienceLevel: [this.currentUser.level],
            firstName: [this.currentUser.firstName],
            lastName: [this.currentUser.lastName],
            techStack: [this.currentUser.techStack]
          });
        }
        console.log("formGroup values " + JSON.stringify(this.editForm.value))
      },
      error: () => {
        this.router.navigate(['/users/login'])
      }
    })
  }

  onSubmit() {
    // TODO: Implement submit functionality
    console.log(this.editForm.value);
  }
}
