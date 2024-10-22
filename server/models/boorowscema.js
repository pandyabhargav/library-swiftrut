import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book', 
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, 
  },
  borrowDate: {
    type: Date,
    default: Date.now,
  },
  returnDate: {
    type: Date,
    default: null,
  },
  isReturned: {
    type: Boolean,
    default: false, 
  },
});

const Loan = mongoose.model('Loan', loanSchema);

export default Loan;
