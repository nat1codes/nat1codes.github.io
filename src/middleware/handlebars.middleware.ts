// Import the express and handlebars libraries
import { Application } from "express";
import { engine } from "express-handlebars";

export const HandlebarsMiddleware = {
  setup(app: Application) {
    // set up handlebars view engine, register with express
    app.engine(
      ".hbs",
      engine({
        extname: ".hbs",
        defaultLayout: "main",
        helpers: {
          eq: (a: any, b: any) => a === b,
        },
      })
    );
    app.set("view engine", ".hbs");
    app.set("views", "./src/views");
  },
};
