import axios from 'axios';

export let page = 1;
export const perPage = 40;

export async function fetchPixabey(searchValue) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '33190879-a40024b526a607573093145e5';
  try {
    const response = await axios
      .get(
        `${BASE_URL}?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
      )
      .then((page += 1));
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
