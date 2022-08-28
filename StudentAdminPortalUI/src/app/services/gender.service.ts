import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gender } from '../models/apiModels/gender.model';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  private baseApiUri = 'https://192.168.1.121:45455';
  constructor(private httpClient: HttpClient) { }

  getAllGender():Observable<Gender[]>{
    return this.httpClient.get<Gender[]>(this.baseApiUri+'/gender');

  }
}
