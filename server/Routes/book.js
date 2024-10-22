import express from 'express';
import {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
} from '../controller/bookcon.js'; 

const router = express.Router();


router.post('/books/add', addBook); 


router.get('/books/all', getBooks); 


router.get('/books/:bookId', getBookById);


router.put('/books/edit/:bookId', updateBook); 


router.delete('/books/delete/:bookId', deleteBook); 


router.post('/loans/borrow', borrowBook); 


router.put('/loans/return/:loanId', returnBook); 

export default router;
