import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-add-quizzes',
  templateUrl: './add-quizzes.component.html',
  styleUrls: ['./add-quizzes.component.css']
})
export class AddQuizzesComponent {


  color: ThemePalette = 'primary';
  checked = false;
  disabled = false;

  categories=[
    {
      cid:23,
      title: 'programming'
    },
    {
      cid:25,
      title: 'maths'
    }
  ]
}
