package org.example.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TakeBookResponse {
    private String id;
    private String studentId;
    private String bookId;
    private LocalDate startDate;
    private LocalDate endDate;
}
