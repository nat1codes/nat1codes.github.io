import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CommissionController {
  public router: Router;

  // Constructor for the GalleryController class
  constructor() {
    this.router = Router();
    
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get('/', this.renderCommissionForm);
    this.router.post('/', this.addCommission);
  }

  private renderCommissionForm = async (req: Request, res: Response) => {
    res.render('commission'); // Render the form
  };

  private addCommission = async (req: Request, res: Response) => {
    const { name, email, phone, message} = req.body;
  
    // Check that all required information is present
    if (!name || !email || !phone || !message) {
      res.status(400).send('All fields are required.');
    }
    
    try {
        // Create commission
        await prisma.commissionReq.create({
            data: {
            name,
            email,
            phone,
            message
            }
        });
        
        console.log('Commission request created:', { name, email, phone, message });
        // Redirect back to the form after successful creation
        res.redirect('/');
    }
    catch (error) {
        res.status(500).send('Something went wrong. Please try again later.');
    }
  }

  
}

export default new CommissionController().router;