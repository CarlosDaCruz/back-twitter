import mongoose from "mongoose";
const uri = process.env.MONGODB_URI";


export const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.log(error);
    }
};