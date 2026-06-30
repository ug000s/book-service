import {Book} from "../model/index.js";

export const addBook = async (book) => {
    return await Book.create(book);
}

export const findBookById = async (id) => {
    return await Book.findByPk(id);
}