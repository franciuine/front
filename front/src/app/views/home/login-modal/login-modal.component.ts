import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/model/User';
import { UserFormModalComponent } from '../user-form-modal/user-form-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  loginForm: FormGroup;
  user: User;
  hide: Boolean = true;

  constructor(private dialogRef: MatDialogRef<LoginModalComponent>,
              private fb: FormBuilder,
              private dialog: MatDialog) { }

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
    // TODO: implementar login;
  }

  register() {
    this.dialogRef.close(true);
    const dialogRef = this.dialog.open(UserFormModalComponent, {
      minWidth: '500px'
    });
  }

}
