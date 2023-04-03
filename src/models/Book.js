import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
	{
		id: {type: String},
		title: {
			type: String, 
			required: [true, "Book's title is required"]
		},
		author: {
			type: mongoose.Schema.Types.ObjectID, 
			ref: "author", 
			required: [true, "Book's author is required"]
		},
		publisher: {
			type: String, 
			required: [true, "Book's publisher is required"]
		},
		pagesNumber: {type: Number}
	}
);

const books = mongoose.model("book", bookSchema);

export default books;