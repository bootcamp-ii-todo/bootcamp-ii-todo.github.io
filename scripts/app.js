'use strict';

(function(module) {

    $('.icon-menu').on('click', () => {
        $('.nav-menu').slideToggle(350);
    });

    const Todo = module.Todo;
    const aboutView = module.aboutView;
    const todoView = module.todoView;

    if(PAGE_BASE) page.base(PAGE_BASE);

    page('/', () => Todo.fetchAll(todoView.init));
    page('/todos/new', () => todoView.initNew());
    page('/todos/:id', ctx => Todo.fetchOne(ctx.params.id, todoView.initDetail));
    page('/about', () => aboutView.init());
    page('*', () => page.redirect('/'));


    page();

})(window.module);