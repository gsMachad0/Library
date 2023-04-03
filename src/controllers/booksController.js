import books from "../models/Book.js";

class BookController {

	static listBooks = async (req, res) => {
		try{
			const booksResult = await books.find().populate("author");
			res.status(200).json(booksResult);
		}catch(error){
			res.status(400).send({message: `${err.message}`});
		}
	};

	static listBookByID = async (req, res) => {
		const id = req.params.id;
		try{
			
			const booksResult = await books.findById(id).populate("author", "name");
			res.status(200).send(booksResult);
		}catch(error){
			res.status(400).send({message: `${error.message} - Book with ID[${id}] not found.`});
		}
	};

	static listBookByPublisher = async (req, res) => {
		const pub = req.query.publisher;
		try{			
			let booksResult = await books.find({"publisher": pub}, {});
			res.status(200).send(booksResult);
		}catch(error){
			res.status(400).send({message: `${error.message} - Failed to find book with publisher ${pub}`});
		}
	};

	static registerBook = async (req, res) => {
		try{
			let book = new books(req.body);
			await book.save();
			res.status(201).send(book.toJSON());
		}catch(error){
			res.status(500).send({message: `${error.message} - Failed to register new book`});
		}
	};

	static updateBook = async (req, res) => {
		try{
			const id = req.params.id;
			await books.findByIdAndUpdate(id, {$set: req.body});
			res.status(200).send({message: "Book updated"});
		}catch(error){
			res.status(500).send({message: `${error.message} - Failed to update book`});
		}
	};

	static deleteBook = async (req, res) => {
		try{
			const id = req.params.id;
			await books.findByIdAndDelete(id);
			res.status(200).send({message: "Book deleted"});
		}catch(error){
			res.status(500).send({message: `${error.message} - Failed to delete book`});

		}
	};

}

export default BookController;