import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
	{
		id: {type: String},
		name: {
			type: String, 
			required: [true, "Author's name is required"]
		},
		nationality: {
			type: String, 
			required: [true, "Author's nationality is required"]
		}
	},
	{
		versionKey: false
	}
);

const authors = mongoose.model("author", authorSchema);

export default authors;