'use strict';

(function(module) {

    $('.icon-menu').on('click', () => {
        $('.icon-menu').toggleClass('open');
        $('.nav-menu').slideToggle(350);
    });

    const resetView = () => {
        $('.view').hide();
        $('.icon-menu').removeClass('open');
        $('.nav-menu').slideUp(350);
    };
    
    const Todo = module.Todo;
    const Movie = module.Movie;
    const User = module.User;
    const aboutView = module.aboutView;
    const todoView = module.todoView;
    const movieView = module.movieView;
    const loginView = module.loginView;

    page('*', (ctx, next) => {
        resetView();
        next();
    });

    page('/', () => Todo.fetchAll().then(todoView.init));

    page('/auth/signup', loginView.initSignup);

    page('/auth/signin', loginView.initSignin);

    page('/todos/new', todoView.initNew);
    
    page('/todos/:id/update', ctx => Todo.fetchOne(ctx.params.id).then(todoView.initUpdate));
    
    page('/todos/:id', ctx => Todo.fetchOne(ctx.params.id).then(todoView.initDetail));
    
    page('/about', aboutView.init);

    page('/movies', ctx => {
        const search = Qs.parse(ctx.querystring).search;
        Movie.find(search).then(movieView.init);
    });
    
    page('*', () => page.redirect('/'));

    page();

    User.tryToken();

})(window.module);