'use strict';

(function (module) {


    
    function Todo(data) {
        Object.keys(data).forEach(key => this[key] = data[key]);
        this.reminder = this.completed ? 'Nice Job' : 'Hurry Up';
    }

    Todo.all = [];
    
    Todo.fetchAll = () => {
        return $.getJSON(`${API_URL}/todos`)
            .then(data => {
                Todo.all = data.map(each => new Todo(each));
            });
    };

    Todo.detail = null;

    Todo.fetchOne = (id) => {
        return $.getJSON(`${API_URL}/todos/${id}`)
            .then(data => {
                Todo.detail = new Todo(data);
            });
    };

    Todo.create = data => {
        return $.post(`${API_URL}/todos`, data);
    };

    Todo.update = data => {
        return $.ajax({
            url: `${API_URL}/todos/${data.id}`,
            method: 'PUT',
            data: data
        });
    };

    Todo.delete = id => {
        return $.ajax({
            url: `${API_URL}/todos/${id}`,
            method: 'DELETE'
        });
    };
    

    module.Todo = Todo;

})(window.module);