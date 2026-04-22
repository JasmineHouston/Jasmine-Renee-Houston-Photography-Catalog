const photos = [
  {
    id: 1,
    title: "Skyline Shine",
    image: "images/photo1.jpg",
    location: "California",
    category: "Skyline",
    price: 100,
    size: '16" x 20"',
    finish: "Matte Print",
    edition: "Limited Edition",
    favorite: false
  },
  {
    id: 2,
    title: "City Sun Down",
    image: "images/photo2.jpg",
    location: "Downtown Los Angeles, CA",
    category: "The City",
    price: 120,
    size: '12" x 18"',
    finish: "Gloss Print",
    edition: "Open Edition",
    favorite: false
  },
  {
    id: 3,
    title: "Los Angeles Sunset",
    image: "images/photo3.jpg",
    location: "Los Angeles, CA",
    category: "Sunset",
    price: 70,
    size: '16" x 24"',
    finish: "The View",
    edition: "Limited Edition",
    favorite: false
  },
  {
    id: 4,
    title: "The Hills",
    image: "images/photo4.jpg",
    location: "Los Angeles CA",
    category: "Hills",
    price: 85,
    size: '14" x 20"',
    finish: "Matte Print",
    edition: "Open Edition",
    favorite: false
  },
  {
    id: 5,
    title: "Twilight",
    image: "images/photo5.jpg",
    location: "Santa Monica Pier",
    category: "Ocean Secrets",
    price: 150,
    size: '16" x 20"',
    finish: "Gloss Print",
    edition: "Open Edition",
    favorite: false
  },
  {
    id: 6,
    title: "Night Views",
    image: "images/photo6.jpg",
    location: "California",
    category: "Skyline",
    price: 88,
    size: '18" x 24"',
    finish: "Fine Art Print",
    edition: "Limited Edition",
    favorite: false
  },
  {
    id: 7,
    title: "Beauty Through Your Eyes",
    image: "images/photo7.jpg",
    location: "Los Angeles, CA",
    category: "Skyline",
    price: 125,
    size: '16" x 20"',
    finish: "Luster Print",
    edition: "Limited Edition",
    favorite: false
  },
  {
    id: 8,
    title: "The Horizon",
    image: "images/photo8.jpg",
    location: "Downtown Los Angeles, CA",
    category: "The City",
    price: 75,
    size: '12" x 18"',
    finish: "Matte Print",
    edition: "Open Edition",
    favorite: false
  }
];

const cardContainer = document.getElementById("card-container");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const sortSelect = document.getElementById("sort-select");
const favoritesBtn = document.getElementById("favorites-btn");
const featuredBtn = document.getElementById("featured-btn");
const resetBtn = document.getElementById("reset-btn");
const resultsCount = document.getElementById("results-count");
const featuredOutput = document.getElementById("featured-output");

let showFavoritesOnly = false;

function getFilteredPhotos() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;
  const selectedSort = sortSelect.value;

  let filteredPhotos = [...photos];

  if (searchTerm) {
    filteredPhotos = filteredPhotos.filter((photo) => {
      return (
        photo.title.toLowerCase().includes(searchTerm) ||
        photo.location.toLowerCase().includes(searchTerm) ||
        photo.category.toLowerCase().includes(searchTerm)
      );
    });
  }

  if (selectedCategory !== "all") {
    filteredPhotos = filteredPhotos.filter(
      (photo) => photo.category === selectedCategory
    );
  }

  if (showFavoritesOnly) {
    filteredPhotos = filteredPhotos.filter((photo) => photo.favorite);
  }

  if (selectedSort === "price-low") {
    filteredPhotos.sort((a, b) => a.price - b.price);
  } else if (selectedSort === "price-high") {
    filteredPhotos.sort((a, b) => b.price - a.price);
  } else if (selectedSort === "title-az") {
    filteredPhotos.sort((a, b) => a.title.localeCompare(b.title));
  } else if (selectedSort === "title-za") {
    filteredPhotos.sort((a, b) => b.title.localeCompare(a.title));
  }

  return filteredPhotos;
}

function renderCards() {
  const filteredPhotos = getFilteredPhotos();
  cardContainer.innerHTML = "";

  if (filteredPhotos.length === 0) {
    cardContainer.innerHTML = `
      <div class="empty-state">
        <h3>No prints found</h3>
        <p>Try changing your search, category, or favorites filter.</p>
      </div>
    `;
    resultsCount.textContent = "Showing 0 prints";
    return;
  }

  filteredPhotos.forEach((photo) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${photo.image}" alt="${photo.title}" />
      <div class="card-content">
        <div class="card-top">
          <div>
            <h3>${photo.title}</h3>
            <p class="card-meta">${photo.location} • ${photo.category}</p>
          </div>
          <button class="favorite-star ${photo.favorite ? "active" : ""}" data-id="${photo.id}">
            ${photo.favorite ? "★" : "☆"}
          </button>
        </div>

        <p class="price">$${photo.price}</p>

        <ul class="details-list">
          <li>Size: ${photo.size}</li>
          <li>Finish: ${photo.finish}</li>
          <li>Edition: ${photo.edition}</li>
        </ul>
      </div>
    `;

    cardContainer.appendChild(card);
  });

  resultsCount.textContent = `Showing ${filteredPhotos.length} print${filteredPhotos.length !== 1 ? "s" : ""}`;

  const starButtons = document.querySelectorAll(".favorite-star");
  starButtons.forEach((button) => {
    button.addEventListener("click", () => toggleFavorite(Number(button.dataset.id)));
  });
}

function toggleFavorite(id) {
  const selectedPhoto = photos.find((photo) => photo.id === id);
  if (selectedPhoto) {
    selectedPhoto.favorite = !selectedPhoto.favorite;
    renderCards();
  }
}

function toggleFavoritesView() {
  showFavoritesOnly = !showFavoritesOnly;
  favoritesBtn.textContent = showFavoritesOnly
    ? "Showing Favorites Only"
    : "Show Favorites Only";
  renderCards();
}

function pickFeaturedPrint() {
  const filteredPhotos = getFilteredPhotos();

  if (filteredPhotos.length === 0) {
    featuredOutput.textContent = "Featured print: No matching print available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredPhotos.length);
  const featuredPhoto = filteredPhotos[randomIndex];

  featuredOutput.textContent = `Featured print: ${featuredPhoto.title} — $${featuredPhoto.price}`;
}

function resetCatalog() {
  searchInput.value = "";
  categoryFilter.value = "all";
  sortSelect.value = "default";
  showFavoritesOnly = false;
  favoritesBtn.textContent = "Show Favorites Only";
  featuredOutput.textContent = "Featured print: None selected yet.";
  renderCards();
}

searchInput.addEventListener("input", renderCards);
categoryFilter.addEventListener("change", renderCards);
sortSelect.addEventListener("change", renderCards);
favoritesBtn.addEventListener("click", toggleFavoritesView);
featuredBtn.addEventListener("click", pickFeaturedPrint);
resetBtn.addEventListener("click", resetCatalog);

renderCards();