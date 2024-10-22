import Book from '../models/bookscema.js'; 
import Loan from '../models/boorowscema.js'; 


export const addBook = async (req, res) => {
  const { title, author, genre, imageUrl } = req.body;
  try {
    const newBook = new Book({ title, author, genre, imageUrl });
    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    res.status(400).json({ message: 'Error adding book', error });
  }
};


export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving books', error });
  }
};


export const getBookById = async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving book', error });
  }
};


export const updateBook = async (req, res) => {
  const { bookId } = req.params; 
  const { title, author, genre, imageUrl } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { title, author, genre, imageUrl },
      { new: true, runValidators: true } 
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
  } catch (error) {
    res.status(400).json({ message: 'Error updating book', error });
  }
};


export const deleteBook = async (req, res) => {
  const { bookId } = req.params; 
  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting book', error });
  }
};


export const borrowBook = async (req, res) => {
  const { userId, bookId } = req.body;
  try {
    const newLoan = new Loan({ userId, book: bookId });
    await newLoan.save();
    res.status(201).json({ message: 'Book borrowed successfully', loan: newLoan });
  } catch (error) {
    res.status(400).json({ message: 'Error borrowing book', error });
  }
};


export const returnBook = async (req, res) => {
  const { loanId } = req.params; 
  try {
    const loan = await Loan.findById(loanId);
    if (loan && !loan.isReturned) {
      loan.returnDate = Date.now();
      loan.isReturned = true;
      await loan.save();
      res.status(200).json({ message: 'Book returned successfully', loan });
    } else {
      res.status(404).json({ message: 'Loan not found or already returned' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error returning book', error });
  }
};
