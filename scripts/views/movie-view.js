'use strict';

(function (module) {
    const Movie = module.Movie;
    const movieView = {};

    const template = Handlebars.compile($('#movie-template').text());

    movieView.init = function() {
        $('#movie-view').show();

        $('#movies')
            .empty()
            .append(Movie.found.map(template));

        $('#movie-search input[name=search]').val(Movie.search);

        $('#movie-search')
            .off('submit')
            .on('submit', handleSubmit);

    };

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const search = form.elements.search.value;
        page(`/movies?search=${encodeURIComponent(search)}`);
    };

    module.movieView = movieView;

})(window.module);
