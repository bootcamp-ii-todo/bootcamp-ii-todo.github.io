'use strict';

(function(module) {
    const Todo = module.Todo;
    const User = module.User;

    const errorView = module.errorView;
    const handleError = err => errorView.init(err);
    
    const listTemplate = Handlebars.compile($('#todo-template').html());
    const detailTemplate = Handlebars.compile($('#todo-detail-template').html());

    const todoView = {};
    
    todoView.init = () => {        $('#todo-view').show();

        $('#todos').empty();
        Todo.all.forEach(todo => {
            const html = listTemplate(todo);
            $('#todos').append(html);
        });
    };

    todoView.initNew = () => {     
        $('#todo-new-view').show();

        $('#todo-completed-container').hide();

        $('#form-button').text('Add');
        $('h2.view-title').text('Add a Todo');

        $('#add-todo')
            .off('submit')
            .on('submit', event => {
                event.preventDefault();
                
                const data = {
                    task: $('input[name=task]').val(),
                    priority: $('input[name=priority]:checked').val(),
                    notes: $('textarea[name=notes]').val()
                };
        
                Todo.create(data)
                    .then(todo => {
                        $('#add-todo')[0].reset();
                        page(`/todos/${todo.id}`);
                    })
                    .catch(handleError);
            });

    };

    todoView.initUpdate = () => {
        $('#todo-new-view').show();

        const todo = Todo.detail;

        $('#todo-completed-container').show();

        $('#form-button').text('Update');
        $('h2.view-title').text('Update Todo');

        $('input[name=id]').val(todo.id);
        $('input[name=task]').val(todo.task);
        $(`input[name=priority][value=${todo.priority}]`).prop('checked', true);
        $('input[name=completed]').prop('checked', todo.completed);
        $('textarea[name=notes]').val(todo.notes);

        $('#add-todo')
            .off('submit')
            .on('submit', event => {
                event.preventDefault();
                
                const data = {
                    id: $('input[name=id]').val(),
                    task: $('input[name=task]').val(),
                    priority: $('input[name=priority]:checked').val(),
                    completed: $('input[name=completed]').prop('checked'),
                    notes: $('textarea[name=notes]').val()
                };
        
                Todo.update(data)
                    .then(todo => {
                        $('#add-todo')[0].reset();
                        page(`/todos/${todo.id}`);
                    })
                    .catch(handleError);
            });

    };

    todoView.initDetail = () => {
        const html = detailTemplate(Todo.detail);
        
        $('#todo-detail-view')
            .empty()
            .append(html)
            .show();

        
        if(User.current && User.current.isAdmin) {
            $('#todo-delete').on('click', () => {
                Todo.delete(Todo.detail.id)
                    .then(() => {
                        page('/');
                    })
                    .catch(handleError);
            });
            $('#todo-update').on('click', () => {
                page(`/todos/${Todo.detail.id}/update`);
            });
        }
        else {
            $('#todo-actions').hide();
        }
    };
    // What does your module export
    module.todoView = todoView;

})(window.module);