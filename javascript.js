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
        quoteContainer.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), ${imageUrl}`;
    }

    // Function to toggle between fonts
    function toggleFont(fontFamily) {
        const quoteElement = document.querySelector('.img-main p');
        quoteElement.style.fontFamily = fontFamily;
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

    // Function to download the top-container as a JPG image
    async function downloadTopContainer() {
        console.log("Downloading top-container...");

        const topContainer = document.querySelector('.top-container');
        const mainImage = document.querySelector('.img-main');
        const mainImageBorderRadius = mainImage.style.borderRadius;
        mainImage.style.borderRadius = "0";


        // Use html2canvas to capture the top-container as a canvas
        const canvas = await html2canvas(topContainer);
        console.log(canvas)

        // Convert the canvas to a data URL representing a JPG image
        const dataUrl = canvas.toDataURL('image/jpeg');

        // Create a temporary anchor element to trigger the download
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'quote_image.jpg'; // Set the download filename

        // Trigger the download
        link.click();
        mainImage.style.borderRadius = mainImageBorderRadius
    }

    // Get the "Generate Quote" button and add event listener
    const generateButton = document.querySelector('.btn-pry');
    generateButton.addEventListener('click', async function() {
        const quote = await fetchQuote();
        if (quote) {
            updateQuote(quote);
        }
    });

    // Get all grid item elements and add event listeners
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

    // Get the font selection buttons and add event listeners
    const selectFont1Button = document.querySelector('.btn-select1');
    const selectFont2Button = document.querySelector('.btn-select2');
    selectFont1Button.addEventListener('click', function() {
        toggleFont('Inria Serif, serif');
        selectFont1Button.classList.add('btn-selected')
        selectFont2Button.classList.remove('btn-selected')
    });
    selectFont2Button.addEventListener('click', function() {
        toggleFont('Butterfly Kids, cursive');
        selectFont1Button.classList.remove('btn-selected')
        selectFont2Button.classList.add('btn-selected')
    });

    // Get the file input element and add event listener
    const fileInput = document.querySelector('.file-input');
    fileInput.addEventListener('change', handleFileInputChange);

    // Get the "Download Quote" button and add event listener
    const downloadQuoteButton = document.querySelector('.btn-sec');
    downloadQuoteButton.addEventListener('click', downloadTopContainer);
});
