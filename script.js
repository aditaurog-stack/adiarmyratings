// -------------------- DEFAULT DATA --------------------

const DEFAULT_CATALOG = [
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

// -------------------- STORAGE HELPERS --------------------

function loadCatalog() {
  const stored = localStorage.getItem("mediaCatalog");
  if (!stored) {
    return [...DEFAULT_CATALOG]; // copy
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.warn("Could not parse catalog from storage, using defaults.", e);
    return [...DEFAULT_CATALOG];
  }
}

function saveCatalog() {
  localStorage.setItem("mediaCatalog", JSON.stringify(catalog));
}

// This variable holds the "live" catalog
let catalog = loadCatalog();

function getNextId() {
  if (catalog.length === 0) return 1;
  const maxId = Math.max(...catalog.map(item => item.id));
  return maxId + 1;
}

// -------------------- PUBLIC PAGE: RENDER + RATING --------------------

function renderPublicCatalog() {
  const container = document.getElementById("catalog-list");
  if (!container) return; // not on public page

  container.innerHTML = "";

  catalog.forEach(item => {
    const card = document.createElement("div");
    card.className = "item-card";

    const roundedRating = Math.round(item.averageRating || 0);

    const starsHtml = [1, 2, 3, 4, 5]
      .map(value => `
        <span
          class="star ${value <= roundedRating ? "filled" : ""}"
          data-rating-value="${value}"
        >&#9733;</span>
      `)
      .join("");

    const ratingText = item.ratingCount
      ? `${item.averageRating.toFixed(1)} / 5 (${item.ratingCount} ratings)`
      : "No ratings yet";

    card.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.title}">
      <div class="item-type">${item.type}</div>
      <div class="item-title">${item.title}</div>
      <div class="item-creator">By: ${item.creator}</div>
      <div class="item-year">Year: ${item.year}</div>
      <div class="item-description">${item.description}</div>
      <div class="rating" data-item-id="${item.id}">
        ${starsHtml}
        <span class="rating-text">${ratingText}</span>
      </div>
    `;

    container.appendChild(card);
  });

  console.log("Public catalog rendered with", catalog.length, "items.");
}

// Handle anonymous star ratings
function setupPublicRating() {
  const container = document.getElementById("catalog-list");
  if (!container) return; // not on public page

  container.addEventListener("click", (event) => {
    const star = event.target.closest(".star");
    if (!star) return;

    const ratingValue = Number(star.dataset.ratingValue);
    const ratingContainer = star.closest(".rating");
    const itemId = Number(ratingContainer.dataset.itemId);

    const item = catalog.find(i => i.id === itemId);
    if (!item) return;

    // Anonymous rating: each click counts as another rating
    const oldTotal = item.averageRating * item.ratingCount;
    item.ratingCount += 1;
    item.averageRating = (oldTotal + ratingValue) / item.ratingCount;

    console.log(`Rated item ${itemId} with ${ratingValue} stars.`);

    saveCatalog();
    renderPublicCatalog();
    renderAdminTable();
  });
}

// -------------------- ADMIN PAGE: TABLE + FORM --------------------

function renderAdminTable() {
  const tbody = document.getElementById("admin-items-body");
  if (!tbody) return; // not on admin page

  tbody.innerHTML = "";

  catalog.forEach(item => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.type}</td>
      <td>${item.title}</td>
      <td>${item.creator}</td>
      <td>${item.year}</td>
      <td>${item.ratingCount ? item.averageRating.toFixed(1) : "-"}</td>
      <td>
        <button class="action-button" data-action="edit" data-id="${item.id}">Edit</button>
        <button class="action-button" data-action="delete" data-id="${item.id}">Delete</button>
      </td>
    `;

    tbody.appendChild(row);
  });

  console.log("Admin table rendered with", catalog.length, "items.");
}

function setupAdminForm() {
  const form = document.getElementById("item-form");
  if (!form) return; // not on admin page

  const typeInput = document.getElementById("item-type");
  const titleInput = document.getElementById("item-title");
  const creatorInput = document.getElementById("item-creator");
  const yearInput = document.getElementById("item-year");
  const imageInput = document.getElementById("item-image");
  const descriptionInput = document.getElementById("item-description");
  const idHiddenInput = document.getElementById("item-id");
  const clearButton = document.getElementById("clear-form-button");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const existingId = idHiddenInput.value ? Number(idHiddenInput.value) : null;

    if (existingId) {
      // EDIT existing
      const item = catalog.find(i => i.id === existingId);
      if (!item) return;

      item.type = typeInput.value;
      item.title = titleInput.value;
      item.creator = creatorInput.value;
      item.year = Number(yearInput.value);
      item.imageUrl = imageInput.value || "https://via.placeholder.com/300x180?text=No+Image";
      item.description = descriptionInput.value || "";

      console.log("Updated item:", item);
    } else {
      // ADD new
      const newItem = {
        id: getNextId(),
        type: typeInput.value,
        title: titleInput.value,
        creator: creatorInput.value,
        year: Number(yearInput.value),
        imageUrl: imageInput.value || "https://via.placeholder.com/300x180?text=No+Image",
        description: descriptionInput.value || "",
        averageRating: 0,
        ratingCount: 0
      };

      catalog.push(newItem);
      console.log("Added new item:", newItem);
    }

    saveCatalog();
    renderAdminTable();
    renderPublicCatalog();

    form.reset();
    idHiddenInput.value = "";
  });

  clearButton.addEventListener("click", () => {
    form.reset();
    idHiddenInput.value = "";
  });
}

function setupAdminTableActions() {
  const tbody = document.getElementById("admin-items-body");
  if (!tbody) return; // not on admin page

  tbody.addEventListener("click", (event) => {
    const button = event.target.closest(".action-button");
    if (!button) return;

    const action = button.dataset.action;
    const id = Number(button.dataset.id);
    const item = catalog.find(i => i.id === id);
    if (!item) return;

    if (action === "delete") {
      if (confirm(`Delete "${item.title}"?`)) {
        catalog = catalog.filter(i => i.id !== id);
        saveCatalog();
        renderAdminTable();
        renderPublicCatalog();
        console.log("Deleted item with id", id);
      }
    }

    if (action === "edit") {
      // Fill the form with this item's data
      document.getElementById("item-type").value = item.type;
      document.getElementById("item-title").value = item.title;
      document.getElementById("item-creator").value = item.creator;
      document.getElementById("item-year").value = item.year;
      document.getElementById("item-image").value = item.imageUrl;
      document.getElementById("item-description").value = item.description;
      document.getElementById("item-id").value = item.id;

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}

// -------------------- SIMPLE PASSWORD FOR ADMIN --------------------
// (Not secure in real life, but OK for a school project on static hosting.)

function setupAdminPassword() {
  const wrapper = document.getElementById("admin-wrapper");
  if (!wrapper) return; // not on admin page

  const alreadyOk = sessionStorage.getItem("admin-ok");
  const PASSWORD = "admin123"; // <- change this if you like

  if (alreadyOk === "yes") {
    wrapper.style.display = "block";
    return;
  }

  const entered = prompt("Enter admin password:");
  if (entered === PASSWORD) {
    sessionStorage.setItem("admin-ok", "yes");
    wrapper.style.display = "block";
  } else {
    alert("Incorrect password. Going back to public catalog.");
    window.location.href = "index.html";
  }
}

// -------------------- INITIALISATION --------------------

document.addEventListener("DOMContentLoaded", () => {
  renderPublicCatalog();
  renderAdminTable();
  setupPublicRating();
  setupAdminForm();
  setupAdminTableActions();
  setupAdminPassword(); // will only do anything on admin.html
});
