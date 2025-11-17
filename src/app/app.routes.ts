import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Project } from './project/project';

export const routes: Routes = [
  { path: '', component: Project },
  { path: 'dashboard', component: Dashboard },
  { path: '**', redirectTo: '' },
];
