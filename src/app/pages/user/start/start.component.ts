import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{

  qid:any;
  question:any;

  constructor(private locationSt:LocationStrategy, private _route:ActivatedRoute,
    private _question:QuestionsService, private _Quiz:QuizService){}

  ngOnInit(): void {
    this.preventBackButton();

    this.qid=this._route.snapshot.params['qid'];
    // console.log(this.qid);

    this.loadQuestions();

  }

  preventBackButton(){
    history.pushState(null, '',location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null, '', location.href);
    })
  }

  loadQuestions(){
    this._question.getQuestionOfQuizForTest(this.qid).subscribe((data:any)=>{
      console.log(data);
      this.question=data;
    },(error)=>{
      console.log('error')
      Swal.fire("Error","Error in recieving the question form the server","error")
    })
  }
}
