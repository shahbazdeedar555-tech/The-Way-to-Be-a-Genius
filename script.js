
/* =====================================
   THE WAY TO BE A GENIUS
   Main JavaScript File
   Author: Deedar Shahbaz
===================================== */

// Dictionary data
const dictionary = [
    {
        word: "Ability",
        pronunciation: "uh-BIL-uh-tee",
        partOfSpeech: "Noun",
        meaning: "قابليت، صلاحيت",
        example: "She has the ability to learn quickly.",
        translation: "هن ۾ جلدي سکڻ جي صلاحيت آهي."
    },
    {
        word: "Accept",
        pronunciation: "ak-SEPT",
        partOfSpeech: "Verb",
        meaning: "قبول ڪرڻ",
        example: "I accept your invitation.",
        translation: "مان توهان جي دعوت قبول ڪريان ٿو."
    },
    {
        word: "Achieve",
        pronunciation: "uh-CHEEV",
        partOfSpeech: "Verb",
        meaning: "حاصل ڪرڻ، ڪاميابي ماڻڻ",
        example: "You can achieve your goals.",
        translation: "توهان پنهنجا مقصد حاصل ڪري سگهو ٿا."
    },
    {
        word: "Beautiful",
        pronunciation: "BYOO-tuh-ful",
        partOfSpeech: "Adjective",
        meaning: "خوبصورت، سهڻو",
        example: "This is a beautiful place.",
        translation: "هي هڪ خوبصورت جڳهه آهي."
    },
    {
        word: "Believe",
        pronunciation: "bih-LEEV",
        partOfSpeech: "Verb",
        meaning: "يقين ڪرڻ، ڀروسو ڪرڻ",
        example: "Believe in yourself.",
        translation: "پنهنجي پاڻ تي يقين رکو."
    },
    {
        word: "Brave",
        pronunciation: "BRAYV",
        partOfSpeech: "Adjective",
        meaning: "بهادر، دلير",
        example: "He is a brave man.",
        translation: "هو هڪ بهادر ماڻهو آهي."
    },
    {
        word: "Clever",
        pronunciation: "KLEV-er",
        partOfSpeech: "Adjective",
        meaning: "هوشيار، ذهين",
        example: "She is a clever student.",
        translation: "هوءَ هڪ هوشيار شاگردياڻي آهي."
    },
    {
        word: "Create",
        pronunciation: "kree-AYT",
        partOfSpeech: "Verb",
        meaning: "ٺاهڻ، تخليق ڪرڻ",
        example: "We create new ideas.",
        translation: "اسان نوان خيال پيدا ڪريون ٿا."
    },
    {
        word: "Dream",
        pronunciation: "DREEM",
        partOfSpeech: "Noun / Verb",
        meaning: "خواب، خواب ڏسڻ",
        example: "Never give up your dreams.",
        translation: "پنهنجن خوابن تان ڪڏهن به هٿ نه کڻو."
    },
    {
        word: "Education",
        pronunciation: "ej-oo-KAY-shun",
        partOfSpeech: "Noun",
        meaning: "تعليم",
        example: "Education changes our lives.",
        translation: "تعليم اسان جون زندگيون بدلائي ٿي."
    },
    {
        word: "Genius",
        pronunciation: "JEEN-yus",
        partOfSpeech: "Noun",
        meaning: "غيرمعمولي ذهين ماڻهو، نابغه",
        example: "A genius always loves learning.",
        translation: "هڪ غيرمعمولي ذهين ماڻهو هميشه سکڻ سان محبت ڪندو آهي."
    },
    {
        word: "Knowledge",
        pronunciation: "NOL-ij",
        partOfSpeech: "Noun",
        meaning: "علم، ڄاڻ",
        example: "Knowledge is power.",
        translation: "علم طاقت آهي."
    },
    {
        word: "Learn",
        pronunciation: "LERN",
        partOfSpeech: "Verb",
        meaning: "سکڻ",
        example: "I learn English every day.",
        translation: "مان هر روز انگريزي سکندو آهيان."
    },
    {
        word: "Success",
        pronunciation: "suk-SES",
        partOfSpeech: "Noun",
        meaning: "ڪاميابي",
        example: "Hard work leads to success.",
        translation: "محنت ڪاميابي ڏانهن وٺي وڃي ٿي."
    }
];

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
        meaning.textContent =
            "Sindhi Meaning: " + item.meaning;
        meaning.dir = "rtl";

        const example = document.createElement("p");
        example.className = "example";
        example.textContent =
            "Example: " + item.example;

        const translation = document.createElement("p");
        translation.textContent =
            "Sindhi: " + item.translation;
        translation.dir = "rtl";

        entry.append(
            heading,
            pronunciation,
            part,
            meaning,
            example,
            translation
        );

        resultsContainer.appendChild(entry);
    });
}

// Search in English and Sindhi
function searchDictionary() {

    if (!searchInput) return;

    const query = searchInput.value
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
            item.meaning.includes(query)
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

// Display all dictionary words initially
displayResults(dictionary);

// Alphabetical sorting
dictionary.sort((a, b) =>
    a.word.localeCompare(b.word)
);

console.log(
    "The Way to Be a Genius dictionary is ready."
);
