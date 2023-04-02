import mongoose, { mongo } from "mongoose";

mongoose.connect("mongodb+srv://gsMachado:root@node-express.ctmldf3.mongodb.net/node-books");

let db = mongoose.connection;

export default db;