import { Routes } from '@angular/router';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryDetailsComponent } from './country-details/country-details.component';


export const routes: Routes = [
    { path: '', component: CountryListComponent }, // Home route
    { path: 'country/:name', component: CountryDetailsComponent }, // Country detail route
];
