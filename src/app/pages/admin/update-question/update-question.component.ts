import { Component ,OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit{

  
  questions:any;
  quesId=0;
  qid=0;
  categories=[
    {
      cid:'',
      title: '',
      description:''
    }
  ]
  question={
    quiz:{
      qid:'',
      title:''
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
  }



  constructor(private _question:QuestionsService, private route:ActivatedRoute,
    private snack:MatSnackBar, private router:Router){}

  ngOnInit(): void {
    this.quesId=this.route.snapshot.params['quesId']
    //alert(this.quesId);
    this._question.getSingleQuestion(this.quesId).subscribe((data:any)=>{
      this.question=data;
      console.log(this.question);
    },(error)=>{
      console.log(error)
    });

    this.qid=this.route.snapshot.params['qid'];
  }

  //update question
  public updateQuestionOnClick(questions:any)
  {
    if(this.question.content.trim()==''||this.question.content==null)
    {
    this.snack.open("Content Required !!", 'ok', {duration:3000})
        return;
    }
    if(this.question.answer==null)
    {
    this.snack.open("Content Required !!", 'ok', {duration:3000})
        return;
    }
    if(this.question.option1.trim()==''||this.question.option1==null)
    {
    this.snack.open("Content Required !!", 'ok', {duration:3000})
        return;
    }
    if(this.question.option2.trim()==''||this.question.option2==null)
    {
    this.snack.open("Content Required !!", 'ok', {duration:3000})
        return;
    }
    if(this.question.option3.trim()==''||this.question.option3==null)
    {
    this.snack.open("Content Required !!", 'ok', {duration:3000})
        return;
    }
    if(this.question.option4.trim()==''||this.question.option4==null)
    {
    this.snack.open("Content Required !!", 'ok', {duration:3000})
        return;
    }

    this._question.updateQuestions(this.question).subscribe((data:any)=>{
      Swal.fire("success","updated successfully",'success').then((e)=>{
        const qid=this.question.quiz.qid;
        const title=this.question.quiz.title;
      this.router.navigate(['/admin/view-questions/',qid,title])
      })
    },(error)=>{
      console.log(error);
      Swal.fire('Error!','error while saving data','error');
    })
  }
}
