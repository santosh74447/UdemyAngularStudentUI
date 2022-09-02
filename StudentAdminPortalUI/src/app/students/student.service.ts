import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/apiModels/student.model';
import { UpdateStudentRequestData } from '../models/apiModels/update-student-request-data.model';
import { AddStudentRequestData } from '../models/apiModels/add-student-request-data.model';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUri = 'http://192.168.1.121:45455';
  constructor(private httpClient: HttpClient) { }

  getAllStudent():Observable<Student[]>{
    return this.httpClient.get<Student[]>(this.baseApiUri+'/students');

  }

  getSingleStudent(studentId: string):Observable<Student>{
    return this.httpClient.get<Student>(this.baseApiUri+'/students/'+studentId);

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
    return this.httpClient.post<Student>(this.baseApiUri+'/students/add', addStudentRequestData)

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
    return this.httpClient.put<Student>(this.baseApiUri+'/students/'+studentId, updateStudentRequestData)

  }
  deleteStudent(studentId: string)
  :Observable<Student>
  {
    return this.httpClient.delete<Student>(this.baseApiUri+'/students/'+studentId)
  }

  uploadImage(studentId:string, file:File):Observable<any>{
    const formData = new FormData();
    formData.append("profileImage", file);
    return this.httpClient.post(this.baseApiUri+'/students/'+studentId+'/upload-image',formData, {
      responseType: 'text' //getting response type as text not json
    });
  }
  getImagePath(relativePath: string){
    return `${this.baseApiUri}/${relativePath}`;

  }



}
