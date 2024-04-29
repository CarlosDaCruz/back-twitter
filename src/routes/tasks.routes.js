import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTweets,
  getTweet,
  createTweet,
  updateTweet,
  deleteTweet,
  getAllTweets,
} from "../controllers/tasks.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTweetSchema } from "../schemas/tweet.schema.js";

const router = Router();

router.get("/tweets/getAll", authRequired, getAllTweets); //Obtener todos los tweets
router.get("/tweets", authRequired, getTweets); //Obtener tweets
router.get("/tweets/:id", authRequired, getTweet); //Obtener un tweet
router.post(
  "/tweets",
  authRequired,
  validateSchema(createTweetSchema),
  createTweet
); //Crear tweets
router.delete("/tweets/:id", authRequired, deleteTweet); //Eliminar tweet con el id especificado
router.put("/tweets/:id", authRequired, updateTweet); //Actualizar tweets con el id especificado

export default router;

// authRequired: Middleware que valida si el usuario está autenticado
//validateSchema(createTweetSchema): Middleware que valida si los datos enviados cumplen con el esquema definido
//Finalmente se crean las rutas para cada uno de los métodos del controlador de tareas