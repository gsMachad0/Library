import NotFound from "../errors/NotFound.js";
import books from "../models/Book.js";

class BookController {

	static listBooks = async (req, res, next) => {
		try{
			const booksResult = await books.find().populate("author");
			res.status(200).json(booksResult);
		}catch(error){
			next(error);
		}
	};

	static listBookByID = async (req, res, next) => {
		const id = req.params.id;
		try{			
			const booksResult = await books.findById(id).populate("author", "name");
			if(booksResult != null){
				res.status(200).send(booksResult);
			} else {
				next(new NotFound(`ID ${id} not found!`));
			}
		}catch(error){
			next(error);
		}
	};

	static listBookByPublisher = async (req, res, next) => {
		const pub = req.query.publisher;
		try{			
			let booksResult = await books.find({"publisher": pub}, {});
			res.status(200).send(booksResult);
		}catch(error){
			next(error);
		}
	};

	static registerBook = async (req, res, next) => {
		try{
			let book = new books(req.body);
			await book.save();
			res.status(201).send(book.toJSON());
		}catch(error){
			next(error);
		}
	};

	static updateBook = async (req, res, next) => {
		try{
			const id = req.params.id;
			await books.findByIdAndUpdate(id, {$set: req.body});
			res.status(200).send({message: "Book updated"});
		}catch(error){
			next(error);
		}
	};

	static deleteBook = async (req, res, next) => {
		try{
			const id = req.params.id;
			await books.findByIdAndDelete(id);
			res.status(200).send({message: "Book deleted"});
		}catch(error){
			next(error);
		}
	};

}

export default BookController;