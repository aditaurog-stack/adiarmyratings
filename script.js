// Simple in-memory catalog of items.
// Later we will add functions to show them on the page and to edit them.

const catalog = [
    {
    id: 1,
    type: "movie",
    title: "Avengers Infinity War",
    creator: "Russo Brothers",
    year: 2018,
    imageUrl: "https://share.google/images/96XgtUCLP3g1K2bN4",
    description: "A Group of heroes have to fight to save the world",
    averageRating: 0,
    ratingCount: 0
  }
  {
    id: 2,
    type: "book",
    title: "Percy Jackson",
    creator: "Rick Riordan",
    year: 2005,
    imageUrl: "https://share.google/images/LubSSJwQCYSDIEtcW",
    description: "After Percy Finds out he is a demi-god it is up to him to save the world",
    averageRating: 0,
    ratingCount: 0
  },
  {
    id: 3,
    type: "music",
    title: "Voulez-vous",
    creator: "abba",
    year: 1979,
    imageUrl: "https://share.google/images/YWNSnGuAqA6lYV7hz",
    description: "One of the best songs of all time.",
    averageRating: 0,
    ratingCount: 0
  },
  {
    id: 4,
    type: "Tv Sries",
    title: "Stranger Things",
    creator: "The Duffer Brothers",
    year: 2016,
    imageUrl: "https://share.google/images/orXQKjfvUXPWinCk0",
    description: "After Will goes missing it is up to his friends and family to find him",
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
