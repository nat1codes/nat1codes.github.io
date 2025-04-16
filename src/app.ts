// Import the express and pino (logger) libraries
import express, { Application } from "express";
import { pino } from 'pino';
import path from "path";
import session from "express-session";

import { HandlebarsMiddleware } from "./middleware/handlebars.middleware";
import { ErrorMiddleware } from "./middleware/error.middleware";
import { GalleryController } from "./controllers/gallery.controller";
import { CommissionController } from "./controllers/commission.controller"; 
import { ArtistAccessController } from "./controllers/artistaccess.controller";

class App {
  // Create an instance of express, called "app"
  public app: Application = express();
  public port: number;
  private log: pino.Logger = pino();

  // Declare Middleware and controller instances
  private errorMiddleware: ErrorMiddleware;
  private galleryController: GalleryController;
  private commissionController: CommissionController;
  private artistAccessController: ArtistAccessController;

  constructor(port: number) {
    // Set up the body parser
    this.app.use(express.urlencoded({ extended: true }));

    this.port = port;

    // Init the middleware and controllers
    this.errorMiddleware = new ErrorMiddleware();
    this.galleryController = new GalleryController();
    this.commissionController = new CommissionController();
    this.artistAccessController = new ArtistAccessController();

    this.app.use(session({
      secret: process.env.ARTIST_ACCESS_PASSWORD || 'secret',
      resave: false,
      saveUninitialized: true,
    }));

    // Serve all static resources from the public directory
    this.app.use(express.static(path.resolve(__dirname, "public")));

    this.app.get('/about', (req, res) => {
        res.render('about'); // Make sure about.hbs exists in your views folder
    }
    )

    // Set up handlebars for our templating
    HandlebarsMiddleware.setup(this.app);

    // Connect the routes from our controllers to express
    this.app.use('/', this.galleryController.router);
    this.app.use('/commission', this.commissionController.router);
    this.app.use('/', this.artistAccessController.router);

    // Error handler
    this.app.use(this.errorMiddleware.router);
  }

  public listen() {
    // Tell express to start listening for requests on the port we specified
    this.app.listen(this.port, () => {
      this.log.info(
        `Express started on http://localhost:${this.port}; press Ctrl-C to terminate.`
      );
    });
  }
}

export default App;