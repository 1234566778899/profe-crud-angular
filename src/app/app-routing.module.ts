import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { ListEmployeeComponent } from './components/list-employee/list-employee.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ListEmployeeComponent },
  { path: 'list', component: ListEmployeeComponent },
  { path: 'add', component: AddEmployeeComponent },
  { path: 'edit/:id', component: AddEmployeeComponent },
  { path: 'recuperar', component: RecuperarComponent },
  { path: '**', component: AddEmployeeComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
