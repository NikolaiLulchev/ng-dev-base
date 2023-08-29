import {Component} from '@angular/core';
import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  faGithub = faGithub
  faLinkedin = faLinkedin
  date = new Date().getFullYear()

}
