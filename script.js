// Simple in-memory catalog of items.
// Later we will add functions to edit them and to rate them.

const catalog = [
  {
    id: 1,
    type: "movie",
    title: "Cars",
    creator: "Pixar",
    year: 2006,
    imageUrl: "https://share.google/images/iMrEJFzHKLyjVSx6o",
    description: "A mind-bending sci-fi movie about dreams within dreams.",
    averageRating: 0,
    ratingCount: 0
  },
  {
    id: 2,
    type: "music",
    title: "The other side",
    creator: "StephenSanchez",
    year: 2025,
    imageUrl: "https://share.google/images/ewQtHLy1TZQnkyZF6",
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
    imageUrl: "https://via.placeholder.com/300x180?text=Starry+Night",
    description: "A famous painting with a swirling night sky.",
    averageRating: 0,
    ratingCount: 0
  }
];

// This function will show the catalog on the PUBLIC page.
function renderPublicCatalog() {
  const container = document.getElementById("catalog-list");
  if (!container) {
    // If there is no catalog-list div, we are probably on the admin page.
    return;
  }

  // Clear anything inside, just in case
  container.innerHTML = "";

  catalog.forEach(item => {
    const card = document.createElement("div");
    card.className = "item-card";

    card.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.title}">
      <div class="item-type">${item.type}</div>
      <div class="item-title">${item.title}</div>
      <div class="item-creator">By: ${item.creator}</div>
      <div class="item-year">Year: ${item.year}</div>
      <div class="item-description">${item.description}</div>
    `;

    container.appendChild(card);
  });

  console.log("Public catalog rendered with", catalog.length, "items.");
}

// Run this when the page finishes loading
document.addEventListener("DOMContentLoaded", () => {
  renderPublicCatalog();
});


