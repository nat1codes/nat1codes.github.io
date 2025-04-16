import App from "./src/app";
import dotenv from "dotenv";

const port: number = Number(process.env.PORT) || 3000;

const app = new App(port);
app.listen();
