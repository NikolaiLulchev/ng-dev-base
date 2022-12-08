import { Component } from '@angular/core';
import {faGithub,faLinkedin} from "@fortawesome/free-brands-svg-icons";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-dev-base';
  faGithub = faGithub;
}
