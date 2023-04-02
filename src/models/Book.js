import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    id: {type: String},
    title: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectID, ref: 'author', required: true},
    publisher: {type: String, required: true},
    pagesNumber: {type: Number}
  }
);

const books = mongoose.model('book', bookSchema);

export default books;