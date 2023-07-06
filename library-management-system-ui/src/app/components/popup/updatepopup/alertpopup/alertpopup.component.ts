import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-alertpopup',
  templateUrl: './alertpopup.component.html',
  styleUrls: ['./alertpopup.component.css']
})
export class AlertpopupComponent implements OnInit {
  
  isAddBook: any;
  addBookResponse: any;
  isUpdateBook: any;
  updatedBookResponse: any;
  isDeleteBook: any;
  deletedBookResponse: any;
  isRegisterUser: any;
  registerUserResponse: any;
  isTakeBook: any;
  takeBookResponse: any;
  isReturnBook: any;
  returnBookResponse: any;

  constructor(private bookService:BookService,public dialogRef: MatDialogRef<AlertpopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.isAddBook=data.isAddBook;
      this.addBookResponse=data.addBookResponse;
      this.isUpdateBook=data.isUpdateBook;
      this.updatedBookResponse=data.updatedBookResponse;
      this.isDeleteBook=data.isDeleteBook;
      this.deletedBookResponse=data.deletedBookResponse;
      this.isRegisterUser=data.isRegisterUser;
      this.registerUserResponse=data.registerUserResponse;
      this.isTakeBook=data.isTakeBook;
      this.takeBookResponse=data.takeBookResponse;
      this.isReturnBook=data.isReturnBook;
      this.returnBookResponse=data.returnBookResponse;
     }

  ngOnInit(): void {
  }

  
  closeDialog(){
    this.dialogRef.close();
  }
}
