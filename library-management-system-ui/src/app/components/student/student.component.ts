import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import { AlertpopupComponent } from '../popup/updatepopup/alertpopup/alertpopup.component';
import { UpdatepopupComponent } from '../popup/updatepopup/updatepopup.component';
import { TakebookService } from 'src/app/services/takebook.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
 

  takeBooks:any;
  searchQuery: string = '';
  books:any;
  filteredBooks: any;
  disableTakeButton:any=true;
  constructor(private bookService: BookService,private dialog:MatDialog,private takeBookService:TakebookService) { }
  bookId: any;
  ngOnInit(): void {
    this.getTakeBooks();
   }
   getTakeBooks() {
    const username = localStorage.getItem('username');
    this.takeBookService.getTakeBookByID(username).subscribe(
      (response) => {
       this.takeBooks=response || [];
       if(this.takeBooks.length>=3){
          this.disableTakeButton=false;
       }
       this.getAllBooks();
      },
      (error) => {
        console.error(error);
      }
    );
  }
   getAllBooks(){
     this.bookService.getAllBooks().subscribe(
       (temp)=>{
         this.books=temp
         this.filteredBooks = this.books.filter((book: any) => {
          return !this.takeBooks.some((takeBook: any) => takeBook.bookId === book.book_id);
        });
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

  takeBook(bookId: any) {
    const dialogRef = this.dialog.open(UpdatepopupComponent, {
      data: { isTakeBook: true, takeBookId:bookId }});
  dialogRef.afterClosed().subscribe(() => {
    this.getTakeBooks();
  });
   
  }
}
