import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseurl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) {}

  //load all the quizes from the db
  public quizzes()
  {
    return this._http.get(`${baseurl}/quiz/`);
  }
}