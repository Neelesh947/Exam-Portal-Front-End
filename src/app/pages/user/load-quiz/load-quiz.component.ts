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
  cid:any;

  constructor(private _route:ActivatedRoute, private _cat:CategoriesService,
    private snack:MatSnackBar, private _quiz:QuizService){}

  ngOnInit(): void {

    this._route.params.subscribe((_params:any)=>{
      this.catId=_params['cid']      
        if(this.catId==null)
        {
          console.log('Load all the quizzes');
          this.loadAllQuizzes();
        }else{
          console.log('Load specific quiz');
          this.loadSpecificQuizz();
        }
    })    
  }

  loadAllQuizzes(){
    this._quiz.getActiveQuizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) => {
        this.snack.open('Error in loading quizzes from the server', '', {
          duration: 3000
        });
      }
    );
  }

  loadSpecificQuizz(){
    this._quiz.getactiveQuzzesOfCategory(this.catId).subscribe(
      (data) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) => {
        this.snack.open('Error in loading quizzes from the server', '', {
          duration: 3000
        });
      }
    );
  }
}
