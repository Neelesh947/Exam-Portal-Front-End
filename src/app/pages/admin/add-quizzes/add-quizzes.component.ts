import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriesService } from 'src/app/services/categories.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quizzes',
  templateUrl: './add-quizzes.component.html',
  styleUrls: ['./add-quizzes.component.css']
})
export class AddQuizzesComponent implements OnInit {


  color: ThemePalette = 'primary';
  checked = false;
  disabled = false;

  categories=[
    {
      cid:'',
      title: ''
    }
  ]

  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:'',
    }
  }

  constructor(public category:CategoriesService, private snack:MatSnackBar, private quiz1:QuizService){}

  ngOnInit(): void {
    
    this.category.categories().subscribe((data:any)=>
    {
      //category loaded success
      this.categories=data;
      //console.log(this.categories);
    },(error)=>
    {
      console.log("error")
      Swal.fire('Error!','error in loading data from server','error');
    })
  }

  //add quiz
  public addQuiz(){
      if(this.quizData.title.trim()=='' || this.quizData.category==null)
      {
        this.snack.open("Title Required !!", 'ok', {duration:3000})
        return;
      }

      if(this.quizData.maxMarks.trim()=='' || this.quizData.maxMarks==null)
      {
        this.snack.open("Maximum  Marks Required !!", 'ok', {duration:3000})
        return;
      }

      if(this.quizData.numberOfQuestions.trim()=='' || this.quizData.numberOfQuestions==null)
      {
        this.snack.open("Number Of Questions Required !!", 'ok', {duration:3000})
        return;
      }

      // make validations in category select so that it must no be empty

      // call server to add quizes
      this.quiz1.addQuiz(this.quizData).subscribe((data:any)=>
      {
        Swal.fire('success',"quiz is added",'success');
        this.quizData={
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:true,
          category:{
            cid:'',
          }
        }
      },
      (error)=>
      {
        Swal.fire("Error !!","Error while adding quiz",'error');
        console.log(error);
      })
      
  }
}
