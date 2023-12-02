import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private fb:FormBuilder,private authSerice:AuthService){

  }
  ngOnInit(): void {
    this.initForm();
  }

  initForm():void{
    this.loginForm = this.fb.group({
      email : ['',[Validators.required,Validators.email]],
      password : ['',[Validators.required,Validators.minLength(6)]]
    })
  }

  login():void{
    const email = this.loginForm.controls["email"].value;
    const password = this.loginForm.controls["password"].value;
    this.authSerice.login(email,password);
  }

   // return css validation class based on a controll name
   validControls(controllName:string):string{
    let control = this.loginForm.controls[controllName];
    try{
        if(!control.pristine && control.valid){
          return 'form-control is-valid';
        }else if(!control.pristine){
          return 'form-control is-invalid'
        }
        return "form-control";
    }catch(error){
      console.error(error);
      return "form-control";
    }
   
  }
}
