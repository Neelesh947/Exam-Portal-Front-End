import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit{

  qId:any;
  qTitle: any;
  question={
      quiz:{
        qid:'',
      },
      content:'',
      option1:'',
      option2:'',
      option3:'',
      option4:'',
      answer:''
    }


  constructor(
    private route:ActivatedRoute, private _question:QuestionsService, private snack:MatSnackBar,
    private _quiz:QuizService
  ){}

  ngOnInit(): void {
    this.qId=this.route.snapshot.params['qid'];
    console.log(this.qId)

    this.qTitle=this.route.snapshot.params['title'];
    
    this.question.quiz['qid'] = this.qId;
  }

  // add question
  formSubmit()
  {
    if(this.question.content.trim()=='' || this.question.content==null)
    {
      this.snack.open('Empty Content !!','ok',{duration:3000})
      return;
    }

    if(this.question.option1.trim()=='' || this.question.option1==null)
    {
      this.snack.open('Empty Content !!','ok',{duration:3000})
      return;
    }

    if(this.question.option2.trim()=='' || this.question.option2==null)
    {
      this.snack.open('Empty Content !!','ok',{duration:3000})
      return;
    }

    if(this.question.option3.trim()=='' || this.question.option3==null)
    {
      this.snack.open('Empty Content !!','ok',{duration:3000})
      return;
    }
    if(this.question.option4.trim()=='' || this.question.option4==null)
    {
      this.snack.open('Empty Content !!','ok',{duration:3000})
      return;
    }
    if(this.question.answer.trim()=='' || this.question.answer==null)
    {
      this.snack.open('Empty Content !!','ok',{duration:3000})
      return;
    }

    //add question to quiz
    this._question.addQuestions(this.question).subscribe((data:any)=>
    {
      Swal.fire('success','Question Added','success');
      this.question.content='',
      this.question.option1='',
      this.question.option2='',
      this.question.option3='',
      this.question.option4='',
      this.question.answer=''

    },(error)=>{
      Swal.fire('Error','Error in Adding Questions','error');
    })

  }
}
