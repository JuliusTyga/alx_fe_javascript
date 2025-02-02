let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" },
    { text: "Happiness depends upon ourselves.", category: "Happiness" }
];

// Function to display a random quote
function showRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    if (quotes.length === 0) {
        quoteDisplay.innerHTML = "<p>No quotes available. Add a new one!</p>";
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>"${quote.text}" - <strong>${quote.category}</strong></p>`;
}

// Function to create and append the quote addition form dynamically
function createAddQuoteForm() {
    const formContainer = document.createElement("div");
    formContainer.id = "formContainer";

    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.id = "newQuoteText";
    textInput.placeholder = "Enter a new quote";

    const categoryInput = document.createElement("input");
    categoryInput.type = "text";
    categoryInput.id = "newQuoteCategory";
    categoryInput.placeholder = "Enter quote category";

    const addButton = document.createElement("button");
    addButton.textContent = "Add Quote";
    addButton.addEventListener("click", addQuote);

    formContainer.appendChild(textInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);

    document.body.appendChild(formContainer);
}

// Function to add a new quote
function addQuote() {
    const textInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");

    const newQuote = textInput.value.trim();
    const newCategory = categoryInput.value.trim();

    if (newQuote === "" || newCategory === "") {
        alert("Please enter both a quote and a category.");
        return;
    }

    quotes.push({ text: newQuote, category: newCategory });

    // Clear input fields
    textInput.value = "";
    categoryInput.value = "";

    showRandomQuote(); // Show the new quote immediately
}

// Event listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Initialize the quote display and form
showRandomQuote();
createAddQuoteForm();

// Load quotes from local storage or use default quotes
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" },
    { text: "Happiness depends upon ourselves.", category: "Happiness" }
];

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        document.getElementById("quoteDisplay").innerHTML = "<p>No quotes available. Add a new one!</p>";
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    // Store the last viewed quote in session storage
    sessionStorage.setItem("lastQuote", JSON.stringify(quote));

    document.getElementById("quoteDisplay").innerHTML = `<p>"${quote.text}" - <strong>${quote.category}</strong></p>`;
}

// Function to create and append the quote addition form dynamically
function createAddQuoteForm() {
    const formContainer = document.getElementById("formContainer");
    formContainer.innerHTML = ""; // Clear any existing form

    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.id = "newQuoteText";
    textInput.placeholder = "Enter a new quote";

    const categoryInput = document.createElement("input");
    categoryInput.type = "text";
    categoryInput.id = "newQuoteCategory";
    categoryInput.placeholder = "Enter quote category";

    const addButton = document.createElement("button");
    addButton.textContent = "Add Quote";
    addButton.addEventListener("click", addQuote);

    formContainer.appendChild(textInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);
}

// Function to add a new quote
function addQuote() {
    const textInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");

    const newQuote = textInput.value.trim();
    const newCategory = categoryInput.value.trim();

    if (newQuote === "" || newCategory === "") {
        alert("Please enter both a quote and a category.");
        return;
    }

    quotes.push({ text: newQuote, category: newCategory });
    saveQuotes(); // Save updated quotes to local storage

    // Clear input fields
    textInput.value = "";
    categoryInput.value = "";

    showRandomQuote(); // Show the new quote immediately
}

// Function to export quotes as JSON
function exportToJson() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Function to import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes.push(...importedQuotes);
                saveQuotes();
                alert("Quotes imported successfully!");
                showRandomQuote();
            } else {
                alert("Invalid JSON format!");
            }
        } catch (error) {
            alert("Error parsing JSON file.");
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event Listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("exportJson").addEventListener("click", exportToJson);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);

// Initialize the quote display and form
showRandomQuote();
createAddQuoteForm();

// Load quotes from local storage or use default quotes
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" },
    { text: "Happiness depends upon ourselves.", category: "Happiness" }
];

// Load last selected category from local storage
let lastSelectedCategory = localStorage.getItem("selectedCategory") || "all";

// Save quotes and selected category to local storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to populate category dropdown
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Reset options

    const uniqueCategories = [...new Set(quotes.map(q => q.category))];
    uniqueCategories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Restore last selected category
    categoryFilter.value = lastSelectedCategory;
}

// Function to display a filtered or random quote
function showRandomQuote() {
    let filteredQuotes = quotes;

    // Apply category filter
    const selectedCategory = document.getElementById("categoryFilter").value;
    if (selectedCategory !== "all") {
        filteredQuotes = quotes.filter(q => q.category === selectedCategory);
    }

    if (filteredQuotes.length === 0) {
        document.getElementById("quoteDisplay").innerHTML = "<p>No quotes in this category. Add a new one!</p>";
        return;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];

    // Store last viewed quote in session storage
    sessionStorage.setItem("lastQuote", JSON.stringify(quote));

    document.getElementById("quoteDisplay").innerHTML = `<p>"${quote.text}" - <strong>${quote.category}</strong></p>`;
}

// Function to create the quote addition form
function createAddQuoteForm() {
    const formContainer = document.getElementById("formContainer");
    formContainer.innerHTML = ""; // Clear any existing form

    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.id = "newQuoteText";
    textInput.placeholder = "Enter a new quote";

    const categoryInput = document.createElement("input");
    categoryInput.type = "text";
    categoryInput.id = "newQuoteCategory";
    categoryInput.placeholder = "Enter quote category";

    const addButton = document.createElement("button");
    addButton.textContent = "Add Quote";
    addButton.addEventListener("click", addQuote);

    formContainer.appendChild(textInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);
}

// Function to add a new quote
function addQuote() {
    const textInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");

    const newQuote = textInput.value.trim();
    const newCategory = categoryInput.value.trim();

    if (newQuote === "" || newCategory === "") {
        alert("Please enter both a quote and a category.");
        return;
    }

    quotes.push({ text: newQuote, category: newCategory });
    saveQuotes(); // Save updated quotes to local storage
    populateCategories(); // Update dropdown options

    // Clear input fields
    textInput.value = "";
    categoryInput.value = "";

    showRandomQuote(); // Show the new quote immediately
}

// Function to filter quotes based on category
function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    localStorage.setItem("selectedCategory", selectedCategory); // Save selection
    showRandomQuote();
}

// Function to export quotes as JSON
function exportToJson() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Function to import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes.push(...importedQuotes);
                saveQuotes();
                populateCategories(); // Refresh categories after import
                alert("Quotes imported successfully!");
                showRandomQuote();
            } else {
                alert("Invalid JSON format!");
            }
        } catch (error) {
            alert("Error parsing JSON file.");
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event Listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("exportJson").addEventListener("click", exportToJson);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);

// Initialize the application
populateCategories();
showRandomQuote();
createAddQuoteForm();
