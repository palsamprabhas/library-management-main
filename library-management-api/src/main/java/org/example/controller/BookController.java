package org.example.controller;

import org.example.dto.request.BookRequest;
import org.example.dto.response.BookResponse;
import org.example.dto.response.GenericResponse;
import org.example.model.Book;
import org.example.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/book")
public class BookController {
    @Autowired
    BookService bookService;
    @PostMapping
    public GenericResponse addBook(@RequestBody BookRequest bookRequest){
        return bookService.addBook(bookRequest);
    }

    @GetMapping
    public List<BookResponse> getAllBooks(){
        return bookService.getAllBooks();
    }
    @GetMapping("/{id}")
    public Book getBook(@PathVariable String id){
        return bookService.getBook(id);
    }
    @PutMapping
    public GenericResponse updateBook(@RequestBody BookRequest bookRequest){
        return bookService.updateBook(bookRequest);
    }
   /* @PutMapping("/take/book/{id}")
    public GenericResponse takeBook(@PathVariable String id){
        return bookService.takeBook(id);
    }*/
    @PutMapping("/return/book/{id}")
    public GenericResponse returnBook(@PathVariable String id){
        return bookService.returnBook(id);
    }
    @DeleteMapping("/{id}")
    public GenericResponse deleteBook(@PathVariable String id){
        return bookService.deleteBook(id);
    }
}
