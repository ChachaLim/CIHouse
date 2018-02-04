import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  name: String;
  constructor(private as: AuthService) {
    this.as.getCurrentUser().subscribe( state => {
      this.name = state.displayName;
    });
  }

  ngOnInit() {
  }

  login() {
    this.as.login();
  }

  logout() {
    this.as.logout();
  }

}

