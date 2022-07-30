import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/model/User';
import { UserService } from 'src/app/shared/service/User.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-form-modal',
  templateUrl: './user-form-modal.component.html',
  styleUrls: ['./user-form-modal.component.css']
})
export class UserFormModalComponent implements OnInit {

  registerForm: FormGroup;
  user: User;
  hide: Boolean = true;
  passWordError: String = 'As senhas não conferem.'

  constructor(private dialogRef: MatDialogRef<UserFormModalComponent>,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private userService: UserService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  cancel() {
    this.dialogRef.close(true);
    this.registerForm.reset();
  }

  getErrorMessage() {
    return 'Este campo é obrigatório';
  }

  createUser() {
    if(!this.comparePasswords() && this.registerForm.valid) {
      this.user = new User();
      this.user.name = this.registerForm.get('name')?.value;
      this.user.login = this.registerForm.get('login')?.value;
      this.user.password = this.registerForm.get('password')?.value;
      this.userService.save(this.user).subscribe(() => {
        this.dialogRef.close(true);
        this._snackBar.open("Usuário cadastrado com sucesso!", "OK");
      });
    }
  }

  comparePasswords() {
    return this.registerForm.get('password')?.value != this.registerForm.get('confirmPassword')?.value;
  }
}

