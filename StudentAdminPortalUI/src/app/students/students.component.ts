import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../models/uiModels/student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  displayedColumns: string[] = ['firstName','lastName','dateOfBirth','mobile','email','gender','edit'];
  dataSource: MatTableDataSource<Student> =
                                  new MatTableDataSource<Student>(); //usefull for pagination and displaying data
  @ViewChild(MatPaginator) matPaginator!:MatPaginator;
  @ViewChild(MatSort) matSort!:MatSort;
  filterString = '';

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    //fetch students
    this.studentService.getAllStudent()
    .subscribe(
      (successResponse)=>{
        this.students = successResponse;
        this.dataSource = new MatTableDataSource<Student>(this.students);

        if(this.matPaginator){
          this.dataSource.paginator = this.matPaginator;
        }
        if(this.matSort){
          this.dataSource.sort = this.matSort;
        }
        // console.log(successResponse[0].firstName);
        // console.log(successResponse[0].lastName);
      },
      (errorResponse) =>{
        console.log(errorResponse);
      }
    );//necessary to call the method
  }

  filterStudents(){
    this.dataSource.filter = this.filterString.trim().toLowerCase();


  }

}
