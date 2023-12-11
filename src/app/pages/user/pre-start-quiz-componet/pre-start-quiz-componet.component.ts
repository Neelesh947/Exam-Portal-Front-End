import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pre-start-quiz-componet',
  templateUrl: './pre-start-quiz-componet.component.html',
  styleUrls: ['./pre-start-quiz-componet.component.css']
})
export class PreStartQuizComponetComponent implements OnInit{

  qid:any;
  quiz:any;

  constructor(private _route:ActivatedRoute, private _quiz:QuizService){}

  ngOnInit(): void {
    this.qid=this._route.snapshot.params['qid'];
    // console.log(this.qid);

    this._quiz.getQuiz(this.qid).subscribe((data:any)=>{
      // console.log(data);
      this.quiz=data;
    },(error)=>{
      console.log("error")
      Swal.fire('Error',"Error in Loading Quiz from the Server","error")
    })
  }
}
