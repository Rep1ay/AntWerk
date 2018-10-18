import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './en/home/home.component';

const routes: Routes = [
  {path: '', redirectTo:'/en/home', pathMatch: 'full'},
  {path: 'en/home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
