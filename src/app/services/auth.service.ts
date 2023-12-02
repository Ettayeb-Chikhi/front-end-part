import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { State, User } from '../models/models';
import { Router } from '@angular/router';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn:boolean=false;
  actualUser:User;
  constructor(private userService:UsersService,private router:Router,private snackBarService:SnackBarService) { }

  login(email:string,password:string):void{
    let optionalUser = this.userService.findByEmail(email);
    if(optionalUser!=undefined && optionalUser.password==password){
      this.isLoggedIn = true;
      this.actualUser = optionalUser;
      this.snackBarService.show("login successfull",State.SUCCESS);
      localStorage.setItem("auth",optionalUser.fullName);
      this.router.navigate(["/home"]);
    }else{
      this.snackBarService.show("email or password incorrect ",State.ERROR);
    }
  }

  logout():void{
    localStorage.removeItem("auth");
    this.router.navigate(["/login"])
    this.snackBarService.show("logout successfull ",State.SUCCESS);

  }
  getUserName():string{
    if(this.isAuthenticated()){
      return localStorage.getItem("auth")!;
    }else{
      return "";
    }
  }
  isAuthenticated():boolean{
    if(localStorage.getItem("auth")!=null){
      return true;
    }
    return false;
  }

}
