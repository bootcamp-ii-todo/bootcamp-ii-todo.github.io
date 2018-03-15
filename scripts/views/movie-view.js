'use strict';

(function (module) {
    const Movie = module.Movie;
    const Todo = module.Todo;
    const movieView = {};

    const template = Handlebars.compile($('#movie-template').text());

    movieView.init = function() {
        $('#movie-view').show();

        $('#movies')
            .empty()
            .off('click')
            .append(Movie.found.map(template))
            .on('click', 'button', handleAdd);

        $('#movie-search input[name=search]').val(Movie.search);

        $('#movie-search')
            .off('submit')
            .on('submit', handleSubmit);

    };

    const handleAdd = function() {
        const id = $(this).data('id');
        Todo.addMovie(id)
            .then(todo => page(`/todos/${todo.id}`));
    };

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const search = form.elements.search.value;
        page(`/movies?search=${encodeURIComponent(search)}`);
    };

    module.movieView = movieView;

})(window.module);
