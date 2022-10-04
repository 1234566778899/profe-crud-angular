import { Router } from '@angular/router';
import { Employee } from './../../models/employee';
import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  dataSource = new MatTableDataSource<Employee>();
  displayedColumns: string[] = ["name", "email", "age", "actions"];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(
      (data: Employee[]) => {
        this.dataSource = new MatTableDataSource(data);
      }
    );

  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (data) => {
        this.getEmployees();
      },
      error: (e) => {
        console.log('error: ', e);
      }
    })
  }
  applyFilter(event: Event) {
    let filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLocaleLowerCase();
  }
}

