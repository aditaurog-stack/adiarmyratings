// Simple in-memory catalog of items.
// Later we will add functions to show them on the page and to edit them.

const catalog = [
  {
    id: 1,
    type: "movie",
    title: "Inception",
    creator: "Christopher Nolan",
    year: 2010,
    imageUrl: "https://via.placeholder.com/150",
    description: "A mind-bending sci-fi movie about dreams within dreams.",
    averageRating: 0,
    ratingCount: 0
  },
  {
    id: 2,
    type: "music",
    title: "Thriller",
    creator: "Michael Jackson",
    year: 1982,
    imageUrl: "https://via.placeholder.com/150",
    description: "One of the best-selling albums of all time.",
    averageRating: 0,
    ratingCount: 0
  },
  {
    id: 3,
    type: "art",
    title: "Starry Night",
    creator: "Vincent van Gogh",
    year: 1889,
    imageUrl: "https://via.placeholder.com/150",
    description: "A famous painting with a swirling night sky.",
    averageRating: 0,
    ratingCount: 0
  }
];

// For now, just check that the data loads correctly:
console.log("Catalog loaded with", catalog.length, "items.");

