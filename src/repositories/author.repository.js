import {Author} from "../model/index.js";

export const findAuthorById = async (id, options = {}) => {
    return await Author.findByPk(id, options);
}

export const addAuthor = async (author, options = {}) => {
    return await Author.create({name: author.name, birth_date: new Date(author.birthDate)}, options);
}