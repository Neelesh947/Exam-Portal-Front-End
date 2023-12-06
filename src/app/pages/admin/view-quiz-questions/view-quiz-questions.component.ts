import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';

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

  constructor(private _route:ActivatedRoute, private _question:QuestionsService){}

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
}
