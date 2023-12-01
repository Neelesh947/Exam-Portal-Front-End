import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css'],
})
export class ViewCategoriesComponent implements OnInit{

  categories=[
    {
      cid:23,
      title:"java Initialize",
      description:"this is related to java programming"
    }    
  ]

  constructor(private _category:CategoriesService){}

  ngOnInit(): void {
    
    this._category.categories().subscribe((data:any)=>{
      this.categories=data;
      console.log(this.categories);
  },(error)=>{
    console.log(error);
    Swal.fire("Error","error in loading data",'error');
  })
  }
}
