import { Component , OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit{

  qid: any;
  qtitle: any;

  questions=[
    {
      quesid:'',
      content:'',
      image:'',
      option1:'',
      option2:'',
      option3:'',
      option4:'',
      answer:'',
      quiz:{
        qid:'',
      }
    }
  ]


  constructor(private _route:ActivatedRoute, private _question:QuestionsService,
    private snack:MatSnackBar){}

  ngOnInit(): void {
    this.qid=this._route.snapshot.params['qid'];
    this.qtitle=this._route.snapshot.params['title'];
    console.log(this.qid);
    console.log(this.qtitle);
    this._question.getQuestionsOfQuiz(this.qid).subscribe((data:any)=>{
      console.log(data);
      this.questions =data;
    },(error)=>{
        console.log(error)
    })
  }

  //delete question
  deleteQuestion(qid:any)
  {
    Swal.fire({
      icon:'info',
      showCancelButton: true,
      confirmButtonText:'Delete',
      title:'Are you Sure, want to delete this question?'
    }).then((result)=>{
      if(result.isConfirmed)
      {
        //when clicked on delete
        this._question.deleteQuestions(qid).subscribe((data:any)=>{
          this.snack.open('Question Deleted Successfully','ok',{duration:3000
          });
          this.questions=this.questions.filter((q)=>q.quesid!=qid)
        },
        (error)=>{
          this.snack.open('Error in Deleteing Questions','ok',{duration:3000});
        }
        );
          
      }
    })
  }
}
