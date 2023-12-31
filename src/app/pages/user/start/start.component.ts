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


  marksGot=0;
  correctAnswer=0;
  attempt=0;

  isSubmit=false;

  timer:any;



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

      this.timer=this.question.length * 2 * 60;
      
      this.startTimer();

    },(error)=>{
      console.log('error')
      Swal.fire("Error","Error in recieving the question form the server","error")
    })
  }

  submitQuiz(){
    Swal.fire({
      title: "Do you want to submit the Quiz ?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Submit",
      icon:'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
       
        this.quizEvaluation();
        // console.log("correct "+this.correctAnswer)
        //   console.log("marks"+ this.marksGot)
        //   console.log("attempt"+ this.attempt)

      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  startTimer(){
    let t=window.setInterval(()=>{
      //code ko call krega in ms
      if(this.timer<=0)
      {
        this.quizEvaluation();
        clearInterval(t);
      }
      else{
        this.timer--;
      }
    },1000)
  }

  
  getFormattedTime(){
    let mm=Math.floor(this.timer/60)
    let ss=this.timer-mm*60;
    return `${mm} min : ${ss} sec`
  }

  quizEvaluation(){

    
    this.isSubmit=true;
    //call to server to evaluate / check questions

    this._question.evaluateQuiz(this.question).subscribe((data:any)=>{
      // console.log(data)

      this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
      this.correctAnswer=data.correctAnswer;
      this.attempt=data.attempt

    },(error: any)=>{
      console.log(error)
    })
    // //calculate marks

    // this.question.forEach((q:any)=>{
    //   if(q.givenAnswer==q.answer)
    //   {
    //     this.correctAnswer++;
    //     let marksSingle=this.question[0].quiz.maxMarks/this.question.length
    //     this.marksGot+=marksSingle;
    //   }
    //   if(q.givenAnswer.trim()!='')
    //   {
    //     this.attempt++;
    //   }
    // })
   
  }

  printPage(){
    window.print();
  }
}
