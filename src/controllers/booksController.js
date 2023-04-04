import NotFound from "../errors/NotFound.js";
import {authors, books} from "../models/index.js";

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

	static listBookByFilter = async (req, res, next) => {		
		try{		
			const search = await handleSearch(req.query);
			
			if(search !== null){
				const booksResult = await books
					.find(search)
					.populate("author");
				res.status(200).send(booksResult);
			} else {
				res.status(200).send([]);
			}			
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
			const bookResult = await books.findByIdAndUpdate(id, {$set: req.body});
			if(bookResult != null){
				res.status(200).send({message: "Book updated"});
			} else {
				next(new NotFound(`ID ${id} not found!`));
			}			
		}catch(error){
			next(error);
		}
	};

	static deleteBook = async (req, res, next) => {
		try{
			const id = req.params.id;
			const bookResult = await books.findByIdAndDelete(id);
			if(bookResult != null){
				res.status(200).send({message: "Book deleted"});
			} else {
				next(new NotFound(`ID ${id} not found!`));
			}				
		}catch(error){
			next(error);
		}
	};

}

async function handleSearch(params){
	const { publisher , title, minPages, maxPages, authorName } = params;	

	let search = {};

	if(publisher) search.publisher = publisher;
	if(title) search.title = { $regex: title, $options: "i"};

	if(minPages || maxPages) search.pagesNumber = {};

	//Greater Than or Equal
	if(minPages) search.pagesNumber.$gte = minPages;
	//Lesser Than or Equal
	if(maxPages) search.pagesNumber.$lte = maxPages;

	if(authorName) {
		const author = await authors.findOne({ name: authorName });
		if(author !== null){
			search.author = author._id;
		} else {
			search = null;
		}
		
	}

	return search;
}

export default BookController;