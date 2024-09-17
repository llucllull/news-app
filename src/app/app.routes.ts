import { Routes } from '@angular/router';
import {AuthGuard} from "./news/guards/auth.guard";

export const routes: Routes = [
  {
    path: 'news',
    loadComponent: () => import('./news/news.component').then(m => m.NewsComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        title: 'Home',
        loadComponent: () => import('./news/pages/home-page/home-page.component').then(m => m.HomePageComponent)
      },
      {
        path: 'list',
        title: 'News List',
        loadComponent: () => import('./news/pages/list-page/list-page.component').then(m => m.ListPageComponent)
      },
      {
        path: 'preferences',
        title: 'Preferences',
        loadComponent: () => import('./news/pages/preferences-page/preferences-page.component').then(m => m.PreferencesPageComponent)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./news/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./news/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: '',
    redirectTo: '/news',
    pathMatch: 'full'
  }
];
