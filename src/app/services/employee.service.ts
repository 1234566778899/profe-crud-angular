import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get<Employee[]>('http://localhost:3000/employees');
  }

  getEmployee(id: number) {
    return this.http.get<Employee>(`http://localhost:3000/employees/${id}`);
  }
  addEmployee(employee: Employee) {
    return this.http.post<Employee>('http://localhost:3000/employees',employee);
  }
  updateEmployee(employee:Employee){
    return this.http.put<Employee>(`http://localhost:3000/employees/${employee.id}`,employee);
  }

  deleteEmployee(id:number){
    return this.http.delete(`http://localhost:3000/employees/${id}`);
  }
}
