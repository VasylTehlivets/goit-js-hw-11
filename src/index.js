import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPixabey, page, perPage } from './js/fetchPixabay';
import { createMarkup } from './js/createMarkup';

const searchForm = document.querySelector('#search-form');
const searchQuery = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', onFormSubmit);
loadBtn.addEventListener('click', onLoadBtn);

loadBtn.style.display = 'none';

let searchValue = '';

const options = {
  captionsData: 'alt',
  captionDelay: 250,
};
let simpleLightbox = new SimpleLightbox('.gallery a', options);

async function onFormSubmit(e) {
  e.preventDefault();
  searchValue = searchQuery.value.trim();
  if (searchValue === '') {
    searchForm.reset();
    cleaner();
    loadBtn.style.display = 'none';
    Notiflix.Notify.info('You cannot search by empty field, try again.');
    return;
  } else {
    try {
      resetPage();
      const search = await fetchPixabey(searchValue);
      if (search.hits < 1) {
        searchForm.reset();
        cleaner();
        loadBtn.style.display = 'none';
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        // searchForm.reset();
        gallery.innerHTML = createMarkup(search.hits);
        simpleLightbox.refresh();
        loadBtn.style.display = 'block';
        Notiflix.Notify.success(`Hooray! We found ${search.totalHits} images.`);
      }
    } catch (error) {
      cleaner();
      Notiflix.Report.info('Something get wrong, please try again');
    }
  }
}

async function onLoadBtn() {
  try {
    const search = await fetchPixabey(searchValue);
    const totalPages = page * perPage;
    if (search.totalHits <= totalPages) {
      loadBtn.style.display = 'none';
      Notiflix.Report.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    gallery.insertAdjacentHTML('beforeend', createMarkup(search.hits));
    pageScroll();
    simpleLightbox.refresh();
    loadBtn.style.display = 'block';
  } catch (error) {
    cleaner();
    Notiflix.Report.info('Something get wrong, please try again');
  }
}

function pageScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function resetPage() {
  page = 1;
}

function cleaner() {
  gallery.innerHTML = '';
}
