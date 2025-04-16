import { Request, Response, Router } from 'express';
import { WorkService } from '../services/work.service';

export class WorkController {
  public router: Router;
  private workService: WorkService;

  // Constructor to set up the router and services
  constructor() {
    this.router = Router();
    this.workService = new WorkService();

    this.addWork = this.addWork.bind(this);
    this.initRoutes();
  }

  // Method to set up the routes
  private initRoutes() {
    this.router.post('/work', this.addWork);
    this.router.get('/work', this.renderAddWorkForm);
  };

  // Method to render the form for adding a new work
  private renderAddWorkForm = async (req: Request, res: Response) => {
    res.render('work-form');
  };

  // Method to add a new work
  private addWork = async (req: Request, res: Response): Promise<void> => {
    const { title, year, image, mediumId, artistId, galleryId } = req.body;
  
    // Check that all required information is present
    if (!title || !year || !image || !mediumId || !artistId || !galleryId) {
      res.status(400).send('All fields are required.');
    }
  
    try {
      // Create artwork
      await this.workService.createArtwork(title, year, image, mediumId, artistId, galleryId);
      
      // Redirect back to the form after successful creation
      res.redirect('/');  // This will trigger `GET /work` route to render the form
    } catch (error) {
      console.error('Error creating artwork:', error);
      res.status(500).send('Failed to create artwork');
    }
  };
  

}

export default new WorkController().router;