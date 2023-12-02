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

  //add new quizes
  public addQuiz(quiz:any)
  {
    return this._http.post(`${baseurl}/quiz/`,quiz);
  }

  //delete quiz
  public deleteQuiz(qid:any)
  {
    return this._http.delete(`${baseurl}/quiz/${qid}`)
  }

  //get the single quiz
  public getQuiz(qid:any)
  {
    return this._http.get(`${baseurl}/quiz/${qid}`)
  }

  //update quiz
  public updateQuiz(quiz:any)
  {
    return this._http.put(`${baseurl}/quiz/`,quiz);
  }
}
