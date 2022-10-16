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
                'Electronica',
                'Camara',
                'Laptop',
                'Accesorios',
                'Ropa',
                'Zapatos',
                'Juguetes',
                'Libros',
                'Audifonos',
                'Otros'
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
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
    
})

module.exports = moongose.model('productos', productosSchema);
