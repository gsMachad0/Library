import express from "express";
import AuthorController from "../controllers/authorsController.js";

const router = express.Router();

router
	.get("/authors", AuthorController.listAuthors)
	.get("/authors/:id", AuthorController.listAuthorByID)
	.post("/authors", AuthorController.registerAuthor)
	.put("/authors/:id", AuthorController.updateAuthor)
	.delete("/authors/:id", AuthorController.deleteAuthor);

export default router;