import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../popup/updatepopup/updatepopup.component';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/model/book.model';
import { AlertpopupComponent } from '../popup/updatepopup/alertpopup/alertpopup.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {


  newBookResponse: any;
  openPopup:any=false;
  searchQuery: string = '';

  filteredBooks: any;
  
  constructor(private bookService:BookService,private dialog:MatDialog) {
    
   }
   books:any;


  ngOnInit(): void {
   this.getAllBooks();
  }
  getAllBooks(){
    this.bookService.getAllBooks().subscribe(
      (temp)=>{
        this.books=temp
        this.filteredBooks=this.books;
        this.sortBooksById();
      }
    );
  }
  applyFilter() {
    if (this.searchQuery.trim() === '') {
      this.filteredBooks = this.books;
      this.sortBooksById();
    } else {
      this.filteredBooks = this.books.filter((book:any) => {
        return (
          book.book_details.book_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          book.book_id.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          book.book_details.book_author.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          book.book_details.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          book.book_details.quantity.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    }
  }
  sortBooksById() {
    this.filteredBooks.sort((a:any, b:any) => {
      return a.book_id - b.book_id;
    });
  }
  addBook(){
    
      const dialogRef = this.dialog.open(UpdatepopupComponent, {
        data: { isAddBook: true }});
    dialogRef.afterClosed().subscribe(() => {
      this.getAllBooks();
    });
  }

  deleteBook(book_Id: any) {
    const dialogRef = this.dialog.open(UpdatepopupComponent, {
      data: { isDelete: true, book_id:book_Id }});
  dialogRef.afterClosed().subscribe(() => {
    this.getAllBooks();
  });
    
}
updatePopup(book: any){
  const dialogRef = this.dialog.open(UpdatepopupComponent, {
    data: { isUpdate: true, book: book}});
    dialogRef.afterClosed().subscribe(() => {
      this.getAllBooks();
   });
  }
}
