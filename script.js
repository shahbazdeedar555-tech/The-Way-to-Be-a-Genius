
/* =====================================
   THE WAY TO BE A GENIUS
   Main JavaScript File
   Author: Deedar Shahbaz
===================================== */

// Normalize Sindhi Unicode text
function normalizeSindhi(text) {
    return (text || "").normalize("NFKC");
}

// Load dictionary entries from dictionary.js
const dictionary = (window.dictionaryEntries || []).map(item => ({
    word: item.word || "",
    pronunciation: item.pronunciation || "",
    partOfSpeech: item.partOfSpeech || "",
    meaning: item.sindhiMeaning || "",
    wordForms: item.wordForms || "",
    example: item.example || "",
    translation: item.sindhiTranslation || ""
}));

// Get page elements
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultsContainer = document.getElementById("results");

// Display dictionary results
function displayResults(words) {

    if (!resultsContainer) return;

    resultsContainer.innerHTML = "";

    if (words.length === 0) {
        resultsContainer.innerHTML =
            "<p>No matching word found. Try another word.</p>";
        return;
    }

    words.forEach(item => {

        const entry = document.createElement("div");
        entry.className = "word-entry";

        const heading = document.createElement("h3");
        heading.textContent = item.word;

        const pronunciation = document.createElement("p");
        pronunciation.className = "pronunciation";
        pronunciation.textContent =
            "Pronunciation: " + item.pronunciation;

        const part = document.createElement("p");
        part.textContent =
            "Part of Speech: " + item.partOfSpeech;

        const meaning = document.createElement("p");
        meaning.className = "meaning";
        meaning.textContent = normalizeSindhi(item.meaning);
        meaning.dir = "rtl";

        const wordForms = document.createElement("p");
        wordForms.className = "word-forms";
        wordForms.textContent =
            "Word Forms: " + item.wordForms;

        const example = document.createElement("p");
        example.className = "example";
        example.textContent =
            "Example: " + item.example;

        const translation = document.createElement("p");
        translation.className = "translation";
        translation.textContent = normalizeSindhi(item.translation);
        translation.dir = "rtl";

        entry.append(
            heading,
            pronunciation,
            part,
            meaning,
            wordForms,
            example,
            translation
        );

        resultsContainer.appendChild(entry);
    });
}

// Search in English and Sindhi
function searchDictionary() {

    if (!searchInput) return;

    const query = normalizeSindhi(searchInput.value)
        .trim()
        .toLowerCase();

    if (!query) {
        if (resultsContainer) {
            resultsContainer.innerHTML =
                "<p>Please enter an English or Sindhi word.</p>";
        }
        return;
    }

    const filteredWords = dictionary.filter(item => {

        return (
            item.word.toLowerCase().includes(query) ||
            normalizeSindhi(item.meaning).includes(query) ||
            normalizeSindhi(item.translation).includes(query) ||
            item.pronunciation.toLowerCase().includes(query) ||
            item.partOfSpeech.toLowerCase().includes(query) ||
            String(item.wordForms).toLowerCase().includes(query)
        );
    });

    displayResults(filteredWords);
}

// Search button
if (searchButton) {
    searchButton.addEventListener(
        "click",
        searchDictionary
    );
}

// Press Enter to search
if (searchInput) {
    searchInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {
            searchDictionary();
        }
    });
}

// Alphabetical sorting
dictionary.sort((a, b) =>
    a.word.localeCompare(b.word)
);

// Display all dictionary entries initially
displayResults(dictionary);

console.log(
    "The Way to Be a Genius dictionary is ready. Entries:",
    dictionary.length
);
