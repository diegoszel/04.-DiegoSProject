export async function fetchCountries() {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        return response.data;
    } catch (error) {
        throw new Error('Error loading countries. Please try again later.');
    }
}
