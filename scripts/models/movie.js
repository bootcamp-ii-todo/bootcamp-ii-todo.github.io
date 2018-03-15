'use strict';

(function (module) {

    const Movie = {};

    Movie.found = null;
    Movie.totalResults = 0;
    Movie.search = '';
    
    Movie.find = search => {
        Movie.search = search;
        return $.getJSON(`http://www.omdbapi.com/?s=${encodeURIComponent(search.trim())}&apikey=3db77742`)
            .then(result => {
                Movie.found = result.Search;
                Movie.totalResults = result.totalResults;
            });
    };

    module.Movie = Movie;

})(window.module);