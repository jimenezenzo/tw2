import mongoose from "mongoose";

const productoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    bateria: {
        type: String,
        required: true
    },
    almacenamiento: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    imagen: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
});

const Producto = mongoose.model("Producto", productoSchema);

export default Producto;