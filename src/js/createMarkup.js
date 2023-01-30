import { icons } from './icons';

export function createMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
            <div class="photo-card">
            <a href = "${largeImageURL}">
    <img class = "photo" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
    <div class="info">
      <p class="info-item">${likes}
        <b>${icons.likes}</b>
      </p>
      <p class="info-item">${views}
        <b>${icons.views}</b>
      </p>
      <p class="info-item">${comments}
        <b>${icons.comments}</b>
      </p>
      <p class="info-item">${downloads}
        <b>${icons.downloads}</b>
      </p>
    </div>
  </div>`;
      }
    )
    .join();
}
