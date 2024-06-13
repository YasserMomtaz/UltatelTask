import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './guards/login.guard';
import { StudentListComponent } from './student/student-list/student-list.component';

const routes: Routes = [{path:"register",component:RegisterComponent},
{path:"",component:LoginComponent},
{path:"student",component:StudentListComponent,canActivate:[LoginGuard]},
{path:"**",component:LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
