import app from "./app.js";
import { port } from "./app.js";
import { connectDB } from "./db.js";

connectDB();
app.listen(port);
console.log("Corriendo en el puerto: " + port);
