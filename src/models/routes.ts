import { Routes } from '@angular/router';
import { FormTourComponent } from 'src/app/form-tour/form-tour.component';
import { HomeComponent } from 'src/app/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { title: 'Home', path: 'home', component: HomeComponent },
    { title: 'Form Validation Tour', path: 'form-tour', component: FormTourComponent },
];
