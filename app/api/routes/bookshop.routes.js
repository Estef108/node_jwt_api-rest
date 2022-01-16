const express = require('express');
const router = express.Router();
const { isAuth } = require('../../middlewares/auth.middleware');
const {
    getAllBookshops,
    getBookshopById,
    addBookshop,
    deleteBookshopById,
    updateBookshopById,
    getBookshopsByUser,
    addBookToBookshop
} = require('../controllers/bookshop.controller');


router.get('/', [isAuth], getAllBookshops);
router.post('/newBookshop', [isAuth], addBookshop);
router.get('/bookshopsByUser', [isAuth], getBookshopsByUser);
router.get('/:bookshopId', [isAuth], getBookshopById);
router.put('/:bookshopId', [isAuth], updateBookshopById);
router.delete('/:bookshopId', [isAuth], deleteBookshopById);
router.put('/:bookshopId/books', [isAuth], addBookToBookshop);


module.exports = router;