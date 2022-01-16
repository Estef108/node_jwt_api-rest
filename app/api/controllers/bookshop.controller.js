const Bookshop = require('../models/Bookshop');
const httpStatusCode = require('../../utils/httpStatusCode');

//Obtener todas las librerías
const getAllBookshops = async (req, res, next) => {
    try {
        if (req.query.page) {
            const page = parseInt(req.query.page);
            const skip = (page - 1) * 20;
            const allBookshops = await Bookshop.find().skip(skip).limit(20).populate("books");
            return res.json({
                status: 200,
                message: httpStatusCode[200],
                data: { bookshops: allBookshops }
            })
        } else {
            const allBookshops = await Bookshop.find().populate("books");
            return res.json({
                status: 200,
                message: httpStatusCode[200],
                data: { bookshops: allBookshops },
            });
        }
    } catch (error) {
        return next(error);
    }
}

//Obtener librería por id
const getBookshopById = async (req, res, next) => {
    try {
        const { bookshopId } = req.params;
        const bookshopById = await Bookshop.findById(bookshopId);
        return res.json({
            status: 200,
            message: httpStatusCode[200],
            data: { bookshop: bookshopById }
        })
    } catch (error) {
        return next(error);
    }
}

//Añadir nueva librería
const addBookshop = async (req, res, next) => {
    try {
        const newBookshop = new Bookshop();
        newBookshop.name = req.body.name;
        newBookshop.location = req.body.location;
        newBookshop.books = req.body.books;
        newBookshop.author = req.authority.id;
        const bookshopDb = await newBookshop.save();
        return res.json({
            status: 201,
            message: httpStatusCode[201],
            data: { bookshops: bookshopDb }
        })
    } catch (error) {
        return next(error);
    }
}

//Eliminar librería por id. Si no tiene autor (semilla) no se puede eliminar
const deleteBookshopById = async (req, res, next) => {
    try {
        const { bookshopId } = req.params;
        const authority = req.authority.id;
        const userBookshop = await Bookshop.findById(bookshopId);
        if (!userBookshop.author) {
            return res.json({
                status: 400,
                message: "Esta librería no se puede eliminar",
                data: null
            })
        }
        if (authority == (userBookshop.author._id).toString()) {
            const bookshopDeleted = await Bookshop.findByIdAndDelete(bookshopId);
            if (!bookshopDeleted) {
                return res.json({
                    status: 200,
                    message: "No existe una librería con ese Id",
                    data: null
                })
            } else {
                res.json({
                    status: 200,
                    message: httpStatusCode[200],
                    data: { deletedBookshop: bookshopDeleted }
                })
            }
        } else {
            return res.json({
                status: 403,
                message: httpStatusCode[403],
                data: null
            })
        }
    } catch (error) {
        next(error);
    }
}

//Obtener librerías por usuario
const getBookshopsByUser = async (req, res, next) => {
    try {
        const author = req.authority.id;
        if (req.query.page) {
            const page = parseInt(req.query.page);
            const skip = (page - 1) * 20;
            const allBookshopsByUser = await Bookshop.find({ author: author }).skip(skip).limit(20).populate("books");
            return res.json({
                status: 200,
                message: httpStatusCode[200],
                data: { bookshops: allBookshopsByUser },
            });
        } else {
            const allBookshopsByUser = await Bookshop.find({ author: author }).populate("books");
            return res.json({
                status: 200,
                message: httpStatusCode[200],
                data: { bookshops: allBookshopsByUser },
            });
        }
    }
    catch (error) {
        return next(error);
    }
}

//Actualizar librería
const updateBookshopById = async (req, res, next) => {
    try {
        const { bookshopId } = req.params;
        const authority = req.authority.id;
        console.log(authority);

        const bookshopById = await Bookshop.findById(bookshopId);
        console.log((bookshopById.author._id).toString());
        if (authority == (bookshopById.author._id).toString()) {
            const bookshopToUpdate = new Bookshop();
            if (req.body.name) bookshopToUpdate.name = req.body.name;
            if (req.body.location) bookshopToUpdate.location = req.body.location;
            if (req.body.books) bookshopToUpdate.books = req.body.books;
            if (req.body.author) bookshopToUpdate.author = req.body.author;
            bookshopToUpdate._id = bookshopId;
            const bookshopUpdated = await Bookshop.findByIdAndUpdate(bookshopId, bookshopToUpdate, { new: true });
            return res.json({
                status: 200,
                message: httpStatusCode[200],
                data: { bookshops: bookshopUpdated }
            });
        } else {
            return res.json({
                status: 403,
                message: httpStatusCode[403],
                data: null
            })
        }
    } catch (error) {
        return next(error)
    }
}

//Añadir libros a librería

const addBookToBookshop = async (req, res, next) => {
    try {
        const { bookshopId } = req.params;
        const bookId = req.body.bookToAdd;
        const updatedBookshop = await Bookshop.findByIdAndUpdate(
            bookshopId,
            { $push: { books: bookId } },
            { new: true }
        );
        res.json({
            status: 200,
            message: httpStatusCode[200],
            data: { updatedBookshop }
        })
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getAllBookshops,
    getBookshopById,
    addBookshop,
    deleteBookshopById,
    updateBookshopById,
    getBookshopsByUser,
    addBookToBookshop
}