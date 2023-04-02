import books from "../models/Book.js";

class BookController {

    static listBooks = (req, res) => {
        books.find()
            .populate('author')    
            .exec((err, books) => {
            res.status(200).json(books);
        })
    }

    static listBookByID = (req, res) => {
        const id = req.params.id;
        books.findById(id)
        .populate('author', 'name')
        .exec((err, books) => {
            if(err){
                res.status(400).send({message: `${err.message} - Book with ID[${id}] not found.`});
            } else {
                res.status(200).send(books);
            }
        });
    }

    static listBookByPublisher = (req, res) => {
        const pub = req.query.publisher;
        books.find({'publisher': pub}, {}, (err, books) => {
            if(err){
                res.status(400).send({message: `${err.message} - Failed to find book with publisher ${pub}`});
            } else {
                res.status(200).send(books);
            }
        });
    }

    static registerBook = (req, res) => {
        let book = new books(req.body);
        book.save((err) => {
            if(err){
                res.status(500).send({message: `${err.message} - Failed to register new book`});
            } else {
                res.status(201).send(book.toJSON());
            }
        });
    }

    static updateBook = (req, res) => {
        const id = req.params.id;
        books.findByIdAndUpdate(id, {$set: req.body}, (err) =>{
            if(!err){
                res.status(200).send({message: 'Book updated'});
            } else {
                res.status(500).send({message: `${err.message} - Failed to update book`});
            }
        });
    }

    static deleteBook = (req, res) => {
        const id = req.params.id;
        books.findByIdAndDelete(id, (err) =>{
            if(!err){
                res.status(200).send({message: 'Book deleted'});
            } else {
                res.status(500).send({message: `${err.message} - Failed to delete book`});
            }
        });
    }

}

export default BookController;