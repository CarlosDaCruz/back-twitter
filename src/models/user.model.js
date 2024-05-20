import mongoose from "mongoose";

const userSchema = new mongoose.Schema({    //Modo de guardar los usuarios en la base de datos
    username: {
        type: String,   //Tipo de dato
        required: true, //Que sea obligatorio
        unique: true,   //Que sea unico
        trim: true  //Quitar espacios en blanco
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true    //Para que guarde la fecha de creacion y modificacion
});

export default mongoose.model('User', userSchema);  //Modelo para crear metodos que conecten a la base de datos