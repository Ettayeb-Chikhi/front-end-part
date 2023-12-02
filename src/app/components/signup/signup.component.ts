import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { State, User } from 'src/app/models/models';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm:FormGroup;
  constructor(private fb:FormBuilder,private userService:UsersService,private router:Router,private snackBar$:SnackBarService) {
    
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm():void{
    this.signUpForm = this.fb.group({
      fullName:['',[Validators.required,Validators.pattern("[a-zA-Z ]+")]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmPassword:['',[Validators.required,Validators.minLength(6)]],
    })
  }
  // return css validation class based on a controll name
  validControls(controllName:string):string{
    let control = this.signUpForm.controls[controllName];
    try{
        // case of password we must check also if the password matches
        if(!control.pristine && (controllName=='password' || controllName=='confirmPassword') && !this.isPasswordValid()){
          return 'form-control is-invalid'
        }
        else if(!control.pristine && control.valid){
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
  // check if passwords match
  isPasswordValid():boolean{
    const password = this.signUpForm.controls["password"].value;
    const confirmPassword = this.signUpForm.controls["confirmPassword"].value;
    if(password!=confirmPassword){
      return false;
    }
    return true;
  }
  // handle submit 
  onSubmit():void{
    const user:User = {
      fullName:this.signUpForm.controls["fullName"].value,
      email:this.signUpForm.controls["email"].value,
      password: this.signUpForm.controls["password"].value
    }
    this.userService.addUser(user);
    this.snackBar$.show("signup successfull",State.SUCCESS);
    this.router.navigate(["/login"]);
  }
}
