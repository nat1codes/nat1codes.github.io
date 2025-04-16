import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {


  await prisma.work.create({
    data: {
      title: 'NGS Christmas Mock-Up 1',
      year: 2024,
      image: 'NGS-Card-Mockup.png',
      medium: 'Digital Art',
      description: 'A sample Christmas card for the No Greater Sacrifice foundation to send to scholarship recipients.',
    },
  });
  console.log("Inserted NGS Christmas Mock-Up 1");

  await prisma.work.create({
    data: {
      title: 'NGS Christmas Mock-Up 2',
      year: 2024,
      image: 'NGS-Card-Mockup2.png',
      medium: 'Digital Art',
      description: 'A sample Christmas card for the No Greater Sacrifice foundation to send to scholarship recipients.',
    },
  });
  console.log("Inserted NGS Christmas Mock-Up 2");

  await prisma.work.create({
    data: {
      title: 'Playing Cards',
      year: 2024,
      image: 'paitencards.png',
      medium: 'Digital Art',
      description: 'A concept piece for a deck of playing cards that incorporates a variety of veggies in their designs.',
    },
  });
  console.log("Inserted Playing Cards");

  await prisma.work.create({
    data: {
      title: 'Brochure Mock-Up',
      year: 2024,
      image: 'PaitenPrescott-Brochure-Mockup3-V2.png',
      medium: 'Digital Art',
      description: 'An idea for an art brochure.',
    },
  });
  console.log("Inserted Brochure Mock-Up");

  await prisma.work.create({
    data: {
      title: 'Crestview Police Dept. Cop Car',
      year: 2021,
      image: 'paitenCopCar.jpg',
      medium: 'Digital Art (displayed on Physical Car)',
      description: 'This is a cop car that Paiten submitted the design for in high school. She was one of many entries in her graphic design class and her design was chosen to be put on a Crestview FL police car.',
    },
  });
  console.log("Inserted Cop Car");

  await prisma.commissionReq.create({
    data: {
      name: 'Paiten Prescott',
      email: 'n/a',
      phone: 'n/a',
      message: 'This is a test commission request.',
    }
  });
  console.log("Inserted test commission request");

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
