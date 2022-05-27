const homePage = () => {
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.add('hidden');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.remove('hidden');
  headerCategoryTitle.classList.add('hidden');
  searchForm.classList.remove('hidden');

  trendingPreviewSection.classList.remove('hidden');
  categoriesPreviewSection.classList.remove('hidden');
  genericSection.classList.add('hidden');
  movieDetailSection.classList.add('hidden');
  trendingtitle.classList.remove('hidden');

  console.log("Home!!");
  getTrendingPreview();
  getCategoriesPreview();
};

const trendPage = () => {
  console.log("TRENDS!");

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('hidden');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('hidden');
  headerCategoryTitle.classList.remove('hidden');
  searchForm.classList.add('hidden');

  trendingPreviewSection.classList.add('hidden');
  categoriesPreviewSection.classList.add('hidden');
  genericSection.classList.remove('hidden');
  movieDetailSection.classList.add('hidden');

  headerCategoryTitle.innerHTML = 'Tendencias';

  getTrendingMovies();
};

const searchPage = () => {
  console.log("Search!!");
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('hidden');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('hidden');
  headerCategoryTitle.classList.add('hidden');
  searchForm.classList.remove('hidden');

  trendingPreviewSection.classList.add('hidden');
  categoriesPreviewSection.classList.add('hidden');
  genericSection.classList.remove('hidden');
  movieDetailSection.classList.add('hidden');

  const [_, query] = location.hash.split('='); // ['#category', 'id-name]
  const newname = decodeURI(query);
  getMoviesBySearch(query);
};

const movieDetailsPage = () => {
  console.log("moviesDetails!");

  headerSection.classList.add('header-container--long');
  // headerSection.style.background = '';
  arrowBtn.classList.remove('hidden');
  arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.add('hidden');
  headerCategoryTitle.classList.add('hidden');
  searchForm.classList.add('hidden');

  trendingPreviewSection.classList.add('hidden');
  categoriesPreviewSection.classList.add('hidden');
  genericSection.classList.add('hidden');
  movieDetailSection.classList.remove('hidden');

  const [_, movieId] = location.hash.split('='); // ['#category', 'id-name]
  getMovieById(movieId);
};

const categoriesPage = () => {
  console.log("Categories!!");

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('hidden');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('hidden');
  headerCategoryTitle.classList.remove('hidden');
  searchForm.classList.add('hidden');
  trendingtitle.classList.add('hidden');
  trendingPreviewSection.classList.add('hidden');
  categoriesPreviewSection.classList.add('hidden');
  genericSection.classList.remove('hidden');
  movieDetailSection.classList.add('hidden');

  const [_, categoryData] = location.hash.split('='); // ['#category', 'id-name]
  const [categoryId, categoryName] = categoryData.split('-');
  const newname = decodeURI(categoryName);
  headerCategoryTitle.innerHTML = newname;
  getMoviesByCategory(categoryId);
};

const navigator = () => {
  console.log({ location });

  if (location.hash.startsWith("#trends")) {
    trendPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    movieDetailsPage();
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage();
  } else {
    homePage();
  }
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

searchFormBtn.addEventListener('click', () => {
  location.hash = `#search=${searchFormInput.value.trim()}`;
});

trendingBtn.addEventListener('click', () => {
  location.hash = '#trends'
});

arrowBtn.addEventListener('click', () => {
  const stateLoad = window.history.state ? window.history.state.loadUrl : '';
  if (stateLoad.includes('#')) {
    window.location.hash = '#home'
  } else {
    window.history.back();
  }
});

window.addEventListener("DOMContentLoaded",
() => {
  navigator();
  window.history.pushState({loadUrl: window.location.href }, null, '');
}, 
false);
window.addEventListener("hashchange", navigator, false);
