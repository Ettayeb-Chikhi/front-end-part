import { Component, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-box',
  templateUrl: './confirmation-box.component.html',
  styleUrls: ['./confirmation-box.component.css']
})
export class ConfirmationBoxComponent {
  event:EventEmitter<boolean> = new EventEmitter();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  confirm():void{
    this.event.emit(true);
  }
}
