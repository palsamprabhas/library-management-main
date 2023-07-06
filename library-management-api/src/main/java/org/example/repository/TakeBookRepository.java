package org.example.repository;

import org.example.model.TakeBook;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface TakeBookRepository extends MongoRepository<TakeBook, String> {
    Optional<TakeBook> findByStudentIdAndBookId(String studentId, String bookId);

    /*Optional<TakeBook> findByStudentId(String studentId);*/
    List<TakeBook> findByStudentId(String studentId);

    /* Optional<TakeBook> deleteStudentIdAndBookId(String studentId, String bookId);*/
}
