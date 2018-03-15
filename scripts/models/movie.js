'use strict';

(function (module) {

    const Movie = {};

    Movie.found = null;
    Movie.total = 0;
    Movie.search = '';
    
    Movie.find = search => {
        Movie.search = search;
        return $.getJSON(`${API_URL}/movies?search=${encodeURIComponent(search)}`)
            .then(result => {
                Movie.found = result.movies;
                Movie.total = result.total;
            });
    };

    module.Movie = Movie;

})(window.module);