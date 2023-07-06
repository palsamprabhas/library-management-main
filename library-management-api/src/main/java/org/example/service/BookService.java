package org.example.service;

import org.example.dto.request.BookRequest;
import org.example.dto.response.BookResponse;
import org.example.dto.response.GenericResponse;
import org.example.model.Book;
import org.example.model.BookDetails;
import org.example.repository.BookRepository;
import org.example.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookService {
    @Autowired
    BookRepository bookRepository;

    public GenericResponse addBook(BookRequest bookRequest){
        Optional<Book> existingBook = bookRepository.findById(bookRequest.getBook_id());
        if (existingBook.isPresent()) {
            return new GenericResponse(Constants.ERROR, "A Book with the same Id already exists");
        }
        Book book=Book.builder()
                .book_id(bookRequest.getBook_id())
                .book_details(bookRequest.getBook_details())
                .build();
        Thread t1=new Thread(()->{
            bookRepository.save(book);
        });
        t1.start();
        return new GenericResponse(Constants.SUCCESS,"New book added successfully");
    }

    public List<BookResponse> getAllBooks(){
        return bookRepository.findAll()
                .stream()
                .map(book ->
                        BookResponse
                                .builder()
                                .book_id(book.getBook_id())
                                .book_details(book.getBook_details())
                                .build()).collect(Collectors.toList());
    }
    public Book getBook(String id){
        return bookRepository.findById(id).map(book ->
                        Book.builder()
                                .book_id(book.getBook_id())
                                .book_details(book.getBook_details())
                                .build())
                .get();
    }
    public GenericResponse updateBook(BookRequest bookRequest){
        Optional<Book> book=bookRepository
                .findById(bookRequest.getBook_id());
        if (book.isPresent()) {
            Book updatedBook = Book.builder()
                    .book_id(bookRequest.getBook_id())
                    .book_details(bookRequest.getBook_details()).build();
            bookRepository.save(updatedBook);

            return new GenericResponse(Constants.SUCCESS, "Book updated successfully");
        } else {
            return new GenericResponse(Constants.ERROR, "Book not found");
        }
    }
    public GenericResponse deleteBook(String id){
        bookRepository.deleteById(id);
        return new GenericResponse(Constants.SUCCESS,"1 Book deleted Successfully");
    }

    public GenericResponse takeBook(String id) {
                    Optional<Book> book = bookRepository.findById(id);
                    if (book.isPresent()) {
                        Book existingBook = book.get();
                        long currentQuantity = existingBook.getBook_details().getQuantity();
                        if (currentQuantity > 0) {
                            BookDetails updatedBookDetails=  existingBook.getBook_details();
                            updatedBookDetails.setQuantity(updatedBookDetails.getQuantity()-1);
                            Book updatedBook = Book.builder()
                        .book_id(existingBook.getBook_id())
                        .book_details(updatedBookDetails)
                        .build();
                bookRepository.save(updatedBook);
                return new GenericResponse(Constants.SUCCESS, "Book taken successfully");
            } else {
                return new GenericResponse(Constants.ERROR, "Book not available");
            }
        } else {
            return new GenericResponse(Constants.ERROR, "Book not found");
        }
    }

    public GenericResponse returnBook(String id) {
        Optional<Book> book = bookRepository.findById(id);
        if (book.isPresent()) {
            Book existingBook = book.get();
                BookDetails updatedBookDetails=  existingBook.getBook_details();
                updatedBookDetails.setQuantity(updatedBookDetails.getQuantity()+1);
                Book updatedBook = Book.builder()
                        .book_id(existingBook.getBook_id())
                        .book_details(updatedBookDetails)
                        .build();
                bookRepository.save(updatedBook);
                return new GenericResponse(Constants.SUCCESS, "Book returned successfully");
        } else {
            return new GenericResponse(Constants.ERROR, "Book not found");
        }
    }
}
