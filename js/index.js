// Données des catalogues (100 catalogues)
const cataloguesData = [];
const categories = [
  "High-Tech",
  "Maison",
  "Mode",
  "Beauté",
  "Sport",
  "Automobile",
  "Jardin",
  "Bureau",
  "Enfants",
  "Alimentation",
  "Fruits",
];

const fruitsData = [
  {
    name: "Pomme",
    image:
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&auto=format&fit=crop",
  },
  {
    name: "Banane",
    image:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&auto=format&fit=crop",
  },
  {
    name: "Orange",
    image:
      "https://images.unsplash.com/photo-1547514701-42782101795e?w=800&auto=format&fit=crop",
  },
  {
    name: "Fraise",
    image:
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=800&auto=format&fit=crop",
  },
  {
    name: "Raisin",
    image:
      "https://images.unsplash.com/photo-1515777315835-281b94c9589f?w=800&auto=format&fit=crop",
  },
  {
    name: "Ananas",
    image:
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800&auto=format&fit=crop",
  },
  {
    name: "Pastèque",
    image:
      "https://images.unsplash.com/photo-1563114773-8428e6c71a9a?w=800&auto=format&fit=crop",
  },
  {
    name: "Citron",
    image:
      "https://images.unsplash.com/photo-1582281298055-e25b84a90f27?w=800&auto=format&fit=crop",
  },
  {
    name: "Kiwi",
    image:
      "https://images.unsplash.com/photo-1554990772-0bea55d510d7?w=800&auto=format&fit=crop",
  },
  {
    name: "Mangue",
    image:
      "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop",
  },
  {
    name: "Cerises",
    image:
      "https://images.unsplash.com/photo-1528821128470-2a86d5c9f9d5?w=800&auto=format&fit=crop",
  },
  {
    name: "Poire",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop",
  },
];

// Générer 100 catalogues
for (let i = 1; i <= 100; i++) {
  let category = categories[Math.floor(Math.random() * categories.length)];
  let catalogue;

  if (category === "Fruits") {
    // For fruits, use specific data
    const fruit = fruitsData[Math.floor(Math.random() * fruitsData.length)];
    catalogue = {
      id: i,
      title: `Catalogue ${i}: ${fruit.name}`,
      description: `Découvrez notre sélection exclusive de ${fruit.name.toLowerCase()} frais et de haute qualité.`,
      category: category.toLowerCase(),
      productsCount: Math.floor(Math.random() * 100) + 10,
      date: `2023-${Math.floor(Math.random() * 12) + 1}-${
        Math.floor(Math.random() * 28) + 1
      }`,
      price: Math.floor(Math.random() * 500) + 50 + " RUB",
      image: fruit.image,
    };
  } else {
    catalogue = {
      id: i,
      title: `Catalogue ${i}: Produits ${category}`,
      description: `Découvrez notre sélection exclusive de produits ${category.toLowerCase()} de haute qualité.`,
      category: category.toLowerCase(),
      productsCount: Math.floor(Math.random() * 500) + 50,
      date: `2023-${Math.floor(Math.random() * 12) + 1}-${
        Math.floor(Math.random() * 28) + 1
      }`,
      price: Math.floor(Math.random() * 10000) + 1000 + " RUB",
      image: getAIImageByCategory(category.toLowerCase()),
    };
  }
  cataloguesData.push(catalogue);
}

function getAIImageByCategory(category) {
  const images = {
    "high-tech": "https://source.unsplash.com/300x200/?laptop,ai",
    maison: "https://source.unsplash.com/300x200/?home,ai",
    mode: "https://source.unsplash.com/300x200/?fashion,ai",
    beauté: "https://source.unsplash.com/300x200/?beauty,ai",
    sport: "https://source.unsplash.com/300x200/?sport,ai",
    automobile: "https://source.unsplash.com/300x200/?car,ai",
    jardin: "https://source.unsplash.com/300x200/?garden,ai",
    bureau: "https://source.unsplash.com/300x200/?office,ai",
    enfants: "https://source.unsplash.com/300x200/?children,ai",
    alimentation: "https://source.unsplash.com/300x200/?food,ai",
  };
  return images[category] || "https://source.unsplash.com/300x200/?product,ai";
}

// Éléments DOM
const cataloguesGrid = document.getElementById("cataloguesGrid");
const categoryBtns = document.querySelectorAll(".category-btn");
const shareModal = document.getElementById("shareModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const productLink = document.getElementById("productLink");
const shareForm = document.getElementById("shareForm");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mainNav = document.getElementById("mainNav");
const contactHeaderBtn = document.getElementById("contactHeaderBtn");
const contactFooterBtn = document.getElementById("contactFooterBtn");

// Variables d'état
let currentCategory = "all";
let displayedCount = 12;
let currentProductId = null;

// Initialiser l'affichage des catalogues
function displayCatalogues(filter = "", category = "all") {
  cataloguesGrid.innerHTML = "";
  let filteredCatalogues = cataloguesData;

  // Filtrer par catégorie
  if (category !== "all") {
    filteredCatalogues = filteredCatalogues.filter(
      (c) => c.category === category
    );
  }

  // Filtrer par recherche
  if (filter) {
    const searchTerm = filter.toLowerCase();
    filteredCatalogues = filteredCatalogues.filter(
      (c) =>
        c.title.toLowerCase().includes(searchTerm) ||
        c.description.toLowerCase().includes(searchTerm) ||
        c.category.toLowerCase().includes(searchTerm)
    );
  }

  // Afficher les catalogues (limités à displayedCount)
  const cataloguesToShow = filteredCatalogues.slice(0, displayedCount);

  cataloguesToShow.forEach((catalogue) => {
    const catalogueCard = document.createElement("div");
    catalogueCard.className = "catalogue-card";
    catalogueCard.innerHTML = `
                    <div class="catalogue-image">
                        <img src="${catalogue.image}" alt="${catalogue.title}" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div class="catalogue-info">
                        <h3>${catalogue.title}</h3>
                        <p>${catalogue.description}</p>
                        <div class="catalogue-meta">
                            <span><i class="fas fa-box"></i> ${catalogue.productsCount} produits</span>
                            <span><i class="fas fa-ruble-sign"></i> ${catalogue.price}</span>
                            <span><i class="far fa-calendar"></i> ${catalogue.date}</span>
                        </div>
                        <div class="catalogue-actions">
                            <button class="btn btn-secondary view-catalogue" data-id="${catalogue.id}">
                                <i class="fas fa-eye"></i> Voir
                            </button>
                            <button class="btn btn-primary share-catalogue" data-id="${catalogue.id}">
                                <i class="fas fa-share-alt"></i> Partager
                            </button>
                        </div>
                    </div>
                `;
    cataloguesGrid.appendChild(catalogueCard);
  });

  // Ajouter les événements aux boutons
  document.querySelectorAll(".view-catalogue").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      viewCatalogue(id);
    });
  });

  document.querySelectorAll(".share-catalogue").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      openShareModal(id);
    });
  });

  // Masquer ou afficher le bouton "Charger plus"
  loadMoreBtn.style.display =
    filteredCatalogues.length > displayedCount ? "inline-flex" : "none";
}

// Ouvrir le modal de partage
function openShareModal(productId) {
  currentProductId = productId;
  const product = cataloguesData.find((p) => p.id == productId);
  const link = `https://multicatalog.com/produit/${productId}/${product.title
    .toLowerCase()
    .replace(/ /g, "-")}`;
  productLink.textContent = link;
  productLink.href = link;
  shareModal.classList.add("active");
}

// Fermer le modal de partage
function closeShareModal() {
  shareModal.classList.remove("active");
  shareForm.reset();
}

// Voir un catalogue
function viewCatalogue(id) {
  alert(
    `Ouverture du catalogue ${id}. Dans une vraie application, cela redirigerait vers une page dédiée.`
  );
}

// Gestionnaires d'événements
// Filtrage par catégorie
categoryBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    categoryBtns.forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    currentCategory = this.getAttribute("data-category");
    displayedCount = 12;
    displayCatalogues(searchInput.value, currentCategory);
  });
});

// Recherche
searchBtn.addEventListener("click", () => {
  displayedCount = 12;
  displayCatalogues(searchInput.value, currentCategory);
});

searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    displayedCount = 12;
    displayCatalogues(searchInput.value, currentCategory);
  }
});

// Charger plus de catalogues
loadMoreBtn.addEventListener("click", () => {
  displayedCount += 12;
  displayCatalogues(searchInput.value, currentCategory);
});

// Modal de partage
closeModalBtn.addEventListener("click", closeShareModal);

// Fermer le modal en cliquant à l'extérieur
shareModal.addEventListener("click", (e) => {
  if (e.target === shareModal) {
    closeShareModal();
  }
});

// Soumission du formulaire de partage
shareForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const clientName = document.getElementById("clientName").value;
  const clientEmail = document.getElementById("clientEmail").value;
  const message = document.getElementById("message").value;
  const link = productLink.href;

  // Ici, on simule l'envoi d'un email
  // Dans une vraie application, on enverrait une requête à un serveur
  alert(
    `Lien envoyé à ${clientName} (${clientEmail}) avec le message: "${message}"\n\nLien partagé: ${link}`
  );

  closeShareModal();

  // Réinitialiser le formulaire
  shareForm.reset();
});

// Menu mobile
mobileMenuBtn.addEventListener("click", () => {
  mainNav.classList.toggle("active");
});

// Contact rapide
contactHeaderBtn.addEventListener("click", (e) => {
  e.preventDefault();
  openShareModal(Math.floor(Math.random() * 100) + 1);
});

contactFooterBtn.addEventListener("click", () => {
  openShareModal(Math.floor(Math.random() * 100) + 1);
});

// Initialisation
displayCatalogues();
