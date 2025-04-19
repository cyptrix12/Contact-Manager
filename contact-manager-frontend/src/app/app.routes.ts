import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactsListComponent } from './pages/contacts-list/contacts-list.component';
import { ContactDetailsComponent } from './pages/contacts-details/contacts-details.component';
import { ContactAddComponent } from './pages/contact-add/contact-add.component';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contacts/add', component: ContactAddComponent, canActivate: [AuthGuard] },
  { path: 'contacts/:id', component: ContactDetailsComponent },
  { path: 'contacts', component: ContactsListComponent },
  
];
