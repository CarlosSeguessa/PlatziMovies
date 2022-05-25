const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        'content-type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
        'language': 'es', 
    }
});



const getTrendingPreview = async () => {
  const {data} = await api('trending/movie/day');
  const movies = data.results;

  movies.forEach((movie) => {
    const trendingPreviewMoviesContainer = document.querySelector(
      "#trendingPreview .trendingPreview-movieList"
    );
    const movieContainer = document.createElement("div");
    movieContainer.setAttribute("class", "inline-block mr-[8px]");

    const movieImg = document.createElement("img");
    movieImg.setAttribute(
      "class",
      "cursor-pointer h-[225px] min-h-[225px] max-h-[225px] w-[150px] min-w-[150px] max-w-[150px]"
    );
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      "src",
      "https://image.tmdb.org/t/p/w300/" + movie.poster_path
    );

    movieContainer.appendChild(movieImg);
    trendingPreviewMoviesContainer.appendChild(movieContainer);
  });
};

const getCategoriesPreview = async () => {
    const {data} = await api('genre/movie/list');
    const categories = data.genres;


    categories.forEach((category) => {
        const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');
        const categorycontainer = document.createElement('div');
        categorycontainer.setAttribute('class','pl-3 w-[45%]');

        const categoryTitle = document.createElement('h3');
        categoryTitle.setAttribute('id', 'id' + category.id);
        categoryTitle.setAttribute('class','mb-4 cursor-pointer text-white category-title');
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categorycontainer.appendChild(categoryTitle);
        previewCategoriesContainer.appendChild(categorycontainer);

    });
};

getTrendingPreview();
getCategoriesPreview();
