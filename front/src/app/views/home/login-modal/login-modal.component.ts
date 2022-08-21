import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/model/User';
import { UserFormModalComponent } from '../user-form-modal/user-form-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { httpRequest } from 'src/app/shared/service/Global';
import { UserService } from 'src/app/shared/service/User.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  loginForm: FormGroup;
  user: User;
  hide: Boolean = true;
  FinalformData: FormData;
  fileName: string;

  constructor(private dialogRef: MatDialogRef<LoginModalComponent>,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private userService: UserService
            ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],

    });
  }

  cancel() {
    this.dialogRef.close(true);
    this.loginForm.reset();
  }

  getErrorMessage() {
    return 'Este campo é obrigatório';
  }


  login() {
    let vm  = this;
    this.userService.login(this.loginForm.controls["login"].value, this.loginForm.controls["password"].value).
    subscribe ({
      next(response) {
        localStorage.setItem("token", response);
        vm.userService.loggedUser(response).
        subscribe( {
          next(responseLoggedUser) {
            localStorage.setItem("username", responseLoggedUser);
            location.reload();
          },
          error(error) {
            alert("Erro: " + JSON.stringify(error))
          }  
        });
      } ,error(error) {
        alert("Erro: " + JSON.stringify(error))
      }
    });
  }

  register() {
    this.dialogRef.close(true);
    const dialogRef = this.dialog.open(UserFormModalComponent, {
      minWidth: '500px'
    });
  }

}
