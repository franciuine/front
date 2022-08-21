import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/service/User.service';
import { AboutModalComponent } from './about-modal/about-modal.component';
import { ActivityModalComponent } from './activity-modal/activity-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hasLoggedUser: boolean = false;
  currentUsername: String;

  constructor(private dialog: MatDialog,
              private userService: UserService) { 
    
  }

  ngOnInit(): void {
    this.hasLoggedUser = localStorage.getItem("token") != "noUser" ? true : false;
    if(this.hasLoggedUser) {
      this.currentUsername = localStorage.getItem("username")!;
    }
  }

  newActivity() {
    const dialogRef = this.dialog.open( ActivityModalComponent, {
      minWidth: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  login() {
    const dialogRef = this.dialog.open( LoginModalComponent, {
      minWidth: '350px'
    });
  }

  logout() {
    localStorage.setItem("token", "noUser");
    this.hasLoggedUser = false;
    location.reload();
  }

  showAboutInfo() {
    const dialogRef = this.dialog.open( AboutModalComponent, {
      maxWidth: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
