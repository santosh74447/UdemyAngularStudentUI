import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
{
  path:'dep', component:DepartmentListComponent
}
,{
  path:'emp', component:EmployeeListComponent

}
,{
  path:'**', component:AppComponent

}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//importing all pages 
export const routingComponent = 
[
  DepartmentListComponent,
  EmployeeListComponent
]
