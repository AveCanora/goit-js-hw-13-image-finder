import notify from './notify.js';
const KEY_API = '21250079-87ab8a231c7222251825c94c0';
const per_page = 12;
const URL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=';
// let pageNumber = 1;

export default function fetchImages(searchQuery, pageNumber) {
  return fetch(
    `${URL}${searchQuery}&page=${pageNumber}&per_page=${per_page}&key=${KEY_API}`,
  ).then(response => {
    if (response.ok) return response.json();
    throw new Error(`Fetching data: ${response.status}`);
  });
}
