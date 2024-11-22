import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../ui/landing.component')
  }
];

export default routes;
