export function setupSearch(input, countries, callback) {
    input.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredCountries = countries.filter(country => 
            country.name.common.toLowerCase().includes(searchTerm)
        );
        callback(filteredCountries);
    });
}
