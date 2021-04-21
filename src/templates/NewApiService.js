export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.pageNumber = 1;
    this.per_page = 12;
    this.key = '21250079-87ab8a231c7222251825c94c0';
  }
  fetchImg() {
    console.log('До запроса', this);
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pageNumber}&per_page=${this.per_page}&key=${this.key}`;

    return fetch(url)
      .then(r => {
        if (this.searchQuery === '') {
          throw new Error(`Empty request!`);
        }
        if (r.ok) return r.json();
        throw new Error(`Fetching data: ${r.status}`);
      })
      .then(data => {
        this.incrementPage();

        return data.hits;
      });
  }
  incrementPage() {
    this.pageNumber += 1;
  }
  resetPage() {
    this.pageNumber = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
