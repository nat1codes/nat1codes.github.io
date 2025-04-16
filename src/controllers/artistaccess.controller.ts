import { Request, Response, Router } from 'express';
import session from 'express-session';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';

declare module 'express-session' {
  interface SessionData {
    loggedIn?: boolean;
  }
}

const prisma = new PrismaClient();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'src/public/images'); // ensure this folder exists
    },
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}`);
    },
  });
  
  const upload = multer({ storage });

export class ArtistAccessController {
  public router: Router;

  // Constructor for the GalleryController class
  constructor() {
    this.router = Router();
    this.initRoutes();
    
    this.renderLogin = this.renderLogin.bind(this);
    this.renderLoginPost = this.renderLoginPost.bind(this);
  }

  private initRoutes() {
    this.router.get('/secretartistaccess', this.renderLogin);
    this.router.post('/secretartistaccess', this.renderLoginPost); // Handle form submission
    this.router.get('/artistdashboard', this.requireLogin, this.renderDashboard);
    this.router.get('/add-work', this.requireLogin, this.addWork);
    this.router.post('/add-work', this.requireLogin, upload.single('image'), this.addWork);
    this.router.post('/artistdashboard', this.renderLogin, this.renderDashboard);
  }

  private renderLogin = async (req: Request, res: Response) => {
    res.render('login'); // Render the form
  };

  private renderDashboard = async (req: Request, res: Response) => {
    const commissions = await prisma.commissionReq.findMany();
    console.log(commissions); // Log the commissions to the console for debugging
    res.render('dashboard', {commissions}); // Render the search form
  }


  private renderLoginPost = async (req: Request, res: Response) => {
    // I'm only going to have one password and no username for now since only paiten needs this
    try {
        const password = req.body.password;
        if (password === process.env.ARTIST_ACCESS_PASSWORD) {
            req.session.loggedIn = true;
            res.redirect('/artistdashboard'); // Redirect to the dashboard if the password is correct
        } else {
            res.render('login', { error: 'Invalid password' }); // Render the login page with an error message
        }
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        res.render('login', { error: 'An error occurred. Please try again.' }); // Render the login page with an error message
    }
  }

  private addWork = async (req: Request, res: Response) => {
    try {
      const { title, year, medium, description } = req.body;
      const image = req.file?.filename || '';
  
      await prisma.work.create({
        data: {
          title,
          year: parseInt(year),
          medium,
          description,
          image,
        },
      });
  
      res.redirect('/artistdashboard');
    } catch (error) {
      console.error('Failed to add work:', error);
      res.status(500).send('Error adding work');
    }
  };
  
  private requireLogin = (req: Request, res: Response, next: Function) => {
    if (req.session.loggedIn) {
      return next();
    }
    res.redirect('/secretartistaccess');
  };
}

export default new ArtistAccessController().router;