import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { product } from 'src/app/models/models';
import { ConfirmationBoxComponent } from '../confirmation-box/confirmation-box.component';

@Component({
  selector: 'app-edit-box',
  templateUrl: './edit-box.component.html',
  styleUrls: ['./edit-box.component.css']
})
export class EditBoxComponent implements OnInit {
  productForm:FormGroup;
  event:EventEmitter<product>=new EventEmitter();
  constructor(private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {pr:product},
    private dialog:MatDialog,
    private matDialogRef:MatDialogRef<EditBoxComponent>){

  }
  ngOnInit(): void {
    this.initForm();
    console.log(this.data);
    
  }

  initForm():void{
    this.productForm = this.fb.group({
      id: [this.data.pr.id,[Validators.required]],
      name:[this.data.pr.name,[Validators.required]],
      quantity:[this.data.pr.quantity,[Validators.required]],
      price:[this.data.pr.price,[Validators.required]]
    })
  }
  submit():void{
    const config: MatDialogConfig = new MatDialogConfig();
    config.data = {
      action: `edit the product with id ${this.data.pr.id}`
    }

    let ref = this.dialog.open(ConfirmationBoxComponent, config);
    ref.componentInstance.event.subscribe(
      {
        next: (data: boolean) => {
          if (data) {
            let editedItem:product={
              name:this.productForm.controls["name"].value,
              price:this.productForm.controls["price"].value,
              quantity:this.productForm.controls["quantity"].value,
              id:this.productForm.controls["id"].value
            }
            this.event.emit(editedItem);
            ref.close();
            this.matDialogRef.close();
          }
        }
      }
    )
      ;
  }
}
