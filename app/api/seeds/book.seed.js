const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Book = require('../models/Book');

const books = [
    { "title": "Cien años de soledad",
    "author": "Gabriel García Márquez",
    "year": 1967,
    },
    { "title": "El guardián entre el centeno",
    "author": "J.D. Salinger",
    "year": 1951,
    },
    { "title": "El conde de Montecristo",
    "author": "Alejandro Dumas",
    "year": 1846
    },
    { "title": "Orgullo y prejuicio",
    "author": "Jane Austen",
    "year": 1813
    },
    { "title": "Matar a un ruiseñor",
    "author": "Harper Lee",
    "year": 1960
    },
    { "title": "Flores en el ático",
    "author": "V.C. Andrews",
    "year": 1979
    },
    { "title": "1984",
    "author": "George Orwell",
    "year": 1949
    },
    { "title": "Drácula",
    "author": "Bram Stoker",
    "year": 1897
    },
    { "title": "Cometas en el cielo",
    "author": "Khaled Hosseini",
    "year": 2003
    },
    { "title": "Romeo y Julieta",
    "author": "William Shakespeare",
    "year": 1597
    },
    { "title": "Moby Dick",
    "author": "Herman Melville",
    "year": 1851
    },
    { "title": "Crimen y castigo",
    "author": "Fiódor M. Dostoievski",
    "year": 1866
    },
    { "title": "Jane Eyre",
    "author": "Charlotte Brontë",
    "year": 1847
    },
    { "title": "Ana Karenina",
    "author": "Leon Tolstoi",
    "year": 1877
    },
    { "title": "Las aventuras de Alicia en el país de las Maravillas",
    "author": "Lewis Carroll",
    "year": 1865
    },
    { "title": "El Principito",
    "author": "Antoine de Saint-Exupéry",
    "year": 1943
    },
    { "title": "El señor de los anillos. La comunidad del anillo",
    "author": "J.R.R. Tolkien",
    "year": 1954
    },
    { "title": "El nombre de la rosa",
    "author": "Umberto Eco",
    "year": 1980
    },
    { "title": "Robinson Crusoe",
    "author": "Daniel Defoe",
    "year": 1719
    },
    { "title": "Veinte mil leguas de viaje submarino",
    "author": "Julio Verne",
    "year": 1870
    },
    { "title": "Ana de las Tejas Verdes",
    "author": "Lucy Maud Montgomery",
    "year": 1908
    },
    { "title": "Las aventuras de Huckleberry Finn",
    "author": "Mark Twain",
    "year": 1884
    },
    { "title": "El perfume",
    "author": "Patrick Süskind",
    "year": 1985
    },
    { "title": "Frankenstein",
    "author": "Mary Shelley",
    "year": 1818
    }
    ]

mongoose
    .connect(process.env.MONGO_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    .then( async() => {
        const allBooks = await Book.find();
        if( allBooks.length ) {
            await Book.collection.drop();
            console.log('Dropped database');
        }
    })
    .catch( error => console.log(`Error deleting data: ${error}`))
    .then( async() => {
        await Book.insertMany(books);
        console.log('Database created');
    })
    .catch( error => console.log(`Error adding data: ${error}`))
    .finally( () => mongoose.disconnect());