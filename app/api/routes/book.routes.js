const express = require('express');
const router = express.Router();
const { isAuth } = require('../../middlewares/auth.middleware');
const {
    getAllBooks,
    getBookById,
    addBook,
    deleteBook
} = require('../controllers/book.controller');




router.get('/', [isAuth], getAllBooks );
router.get('/:bookId', [isAuth], getBookById );
router.post('/newBook', [isAuth], addBook );
router.delete('/:bookId', [isAuth], deleteBook );


module.exports = router;