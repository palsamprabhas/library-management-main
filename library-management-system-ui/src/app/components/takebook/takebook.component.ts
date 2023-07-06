import { Component, OnInit } from '@angular/core';
import { TakebookService } from 'src/app/services/takebook.service';
import { UpdatepopupComponent } from '../popup/updatepopup/updatepopup.component';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-takebook',
  templateUrl: './takebook.component.html',
  styleUrls: ['./takebook.component.css']
})
export class TakebookComponent implements OnInit {

  filteredBooks:any;
  noBooks:any=false;
  constructor(private takeBookService:TakebookService,private dialog:MatDialog,private bookService:BookService, 
    private router:Router) { 
    this.getTakeBooks();
   
  }

  ngOnInit(): void {
  }
  takeBooks:any;

  getTakeBooks(){
    const username=localStorage.getItem('username');
    this.takeBookService.getTakeBookByID(username).subscribe(
      (response)=>{
        this.takeBooks=response;
        this.filterTakenBooks();
        
      })
  }

  filterTakenBooks() {
    this.bookService.getAllBooks().subscribe(
      (response) => {
        this.filteredBooks = response.filter((book: any) => {
          return this.takeBooks.some((takeBook: any) => takeBook.bookId === book.book_id);
        });
         if(this.filteredBooks.length>0){
          this.noBooks=true;
         }
          this.sortBooksById();
        });
  }
  
  sortBooksById() {
    this.filteredBooks.sort((a:any, b:any) => {
      return a.book_id - b.book_id;
    });
  }
  returnBook(bookId:any) {
    const dialogRef = this.dialog.open(UpdatepopupComponent, {
      data: { isReturnBook: true, returnBookId:bookId }});
      
  dialogRef.afterClosed().subscribe((result) => {
    this.getTakeBooks();
  });
  }
}
