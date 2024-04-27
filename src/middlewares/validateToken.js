import jwt from "jsonwebtoken"; //Importa la librería de JWT
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {   //Middleware que verifica si el usuario está autenticado
    const { token } = req.cookies; //Obtiene la cookie del token

    if(!token) return res.status(401).json({ message: "No hay token, No autorizado" }); //Si no hay token, devuelve un mensaje de error

    jwt.verify(token, TOKEN_SECRET, (err, user) => { //Verifica si el token es válido
        if(err) return res.status(401).json({ message: "Token no valido, No autorizado" }); //Si no es válido, devuelve un mensaje de error
        
        req.user = user
    });

    

    next(); //Si está autenticado, pasa al siguiente middleware
};