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
,
  {
    id: 3,
    type: "Tv Sries",
    title: "Stranger Things",
    creator: "The Duffer Brothers",
    year: 2016,
    imageUrl: "https://share.google/images/orXQKjfvUXPWinCk0",
    description: "After Will goes missing it is up to his friends and family to find him",
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
