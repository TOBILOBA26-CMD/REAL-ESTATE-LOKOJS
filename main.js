
/* =====================================
   PROPCONNECT LOKOJA
   Main JavaScript
===================================== */

// 1. SAMPLE PROPERTY DATA
// All listings are fictional demonstration records.

const properties = [
    {
        id: 1,
        title: "Modern Two-Bedroom Apartment",
        location: "Felele",
        city: "Lokoja",
        type: "Apartment",
        purpose: "Rent",
        price: 650000,
        period: "year",
        bedrooms: 2,
        bathrooms: 2,
        size: "2 bedrooms",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
        description: "A sample two-bedroom apartment listing in Felele, Lokoja. Contact the property representative to confirm its availability, condition and rental terms.",
        features: ["2 bedrooms", "2 bathrooms", "Living room"]
    },
    {
        id: 2,
        title: "Comfortable Self-Contained Room",
        location: "Adankolo",
        city: "Lokoja",
        type: "Self-contained",
        purpose: "Rent",
        price: 250000,
        period: "year",
        bedrooms: 1,
        bathrooms: 1,
        size: "1 room",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
        description: "A demonstration self-contained accommodation listing in Adankolo, Lokoja. Verify the facilities, access, utility arrangements and terms before making any commitment.",
        features: ["Private room", "Private bathroom", "Compact layout"]
    },
    {
        id: 3,
        title: "Spacious Family Duplex",
        location: "Lokongoma",
        city: "Lokoja",
        type: "Duplex",
        purpose: "Sale",
        price: 45000000,
        period: "",
        bedrooms: 4,
        bathrooms: 4,
        size: "4 bedrooms",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
        description: "A sample four-bedroom duplex listing for the Lokoja market. The displayed price is illustrative only. Verify ownership documents, building condition and asking price independently.",
        features: ["4 bedrooms", "4 bathrooms", "Family living area"]
    },
    {
        id: 4,
        title: "Residential Plot of Land",
        location: "Ganaja",
        city: "Lokoja",
        type: "Land",
        purpose: "Sale",
        price: 6500000,
        period: "",
        bedrooms: 0,
        bathrooms: 0,
        size: "Residential plot",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
        description: "A fictional residential land listing for demonstration purposes in Ganaja, Lokoja. Confirm the exact plot location, survey, title documents, planning requirements and boundaries before purchase.",
        features: ["Residential use", "Plot details to verify", "Title to verify"]
    },
    {
        id: 5,
        title: "Three-Bedroom Family Apartment",
        location: "Phase 1",
        city: "Lokoja",
        type: "Apartment",
        purpose: "Rent",
        price: 900000,
        period: "year",
        bedrooms: 3,
        bathrooms: 2,
        size: "3 bedrooms",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
        description: "A sample three-bedroom apartment in the Phase 1 area of Lokoja. Confirm the address, amenities, condition, annual rent and additional charges with the responsible agent or owner.",
        features: ["3 bedrooms", "2 bathrooms", "Family space"]
    },
    {
        id: 6,
        title: "Commercial Shop Space",
        location: "Crusher",
        city: "Lokoja",
        type: "Commercial",
        purpose: "Rent",
        price: 500000,
        period: "year",
        bedrooms: 0,
        bathrooms: 0,
        size: "Shop space",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
        description: "A fictional commercial property listing in Lokoja. Verify frontage, permitted business use, lease conditions, security and the exact location before renting.",
        features: ["Commercial space", "Business use to verify", "Lease terms to verify"]
    }
];


// 2. GET HTML ELEMENTS

const propertyGrid = document.getElementById("propertyGrid");
const resultsCount = document.getElementById("resultsCount");
const emptyState = document.getElementById("emptyState");

const searchForm = document.getElementById("searchForm");
const locationFilter = document.getElementById("locationFilter");
const typeFilter = document.getElementById("typeFilter");
const purposeFilter = document.getElementById("purposeFilter");

const showAllBtn = document.getElementById("showAllBtn");
const resetSearchBtn = document.getElementById("resetSearchBtn");
const favoritesToggle = document.getElementById("favoritesToggle");
const favoritesCount = document.getElementById("favoritesCount");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const detailsDialog = document.getElementById("detailsDialog");
const detailsContent = document.getElementById("detailsContent");
const closeDialog = document.getElementById("closeDialog");

const contactForm = document.getElementById("contactForm");
const contactFeedback = document.getElementById("contactFeedback");


// 3. APPLICATION STATE

let showFavoritesOnly = false;
let favorites = loadFavorites();


// 4. LOAD SAVED FAVOURITES

function loadFavorites() {
    try {
        const saved = JSON.parse(
            localStorage.getItem("propconnectLokojaFavorites")
        );

        if (Array.isArray(saved)) {
            return saved.filter(id =>
                properties.some(property => property.id === id)
            );
        }
    } catch (error) {
        console.warn("Saved favourites could not be loaded.");
    }

    return [];
}


// 5. FORMAT PROPERTY PRICES

function formatPrice(property) {
    const formatted = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0
    }).format(property.price);

    if (property.purpose === "Rent") {
        return `${formatted}<small> / ${property.period}</small>`;
    }

    return formatted;
}


// 6. CREATE A PROPERTY CARD

function createPropertyCard(property) {
    const isSaved = favorites.includes(property.id);

    const article = document.createElement("article");
    article.className = "property-card";

    const imageWrap = document.createElement("div");
    imageWrap.className = "property-image-wrap";

    const image = document.createElement("img");
    image.className = "property-image";
    image.src = property.image;
    image.alt = `${property.type} property in ${property.location}, Lokoja`;
    image.loading = "lazy";

    image.addEventListener("error", () => {
        image.alt = "Property image unavailable";
        image.style.display = "none";
    });

    const badge = document.createElement("span");
    badge.className = "property-badge";
    badge.textContent = property.purpose === "Rent" ? "FOR RENT" : "FOR SALE";

    const favoriteButton = document.createElement("button");
    favoriteButton.type = "button";
    favoriteButton.className =
        `favorite-button${isSaved ? " is-saved" : ""}`;

    favoriteButton.textContent = isSaved ? "♥" : "♡";
    favoriteButton.setAttribute(
        "aria-label",
        isSaved ? "Remove saved property" : "Save property"
    );
    favoriteButton.setAttribute("aria-pressed", String(isSaved));

    favoriteButton.addEventListener("click", () => {
        toggleFavorite(property.id);
    });

    imageWrap.append(image, badge, favoriteButton);

    const content = document.createElement("div");
    content.className = "property-content";

    const price = document.createElement("p");
    price.className = "property-price";
    price.append(document.createTextNode(formatPrice(property)));

    const title = document.createElement("h3");
    title.textContent = property.title;

    const location = document.createElement("p");
    location.className = "property-location";
    location.textContent = `⌖ ${property.location}, Lokoja, Kogi State`;

    const features = document.createElement("div");
    features.className = "property-features";

    const featureLabels = property.bedrooms > 0
        ? [
            `🛏 ${property.bedrooms} bedroom${property.bedrooms > 1 ? "s" : ""}`,
            `▣ ${property.bathrooms} bathroom${property.bathrooms > 1 ? "s" : ""}`,
            property.type
        ]
        : [property.type, property.size];

    featureLabels.forEach(label => {
        const span = document.createElement("span");
        span.textContent = label;
        features.appendChild(span);
    });

    const actions = document.createElement("div");
    actions.className = "property-actions";

    const detailsButton = document.createElement("button");
    detailsButton.type = "button";
    detailsButton.className = "btn btn-primary";
    detailsButton.textContent = "View Details";
    detailsButton.addEventListener("click", () => {
        openPropertyDetails(property.id);
    });

    const shareButton = document.createElement("button");
    shareButton.type = "button";
    shareButton.className = "btn btn-outline";
    shareButton.textContent = "Share";
    shareButton.setAttribute(
        "aria-label",
        `Share ${property.title}`
    );
    shareButton.addEventListener("click", () => {
        shareProperty(property);
    });

    actions.append(detailsButton, shareButton);
    content.append(price, title, location, features, actions);
    article.append(imageWrap, content);

    return article;
}


// 7. DISPLAY PROPERTY LISTINGS

function renderProperties(list = properties) {
    propertyGrid.replaceChildren();

    const fragment = document.createDocumentFragment();

    list.forEach(property => {
        fragment.appendChild(createPropertyCard(property));
    });

    propertyGrid.appendChild(fragment);

    resultsCount.textContent =
        `${list.length} ${list.length === 1 ? "property" : "properties"} found`;

    emptyState.hidden = list.length !== 0;
    propertyGrid.hidden = list.length === 0;
}


// 8. FILTER PROPERTIES

function filterProperties() {
    const selectedLocation = locationFilter.value;
    const selectedType = typeFilter.value;
    const selectedPurpose = purposeFilter.value;

    let filtered = properties.filter(property => {
        const matchesLocation =
            !selectedLocation || property.location === selectedLocation;

        const matchesType =
            !selectedType || property.type === selectedType;

        const matchesPurpose =
            !selectedPurpose || property.purpose === selectedPurpose;

        const matchesFavorite =
            !showFavoritesOnly || favorites.includes(property.id);

        return (
            matchesLocation &&
            matchesType &&
            matchesPurpose &&
            matchesFavorite
        );
    });

    renderProperties(filtered);
}


// 9. SEARCH FORM

searchForm.addEventListener("submit", event => {
    event.preventDefault();

    showFavoritesOnly = false;
    updateFavoritesButton();
    filterProperties();

    document.getElementById("properties").scrollIntoView({
        behavior: "smooth"
    });
});


// Update results when a filter changes.

locationFilter.addEventListener("change", filterProperties);
typeFilter.addEventListener("change", filterProperties);
purposeFilter.addEventListener("change", filterProperties);


// 10. RESET SEARCH

function resetSearch() {
    searchForm.reset();
    showFavoritesOnly = false;

    updateFavoritesButton();
    renderProperties(properties);
}

showAllBtn.addEventListener("click", () => {
    resetSearch();

    document.getElementById("properties").scrollIntoView({
        behavior: "smooth"
    });
});

resetSearchBtn.addEventListener("click", resetSearch);


// 11. SAVE AND REMOVE FAVOURITES

function toggleFavorite(propertyId) {
    if (favorites.includes(propertyId)) {
        favorites = favorites.filter(id => id !== propertyId);
    } else {
        favorites.push(propertyId);
    }

    try {
        localStorage.setItem(
            "propconnectLokojaFavorites",
            JSON.stringify(favorites)
        );
    } catch (error) {
        console.warn("Favourites could not be saved on this device.");
    }

    updateFavoritesButton();
    filterProperties();
}

function updateFavoritesButton() {
    favoritesCount.textContent = favorites.length;

    favoritesToggle.innerHTML = showFavoritesOnly
        ? `♡ Show all properties (${properties.length})`
        : `♡ Show saved properties (<span id="favoritesCount">${favorites.length}</span>)`;
}

favoritesToggle.addEventListener("click", () => {
    showFavoritesOnly = !showFavoritesOnly;

    updateFavoritesButton();
    filterProperties();
});


// 12. PROPERTY DETAILS DIALOG

function openPropertyDetails(propertyId) {
    const property = properties.find(item => item.id === propertyId);

    if (!property) return;

    detailsContent.replaceChildren();

    const image = document.createElement("img");
    image.className = "details-image";
    image.src = property.image;
    image.alt = property.title;

    const badge = document.createElement("span");
    badge.className = "eyebrow";
    badge.textContent = property.purpose === "Rent" ? "FOR RENT" : "FOR SALE";

    const heading = document.createElement("h2");
    heading.textContent = property.title;

    const price = document.createElement("p");
    price.className = "property-price";
    price.textContent = formatPrice(property).replace(/<[^>]*>/g, " ");

    const location = document.createElement("p");
    location.className = "property-location";
    location.textContent = `${property.location}, Lokoja, Kogi State`;

    const descriptionHeading = document.createElement("h3");
    descriptionHeading.textContent = "About this property";

    const description = document.createElement("p");
    description.className = "details-description";
    description.textContent = property.description;

    const featureHeading = document.createElement("h3");
    featureHeading.textContent = "Property features";

    const featureList = document.createElement("ul");

    property.features.forEach(feature => {
        const item = document.createElement("li");
        item.textContent = feature;
        featureList.appendChild(item);
    });

    const disclaimer = document.createElement("p");
    disclaimer.className = "contact-note";
    disclaimer.textContent =
        "Sample listing only. Confirm the property, ownership, price and terms independently.";

    const enquiryButton = document.createElement("button");
    enquiryButton.type = "button";
    enquiryButton.className = "btn btn-primary";
    enquiryButton.textContent = "Enquire About This Property";

    enquiryButton.addEventListener("click", () => {
        detailsDialog.close();

        document.getElementById("contactMessage").value =
            `I would like to enquire about "${property.title}" in ${property.location}, Lokoja. Please provide verified information about availability, price and terms.`;

        document.getElementById("contact").scrollIntoView({
            behavior: "smooth"
        });

        document.getElementById("contactName").focus({
            preventScroll: true
        });
    });

    detailsContent.append(
        image,
        badge,
        heading,
        price,
        location,
        descriptionHeading,
        description,
        featureHeading,
        featureList,
        disclaimer,
        enquiryButton
    );

    detailsDialog.showModal();
}

closeDialog.addEventListener("click", () => {
    detailsDialog.close();
});

detailsDialog.addEventListener("click", event => {
    if (event.target === detailsDialog) {
        detailsDialog.close();
    }
});


// 13. SHARE PROPERTY

async function shareProperty(property) {
    const shareText =
        `${property.title} — ${property.location}, Lokoja, Kogi State. ` +
        `Sample ${property.purpose.toLowerCase()} listing: ${formatPrice(property)}.`;

    if (navigator.share) {
        try {
            await navigator.share({
                title: property.title,
                text: shareText
            });
        } catch (error) {
            // Sharing may be cancelled by the user.
        }
    } else if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(shareText);
            alert("Property information copied. You can now share it.");
        } catch (error) {
            alert(shareText);
        }
    } else {
        alert(shareText);
    }
}


// 14. MOBILE NAVIGATION

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "×" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});


// 15. NEIGHBOURHOOD SHORTCUTS

document.querySelectorAll(".location-card").forEach(card => {
    card.addEventListener("click", () => {
        locationFilter.value = card.dataset.location;

        showFavoritesOnly = false;
        updateFavoritesButton();
        filterProperties();

        document.getElementById("properties").scrollIntoView({
            behavior: "smooth"
        });
    });
});


// 16. DEMO CONTACT FORM

contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();

    if (!name) {
        contactFeedback.textContent = "Please enter your name.";
        return;
    }

    contactFeedback.textContent =
        `Thank you, ${name}. Your form has been checked in this demo, ` +
        "but no message has been sent to a server.";

    contactFeedback.style.color = "#24734d";

    contactForm.reset();
});


// 17. AUTOMATIC COPYRIGHT YEAR

document.getElementById("currentYear").textContent =
    new Date().getFullYear();


// 18. INITIALISE THE WEBSITE

updateFavoritesButton();
renderProperties(properties);
