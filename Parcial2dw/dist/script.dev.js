"use strict";

//TMDB
var API_KEY = 'api_key=0cc4dd702aea5bb207422b56e5e29790';
var BASE_URL = 'https://api.themoviedb.org/3';
var API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
var IMG_URL = 'https://image.tmdb.org/t/p/w500';
var LANGUAGE = '&language=es-ES';
var searchURL = BASE_URL + '/search/movie?' + API_KEY;
var URL = 'https://api.themoviedb.org/3/discover/movie?api_key=0cc4dd702aea5bb207422b56e5e29790&language=es-ES';
var genres = [{
  "id": 28,
  "name": "Action"
}, {
  "id": 12,
  "name": "Adventure"
}, {
  "id": 16,
  "name": "Animation"
}, {
  "id": 35,
  "name": "Comedy"
}, {
  "id": 80,
  "name": "Crime"
}, {
  "id": 99,
  "name": "Documentary"
}, {
  "id": 18,
  "name": "Drama"
}, {
  "id": 10751,
  "name": "Family"
}, {
  "id": 14,
  "name": "Fantasy"
}, {
  "id": 36,
  "name": "History"
}, {
  "id": 27,
  "name": "Horror"
}, {
  "id": 10402,
  "name": "Music"
}, {
  "id": 9648,
  "name": "Mystery"
}, {
  "id": 10749,
  "name": "Romance"
}, {
  "id": 878,
  "name": "Science Fiction"
}, {
  "id": 10770,
  "name": "TV Movie"
}, {
  "id": 53,
  "name": "Thriller"
}, {
  "id": 10752,
  "name": "War"
}, {
  "id": 37,
  "name": "Western"
}];
var main = document.getElementById('main');
var form = document.getElementById('form');
var search = document.getElementById('search');
var tagsEl = document.getElementById('tags');
var select = document.getElementById('select');
var selectedGenre = [];
setGenre();

function setGenre() {
  tagsEl.innerHTML = '';
  genres.forEach(function (genre) {
    var t = document.createElement('div');
    t.classList.add('tag');
    t.id = genre.id;
    t.innerText = genre.name;
    t.addEventListener('click', function () {
      if (selectedGenre.length == 0) {
        selectedGenre.push(genre.id);
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach(function (id, idx) {
            if (id == genre.id) {
              selectedGenre.splice(idx, 1);
            }
          });
        } else {
          selectedGenre.push(genre.id);
        }
      }

      console.log(selectedGenre);
      getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')));
      highlghtSelection();
    });
    tagsEl.append(t);
  });
}

seleccion();

function seleccion() {
  genres.forEach(function (genero) {
    var option = document.createElement('option');
    option.text = genero.name;
    option.value = genero.id;
    select.add(option);
  });
}

getMovies(URL);

function getMovies(url) {
  fetch(url).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data.results);
    showMovies(data.results);
  });
}

function showMovies(data) {
  main.innerHTML = '';
  data.forEach(function (movie) {
    var title = movie.title,
        poster_path = movie.poster_path,
        release_date = movie.release_date,
        vote_average = movie.vote_average,
        overview = movie.overview;
    var movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = "<img src=\"".concat(IMG_URL + poster_path, "\" alt=\"").concat(title, "\">\n        <div class=\"movie-info\">\n            <h3>").concat(title, "</h3> \n            <h5>").concat(release_date, "</h5>       \n            \n            <span class=\"").concat(getcolor(vote_average), "\">").concat(vote_average, "</span>\n          \n        </div>\n\n        <div class=\"overview\">\n            <h3>Descripci\xF3n</h3>\n            ").concat(overview, "\n        </div>");
    main.appendChild(movieEl);
    console.log(searchURL);
  });
}

function highlghtSelection() {
  var tags = document.qquerySelectorAll('.tag');
  tags.forEach(function (tag) {
    tag.classList.remove('highlight');
  });

  if (selectedGenre.length !== 0) {
    selectedGenre.forEach(function (id) {
      var highlghtedtag = document.getElementById(id);
      highlghtedtag.classList.add('highlight');
    });
  }
}

function getcolor(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var searchTerm = search.value;

  if (searchTerm) {
    getMovies(searchURL + '&query=' + searchTerm);
  } else {
    getMovies(URL);
  }
});
//# sourceMappingURL=script.dev.js.map
