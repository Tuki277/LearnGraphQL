const { books, authors } = require('./../data/static')
const Author = require('../models/author')
const Book = require('../models/book')
const mongoDataMethods = require('../data/db')

const resolver = {

    //QUERY
    Query: {
        books: async (parent, args, {mongoDataMethods}) => 
            await mongoDataMethods.getAllBooks(),
        book: async (parent, args, {mongoDataMethods}) =>
            await mongoDataMethods.getBookById(args.id),
        authors: async (parent, args, {mongoDataMethods}) => 
            await mongoDataMethods.getAllAuthor(),
        author: async (parent, {id}, {mongoDataMethods}) => 
            await mongoDataMethods.getAuthorById(id),
    },
    Book: {
        author: async ({authorId}, args, {mongoDataMethods}) =>
        {
            return await mongoDataMethods.getAuthorById(authorId)
        }
            
    },
    Author: {
        books: async ({id}, args, {mongoDataMethods}) =>
            await mongoDataMethods.getAllBooks({ authorId: id })
    },

    //MUTATION
    Mutation: {
        createAuthor: async (parent, args, {mongoDataMethods}) => 
            await mongoDataMethods.createAuthor(args),
        createBook: async (parent, args, {mongoDataMethods}) => 
            await mongoDataMethods.createBook(args),
    }
}

module.exports = resolver