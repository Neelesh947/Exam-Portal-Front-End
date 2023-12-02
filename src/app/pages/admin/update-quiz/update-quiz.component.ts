import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{

  constructor(private routes: ActivatedRoute, private quiz1:QuizService, 
    private snack:MatSnackBar,private _cat:CategoriesService,
    private _router:Router){}

  qid=0;
  quizz: any;

  color: ThemePalette = 'primary';

  categories=[
    {
      cid:'',
      title: '',
      description:''
    }
  ]

  ngOnInit(): void {
      this.qid= this.routes.snapshot.params['qid'];
      //alert(this.qid);
      this.quiz1.getQuiz(this.qid).subscribe(
        (data : any)=>{
          this.quizz=data;
          console.log(this.quizz)
        },(error)=>{
          console.log(error)
        })

        //adding categories 
        this._cat.categories().subscribe((data:any)=>
        { 
          //category loaded success
          this.categories=data;
          //console.log(this.categories);
        },(error)=>
        {
          alert('error in loading categories')         
        })
  }

  // update quiz
  public updateData(quizz:any){
    if(this.quizz.title.trim()=='' || this.quizz.category==null)
      {
        this.snack.open("Title Required !!", 'ok', {duration:3000})
        return;
      }

      if(this.quizz.maxMarks.trim()=='' || this.quizz.maxMarks==null)
      {
        this.snack.open("Maximum  Marks Required !!", 'ok', {duration:3000})
        return;
      }

      if(this.quizz.numberOfQuestions.trim()=='' || this.quizz.numberOfQuestions==null)
      {
        this.snack.open("Number Of Questions Required !!", 'ok', {duration:3000})
        return;
      }

      // make validations in category select so that it must no be empty
      if (this.quizz.category == null) {
        this.snack.open("Category Required !!", 'ok', { duration: 3000 });
        return;
      }
      
      //update quiz here
      this.quiz1.updateQuiz(this.quizz).subscribe((data:any)=>{
        Swal.fire("success","updated successfully",'success').then((e)=>{
          this._router.navigate(['admin/quiz'])
        })
      },(error)=>{
        console.log(error);
        Swal.fire('Error!','error while saving data','error');
      })
      

  }

}


