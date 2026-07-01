import * as authorRepository from "../repositories/author.repository.js";
import {sequelize} from "../config/database.js";
import {QueryTypes} from "sequelize";

export const findPublishersByAuthor = async (authorName) => {
    const author = await authorRepository.findAuthorById(authorName);
    if (!author) {
        throw new Error(`Author with name ${authorName} not found`);
    }
    const publishers = await sequelize.query(`
        SELECT DISTINCT b.publisher
        FROM books b 
                 JOIN books_authors ba ON ba.isbn = b.isbn
        WHERE ba.author_name = :name
    `, {
        replacements: {name: authorName},
        type: QueryTypes.SELECT
    })
    return publishers.map(p => p.publisher);
}