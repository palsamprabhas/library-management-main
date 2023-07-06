import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { LogoutComponent } from './components/components/logout/logout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StudentComponent } from './components/student/student.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { TakebookComponent } from './components/takebook/takebook.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'student', component: StudentComponent },
  {path:'book',component: BookComponent},
  {path:'logout',component: LogoutComponent},
  {path:'admin-profile',component: AdminProfileComponent},
  {path:'take-book',component: TakebookComponent},
  { path: '',   redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
