import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { product } from 'src/app/models/models';
import { ConfirmationBoxComponent } from '../confirmation-box/confirmation-box.component';
import { EditBoxComponent } from '../edit-box/edit-box.component';


let ELEMENT_DATA: product[] = [
  { id: 1, name: 'Laptop', quantity: 20, price: 899.99 },
  { id: 2, name: 'Smartphone', quantity: 50, price: 499.99 },
  { id: 3, name: 'Headphones', quantity: 30, price: 79.99 },
  { id: 4, name: 'Camera', quantity: 15, price: 599.99 },
  { id: 5, name: 'Desk Chair', quantity: 10, price: 129.99 },
  { id: 6, name: 'Tablet', quantity: 25, price: 349.99 },
  { id: 7, name: 'Monitor', quantity: 12, price: 249.99 },
  { id: 8, name: 'Printer', quantity: 8, price: 149.99 },
  { id: 9, name: 'Fitness Tracker', quantity: 40, price: 79.99 },
  { id: 10, name: 'Gaming Console', quantity: 18, price: 299.99 },
  { id: 11, name: 'Coffee Maker', quantity: 22, price: 59.99 },
  { id: 12, name: 'Bluetooth Speaker', quantity: 15, price: 89.99 },
  { id: 13, name: 'External Hard Drive', quantity: 30, price: 129.99 },
  { id: 14, name: 'Wireless Mouse', quantity: 25, price: 29.99 },
  { id: 15, name: 'Backpack', quantity: 35, price: 49.99 },
];
;
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'quantity', 'price', 'action'];
  dataSource: MatTableDataSource<product>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteItem(item: product): void {
    const config: MatDialogConfig = new MatDialogConfig();
    config.data = {
      action: `delete the product with id ${item.id}`
    }

    let ref = this.dialog.open(ConfirmationBoxComponent, config);
    ref.componentInstance.event.subscribe(
      {
        next: (data: boolean) => {
          if (data) {
            ELEMENT_DATA = ELEMENT_DATA.filter(p => p.id != item.id);
            this.dataSource.data = ELEMENT_DATA;
            ref.close();
          }
        }
      }
    )
      ;
  }
  editItem(item:product):void{
    const config: MatDialogConfig = new MatDialogConfig();
    config.data = {
      pr:item,
    }
    let ref = this.dialog.open(EditBoxComponent,config);
    ref.componentInstance.event.subscribe({
      next:(data:product)=>{
        let index = ELEMENT_DATA.findIndex(item=>item.id==data.id);
        ELEMENT_DATA[index] = data;
        this.dataSource.data = ELEMENT_DATA;
      }
    })
  }
}
