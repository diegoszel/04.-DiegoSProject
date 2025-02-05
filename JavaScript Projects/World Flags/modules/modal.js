export function showCountryDetails(country, modal, modalContent) {
    const currencies = country.currencies ? Object.values(country.currencies).map(curr => `${curr.name} (${curr.symbol})`).join(', ') : 'N/A';
    const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';

    modalContent.innerHTML = `
        <span class="close-button" id="closeButton">&times;</span>
        <h2>${country.name.common}</h2>
        <div class="country-details">
            <div>
                <img class="country-flag" src="${country.flags.png}" alt="${country.name.common} flag">
            </div>
            <div class="country-info">
                <div class="info-group"><h3>Official Name</h3><p>${country.name.official}</p></div>
                <div class="info-group"><h3>Capital</h3><p>${country.capital || 'N/A'}</p></div>
                <div class="info-group"><h3>Region</h3><p>${country.region}</p></div>
                <div class="info-group"><h3>Languages</h3><p>${languages}</p></div>
                <div class="info-group"><h3>Currencies</h3><p>${currencies}</p></div>
                <div class="info-group"><h3>Population</h3><p>${country.population}</p></div>
                <div class="info-group"><h3>Area</h3><p>${country.area}</p></div>
                <div class="info-group"><h3>Timezone</h3><p>${country.timezones}</p></div>
            </div>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    document.getElementById('closeButton').onclick = () => closeModal(modal);
}

export function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

export function setupModalClose(modal) {
    window.onclick = function (event) {
        if (event.target === modal) closeModal(modal);
    };
}
