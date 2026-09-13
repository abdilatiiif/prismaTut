import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
// adapter: Prisma Client kobler ikke lenger til databasen selv, den trenger en
// driver-adapter (her: pg for Postgres) pluss DATABASE_URL fra .env
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({
  adapter,
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "info", "warn", "error"]
      : [], // logg alle queries og info/warn/error
});

async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully via prisma 🟢");
  } catch (error) {
    console.error(" ❌ Error connecting to the database:", error);
    process.exit(1); // Exit the process with an error code
  }
}

async function disconnectFromDatabase() {
  await prisma.$disconnect();
}

export { prisma, connectToDatabase, disconnectFromDatabase };
