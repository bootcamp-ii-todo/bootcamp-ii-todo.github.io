'use strict';

(function(module) {
    const Todo = module.Todo;

    const listTemplate = Handlebars.compile($('#todo-template').html());
    const detailTemplate = Handlebars.compile($('#todo-detail-template').html());

    function resetView() {
        $('.view').hide();
        $('.nav-menu').slideUp(350);
    }

    const todoView = {};
    
    todoView.init = () => {
        resetView();
        $('#todo-view').show();

        $('#todos').empty();
        Todo.all.forEach(todo => {
            const html = listTemplate(todo);
            $('#todos').append(html);
        });
    };

    todoView.initNew = () => {
        resetView();
        $('#todo-new-view').show();

        $('#add-todo')
            .off('submit')
            .on('submit', event => {
                event.preventDefault();
                
                const data = {
                    task: $('input[name=task]').val(),
                    priority: $('input[name=priority]:checked').val(),
                    notes: $('textarea[name=notes]').val()
                };
        
                Todo.create(data, (todo) => {
                    $('#add-todo')[0].reset();
                    page(`/todos/${todo.id}`);
                });
            });

    };

    todoView.initDetail = () => {
        resetView();

        const html = detailTemplate(Todo.detail);
        
        $('#todo-detail-view')
            .empty()
            .append(html)
            .show();
    };
    // What does your module export
    module.todoView = todoView;

})(window.module);