function goBack() {
    window.history.back();
}

// GLOBAL VARIABLES (important)
let track;
let slides;
let index = 0;

const hotelImages = {
    "Goa": "https://images.unsplash.com/photo-1501117716987-c8e1ecb210f9",
    "Manali": "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    "Kerala": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    "Dubai": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
    "Bali": "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
    "Maldives": "https://images.unsplash.com/photo-1573843981267-be1999ff37cd",
    "Paris": "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
    "New York": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    "London": "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    "Tokyo": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
    "Singapore": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    "Sydney": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    "Rome": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    "Barcelona": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    "Great Wall of China": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
};

window.addEventListener("load", () => {
    track = document.querySelector(".slider-track");
    slides = document.querySelectorAll(".slide");
    if (!track || slides.length === 0) return;
    track.style.width = `${slides.length * 100}vw`;
    updateSlide();
    setInterval(nextSlide, 4000);
});

// KEYBOARD NAVIGATION
window.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") nextSlide(e);
    if (e.key === "ArrowLeft") prevSlide(e);
});

// UPDATE FUNCTION
function updateSlide() {
    track.style.transform = "translateX(-" + index * 100 + "vw)";

    // Update active class for zoom effect
    slides.forEach((slide, i) => {
        if (i === index) slide.classList.add("active");
        else slide.classList.remove("active");
    });
}

// NEXT
function nextSlide(e) {
    if (e) e.stopPropagation();

    index = (index + 1) % slides.length;
    updateSlide();
}

// PREVIOUS
function prevSlide(e) {
    if (e) e.stopPropagation();

    index = (index - 1 + slides.length) % slides.length;
    updateSlide();
}

// REDIRECT
function goToPlan(destination) {
    localStorage.setItem("destination", destination);
    window.location.href = "plan.html";
}

// AUTO-FILL DESTINATION AND HANDLE FORM
window.addEventListener("load", function () {
    let destInput = document.getElementById("destination");

    if (destInput) {
        let savedDestination = localStorage.getItem("destination");

        if (savedDestination) {
            destInput.value = savedDestination;
        }
    }

    let form = document.getElementById("planForm");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            let destination = document.getElementById("destination").value;
            let from = document.getElementById("from").value;
            let startDate = document.getElementById("startDate").value;
            let endDate = document.getElementById("endDate").value;
            let travelers = document.getElementById("travelers").value;

            // store data
            localStorage.setItem("destination", destination);
            localStorage.setItem("from", from);
            localStorage.setItem("startDate", startDate);
            localStorage.setItem("endDate", endDate);
            localStorage.setItem("travelers", travelers);

            window.location.href = "result.html";
        });
    }

    // EXPLORE DESTINATIONS PAGE
    let grid = document.getElementById("destGrid");
    let searchInput = document.getElementById("searchInput");
    let suggestionsBox = document.getElementById("suggestions");

    const allDestinations = [
        "Taj Mahal", "Eiffel Tower", "Great Wall of China", "Machu Picchu",
        "Colosseum", "Petra", "Christ the Redeemer", "Pyramids of Giza",
        "Goa", "Manali", "Kerala", "Jaipur", "Ladakh",
        "Dubai", "Bali", "Maldives", "Switzerland",
        "New York", "London", "Tokyo", "Singapore",
        "Thailand", "Paris", "Sydney", "Rome",
        "Barcelona", "Istanbul"
    ];

    if (searchInput) {
        // Advanced Autocomplete & Suggestions
        searchInput.addEventListener("input", function () {
            let value = searchInput.value.toLowerCase();
            if (suggestionsBox) suggestionsBox.innerHTML = "";

            // Also live filter gallery cards if present
            let cards = document.querySelectorAll(".dest-card");
            cards.forEach(card => {
                let text = card.innerText.toLowerCase();
                card.style.display = text.includes(value) ? "block" : "none";
            });

            if (value === "" || !suggestionsBox) return;

            // Show suggestions dropdown
            let filtered = allDestinations.filter(dest =>
                dest.toLowerCase().includes(value)
            );

            filtered.forEach(dest => {
                let div = document.createElement("div");
                div.classList.add("suggestion-item");
                div.innerText = dest;
                div.onclick = function () {
                    goToPlan(dest);
                };
                suggestionsBox.appendChild(div);
            });
        });

        // Quick jump on Enter
        searchInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                searchDestination();
            }
        });

        // Close suggestions on click outside
        document.addEventListener("click", (e) => {
            if (suggestionsBox && !e.target.closest(".search-box")) {
                suggestionsBox.innerHTML = "";
            }
        });
    }

    if (grid) {

        const destinations = [
            "Taj Mahal", "Eiffel Tower", "Great Wall of China", "Machu Picchu",
            "Colosseum", "Petra", "Christ the Redeemer", "Pyramids of Giza",
            "Goa", "Manali", "Kerala", "Jaipur", "Ladakh",
            "Dubai", "Bali", "Maldives", "Switzerland",
            "New York", "London", "Tokyo", "Singapore",
            "Thailand", "Paris", "Sydney", "Rome",
            "Barcelona", "Istanbul"
        ];

        const imageMap = {
            "taj mahal": "https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg",
            "eiffel tower": "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg",
            "great wall of china": "https://images.unsplash.com/photo-1587135991058-8816c5b6f7d2?q=80&w=1600&auto=format&fit=crop",
            "machu picchu": "https://upload.wikimedia.org/wikipedia/commons/e/eb/Machu_Picchu%2C_Peru.jpg",
            "colosseum": "https://upload.wikimedia.org/wikipedia/commons/d/de/Colosseo_2020.jpg",
            "petra": "https://images.unsplash.com/photo-1579606032821-4e6161c81bd3",
            "christ the redeemer": "https://images.unsplash.com/photo-1594035910387-fea47794261f",
            "pyramids of giza": "https://upload.wikimedia.org/wikipedia/commons/e/e3/Kheops-Pyramid.jpg",

            "goa": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
            "manali": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
            "kerala": "https://images.unsplash.com/photo-1593693411515-c20261bcad6e",
            "jaipur": "https://images.unsplash.com/photo-1599661046289-e31897846e41",
            "ladakh": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d",

            "dubai": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
            "bali": "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
            "maldives": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            "switzerland": "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
            "new york": "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59",
            "london": "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
            "tokyo": "https://images.unsplash.com/photo-1549692520-acc6669e2f0c",
            "singapore": "https://images.unsplash.com/photo-1508962914676-134849a727f0",
            "thailand": "https://images.unsplash.com/photo-1508009603885-50cf7c579365",
            "paris": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
            "sydney": "https://images.unsplash.com/photo-1506973035872-a4f23efc90f5",
            "rome": "https://images.unsplash.com/photo-1526481280691-906c7c6c05c0",
            "barcelona": "https://images.unsplash.com/photo-1505765050516-f72dcac9c60c",
            "istanbul": "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b"
        };

        destinations.forEach(dest => {
            console.log("DEST:", dest);
            let key = dest.toLowerCase().trim();
            let img = imageMap[key] || `https://source.unsplash.com/600x400/?travel,${encodeURIComponent(dest)}`;

            let card = `
                <div class="dest-card" onclick="goToPlan('${dest}')">
                    <img src="${img}" onerror="this.src='https://source.unsplash.com/600x400/?travel'">
                    <h3>${dest}</h3>
                </div>
            `;
            grid.innerHTML += card;
        });
    }

    // PROCESS RESULTS PAGE
    let loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.style.display = "none";
            let content = document.getElementById("resultContent");
            if(content) content.style.display = "block";
            generateResults();
        }, 2000); // 2 sec delay (feels like AI working)
    } else {
        generateResults();
    }
});

function generateResults() {

    let destination = localStorage.getItem("destination");
    console.log("Destination:", destination);
    let startDate = localStorage.getItem("startDate");
    let endDate = localStorage.getItem("endDate");

    let start = new Date(startDate);
    let end = new Date(endDate);
    let days = (end - start) / (1000 * 60 * 60 * 24) + 1;

    document.getElementById("resultTitle").innerText =
        "Trip to " + destination;

    // 🌍 DESTINATION DATA
    const data = {

        "Taj Mahal": {
            image: "https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg",
            places: ["Taj Mahal", "Agra Fort", "Mehtab Bagh"],
            food: ["Petha", "Mughlai Cuisine", "Street Food"],
            hotels: ["The Oberoi Amarvilas", "Hotel Taj Resorts", "Budget Stay"]
        },

        "Eiffel Tower": {
            image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg",
            places: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise"],
            food: ["Croissants", "French Desserts", "Wine & Cheese"],
            hotels: ["Paris Luxury Stay", "City Hotel", "Budget Inn"]
        },

        "Great Wall of China": {
            image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/GreatWallBadaling.jpg",
            places: ["Great Wall", "Beijing City", "Forbidden City"],
            food: ["Peking Duck", "Noodles", "Street Dumplings"],
            hotels: ["Beijing Grand Hotel", "City Stay", "Budget Lodge"]
        },

        "Machu Picchu": {
            image: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Machu_Picchu%2C_Peru.jpg",
            places: ["Machu Picchu", "Cusco", "Sacred Valley"],
            food: ["Peruvian Cuisine", "Grilled Meat", "Local Dishes"],
            hotels: ["Mountain Resort", "Cusco Hotel", "Budget Stay"]
        },

        "Colosseum": {
            image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Colosseo_2020.jpg",
            places: ["Colosseum", "Roman Forum", "Vatican City"],
            food: ["Pizza", "Pasta", "Italian Desserts"],
            hotels: ["Rome Luxury Stay", "City Hotel", "Budget Inn"]
        },

        "Petra": {
            image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Al_Khazneh_Petra_edit_2.jpg",
            places: ["Petra Treasury", "Monastery", "Desert Tour"],
            food: ["Jordanian Cuisine", "Grilled Meat", "Traditional Meals"],
            hotels: ["Desert Resort", "City Hotel", "Budget Stay"]
        },

        "Christ the Redeemer": {
            image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Christ_on_Corcovado_mountain.JPG",
            places: ["Christ Statue", "Rio Beaches", "Sugarloaf Mountain"],
            food: ["Brazilian BBQ", "Seafood", "Street Food"],
            hotels: ["Beach Resort", "City Hotel", "Budget Inn"]
        },

        "Pyramids of Giza": {
            image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Kheops-Pyramid.jpg",
            places: ["Pyramids", "Sphinx", "Nile River"],
            food: ["Egyptian Cuisine", "Falafel", "Local Meals"],
            hotels: ["Luxury Pyramid View Hotel", "City Stay", "Budget Lodge"]
        },

        // 🇮🇳 INDIA
        "Goa": {
            image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
            places: ["Baga Beach", "Fort Aguada", "Anjuna Market"],
            food: ["Seafood", "Goan Curry", "Beach Shacks"],
            hotels: ["Beach Resort", "Luxury Stay", "Budget Hostel"]
        },

        "Manali": {
            image: "https://images.unsplash.com/photo-1609948543911-c0a1b9c5a3cb",
            places: ["Solang Valley", "Rohtang Pass", "Mall Road"],
            food: ["Himachali Food", "Maggi Points", "Cafes"],
            hotels: ["Mountain Resort", "Cabin Stay", "Budget Inn"]
        },

        "Kerala": {
            image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e",
            places: ["Alleppey Backwaters", "Munnar Hills", "Kochi"],
            food: ["Kerala Sadya", "Seafood", "Appam"],
            hotels: ["Houseboat", "Luxury Resort", "Budget Stay"]
        },

        "Jaipur": {
            image: "https://images.unsplash.com/photo-1599661046289-e31897846e41",
            places: ["Hawa Mahal", "Amber Fort", "City Palace"],
            food: ["Dal Baati", "Ghewar", "Street Food"],
            hotels: ["Heritage Hotel", "City Stay", "Budget Inn"]
        },

        "Ladakh": {
            image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1",
            places: ["Pangong Lake", "Leh Palace", "Nubra Valley"],
            food: ["Thukpa", "Momos", "Local Cuisine"],
            hotels: ["Camp Stay", "Mountain Lodge", "Budget Stay"]
        },

        // 🌍 INTERNATIONAL
        "Dubai": {
            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
            places: ["Burj Khalifa", "Desert Safari", "Dubai Mall"],
            food: ["Arabic Cuisine", "Luxury Dining", "Street Food"],
            hotels: ["Luxury Hotel", "City Hotel", "Budget Stay"]
        },

        "Bali": {
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
            places: ["Ubud", "Tanah Lot", "Beach Clubs"],
            food: ["Indonesian Food", "Seafood", "Local Dishes"],
            hotels: ["Villa Stay", "Beach Resort", "Budget Hostel"]
        },

        "Maldives": {
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            places: ["Private Islands", "Snorkeling", "Beaches"],
            food: ["Seafood", "Luxury Dining", "Buffets"],
            hotels: ["Water Villa", "Luxury Resort", "Budget Stay"]
        },

        "Switzerland": {
            image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
            places: ["Alps", "Lucerne", "Interlaken"],
            food: ["Swiss Chocolate", "Fondue", "Local Food"],
            hotels: ["Mountain Hotel", "Luxury Stay", "Budget Lodge"]
        },

        "New York": {
            image: "https://images.unsplash.com/photo-1526481280691-3c469c9a5a8d",
            places: ["Times Square", "Central Park", "Statue of Liberty"],
            food: ["Fast Food", "Pizza", "Street Food"],
            hotels: ["City Hotel", "Luxury Stay", "Budget Inn"]
        },

        "London": {
            image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
            places: ["Big Ben", "London Eye", "Tower Bridge"],
            food: ["British Food", "Tea", "Street Food"],
            hotels: ["City Hotel", "Luxury Stay", "Budget Inn"]
        },

        "Tokyo": {
            image: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c",
            places: ["Shibuya", "Tokyo Tower", "Temples"],
            food: ["Sushi", "Ramen", "Street Food"],
            hotels: ["Capsule Hotel", "Luxury Stay", "Budget Inn"]
        },

        "Singapore": {
            image: "https://images.unsplash.com/photo-1508962914676-134849a727f0",
            places: ["Marina Bay", "Sentosa", "Gardens by the Bay"],
            food: ["Hawker Food", "Seafood", "Local Cuisine"],
            hotels: ["Luxury Hotel", "City Stay", "Budget Inn"]
        },

        "Thailand": {
            image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365",
            places: ["Phuket", "Bangkok", "Krabi"],
            food: ["Thai Food", "Street Food", "Seafood"],
            hotels: ["Beach Resort", "City Hotel", "Budget Stay"]
        },

        "Paris": {
            image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
            places: ["Eiffel Tower", "Louvre", "Seine River"],
            food: ["French Cuisine", "Desserts", "Wine"],
            hotels: ["Luxury Hotel", "City Stay", "Budget Inn"]
        },

        "Sydney": {
            image: "https://images.unsplash.com/photo-1506973035872-a4f23efc90f5",
            places: ["Opera House", "Harbour Bridge", "Beaches"],
            food: ["Seafood", "BBQ", "Local Food"],
            hotels: ["Beach Hotel", "Luxury Stay", "Budget Inn"]
        },

        "Rome": {
            image: "https://images.unsplash.com/photo-1526481280691-906c7c6c05c0",
            places: ["Colosseum", "Vatican", "Trevi Fountain"],
            food: ["Pizza", "Pasta", "Gelato"],
            hotels: ["City Hotel", "Luxury Stay", "Budget Inn"]
        },

        "Barcelona": {
            image: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60c",
            places: ["Sagrada Familia", "Beaches", "City Streets"],
            food: ["Tapas", "Seafood", "Local Food"],
            hotels: ["City Hotel", "Luxury Stay", "Budget Inn"]
        },

        "Istanbul": {
            image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b",
            places: ["Hagia Sophia", "Grand Bazaar", "Mosques"],
            food: ["Turkish Food", "Kebabs", "Desserts"],
            hotels: ["City Hotel", "Luxury Stay", "Budget Inn"]
        }
    };

    let selected = data[destination];

    // fallback if not found
    if (!selected) {
        selected = {
            image: "https://source.unsplash.com/1600x900/?travel",
            places: ["Top attractions", "Local spots"],
            food: ["Local food", "Famous dishes"],
            hotels: ["Luxury Stay", "Budget Stay"]
        };
    }

    // 🌄 IMAGE
    let image = document.getElementById("destinationImage");
    if (image) {
        image.src = selected.image;
    }

    // 📅 ITINERARY
    let itineraryBox = document.getElementById("itinerary");
    let itineraryHTML = "";

    for (let i = 1; i <= days; i++) {
        itineraryHTML += `<li>Day ${i}: Visit ${selected.places[i % selected.places.length]}</li>`;
    }

    itineraryBox.innerHTML = `<ul>${itineraryHTML}</ul>`;

    // 🏨 HOTELS
    let hotelContainer = document.getElementById("hotelContainer");
    if (hotelContainer) {
        hotelContainer.innerHTML = "";

        let hotelImg = `https://source.unsplash.com/600x400/?hotel,${destination}`;

        const hotels = [
            { name: "Luxury Stay", rating: 4.7, price: "₹8,500/night" },
            { name: "City Hotel", rating: 4.3, price: "₹5,200/night" },
            { name: "Comfort Suites", rating: 4.0, price: "₹3,800/night" },
            { name: "Budget Inn", rating: 3.8, price: "₹2,500/night" }
        ];

        hotels.forEach(hotel => {
            hotelContainer.innerHTML += `
                <div class="hotel-card">
                    <img src="${hotelImg}" onerror="this.src='https://images.unsplash.com/photo-1566073771259-6a8506099945'">
                    <div class="hotel-info">
                        <h3>${hotel.name}</h3>
                        <p>Near ${destination}</p>
                        <div class="hotel-meta">
                            <span class="rating">⭐ ${hotel.rating}</span>
                            <span class="price">${hotel.price}</span>
                        </div>
                        <button class="book-btn">Book Now</button>
                    </div>
                </div>
            `;
        });
    }

    // ✈️ FLIGHTS
    let flightContainer = document.getElementById("flightContainer");
    if (flightContainer) {
        flightContainer.innerHTML = "";

        let fromCity = localStorage.getItem("from") || "Your City";

        const airlineLogos = {
            "IndiGo": "https://img.icons8.com/color/48/000000/airplane-take-off.png",
            "Air India": "https://img.icons8.com/color/48/000000/airplane-mode-on.png",
            "Vistara": "https://img.icons8.com/color/48/000000/airplane.png",
            "SpiceJet": "https://img.icons8.com/color/48/000000/paper-plane.png"
        };

        const flights = [
            { company: "IndiGo", depart: "06:30 AM", arrive: "09:00 AM", duration: "2h 30m", price: "₹5,499" },
            { company: "Air India", depart: "10:15 AM", arrive: "12:45 PM", duration: "2h 30m", price: "₹6,200" },
            { company: "Vistara", depart: "03:20 PM", arrive: "06:10 PM", duration: "2h 50m", price: "₹7,100" },
            { company: "SpiceJet", depart: "08:00 PM", arrive: "10:30 PM", duration: "2h 30m", price: "₹4,800" }
        ];

        flights.forEach(flight => {
            let logo = airlineLogos[flight.company] || "https://img.icons8.com/color/48/000000/airplane.png";
            flightContainer.innerHTML += `
                <div class="flight-card">

                    <div class="flight-left">
                        <div class="flight-company">
                            <img src="${logo}" class="airline-logo">
                            <span>${flight.company}</span>
                        </div>
                        <div class="flight-time">
                            ${flight.depart} → ${flight.arrive}
                        </div>
                        <div class="flight-route">
                            ${fromCity} → ${destination}
                        </div>
                    </div>

                    <div class="flight-middle">
                        ⏱ ${flight.duration}
                    </div>

                    <div class="flight-meta">
                        <span class="flight-price">${flight.price}</span>
                        <button class="book-btn">Book Now</button>
                    </div>

                </div>
            `;
        });
    }

    // 🍜 FOOD
    let foodList = document.getElementById("foodList");
    if (foodList) {
        foodList.innerHTML = "";

        selected.food.forEach(food => {
            foodList.innerHTML += `<li>${food}</li>`;
        });
    }

    // 📍 PLACES
    let places = document.getElementById("places");
    if (places) {
        places.innerText = selected.places.join(", ");
    }

    // ANIMATE RESULT BOXES
    document.querySelectorAll(".result-box").forEach((box, i) => {
        box.classList.add("fade-in");
        box.style.animationDelay = (i * 0.2) + "s";
    });
}

function goBack() {
    window.history.back();
}

function goToDestinations() {
    window.location.href = "destinations.html";
}

function searchDestination() {
    let input = document.getElementById("searchInput");
    if (input) {
        let value = input.value.trim();
        if (value) {
            goToPlan(value);
        }
    }
}