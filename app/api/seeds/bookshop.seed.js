const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Bookshop = require('../models/Bookshop');

const bookshops = [
    {
        "name": "Librería Dominó",
        "address": "Avda Francisco de Goya, 76. 50006, Zaragoza",
        "location": "Zaragoza"
    },
    {
        "name": "Casa del libro",
        "address": "C/ Gran Vía, 29. 28013, Madrid",
        "location": "Madrid"
    },
    {
        "name": "La Jerónima",
        "address": "C/ Santa Clara, 63. 47610, Valladolid",
        "location": "Valladolid"
    },
    {
        "name": "Laie",
        "address": "C/ Copérnic, 84  . 41004 Sevilla",
        "location": "Barcelona"
    },
    {
        "name": "Librería Páramo",
        "address": "C/ Acacia, 125. 41004 Sevilla",
        "location": "Sevilla"
    },
    {
        "name": "Librería Bravo",
        "address": "C/ Mediodía, 33.23009, Jaén",
        "location": "Jaén"
    },
    {
        "name": "Librería Zeus",
        "address": "C/ Sebastián Martínez, 52. 15010 A Coruña",
        "location": "A Coruña"
    },
    {
        "name": "La Galatea",
        "address": "C/ Libreros, 28. 37008 Salamanca",
        "location": "Salamanca"
    }
]

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then( async () => {
        const allBookshops = await Bookshop.find();
        if (allBookshops.length) {
            await Bookshop.collection.drop();
            console.log(`Dropped database`);
        }
    })
    .catch( error => console.log(`Error deleting database: ${error}`))
    .then( async () => {
        await Bookshop.insertMany(bookshops);
        console.log(`Database created`);
    })
    .catch( error => console.log(`Error creating database ${error}`))
    .finally( () => mongoose.disconnect())