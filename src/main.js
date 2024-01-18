import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '41864490-ab1aa9c4772cfd6b871252eca';

function fetchImage(
  qWorld,
  image_type = 'all',
  orientation = 'horizontal',
  safesearch = true
) {
  return fetch(
    `${BASE_URL}/?key=${API_KEY}&q=${qWorld}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json(); //повертає масив обєктів
  });
}

const refs = {
  gallery: document.querySelector('.gallery'),
  searchForm: document.querySelector('.search-form'),
};

refs.searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const query = form.elements.query.value;

  //console.log(query);

  fetchImage(query)
    .then(renderImage)
    .catch(onFetchError)
    .finally(() => form.reset());
}

function renderImage({ hits }) {
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

  const gallery = new SimpleLightbox('.gallery-item a', {
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
