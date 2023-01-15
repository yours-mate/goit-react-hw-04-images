const BASE_URL = 'https://pixabay.com/api/';
const perPage = 12;
const fetchKey = '31291056-02b52945dcd563b074a1c7cbe';

export async function FetchImages(query, page) {
  const response = await fetch(
    `${BASE_URL}?q=${query}&key=${fetchKey}&image_type=photo&orientation=horizontal&per_page=${perPage}&page=${page}`
  );
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(new Error(`An error occured. Please try again`));
}
