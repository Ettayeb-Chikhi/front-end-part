import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { SnackBarService } from '../services/snack-bar.service';
import { State } from '../models/models';

export const authGuard: CanActivateFn = (route, state) => {
   let service = inject(AuthService);
   let snackBar  = inject(SnackBarService);
   let router = inject(Router);
   let authorized:string[] = ["/login","/signup"]
  if(authorized.includes(state.url) && service.isAuthenticated()){
    router.navigate(["/home"]);
    
  }   
  else if(!service.isAuthenticated() ){
    snackBar.show("please sign up",State.ERROR);
    router.navigate(["/login"]);
    return false;
   }
  return true;
};
