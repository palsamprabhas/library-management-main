export class Book {
    book_id!: string;
    book_details!: {
      book_name: string;
      book_author: string;
      description: string;
      quantity: number;
    };
  }