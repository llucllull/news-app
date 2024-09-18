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
        path: 'list/:category',
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
    loadComponent: () => import('./news/pages/auth-page/auth-page.component').then(m => m.AuthPageComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./news/pages/auth-page/auth-page.component').then(m => m.AuthPageComponent)
  },
  {
    path: '',
    redirectTo: '/news',
    pathMatch: 'full'
  }
];
