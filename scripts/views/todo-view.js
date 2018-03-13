'use strict';

(function(module) {
    const Todo = module.Todo;

    const listTemplate = Handlebars.compile($('#todo-template').html());
    const detailTemplate = Handlebars.compile($('#todo-detail-template').html());

    const todoView = {};

    function resetView() {
        $('.view').hide();
        $('.nav-menu').slideUp(350);
    }

    todoView.init = () => {
        resetView();
        $('#todo-view').show();
        
        $('#todos').empty();

        Todo.all
            .map(todo => listTemplate(todo))
            .forEach(html => $('#todos').append(html));
    };
  
    todoView.initNew = () => {
        resetView();
        $(`#todo-new-view`).show();

        $('#add-todo').on('submit', event => {
            event.preventDefault();
            
            const data = {
                task: $('input[name=task]').val(),
                priority: $('input[name=priority]:checked').val(),
                notes: $('textarea[name=notes]').val()
            };

            Todo.create(data).then(() => page('/'));
        });
    };
  
    todoView.initDetail = () => {
        resetView();
        
        const html = detailTemplate(Todo.detail);
        
        $(`#todo-detail-view`)
            .empty()
            .append(html)
            .show();
        
    };

    module.todoView = todoView;

})(window.module);