// register a service worker
navigator.serviceWorker.register('/service-worker.js').then(() => {
    console.log('Service worker resgistered!');
}).catch((err) => {
    console.error(err);
});

const cardWrapper = document.getElementById('card__wrapper');

function onSaveCardBtn() {
    console.log('clicked');
}

function createCard() {
    var card = document.createElement('div');
    card.className = 'card';
    var cardImage = document.createElement('div');
    cardImage.className = 'card-image';
    card.appendChild(cardImage)
    var figure = document.createElement('figure')
    figure.className = 'image is-4by3';
    cardImage.appendChild(figure);
    var image = document.createElement('img');
    image.setAttribute('src', '/assets/images/card_image.jpeg');
    image.setAttribute('alt', 'Placeholder image');
    figure.appendChild(image);
    var cardContent = document.createElement('div');
    cardContent.className = 'card-content has-text-centered';
    card.appendChild(cardContent);
    var p1 = document.createElement('p');
    p1.className = 'title is-4';
    p1.textContent = 'John Smith';
    cardContent.appendChild(p1);
    var button = document.createElement('button');
    button.className = 'button is-primary is-outlined';
    button.textContent = 'Save';
    button.addEventListener('click', onSaveCardBtn);
    cardContent.appendChild(button);
    cardWrapper.appendChild(card)
}

createCard();