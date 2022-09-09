import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/apiModels/student.model';
import { UpdateStudentRequestData } from '../models/apiModels/update-student-request-data.model';
import { AddStudentRequestData } from '../models/apiModels/add-student-request-data.model';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl = environment.baseApiUrl;
  constructor(private httpClient: HttpClient) { }

  getAllStudent():Observable<Student[]>{
    return this.httpClient.get<Student[]>(this.baseApiUrl+'/students');

  }

  getSingleStudent(studentId: string):Observable<Student>{
    return this.httpClient.get<Student>(this.baseApiUrl+'/students/'+studentId);

  }
  addStudent(studentRequestData: Student)
  :Observable<Student>
  {
    const addStudentRequestData: AddStudentRequestData = {
      firstName: studentRequestData.firstName,
      lastName: studentRequestData.lastName,
      dateOfBirth: studentRequestData.dateOfBirth,
      email: studentRequestData.email,
      mobile: studentRequestData.mobile,
      genderId: studentRequestData.genderId,
      physicalAddress: studentRequestData.address.physicalAddress,
      postalAddress: studentRequestData.address.postalAddress
    }
    return this.httpClient.post<Student>(this.baseApiUrl+'/students/add', addStudentRequestData)

  }

  updateStudent(studentId: string, studentRequestData: Student)
  :Observable<Student>
  {
    const updateStudentRequestData: UpdateStudentRequestData = {
      firstName: studentRequestData.firstName,
      lastName: studentRequestData.lastName,
      dateOfBirth: studentRequestData.dateOfBirth,
      email: studentRequestData.email,
      mobile: studentRequestData.mobile,
      genderId: studentRequestData.genderId,
      physicalAddress: studentRequestData.address.physicalAddress,
      postalAddress: studentRequestData.address.postalAddress
    }
    return this.httpClient.put<Student>(this.baseApiUrl+'/students/'+studentId, updateStudentRequestData)

  }
  deleteStudent(studentId: string)
  :Observable<Student>
  {
    return this.httpClient.delete<Student>(this.baseApiUrl+'/students/'+studentId)
  }

  uploadImage(studentId:string, file:File):Observable<any>{
    const formData = new FormData();
    formData.append("profileImage", file);
    return this.httpClient.post(this.baseApiUrl+'/students/'+studentId+'/upload-image',formData, {
      responseType: 'text' //getting response type as text not json
    });
  }
  getImagePath(relativePath: string){
    return `${this.baseApiUrl}/${relativePath}`;

  }



}
