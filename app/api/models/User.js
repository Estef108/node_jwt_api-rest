const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    favBooks: [{ type: Schema.Types.ObjectId, ref: 'books' }]
})

userSchema.plugin(uniqueValidator, { message: 'Email already in use.' });
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash( this.password, saltRounds);
    next();
})

const User = mongoose.model('users', userSchema);

module.exports = User;