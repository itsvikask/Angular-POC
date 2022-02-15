import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserGuardService } from './guards/user-guard.service';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: SideNavComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [UserGuardService]
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [UserGuardService]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
