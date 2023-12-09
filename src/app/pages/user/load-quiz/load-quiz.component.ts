import { Component , OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit{

  catId:any;
  quizzes:any;

  constructor(private _route:ActivatedRoute, private _cat:CategoriesService,
    private snack:MatSnackBar, private _quiz:QuizService){}

  ngOnInit(): void {
    this.catId=this._route.snapshot.params['catId'];

    if(this.catId==0)
    {
      console.log("Load all the quizes");
      this._quiz.quizzes().subscribe((data:any)=>{

        this.quizzes=data;
        console.log(this.quizzes);     

      },(error)=>{
        this.snack.open("Error in loading category from the server","",{duration:3000})
      })
    }
    else{
      this._quiz.quizzes().subscribe((data:any)=>{
        this.catId=data;
        console.log(this.catId)
      })
      console.log("Load specific quiz");
      
    }
  }
}
