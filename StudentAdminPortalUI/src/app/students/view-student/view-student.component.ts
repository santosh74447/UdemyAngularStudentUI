import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/uiModels/student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  studentId: string | null | undefined;
  student: Student = {
    "id": '',
    "firstName": '',
    "lastName": '',
    "dateOfBirth": '',
    "email": '',
    "mobile": 0,
    "profileImageUrl": '',
    "genderId": '',
    "gender": {
      "id": '',
      "description": '',
    },
    "address": {
      "id":'',
      "physicalAddress": '',
      "postalAddress":''
    }

  }

  constructor(private readonly studentService: StudentService,
    private readonly route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( //geting parameter sent
      (params) =>{
        this.studentId = params.get('id');//same name as defined in the url

        if(this.studentId){
          this.studentService.getSingleStudent(this.studentId)
          .subscribe(
            (successResponse) =>{
              //console.log(successResponse);
              this.student = successResponse;

            },
            (errorResponse) =>{
              console.log(errorResponse);
            }
          );

        }


      }
    );

    }

}
