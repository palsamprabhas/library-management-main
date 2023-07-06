package org.example.controller;

import org.example.dto.request.TakeBookRequest;
import org.example.dto.response.GenericResponse;
import org.example.dto.response.TakeBookResponse;
import org.example.model.TakeBook;
import org.example.service.TakeBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TakeBookController {


    @Autowired
    TakeBookService takeBookService;

    /*@PostMapping("/take/book")
    public GenericResponse takeBook(@RequestBody TakeBookRequest takeBookRequest){
        return takeBookService.takeBook(takeBookRequest);
    }*/
    @PutMapping("/take/book")
    public GenericResponse takeBook(@RequestBody  TakeBookRequest takeBookRequest){
        return takeBookService.takeBook(takeBookRequest);
    }
    @PutMapping("/return/book")
    public GenericResponse returnBook(@RequestBody  TakeBookRequest takeBookRequest){
        return takeBookService.returnBook(takeBookRequest);
    }
    @GetMapping("/takebook/{studentId}")
    public List<TakeBookResponse> getTakeBookById(@PathVariable String studentId) {
        return takeBookService.getTakeBooksById(studentId);
    }
}
