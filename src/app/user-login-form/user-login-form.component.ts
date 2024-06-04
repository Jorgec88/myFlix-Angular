import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
//import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  //standalone: true,
  //imports: [],
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { username: '', password: '' }

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
) { }

ngOnInit(): void {
}

loginUser(): void {
  this.fetchApiData.userLogin(this.userData).subscribe((result) => {
    //Logic for a successful user login
    localStorage.setItem('user', JSON.stringify(result.user));
    localStorage.setItem('token', result.token);
    this.dialogRef.close(); // Will close modal on success
    this.snackBar.open('User login successful', 'OK', {
      duration: 2000
    });
    this.router.navigate(['movies'])
  }, (result) => {
    this.snackBar.open('User login failed', 'OK', {
      duration: 2000
    });
  });
 }
}
