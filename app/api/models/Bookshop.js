const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookshopSchema = new Schema (
    {
        name: { type: String, required: true },
        address: { type: String},
        location: { type: String, required: true },
        image: { type: String},
        books: [{ type: Schema.Types.ObjectId, ref: 'books', required: true }],
        author: { type: Schema.Types.ObjectId, ref: 'users'}
    },
    {
        timestamps: true,
    }
)

const Bookshop = mongoose.model('bookshops', bookshopSchema);

module.exports = Bookshop;