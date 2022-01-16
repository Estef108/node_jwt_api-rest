const Book = require('../models/Book');
const httpStatusCode = require('../../utils/httpStatusCode');

//Obtener todos los libros
const getAllBooks = async (req, res, next) => {
    try {
        if (req.query.page) {
            const page = parseInt(req.query.page);
            const skip = (page - 1) * 20;
            const allBooks = await Book.find().populate().skip(skip).limit(20);
            return res.json({
                status: 200,
                message: httpStatusCode[200],
                data: { books: allBooks }
            })
        } else {
            const allBooks = await Book.find();
            return res.json({
                status: 200,
                message: httpStatusCode[200],
                data: { books: allBooks },
            });
        }

    } catch (error) {
        return next(error);
    }
}

//Obtener un libro por su id
const getBookById = async (req, res, next) => {
    try {
        const { bookId } = req.params;
        const bookById = await Book.findById(bookId);
        return res.json({
            status: 200,
            message: httpStatusCode[200],
            data: { books: bookById }
        })
    } catch (error) {
        return next(error);
    }
};

//Añadir nuevo libro
const addBook = async (req, res, next) => {
    try {
        const newBook = new Book();
        newBook.title = req.body.title;
        newBook.author = req.body.author;
        newBook.year = req.body.year;

        const newBookDB = await newBook.save();
        return res.json({
            status: 201,
            message: httpStatusCode[201],
            data: newBookDB,
        })
    } catch (error) {
        next(error);
    }
}

//Eliminar libro
const deleteBook = async (req, res, next) => {
    try {
        const { bookId } = req.params;
        const bookDeleted = await Book.findByIdAndDelete(bookId);
        res.json({
            status: 200,
            message: httpStatusCode[200],
            data: bookDeleted,
        })
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    deleteBook
}