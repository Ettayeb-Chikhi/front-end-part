import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ChartsComponent } from './components/charts/charts.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate:[authGuard],
    children:[
      {
        path:'',
        pathMatch:'full',
        redirectTo:'charts'
      },
      {
        path:'charts',
        component:ChartsComponent
      },
      {
        path:'data-table',
        component:DataTableComponent
      },
      {
        path:'file-upload',
        component:FileUploadComponent
      }
    ]
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'home'
  },
  {
    path:'**',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
