import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gender } from '../models/apiModels/gender.model';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  private baseApiUrl = environment.baseApiUrl;
  constructor(private httpClient: HttpClient) { }

  getAllGender():Observable<Gender[]>{
    return this.httpClient.get<Gender[]>(this.baseApiUrl+'/gender');

  }
}
