import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  // Create default roles if they don't exist
  await prisma.role.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, name: "admin" },
  });

  await prisma.role.upsert({
    where: { id: 2 },
    update: {},
    create: { id: 2, name: "associate" },
  });

  console.log("Database seeded successfully");
}

seed()
  .catch((e) => {
    console.error("Error seeding database:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });