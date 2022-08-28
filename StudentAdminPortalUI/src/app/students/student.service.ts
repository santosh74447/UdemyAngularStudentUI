import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/apiModels/student.model';
import { UpdateStudentRequestData } from '../models/apiModels/update-student-request-data.model';

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



}
