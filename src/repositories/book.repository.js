import {Book} from "../model/index.js";

export const addBook = async (book, options = {}) => {
    return await Book.create(book, options);
}

export const findBookById = async (id, options = {}) => {
    return await Book.findByPk(id, options);
}

export const findBooks = async (options = {}) => {
    return await Book.findAll(options);
}