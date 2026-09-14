import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const userId = "f9aae33d-3a0c-47bf-8324-2882c08871b4";

const movies = [
  {
    title: "The Shawshank Redemption",
    overview:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    releaseYear: 1994,
    genres: ["Drama"],
    posterUrl:
      "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    createdBy: userId,
  },
  {
    title: "The Godfather",
    overview:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    releaseYear: 1972,
    genres: ["Crime", "Drama"],
    posterUrl:
      "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    createdBy: userId,
  },
  {
    title: "The Dark Knight",
    overview:
      "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    releaseYear: 2008,
    genres: ["Action", "Crime", "Drama", "Thriller"],
    posterUrl:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7OEL4oWve.jpg",
    createdBy: userId,
  },
  {
    title: "Pulp Fiction",
    overview:
      "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    releaseYear: 1994,
    genres: ["Crime", "Drama"],
    posterUrl: "https://image.tmdb.org/t/p/w500/dM2w364MScsjFf8pfMbaWUcWrR.jpg",
    createdBy: userId,
  },
  {
    title: "Forrest Gump",
    overview:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
    releaseYear: 1994,
    genres: ["Drama", "Romance"],
    posterUrl:
      "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
    createdBy: userId,
  },
  {
    title: "Inception",
    overview:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    releaseYear: 2010,
    genres: ["Action", "Adventure", "Sci-Fi", "Thriller"],
    posterUrl:
      "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
    createdBy: userId,
  },
  {
    title: "The Matrix",
    overview:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    releaseYear: 1999,
    genres: ["Action", "Sci-Fi"],
    posterUrl:
      "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    createdBy: userId,
  },
  {
    title: "Fight Club",
    overview:
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much, much more.",
    releaseYear: 1999,
    genres: ["Drama"],
    posterUrl:
      "https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
    createdBy: userId,
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    overview:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    releaseYear: 2001,
    genres: ["Action", "Adventure", "Drama", "Fantasy"],
    posterUrl: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJI6y2nU1xg5z.jpg",
    createdBy: userId,
  },
];

const main = async () => {
  console.log("Seeding movies...");

  for (const movie of movies) {
    await prisma.movie.create({
      data: movie,
    });

    console.log(`Created movie: ${movie.title}`);
  }

  console.log("seeding completed");
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
