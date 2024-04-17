document.addEventListener('DOMContentLoaded', function() {
    async function fetchQuote() {
        try {
            const response = await fetch('https://api.quotable.io/random');
            if (!response.ok) {
                throw new Error('Failed to fetch quote');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    function updateQuote(quote) {
        const quoteElement = document.querySelector('.img-main p');
        quoteElement.textContent = `"${quote.content}" - ${quote.author}`;
    }

    function setBackgroundImage(imageUrl) {
        const quoteContainer = document.querySelector('.img-main');
        quoteContainer.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), ${imageUrl}`;
    }

    // Function to toggle between fonts
    function toggleFont(fontFamily) {
        const quoteElement = document.querySelector('.img-main p');
        quoteElement.style.fontFamily = fontFamily;
    }

    // Function to handle the "Generate Quote" button click event
    async function generateQuote() {
        const quote = await fetchQuote();
        if (quote) {
            updateQuote(quote);
        }
    }

    // Function to handle file input change event
    function handleFileInputChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function() {
                setBackgroundImage(`url(${reader.result})`);
            };
            reader.readAsDataURL(file);
        }
    }

    // Get the "Generate Quote" button element
    const generateButton = document.querySelector('.btn-pry');

    // Get all grid item elements
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach(function(gridItem) {
        gridItem.addEventListener('click', function(event) {
            if (gridItem.classList.contains('btn-icon')) {
                const fileInput = document.querySelector('.file-input');
                fileInput.click();
            } else {
                const backgroundImageUrl = window.getComputedStyle(gridItem).backgroundImage;
                setBackgroundImage(backgroundImageUrl);
            }
        });
    });

    // Get the font selection buttons
    const selectFont1Button = document.querySelector('.btn-select1');
    const selectFont2Button = document.querySelector('.btn-select2');

    selectFont1Button.addEventListener('click', function() {
        toggleFont('Inria Serif, serif');
    });

    selectFont2Button.addEventListener('click', function() {
        toggleFont('Butterfly Kids, cursive');
    });
    const fileInput = document.querySelector('.file-input');
    fileInput.addEventListener('change', handleFileInputChange);

    generateButton.addEventListener('click', generateQuote);
});

