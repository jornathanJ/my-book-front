import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './pages/book-list/book-list.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { BookDetailComponent } from './shared/component/book-detail/book-detail.component';


const routes: Routes = [
  { path: '', component: BookListComponent},
  { path: 'book-list', component: BookListComponent},
  { path: 'book-detail', component: BookDetailComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: false } // <-- 디버그 활성화
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
