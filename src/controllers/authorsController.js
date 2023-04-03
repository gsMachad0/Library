import mongoose from "mongoose";
import authors from "../models/Author.js";

class AuthorsController {

	static listAuthors = async (req, res) => {
		try{
			const authorsResult = await authors.find();
			res.status(200).json(authorsResult);
		} catch(error)
		{
			res.status(500).json({message: `Internal error ${error.message}`});
		}    
	};

	static listAuthorByID = async (req, res) => {
		const id = req.params.id;
		try
		{    
			const authorResult = await authors.findById(id);
			if(authorResult != null){
				res.status(200).send(authorResult);
			} else {
				res.status(404).send({message: `ID ${id} not found!`});
			}
		} catch(error)
		{
			if(error instanceof mongoose.Error.CastError){
				res.status(400).send({message: `${error.message} - Wrong data informed`});
			} else {
				res.status(500).send({message: `${error.message} - Internal server error`});
			}
		}   
	};

	static registerAuthor = async (req, res) => {
		try
		{
			let author = new authors(req.body);
			await author.save();
			res.status(201).json(author);
		} catch(error)
		{
			res.status(500).send({message: `${error.message} - Failed to register new author`});
		}
	};

	static updateAuthor = async (req, res) => {
		try
		{      
			const id = req.params.id;
			await authors.findByIdAndUpdate(id, {$set: req.body});
			res.status(200).send({message: "Author updated"});
		} catch(error)
		{
			res.status(500).send({message: `${error.message} - Failed to update author`});
		}   
	};

	static deleteAuthor = async (req, res) => {    
		try
		{
			const id = req.params.id;
			await authors.findByIdAndDelete(id);
			res.status(200).send({message: "author deleted"});
		} catch(error)
		{
			res.status(500).send({message: `${error.message} - Failed to delete author`});
		}
	};

}

export default AuthorsController;