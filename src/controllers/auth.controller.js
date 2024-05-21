import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

//Este archivo es para el control de los usuarios, como el registro y el login

export const register = async (req, res) => {
    const {username, email,  password} = req.body;

    try {

        const userFound = await User.findOne({ email}); //Busca el usuario en la base de datos
        if (userFound) 
            return res.status(400).json({ message: ["Email is already in use"] }); //Si lo encuentra, devuelve un mensaje de error

        const passwordHash = await bcrypt.hash(password, 10);   //Encripta la contraseña en un HASH de 10 caracteres
        const newUser = new User({
            username,
            email,
            password: passwordHash,
        })


        
        //Cada que alguien se registra se genera el token necesario
        const userSaved = await newUser.save(); //Guarda el usuario en la base de datos

        const token = await createAccessToken({id: userSaved._id}) //Crea un token con el ID del usuario
        res.cookie("token", token)     //Pone en una cookie la respuesta, que es el token
         
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });    //Devuelve el usuario guardado en formato JSON al Frontend
    
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message }); //Si hay un error, devuelve un mensaje de error
    }
    
};

export const login = async (req, res) => {
    const { username, password  } = req.body;

    try {

        const userFound = await User.findOne({ username }); //Busca el usuario en la base de datos
        if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" }); //Si no lo encuentra, devuelve un mensaje de error

        const isright = await bcrypt.compare(password, userFound.password);   //Compara la contraseña encriptada con la contraseña ingresada
        if (!isright) return res.status(400).json({ message: "Contraseña incorrecta" }); //Si no es correcta, devuelve un mensaje de error
        
       
        const token = await createAccessToken({id: userFound._id}) //Crea un token con el ID del usuario encontrado
        
        res.cookie('token', token)     //Pone en una cookie la respuesta, que es el token
        res.json({
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
                createdAt: userFound.createdAt,
                updatedAt: userFound.updatedAt,
        });    //Devuelve el usuario guardado en formato JSON al Frontend
    
    } catch (error) {
        res.status(500).json({ message: error.message }); //Si hay un error, devuelve un mensaje de error
    }
    
};

export const logout = async (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200);
};

export const profile = async (req, res) => {
    const userFound= await User.findById(req.user.id)

    if(!userFound) return res.status(400).json({ message: "Usuario no encontrado" }); //Si no lo encuentra, devuelve un mensaje de error    
    
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
}