import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/apiModels/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUri = 'https://localhost:44358';
  constructor(private httpClient: HttpClient) { }

  getAllStudent():Observable<Student[]>{
    return this.httpClient.get<Student[]>(this.baseApiUri+'/students');

  }

  getSingleStudent(studentId: string):Observable<Student>{
    return this.httpClient.get<Student>(this.baseApiUri+'/students/'+studentId);

  }
}
