import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class GalleryController {
  public router: Router;

  // Constructor for the GalleryController class
  constructor() {
    this.router = Router();
    
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get('/', this.renderSearchPage);
    this.router.get('/work/:id', this.getWorkDetails);
  }

  private renderSearchPage = async (req: Request, res: Response) => {
    const artworks = await prisma.work.findMany();
    console.log(artworks); // Log the artworks to the console for debugging
    res.render('gallery', {artworks}); // Render the search form
  };

  private getWorkDetails = async (req: Request, res: Response) => {
    const workId = parseInt(req.params.id); // Parse the work ID from the URL
    const work = await prisma.work.findUnique({ where: { id: workId }}); // Fetch the work details from the database

    res.render('details', { work }); // Render the details page with the work data
  }

  
}

export default new GalleryController().router;
