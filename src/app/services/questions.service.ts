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

  //delete questions
  public deleteQuestions(quesid:any)
  {
    return this._http.delete(`${baseurl}/question/${quesid}`)
  }

  //get single question
  public getSingleQuestion(questId:any)
  {
    return this._http.get(`${baseurl}/question/${questId}`)
  }

  //update questions
  public updateQuestions(question:any){
    return this._http.put(`${baseurl}/question/`,question)
  }

  //get question of the quiz for the test
  public getQuestionOfQuizForTest(qid:any)
  {
    return this._http.get(`${baseurl}/question/quiz/${qid}`)
  }


  //Evaluate Quiz
  public evaluateQuiz(questions:any)
  {
    return this._http.post(`${baseurl}/question/evaluate-quiz`,questions);
  }
}
