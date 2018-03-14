'use strict';

(function(module) {

    $('.icon-menu').on('click', () => {
        $('.icon-menu').toggleClass('open');
        $('.nav-menu').slideToggle(350);
    });

    const Todo = module.Todo;
    const aboutView = module.aboutView;
    const todoView = module.todoView;

    page('/', () => Todo.fetchAll().then(todoView.init));

    page('/todos/:id', ctx => Todo.fetchOne(ctx.params.id).then(todoView.initDetail));
    
    page('/todos/new', todoView.initNew);
    
    page('/about', aboutView.init);
    
    page('*', () => page.redirect('/'));

    page();

})(window.module);