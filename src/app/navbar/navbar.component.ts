import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  name: String;
  isLogin = false;
  constructor(private as: AuthService) {
    this.as.getCurrentUser().subscribe( state => {
      if (state) {
        this.name = state.displayName;
        this.isLogin = true;
        console.log(this.name);
      }
    });
  }

  ngOnInit() {
  }

  login() {
    this.as.login();
  }

  logout() {
    this.as.logout();
    this.isLogin = false;
  }

}

