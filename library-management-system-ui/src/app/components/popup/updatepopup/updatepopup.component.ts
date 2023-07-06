import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import { AlertpopupComponent } from './alertpopup/alertpopup.component';
import { DatePipe } from '@angular/common';
import { TakebookService } from 'src/app/services/takebook.service';


@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css'],
  providers: [DatePipe]
})


export class UpdatepopupComponent {

  bookForm: FormGroup;
  newBookResponse: any;
  updateBookForm: FormGroup;
  updatePopup: any = false;
  bookFormInvalid: any = false;
  isUpdate: any;
  book: any;
  deleteBookId: any;
  isDelete: any;
  deleteResponse:any;
  isAddBook: any;
  isTakeBook: any;
  takeBookId: any;
  isReturnBook: any;
  returnBookId: any;
  currentDate: any;
  futureDate: any;
  username:any;
  constructor(private bookService: BookService, public dialogRef: MatDialogRef<UpdatepopupComponent>, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, private datePipe:DatePipe,private takeBookService:TakebookService) {

      this.username=localStorage.getItem('username')
      const today = new Date();
    this.currentDate = this.datePipe.transform(today, 'yyyy-MM-dd');

    const futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + 30);
    this.futureDate = this.datePipe.transform(futureDate, 'yyyy-MM-dd');
    this.bookForm = new FormGroup({
      id: new FormControl('', [Validators.required,]),
      bookname: new FormControl('', [Validators.required]),
      bookauthor: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
    });
    this.isUpdate = data.isUpdate;
    this.isAddBook=data.isAddBook;
    this.isTakeBook=data.isTakeBook;
    this.takeBookId=data.takeBookId;
    this.isReturnBook=data.isReturnBook;
    this.returnBookId=data.returnBookId;
    this.book = data.book || { book_details: {} };
    this.updateBookForm = new FormGroup({
      id: new FormControl(this.book.book_id , [Validators.required]),
      bookname: new FormControl(this.book.book_details.book_name, [Validators.required]),
      bookauthor: new FormControl(this.book.book_details.book_author, [Validators.required]),
      description: new FormControl(this.book.book_details.description, [Validators.required]),
      quantity: new FormControl(this.book.book_details.quantity, [Validators.required]),
    });
    this.deleteBookId = data.book_id;
    this.isDelete=data.isDelete;
    
  }

  addBook() {
    if (this.bookForm.valid) {
      const newBook = {
        book_id: this.bookForm.value.id,
        book_details: {
          book_name: this.bookForm.value.bookname,
          book_author: this.bookForm.value.bookauthor,
          description: this.bookForm.value.description,
          quantity: this.bookForm.value.quantity
        }
      };

      this.bookService.addBook(newBook).subscribe(
        (response) => {
          this.newBookResponse=response;
          const dialogRef = this.dialog.open(AlertpopupComponent, {
            data: { isAddBook: true, addBookResponse: this.newBookResponse }
          });
          this.dialogRef.close();
        });
    }
    else {
      this.bookFormInvalid = true;
    }
  }
  updateBook() {
    if (this.updateBookForm.valid) {
      const updatedBook = {
        book_id: this.updateBookForm.value.id,
        book_details: {
          book_name: this.updateBookForm.value.bookname,
          book_author: this.updateBookForm.value.bookauthor,
          description: this.updateBookForm.value.description,
          quantity: this.updateBookForm.value.quantity
        }
      };
      this.bookService.updateBook(updatedBook).subscribe(
        (response) => {
          const dialogRef = this.dialog.open(AlertpopupComponent, {
            data: { isUpdateBook: true, updatedBookResponse: response }
          });
          this.dialogRef.close();
        });
    } else {
      this.bookFormInvalid = true;
    }
  }
  deleteBook()
  {
    this.bookService.deleteBook(this.deleteBookId).subscribe(
      (response) => {
        const dialogRef = this.dialog.open(AlertpopupComponent, {
          data: { isDeleteBook: true, deletedBookResponse: response }
        });
       this.dialogRef.close();
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  takeBook()
  {
    const takeBookRequest = {
      studentId: this.username,
      bookId: this.takeBookId,
      startDate: this.currentDate,
      endDate: this.futureDate
    };
    this.takeBookService.takeBook(takeBookRequest).subscribe(
      (response) => {
        this.dialogRef.close();
        const dialogRef = this.dialog.open(AlertpopupComponent, {
          data: { isTakeBook: true, takeBookResponse: response }
        });
        this.dialogRef.close();
      });
  }

  returnBook(){
      const takeBookRequest = {
        studentId: this.username,
        bookId: this.returnBookId
      }
    this.takeBookService.returnBook(takeBookRequest).subscribe(
      (response) => {
        this.dialogRef.close();
        const dialogRef = this.dialog.open(AlertpopupComponent, {
          data: { isReturnBook: true, returnBookResponse: response }
        });
        this.dialogRef.close();
      });
  }
}
