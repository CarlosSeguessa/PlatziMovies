const API_KEY = "08367238e4cb1c18486c2be3a90dda59";
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "content-type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
    language: "es",
  },
});

//Utils
const createMovies = (movies, container) => {
  container.innerHTML = "";

  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.setAttribute("class", "inline-block mb-2 w-[47.5%] ");
    movieContainer.addEventListener("click", () => {
      location.hash = `#movie=${movie.id}`;
    });

    const movieImg = document.createElement("img");
    movieImg.setAttribute("class", "cursor-pointer w-full rounded-lg h-[225px] min-h-[225px] max-h-[225px] w-[150px] min-w-[150px] max-w-[150px]");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
    );

    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
  });
};

const createCategories = (categories, container) => {
  container.innerHTML = "";

  categories.forEach((category) => {
    const categorycontainer = document.createElement("div");
    categorycontainer.setAttribute("class", "pl-3 w-[45%]");

    const categoryTitle = document.createElement("h3");
    categoryTitle.setAttribute("id", "id" + category.id);
    categoryTitle.setAttribute(
      "class",
      "mb-4 cursor-pointer text-white category-title"
    );
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.addEventListener("click", () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });

    categoryTitle.appendChild(categoryTitleText);
    categorycontainer.appendChild(categoryTitle);
    container.appendChild(categorycontainer);
  });
};
//Llamados a la API

const getTrendingPreview = async () => {
  const { data } = await api("trending/movie/day");
  const movies = data.results;
  createMovies(movies, trendingMoviesPreviewList);
};

const getCategoriesPreview = async () => {
  const { data } = await api("genre/movie/list");
  const categories = data.genres;
  createCategories(categories, categoriesPreviewList);
};

const getMoviesByCategory = async (id) => {
  const { data } = await api("discover/movie", {
    params: {
      with_genres: id,
    },
  });
  const movies = data.results;
  createMovies(movies, genericSection);
};

const getMoviesBySearch = async (query) => {
  const { data } = await api("search/movie", {
    params: {
      query,
    },
  });
  const movies = data.results;

  createMovies(movies, genericSection);
};

const getTrendingMovies = async () => {
  const { data } = await api("trending/movie/day");
  const movies = data.results;

  createMovies(movies, genericSection);
};

const getMovieById = async (id) => {
  const { data:movie } = await api(`movie/${id}`);
  
  const movieImgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`

  headerSection.style.background = `
  linear-gradient(180deg,
    rgba(0, 0, 0, 0.35) 19.27%,
     rgba(0, 0, 0, 0) 29.17%
     ),
  url(${movieImgUrl})`;

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;

  createCategories(movie.genres, movieDetailCategoriesList);
  getRelatedMoviesById(id);
};

const getRelatedMoviesById = async (id) => {
  const {data} = await api(`movie/${id}/similar`);
  const relatedMovies = data.results;

  createMovies(relatedMovies, relatedMoviesContainer)
}