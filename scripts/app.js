'use strict';

(function(module) {
    $('.icon-menu').on('click', () => {
        $('.nav-menu').slideToggle(350);
    });
    
    const Todo = module.Todo;
    const todoView = module.todoView;
    const aboutView = module.aboutView;

    page('/', () => Todo.fetchAll(todoView.init));
    page('/todos/new', () => todoView.initNew());
    page('/todos/:id', (ctx) => Todo.fetchOne(ctx.params.id, todoView.initDetail));
    page('/about', () => aboutView.init());

    page(ROUTER_OPTIONS);

})(window.module);