import * as bookRepository from "../repositories/book.repository.js";
import * as publisherRepository from "../repositories/publisher.repository.js";
import * as authorRepository from "../repositories/author.repository.js";

export const addBook = async (book) => {
    const {isbn, title, authors, publisher} = book;
    const existingBook = await bookRepository.findBookById(isbn);
    if (existingBook) {
        throw new Error("Book with the same ISBN already exists");
    }
    // Create or find the publisher
    let publisherRecord = publisherRepository.findPublisherById(publisher);
    if (!publisherRecord) {
        publisherRecord = await publisherRepository.addPublisher(publisher);
    }
    // Process the authors
    const authorRecords = [];
    for (const author of authors) {
        let authorRecord = await authorRepository.findAuthorById(author.name);
        if(!authorRecord) {
            authorRecord = await authorRepository.addAuthor(author);
        }
        authorRecords.push(authorRecord);
    }
    // Create a new Book
    book = await bookRepository.addBook({isbn, title, publisher});
    await book.setAuthors(authorRecords);
}

export const findBookByIsbn = async (isbn) => {
    // TODO: Implement findBookByIsbn service
}

export const removeBook = async (isbn) => {
    // TODO: Implement removeBook service
}

export const updateBookTitle = async (isbn, title) => {
    // TODO: Implement updateBookTitle service
}

export const findBooksByAuthor = async (authorName) => {
    // TODO: Implement findBooksByAuthor service
}

export const findBooksByPublisher = async (publisherName) => {
    // TODO: Implement findBooksByPublisher service
}