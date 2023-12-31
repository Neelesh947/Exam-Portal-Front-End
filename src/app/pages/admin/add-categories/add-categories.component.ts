import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit{

  category={
    title:'',
    description:''
  }
  constructor(private categorys:CategoriesService,private snack:MatSnackBar){}

  ngOnInit(): void {}

  formSubmit()
  {
    if(this.category.title.trim()=='' || this.category.title==null)
    {
      this.snack.open("Title required !!",'ok',{duration:3000});
      return;
    }

    //all done
    this.categorys.addCategory(this.category).subscribe(
      (data:any)=>
      {
        this.category.title='';
        this.category.description='';
        Swal.fire("success!!" , 'category is added successfully', 'success');
      },
      (error)=>
      {
        console.log('error');
        Swal.fire("Error","server error","error");
      }
    )   
  }
}
