import { Routes } from "@angular/router";

export enum AuthFlow {
  LOGIN,
  SIGNUP
}

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () => import('../ui/auth.page'),
        data: { flow: AuthFlow.LOGIN },
        title: 'Login'
      },
      {
        path: 'signup',
        loadComponent: () => import('../ui/auth.page'),
        data: { flow: AuthFlow.SIGNUP },
        title: 'Signup'
      }
    ]
  },
];

export default routes;
