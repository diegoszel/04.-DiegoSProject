export function displayCountries(countries, container, callback) {
    const likedCountries = JSON.parse(localStorage.getItem('likedCountries')) || [];
    container.innerHTML = '';

    countries.sort((a, b) => a.name.common.localeCompare(b.name.common)).forEach(country => {
        const card = document.createElement('div');
        card.className = 'flag-card';

        const isLiked = likedCountries.includes(country.name.common);

        card.innerHTML = `
            <img class="flag-image" src="${country.flags.png}" alt="${country.name.common} flag">
            <div class="flag-info">
                <h2>${country.name.common}</h2>
            </div>
            <button class="like-button ${isLiked ? 'liked' : ''}" data-country="${country.name.common}">
                ${isLiked ? '♥' : '♡'}
            </button>
        `;

        card.onclick = (event) => {
            if (event.target.classList.contains('like-button')) return;
            callback(country);
        };

        const likeButton = card.querySelector('.like-button');
        likeButton.onclick = (event) => {
            event.stopPropagation();
            toggleLike(country.name.common, likeButton);
        };

        container.appendChild(card);
    });
}

function toggleLike(countryName, button) {
    let likedCountries = JSON.parse(localStorage.getItem('likedCountries')) || [];

    if (likedCountries.includes(countryName)) {
        likedCountries = likedCountries.filter(name => name !== countryName);
        button.classList.remove('liked');
        button.textContent = '♡';
    } else {
        likedCountries.push(countryName);
        button.classList.add('liked');
        button.textContent = '♥';
    }

    localStorage.setItem('likedCountries', JSON.stringify(likedCountries));
}

export function showError(message, container) {
    container.innerHTML = `<div class="error">${message}</div>`;
}
