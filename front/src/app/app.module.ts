import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivityListComponent } from './views/home/activity-list/activity-list.component';
import { ActivityModalComponent } from './views/home/activity-modal/activity-modal.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginModalComponent } from './views/home/login-modal/login-modal.component';
import { UserFormModalComponent } from './views/home/user-form-modal/user-form-modal.component';
import { DeleteModalComponent } from './views/home/delete-modal/delete-modal.component';
import { AboutModalComponent } from './views/home/about-modal/about-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ActivityListComponent,
    ActivityModalComponent,
    LoginModalComponent,
    UserFormModalComponent,
    DeleteModalComponent,
    AboutModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule, 
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
