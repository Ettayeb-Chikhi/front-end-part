import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { State } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private snackBar$:MatSnackBar
  ) { }

  show(message:string,state:State):void{
    let config = new MatSnackBarConfig();
    config.horizontalPosition='center';
    config.verticalPosition = 'top';
    config.duration = 2000 ; // 2s
    config.panelClass = state == State.ERROR ? 'error':'success'; 
    this.snackBar$.open(message,"close",config);
  }
}
