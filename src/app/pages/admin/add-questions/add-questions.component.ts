import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit{

  qId:any;
  qTitle: any;
  question=[
    {
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
  ]

  constructor(
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.qId=this.route.snapshot.params['qid'];
    console.log(this.qId)

    this.qTitle=this.route.snapshot.params['title'];
    
    if (this.question.length > 0) {
      this.question[0].quiz['qid'] = this.qId;
    }
  }
}
