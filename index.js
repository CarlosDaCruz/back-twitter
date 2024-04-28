import app from "./src/app.js";
import { port } from "./src/app.js";
import { connectDB } from "./src/db.js";

connectDB();
app.listen(port);
console.log("Corriendo en el puerto: " + port);

