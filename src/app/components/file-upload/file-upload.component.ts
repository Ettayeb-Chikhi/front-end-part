import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  progress: number = 0;
  totalSize: number = 0;
  actualSize: number = 0;
  completed:boolean = false;
  fileName:string;
  constructor() {

  }
  ngOnInit(): void {

  }

  selectFile(input: HTMLInputElement) {

    if (input.files != null) {
      this.progress=0;
      let file = input.files[0];
      this.completed=false;
      this.totalSize = file.size;
      this.actualSize=0;
      let chunk = this.totalSize/4;

      let int = setInterval(()=>{
        this.progress+=25;
        this.actualSize+=chunk;
        if(this.progress==100){
          this.completed=true;
          this.fileName = file.name;
          clearInterval(int);
        }
      },1000)
    }
  }

  
}
