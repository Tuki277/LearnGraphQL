const Book = require('../models/book')
const Author = require('../models/author')

//query mongo tai day

const mongoDataMethods = {
    getAllBooks: async (condition = null) => 
        condition === null ? await Book.find({}) : await Book.find(condition),
    getAllAuthor: async () => await Author.find({}),
    getBookById: async (id) => await Book.findById(id),
    getAuthorById: async (id) => await Author.findById(id),
    createAuthor: async args => {
        const newAuthor = new Author(args)
        return await newAuthor.save()
    },
    createBook: async args => {
        const newBook = new Book(args)
        return await newBook.save()
    }
}

module.exports = mongoDataMethods