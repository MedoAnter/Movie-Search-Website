const searchInput = document.querySelector('#SearchInput');
const moviesDiv = document.querySelector('.movies');
const showMovie = document.querySelector('.movie-show');
const Close = document.querySelector('.close');

let searchData = [];

searchInput.addEventListener('input', (e) => {
  e.preventDefault();
  searchMovies();
});

function createmovies(searchData) {
  moviesDiv.innerHTML = '';

  searchData.forEach((movie) => {
    const movieDiv = document.createElement('div');
    movieDiv.className = 'movie';
    movieDiv.id = movie.imdbID;

    const Poster = document.createElement('img');
    Poster.src =
      movie.Poster !== 'N/A' ? movie.Poster : './assetes/image_not_found.png';
    Poster.className = 'movie-img';
    Poster.alt = movie.Title;

    const info = document.createElement('div');
    info.className = 'info';

    const title = document.createElement('h3');
    title.className = 'title';
    title.textContent = movie.Title;

    const year = document.createElement('p');
    year.className = 'year';
    year.textContent = movie.Year;

    info.appendChild(title);
    info.appendChild(year);

    movieDiv.appendChild(Poster);
    movieDiv.appendChild(info);

    moviesDiv.appendChild(movieDiv);

    movieDiv.addEventListener('click', () => {
      showMovieDetails(movie.imdbID);
    });
  });
}


function showMovieDetails(id) {
  fetch(`https://www.omdbapi.com/?i=${id}&apikey=8c0f2303`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.Response === "True") {
        showMovie.classList.add("active");
        document.querySelector(".col-1").innerHTML = `<img src="${data.Poster}" alt="${data.Title}">`
        document.querySelector(".movieTitle").innerHTML = `${data.Title}`
        document.querySelector(".year span").innerHTML =  `${data.Year}`
        document.querySelector(".rated span").innerHTML  = `${data.Rated}`
        document.querySelector(".released span").innerHTML = `${data.Released}`
        document.querySelector(".genre span").innerHTML = `${data.Genre}`
        document.querySelector(".writer span").innerHTML = `${data.Writer}`
        document.querySelector(".actors span").innerHTML = `${data.Actors}`
        document.querySelector(".plot span").innerHTML = `${data.Plot}`
        document.querySelector(".language span").innerHTML = `${data.Language}`
        document.querySelector(".awards span").innerHTML = `${data.Awards}`
        
      } else {
        console.error("Movie details not found");
      }
    })
    .catch(error => console.error("Error fetching movie details:", error));
}

function searchMovies() {
  fetch(`https://omdbapi.com/?s=${searchInput.value}&apikey=8c0f2303`)
    .then((response) => {
      if (!response.ok) {
        console.error('There is a bug');
        return;
      }
      return response.json();
    })
    .then((data) => {
      if (data.Response === 'True') {
        searchData = data.Search;
        createmovies(searchData);
      } else {
        moviesDiv.innerHTML = '<p>No movies found</p>';
      }
    })
    .catch((error) => {
      console.error('Fetch error:', error);
    });
}

Close.addEventListener('click', (e) => {
  showMovie.classList.remove('active');
});


