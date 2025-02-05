import { fetchCountries } from './fetchCountries.js';
import { displayCountries, showError } from './renderCountries.js';
import { showCountryDetails, closeModal, setupModalClose } from './modal.js';
import { setupSearch } from './search.js';

document.addEventListener('DOMContentLoaded', async () => {
    const flagsContainer = document.getElementById('flagsContainer');
    const searchInput = document.getElementById('searchInput');
    const modal = document.getElementById('countryModal');
    const modalContent = document.getElementById('modalContent');
    const allCountriesButton = document.getElementById('allCountriesButton');
    const favoritesButton = document.getElementById('favoritesButton');

    let allCountries = [];
    let currentView = 'all';

    setupModalClose(modal);

    try {
        allCountries = await fetchCountries();
        displayCountries(allCountries, flagsContainer, showDetails);
        setupSearch(searchInput, allCountries, updateDisplay);
    } catch (error) {
        showError(error.message, flagsContainer);
    }

    function showDetails(country) {
        showCountryDetails(country, modal, modalContent);
    }

    function updateDisplay(filteredCountries) {
        if (currentView === 'favorites') {
            filteredCountries = filterFavorites(filteredCountries);
        }
        displayCountries(filteredCountries, flagsContainer, showDetails);
    }

    function filterFavorites(countries) {
        const likedCountries = JSON.parse(localStorage.getItem('likedCountries')) || [];
        return countries.filter(country => likedCountries.includes(country.name.common));
    }

    // Event listeners for buttons
    allCountriesButton.addEventListener('click', () => {
        currentView = 'all';
        allCountriesButton.classList.add('active');
        favoritesButton.classList.remove('active');
        displayCountries(allCountries, flagsContainer, showDetails);
    });

    favoritesButton.addEventListener('click', () => {
        currentView = 'favorites';
        favoritesButton.classList.add('active');
        allCountriesButton.classList.remove('active');
        const likedCountries = filterFavorites(allCountries);
        displayCountries(likedCountries, flagsContainer, showDetails);
    });
});
