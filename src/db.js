import mongoose from "mongoose";
const uri = "mongodb+srv://cdcpavas:carlos12345678@cluster0.jgzgpb0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


export const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.log(error);
    }
};