import jwt from "jsonwebtoken"; // Importa la librería de JWT
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
    const { token } = req.cookies; // Obtiene la cookie del token

    if (!token) return res.status(401).json({ message: "No hay token, No autorizado" }); // Si no hay token, devuelve un mensaje de error

    jwt.verify(token, TOKEN_SECRET, (err, user) => { // Verifica si el token es válido
        if (err) {
            console.error("Token verification error:", err); // Log the error
            return res.status(401).json({ message: "Token no valido, No autorizado" }); // Si no es válido, devuelve un mensaje de error
        }
        
        req.user = user; // Set the user in the request
        next(); // Si está autenticado, pasa al siguiente middleware
    });
};