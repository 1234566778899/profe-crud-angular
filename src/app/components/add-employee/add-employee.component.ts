import { Router, RouterLink, RouterModule, ActivatedRoute } from '@angular/router';
import { EmployeeService } from './../../services/employee.service';
import { Employee } from './../../models/employee';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  myform!: FormGroup;
  id!: number;

  constructor(private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.loadMyForm();
  }

  loadMyForm(): void {
    this.myform = this.formBuilder.group({
      id: [""],
      name: ["", [Validators.required, Validators.maxLength(20)]],
      email: ["", [Validators.email, Validators.required]],
      age: [0, [Validators.required]]
    });

    this.id = this.activatedRouter.snapshot.params['id'];
    if (this.id != undefined) {

      this.employeeService.getEmployee(this.id).subscribe(
        (data: Employee) => {
          this.myform.get("name")?.setValue(data.name);
          this.myform.get("email")?.setValue(data.email);
          this.myform.get("age")?.setValue(data.age);
        },
      )

    } else {
      this.id = 0;
    }

  }

  saveEmployee(): void {
    const employee: Employee = {
      id: this.id,
      name: this.myform.get("name")?.value,
      email: this.myform.get("email")?.value,
      age: this.myform.get("age")?.value
    }

    if (this.id == 0) {
      this.employeeService.addEmployee(employee).subscribe({
        next: (data) => {
          this.snack.open('El empleado se agregó con éxito', 'OK', { duration: 5000 });
          this.router.navigate(['list']);
        },
        error: (e) => {
          console.log(e);
        }
      });
    } else {
      this.employeeService.updateEmployee(employee).subscribe({
        next: (data) => {
          this.snack.open(`El empleado ${employee.name} se editó correctamente`, 'OK', { duration: 5000 });
          this.router.navigate(['list']);
        },
        error: (e) => {
          console.log(e);
        }
      });
    }
  }
}
