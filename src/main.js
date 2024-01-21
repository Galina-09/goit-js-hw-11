import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { API_KEY, BASE_URL } from './config';

const refs = {
  searchForm: document.querySelector('.search-form'),
  loader: document.querySelector('.loader'),
  imageList: document.querySelector('.gallery'),
};

const gallery = new SimpleLightbox('.gallery-item a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const query = form.elements.query.value;

  refs.imageList.innerHTML = '';

  fetchImage(query)
    .then(renderImage)
    .catch(handleError)
    .finally(() => {
      hideLoader();
      form.reset();
    });
}

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
      throw new Error(resp.status);
    }

    return resp.json(); //повертає масив обєктів
  });
}

function renderImage({ hits }) {
  if (hits.length === 0) {
    showMessage(
      'Sorry, there are no images matching your search query. Please try again!'
    );
    return;
  }

  refs.imageList.innerHTML = createMarkup(hits);

  gallery.refresh();
}

function showMessage(customMessage = '') {
  const errorMessage =
    customMessage || 'Sorry, there was an error fetching images.';
  iziToast.show({
    iconUrl: './img/error.svg',
    theme: 'dark',
    message: errorMessage,
    messageSize: '16px',
    messageColor: 'white',
    backgroundColor: '#EF4040',
    position: 'topRight',
    timeout: 5000,
  });
}

function handleError(err) {
  /*console.error(err);*/
  refs.imageList.innerHTML = '';
  showMessage('Sorry, there is a problem with connection with the server.');
}

function createMarkup(hits) {
  return hits
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
        <a class="gallery-link" href="${largeImageURL}">
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
}

function hideLoader() {
  // Приховати елемент завантажувача
  setTimeout(() => {
    refs.loader.style.display = 'none';
  }, 500);
}

function showLoader() {
  // Показати елемент завантажувача
  if (refs.loader.style.display !== 'block') {
    refs.loader.style.display = 'block';
  }
}
