import { Component , OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService, private snack:MatSnackBar){}

  ngOnInit(): void {}

  public user={
    username:'',
    password:'',
    firstname:'',
    lastname:'',
    email:'',
    phone:'',
  }

  formSubmit() {
    console.log(this.user);

    if(this.user.username=='' || this.user.username==null)
    {
      //alert('user is required !!');
      this.snack.open('username is required !!','ok',{
        duration:3000, 
        verticalPosition: 'top',
      })
      return;
    }

    //addUser ko bind kr denge Which comes from userService
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //success
        console.log(data);
        swal.fire('Success','User id is '+data.id+' successfully registered','success');
      },
      (error)=>{
        //error
        console.log(error);
        //alert('something went wrong');

        //apply here sweet form
        swal.fire('SomeThing went Wrong!!');
      }

    )

  }

  //this.user

}
