import {Author} from "../model/index.js";

export const findAuthorById = async (id) => {
    return await Author.findByPk(id);
}

export const addAuthor = async (author) => {
    return await Author.create({name: author.name, birth_date: new Date(author.birthDate)});
}