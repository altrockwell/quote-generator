const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Add Loading Spinner
function showLoader() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

// Remove Loading Spinner
function removeLoader() {
	loader.hidden = true;
	quoteContainer.hidden = false;
}

// Show New Quote
function newQuote() {
	showLoader();
	// Pick a random quote from apiQuotes array
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

	// Check if Author field is blank and replace it with "Unknown"
	authorText.textContent = quote.author || 'Unknown';
	quoteText.textContent = quote.text;

	// Check quote length to determine styling
	if (quote.text.length > 120) {
		quoteText.classList.add('long-quote');
	} else {
		quoteText.classList.remove('long-quote');
	}
	removeLoader();
}

// Get Quotes from API

async function getQuotes() {
	showLoader();
	const apiUrl = 'https://type.fit/api/quotes';
	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		newQuote();
	} catch (error) {}
}

// Tweet Quote

function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, '_blank');
}

// EventListeners
newQuoteBtn.addEventListener('click', newQuote);

twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
