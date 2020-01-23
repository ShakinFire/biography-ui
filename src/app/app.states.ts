import { Routes } from '@angular/router';
import { ProfileComponent } from '../components/profile/profile.component';
import { ProfileEditComponent } from '../components/profile/edit/profile-edit.component';
import { BiographyComponent } from '../components/biography/biography.component';

export const appStates: Routes = [
  {
    path: '',
    component: BiographyComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'profile-edit',
    component: ProfileEditComponent,
  },
];
