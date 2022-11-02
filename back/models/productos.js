const moongose = require('mongoose');

const productosSchema = moongose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim:true,
        maxLenght: [50, 'El nombre no puede tener mas de 50 caracteres']
    },  
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        maxLenght: [8, 'El precio no puede tener mas de 8 caracteres'],
        default: 0
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    calificacion: {
        type: Number,
        default: 0
    },
    imagen: [{
        public_id: {
            type: String,
            required: true
        },  
        url: {
            type: String,
            required: true
        }
    }],
    categoria: {
        type: String,
        required: [true, 'La categoria es obligatoria'],
        enum: {
            values: [
                'Cientificos',
                'Literatura y linguisticos',
                'De viajes',
                'Biografias',
                'Libro de texto',
                'De referencia y consulta',
                'Monografias',
                'Recreativos',
                'Poeticos',
                'Juveniles',
                'Ficcion',
                'Comedia',
                'Drama',
                'Terror',
                'Ciencia ficcion',
                'Fantasia',
                'Romance',
                'Novela',
                'Poesia',
                'Teatro',
                'Cuentos',
                'Ensayos',
                'Historia',
                'Filosofia',
                'Religion',
                'Ciencias sociales',
                'Ciencias naturales',
                'Matematicas',
                'Ciencias de la salud',
                'Ciencias de la tierra',
                'Ciencias de la computacion',
                'Ciencias de la ingenieria',
                'Ciencias economicas',
                'Ciencias politicas',
                'Ciencias de la educacion',
                'Ciencias de la comunicacion',
                'Ciencias de la administracion',
                'Ciencias de la agricultura',
                'Ciencias de la medicina',
                'Ciencias de la fisica'
            ],
            message: 'Por favor seleccione una categoria correcta'
        }
    },
    vendedor: {
        type: String,
        required: [true, 'El vendedor es obligatorio']
    },
    stock: {
        type: Number,
        required: [true, 'El stock es obligatorio'],
        maxLenght: [5, 'El stock no puede tener mas de 5 caracteres'],
        default: 0
    },
    numCalificaciones: {
        type: Number,
        default: 0
    },
    reviews: [{
        nombre: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comentario: {
            type: String,
            required: true
        }
    }],

    user: {
        type: moongose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    fechaCreacion: {
        type: Date,
        default: Date.now
    }
    
})

module.exports = moongose.model('productos', productosSchema);
