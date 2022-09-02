import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/models/apiModels/gender.model';
import { Student } from 'src/app/models/uiModels/student.model';
import { GenderService } from 'src/app/services/gender.service';
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
  genderList: Gender[] = [];
  isNewStudent = false;
  header = '';
  displayProfileImageUrl = '';

  constructor(private readonly studentService: StudentService,
    private readonly route: ActivatedRoute,
    private readonly genderService: GenderService,
    private snackbar: MatSnackBar,//showing notification when insert/update/delete occurs
    private router: Router //navigating to other screen / open other pages
    ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( //geting parameter sent
      (params) =>{
        this.studentId = params.get('id');//same name as defined in the url

        if(this.studentId){

          //check if route action is add new student
          if(this.studentId.toLowerCase() === 'Add'.toLowerCase()){

            this.isNewStudent = true;
            this.header = 'Add New Student';
            this.setImage();
          }
          else
          {
            //existing other functionality
            this.isNewStudent = false;
            this.header = 'Update Student';
            this.setImage();

          this.studentService.getSingleStudent(this.studentId)
          .subscribe(
            (successResponse) =>{
              //console.log(successResponse);
              this.student = successResponse;
              this.setImage();

            },
            (errorResponse) =>{
              console.log(errorResponse);
              this.setImage();
            }
          );
        }
          this.genderService.getAllGender()
          .subscribe(
            (successResponse) =>{
              //console.log(successResponse);
              this.genderList = successResponse;

            }
          );

        }


      }
    );

    }

    onAdd(): void{
      //call student service to update student
      this.studentService.addStudent(this.student)
      .subscribe(
        (successResponse) =>{
          this.snackbar.open('Student Added Successfully','View Details',{
            duration:2000
            ,verticalPosition:'bottom'
            ,horizontalPosition:'right'
          });
          setTimeout(()=>{
            this.router.navigateByUrl(`students/${successResponse.id}`); //open specific page
            
            },2000);
          //console.log(successResponse);
        },
        (errorResponse)=>{
          this.snackbar.open('Error Occured while adding student details','View Details',{
            duration:2000
            ,verticalPosition:'bottom'
            ,horizontalPosition:'right'
          });

        }

      );
      
      //console.log(this.student);
    }

    onUpdate(): void{
      //call student service to update student
      this.studentService.updateStudent(this.student.id, this.student)
      .subscribe(
        (successResponse) =>{
          this.snackbar.open('Student Updated Successfully','View Details',{
            duration:2000
            ,verticalPosition:'bottom'
            ,horizontalPosition:'right'
          });
          //console.log(successResponse);
        },
        (errorResponse)=>{
          this.snackbar.open('Error Occured while updating student details','View Details',{
            duration:2000
            ,verticalPosition:'bottom'
            ,horizontalPosition:'right'
          });

        }

      );
      
      //console.log(this.student);
    }
    
    onDelete(): void{
      //call student service to update student
      this.studentService.deleteStudent(this.student.id)
      .subscribe(
        (successResponse) =>{
          this.snackbar.open('Student Deleted Successfully','View Details',{
            duration:2000
            ,verticalPosition:'bottom'
            ,horizontalPosition:'right'
          });
          //setting timeouts to dispaly the notificaiton and then go back to the desired page
          setTimeout(()=>{
          this.router.navigateByUrl('students'); //open specific page
          
          },2000);
          //console.log(successResponse);
        },
        (errorResponse)=>{
          this.snackbar.open('Error Occured while deleting student details','View Details',{
            duration:2000
            ,verticalPosition:'bottom'
            ,horizontalPosition:'right'
          });

        }

      );
      
      //console.log(this.student);
    }

    uploadImage(event: any): void{//event type any
      if(this.studentId){
        const file: File = event.target.files[0];
        this.studentService.uploadImage(this.student.id, file)
        .subscribe(
          (successResponse)=>{
            this.snackbar.open('Profile image updated successfully','View Details',{
              duration:2000
              ,verticalPosition:'bottom'
              ,horizontalPosition:'right'
            });

          },
          (errorResponse)=>{
            this.snackbar.open('Error Occured while updating profile image','View Details',{
              duration:2000
              ,verticalPosition:'bottom'
              ,horizontalPosition:'right'
            });

          }
        );
      }
    }

    setImage(): void{
      if(this.student.profileImageUrl){
        //fetch the image by url
        this.displayProfileImageUrl = this.studentService.getImagePath(this.student.profileImageUrl);

      }
      else{
        //or display default image
        this.displayProfileImageUrl = 'assets/user.jpg';

      }
    }

}
