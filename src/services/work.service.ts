import { PrismaClient, Work } from '@prisma/client';

const prisma = new PrismaClient();

export class WorkService {
  // retrieves a work by ID  
  public async getWorkById(workId: number): Promise<Work | null> {
    return prisma.work.findUnique({
      where: { id: workId },
    });
  }

  // gets all works
  public async getAllWorks(): Promise<Work[]> {
    return prisma.work.findMany({});
  }

  // creates a new artwork
  public async createArtwork(title: string, year: number, image: string, mediumId: number, description: string): Promise<void> {
    try {
      const parsedYear = parseInt(year as unknown as string, 10);
      await prisma.work.create({
        data: {
          title,
          year: parsedYear,
          image,
          medium: { connect: { id: mediumId } },
          description,
        },
      });
    } catch (error) {
      console.error('Error creating artwork:', error);
      throw new Error('Failed to create artwork');
    }
  }
}
