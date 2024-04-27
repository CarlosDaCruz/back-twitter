import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({   //Datos a guardar de cada tweet
        theme: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
}, 
    {
        timestamps: true    //
    }
);

export default mongoose.model('Tweet', tweetSchema);  //Exportar el modelo de datos