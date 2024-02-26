import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './shared/guard/auth.guard';
// import { UnauthenticatedGuard } from './shared/guard/un-a.guard';
// import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{
  path: '',
 redirectTo:'/sign-up',pathMatch:'full'
},{
path:'sign-up',component:SignUpComponent
// ,canActivate:[UnauthenticatedGuard]
},

{
  path:'login',
  component: SignInComponent
  // ,canActivate:[UnauthenticatedGuard]

},
{
  path:'forget-password',
  component: ForgetPasswordComponent
  // ,canActivate:[UnauthenticatedGuard]
},{
  path:'verify-email',
  component: VerifyEmailComponent
  // ,canActivate:[UnauthenticatedGuard]
  // canActivate:[AuthGuard]
},
{
  path:'dashboard',
  component: DashboardComponent,
  // canActivate:[AuthGuard]
  canActivate:[AuthGuard]
},{
  path:'admin-dashboard',
  component: AdminDashboardComponent,
  canActivate:[AuthGuard]
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:false})],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
