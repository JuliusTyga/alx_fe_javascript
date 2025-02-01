let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" },
    { text: "Happiness depends upon ourselves.", category: "Happiness" }
];

// Function to show a random quote
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
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);

// Show an initial quote when the page loads
showRandomQuote();