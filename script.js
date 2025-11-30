// Simple in-memory catalog of items.

const catalog = [
  {
    id: 1,
    type: "movie",
    title: "Inception",
    creator: "Christopher Nolan",
    year: 2010,
    imageUrl: "https://via.placeholder.com/300x180?text=Inception",
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
    imageUrl: "https://via.placeholder.com/300x180?text=Thriller",
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

// -------------------- PUBLIC PAGE --------------------

function renderPublicCatalog() {
  const container = document.getElementById("catalog-list");
  if (!container) {
    // If there is no catalog-list div, we are not on the public page.
    return;
  }

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

// -------------------- ADMIN PAGE --------------------

function renderAdminTable() {
  const tbody = document.getElementById("admin-items-body");
  if (!tbody) {
    // If there is no admin-items-body, we are not on the admin page.
    return;
  }

  tbody.innerHTML = "";

  catalog.forEach(item => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.type}</td>
      <td>${item.title}</td>
      <td>${item.creator}</td>
      <td>${item.year}</td>
      <td>
        <button class="action-button" data-action="edit" data-id="${item.id}">Edit</button>
        <button class="action-button" data-action="delete" data-id="${item.id}">Delete</button>
      </td>
    `;

    tbody.appendChild(row);
  });

  console.log("Admin table rendered with", catalog.length, "items.");
}

// -------------------- INITIALISE PAGES --------------------

document.addEventListener("DOMContentLoaded", () => {
  renderPublicCatalog();
  renderAdminTable();
});


