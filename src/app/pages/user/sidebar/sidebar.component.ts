import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  category:any;
  constructor(private _cat:CategoriesService, private snack:MatSnackBar){}

  ngOnInit(): void {
    this._cat.categories().subscribe((data:any)=>{
      this.category=data;
      console.log(this.category)
    },(error)=>{
      this.snack.open("Error in loading category from the server","",{duration:3000})
    })
  }

}
