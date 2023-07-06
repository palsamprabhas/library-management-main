package org.example.service;

import org.example.dto.request.TakeBookRequest;
import org.example.dto.response.BookResponse;
import org.example.dto.response.GenericResponse;
import org.example.dto.response.TakeBookResponse;
import org.example.model.Book;
import org.example.model.BookDetails;
import org.example.model.TakeBook;
import org.example.repository.BookRepository;
import org.example.repository.TakeBookRepository;
import org.example.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TakeBookService {

    @Autowired
    TakeBookRepository takeBookRepository;
    @Autowired
    BookRepository bookRepository;

    public List<TakeBookResponse> getTakeBooksById(String studentId) {
        List<TakeBook> takeBooks = takeBookRepository.findByStudentId(studentId);
        return takeBooks.stream()
                .map(book ->
                        TakeBookResponse.builder()
                                .bookId(book.getBookId())
                                .studentId(book.getStudentId())
                                .startDate(book.getStartDate())
                                .endDate(book.getEndDate()).build())
                .collect(Collectors.toList());
    }

    public GenericResponse takeBook(TakeBookRequest takeBookRequest) {
    Optional<Book> book = bookRepository.findById(takeBookRequest.getBookId());
    if (book.isPresent()) {
        Book existingBook = book.get();
        long currentQuantity = existingBook.getBook_details().getQuantity();
        if (currentQuantity > 0) {
            Optional<TakeBook> existingTakeBook = takeBookRepository.findByStudentIdAndBookId(takeBookRequest.getStudentId(), takeBookRequest.getBookId());
            if (existingTakeBook.isPresent()) {
                return new GenericResponse(Constants.ERROR, "Book already taken by the student");
            }
            BookDetails updatedBookDetails=  existingBook.getBook_details();
            updatedBookDetails.setQuantity(updatedBookDetails.getQuantity()-1);
            Book updatedBook = Book.builder()
                    .book_id(existingBook.getBook_id())
                    .book_details(updatedBookDetails)
                    .build();
            bookRepository.save(updatedBook);
            TakeBook takeBook = TakeBook.builder()
                    .bookId(takeBookRequest.getBookId())
                    .studentId(takeBookRequest.getStudentId())
                    .endDate(takeBookRequest.getStartDate())
                    .startDate(takeBookRequest.getEndDate()).build();
            takeBookRepository.save(takeBook);
            return new GenericResponse(Constants.SUCCESS, "Book taken successfully");
        } else {
            return new GenericResponse(Constants.ERROR, "Book not available");
        }
    } else {
        return new GenericResponse(Constants.ERROR, "Book not found");
    }
}
    public GenericResponse returnBook(TakeBookRequest takeBookRequest){
        Optional<TakeBook> takeBook=takeBookRepository.findByStudentIdAndBookId(takeBookRequest.getStudentId(), takeBookRequest.getBookId());
        if(takeBook.isPresent()){
            Optional<Book> book = bookRepository.findById(takeBookRequest.getBookId());
            if (book.isPresent()) {
                Book existingBook = book.get();
                BookDetails updatedBookDetails=  existingBook.getBook_details();
                updatedBookDetails.setQuantity(updatedBookDetails.getQuantity()+1);
                Book updatedBook = Book.builder()
                        .book_id(existingBook.getBook_id())
                        .book_details(updatedBookDetails)
                        .build();
                bookRepository.save(updatedBook);
                takeBookRepository.delete(takeBook.get());
                return new GenericResponse(Constants.SUCCESS, "Book returned successfully");
            } else {
                return new GenericResponse(Constants.ERROR, "Book not found");
            }
        }
        else {
            return new GenericResponse(Constants.ERROR, "Student have not taken this book");
        }
    }

}
