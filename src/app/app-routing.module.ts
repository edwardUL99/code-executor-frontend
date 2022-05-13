import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeIdeComponent } from './components/code-ide/code-ide.component';
import { HomeComponent } from './components/home/home.component';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  { path: 'code', component: CodeIdeComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: IndexComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
