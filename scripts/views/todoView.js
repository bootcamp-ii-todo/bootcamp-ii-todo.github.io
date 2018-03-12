'use strict';

(function(module) {
    // What do you need (import or require) from prior modules?
    const Todo = module.Todo;

    const todoView = {};
    
    todoView.initIndexPage = () => {
        todoView.loadTodos();
        todoView.handleSubmit();
    };
    
    todoView.loadTodos = () => {
        Todo.all.forEach(todo => {
            todoView.loadTodo(todo);
        });
    };

    todoView.loadTodo = todo => {
        $('#todos').append(todo.toHtml());
    };

    todoView.handleSubmit = () => {
        $('#add-todo').on('submit', event => {
            event.preventDefault();
            
            const todo = new Todo({
                task: $('#todo-task').val()
            });

            todo.insert(() => {
                $('#todo-task').val('');
                todoView.loadTodo(todo);
            });
        });
    };

    // What does your module export
    module.todoView = todoView;

})(window.app || (window.app = {}));