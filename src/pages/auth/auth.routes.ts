import { Routes } from "@angular/router";

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
                loadComponent: () => import('./login/login.component'),
                title: 'Login'
            },
            {
                path: 'signup',
                loadComponent: () => import('./signup/signup.component'),
                title: 'Signup'
            }
        ]
    },
];

export default routes;
