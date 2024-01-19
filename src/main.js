import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '41864490-ab1aa9c4772cfd6b871252eca';

function fetchImage(
  qWorld,
  image_type = 'photo',
  orientation = 'horizontal',
  safesearch = true
) {
  return fetch(
    `${BASE_URL}/?key=${API_KEY}&q=${qWorld}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}&per_page=18`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json(); //повертає масив обєктів
  });
}

let gallery;
const loader = document.querySelector('.loader');

const refs = {
  gallery: document.querySelector('.gallery'),
  searchForm: document.querySelector('.search-form'),
};

refs.searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const query = form.elements.query.value;
  refs.gallery.innerHTML = '';

  //console.log(query);
  showLoader();

  fetchImage(query)
    .then(renderImage)
    .catch(onFetchError)
    .finally(() => {
      hideLoader();
      form.reset();
    });
}

function renderImage({ hits }) {
  if (hits.length === 0) {
    showMessage();
    return;
  }

  const markup = hits
    .map(
      ({
        comments,
        downloads,
        largeImageURL,
        likes,
        webformatURL,
        tags,
        views,
      }) =>
        `<li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}" target="_blank">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}">
          <ul class="gallery-item-description">
            <li>Likes: ${likes}</li>
            <li>Views: ${views}</li>
            <li>Downloads: ${downloads}</li>
            <li>Comments: ${comments}</li>
          </ul>
        </a>
      </li>`
    )
    .join('');

  refs.gallery.innerHTML = markup;

  gallery = new SimpleLightbox('.gallery-item a', {
    // Створення нового об'єкту SimpleLightbox , коли оновлюється галерея
    captionsData: 'alt',
    captionDelay: 250,
  });

  gallery.refresh(); // Виклик метод refresh() після оновлення контенту
}

function onFetchError(error) {
  alert('Упс, щось пішло не так і ми не знайшли вашого покемона!');
  console.error(error);
}

function showMessage() {
  iziToast.show({
    class: 'error-svg',
    icon: 'error-svg',
    theme: 'dark',
    message:
      'Sorry, there are no images matching your search query. Please try again! Please choose a date in the future',
    messageSize: '16px',
    messageColor: 'white',
    backgroundColor: '#EF4040',
    position: 'topRight',
    timeout: 5000,
  });
}

// Додаємо обробник події для поле вводу
const searchInput = refs.searchForm.querySelector('.form-control');
searchInput.addEventListener('focus', () => {
  // Очищаємо вміст галереї, коли курсор фокусується на полі вводу
  refs.gallery.innerHTML = '';
});

function showLoader() {
  // Показати елемент завантажувача
  loader.style.display = 'block';
}

function hideLoader() {
  // Приховати елемент завантажувача
  loader.style.display = 'none';
}
