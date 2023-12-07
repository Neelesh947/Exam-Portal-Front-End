import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseurl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private _http:HttpClient) { }


  //  get questions of quiz
  public getQuestionsOfQuiz(qid:any)
  {
    return this._http.get(`${baseurl}/question/quiz/all/${qid}`);
  }

  //add questions
  public addQuestions(question:any)
  {
    return this._http.post(`${baseurl}/question/`,question);
  }
}
