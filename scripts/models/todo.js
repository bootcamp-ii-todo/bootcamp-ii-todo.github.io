'use strict';

(function (module) {
    
    function Todo(data) {
        Object.keys(data).forEach(key => this[key] = data[key]);
    }

    function errorCallback(err) {
        console.error(err);
        module.errorView.init(err);
    }
    
    Todo.all = [];
    
    Todo.fetchAll = function(callback) {
        $.getJSON(`${API_URL}/todos`)
            .then(data => {
                Todo.all = data.map(each => new Todo(each));
                callback();
            })
            .catch(errorCallback);
    };
    
    Todo.detail = null;

    Todo.fetchOne = function(id, callback) {
        $.getJSON(`${API_URL}/todos/${id}`)
            .then(data => {
                Todo.detail = new Todo(data);
                callback();
            })
            .catch(errorCallback);
    };

    Todo.create = function(data) {
        return $.post(`${API_URL}/todos`, data)
            .then(data => {
                const todo = new Todo(data);
                Todo.all.push(todo);
            })
            .catch(errorCallback);
    };

    module.Todo = Todo;

})(window.module);