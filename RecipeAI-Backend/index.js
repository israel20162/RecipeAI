import express, { urlencoded, json } from "express";
import cors from "cors";
import authRotes from "./routes/auth.js";
import recipeRoutes from './routes/recipe.js'
import { configDotenv } from "dotenv";


const app = express();
app.use(
    cors({
        origin: "*",
    })
);
configDotenv()
app.use(urlencoded({ extended: true }));
app.use(json())
const port = process.env.APP_PORT || 5000;

app.use("/api/auth", authRotes);
app.use('/api/recipe', recipeRoutes)

app.listen(port, () => {
    console.log(` app listening on port ${port}`)
});

