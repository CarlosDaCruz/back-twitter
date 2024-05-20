import mongoose from "mongoose";

const userSchema = new mongoose.Schema({    //Modo de guardar los usuarios en la base de datos
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
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
    timestamps: true
});

export default mongoose.model('User', userSchema);  //Modelo para crear metodos que conecten a la base de datos