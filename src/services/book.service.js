import * as bookRepository from "../repositories/book.repository.js";
import * as publisherRepository from "../repositories/publisher.repository.js";
import * as authorRepository from "../repositories/author.repository.js";
import {sequelize} from "../config/database.js";
import {Author} from "../model/index.js";

export const addBook = async (book) => {
    const t = await sequelize.transaction();
    try {
        const {isbn, title, authors, publisher} = book;
        const existingBook = await bookRepository.findBookById(isbn, {transaction: t});
        if (existingBook) {
            throw new Error("Book with the same ISBN already exists");
        }
        // Create or find the publisher
        let publisherRecord = await publisherRepository.findPublisherById(publisher, {transaction: t});
        if (!publisherRecord) {
            publisherRecord = await publisherRepository.addPublisher(publisher, {transaction: t});
        }
        // Process the authors
        const authorRecords = [];
        for (const author of authors) {
            let authorRecord = await authorRepository.findAuthorById(author.name, {transaction: t});
            if (!authorRecord) {
                authorRecord = await authorRepository.addAuthor(author, {transaction: t});
            }
            authorRecords.push(authorRecord);
        }
        // Create a new Book
        book = await bookRepository.addBook({isbn, title, publisher}, {transaction: t});
        await book.setAuthors(authorRecords, {transaction: t});
        await t.commit();
    } catch (e) {
        await t.rollback();
        console.log('Error adding book:', e);
        throw e;
    }
}

export const findBookByIsbn = async (isbn) => {
    const book = await bookRepository.findBookById(isbn, {
        include: [
            {
                model: Author,
                as: 'authors',
                attributes: {
                    include: ['name', [sequelize.col('birth_date'), 'birthDate']],
                    exclude: ['birth_date']
                },
                through: {
                    attributes: []
                }
            },
        ],
    });
    if (!book) {
        throw new Error(`Book with ISBN ${isbn} not found`);
    }
    return book;
}

export const removeBook = async (isbn) => {
    const transaction = await sequelize.transaction();
    try {
        const book = await bookRepository.findBookById(isbn, {
            transaction,
            include: [
                {
                    model: Author,
                    as: 'authors',
                    attributes: {
                        include: ['name', [sequelize.col('birth_date'), 'birthDate']],
                        exclude: ['birth_date']
                    },
                    through: {
                        attributes: []
                    }
                },
            ],
        })
        if (!book) {
            throw new Error(`Book with ISBN ${isbn} not found`);
        }
        await book.destroy({transaction});
        await transaction.commit();
        return book;
    } catch (e) {
        await transaction.rollback();
        console.log('Error removing book:', e);
        throw e;
    }
}

export const updateBookTitle = async (isbn, title) => {
    const transaction = await sequelize.transaction();
    try {
        const book = await bookRepository.findBookById(isbn, {
            transaction,
            include: [
                {
                    model: Author,
                    as: 'authors',
                    attributes: {
                        include: ['name', [sequelize.col('birth_date'), 'birthDate']],
                        exclude: ['birth_date']
                    },
                    through: {
                        attributes: []
                    }
                },
            ],
        })
        if (!book) {
            throw new Error(`Book with ISBN ${isbn} not found`);
        }
        book.title = title;
        await book.save({transaction});
        await transaction.commit();
        return book;
    } catch (e) {
        await transaction.rollback();
        console.log('Error removing book:', e);
        throw e;
    }
}

export const findBooksByAuthor = async (authorName) => {
    // TODO: Implement findBooksByAuthor service
}

export const findBooksByPublisher = async (publisherName) => {
    // TODO: Implement findBooksByPublisher service
}