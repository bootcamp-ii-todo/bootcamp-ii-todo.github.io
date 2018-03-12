'use strict';

// const API_URL = 'http://localhost:3000/api';
const API_URL = 'https://super-todos.herokuapp.com/api';

(function (module) {

    const template = Handlebars.compile($('#todo-template').html());
    
    function Todo(data) {
        Object.keys(data).forEach(key => this[key] = data[key]);
    }
    
    Todo.prototype.toHtml = function() {
        return template(this);
    };

    // Define "instance" data methods
    Todo.prototype.insert = function(callback) {
        $.post(`${API_URL}/todos`, {
            task: this.task
        })
            .then(data => {
                Object.keys(data).forEach(key => this[key] = data[key]);
                Todo.all.push(this);
                if(callback) callback();
            });
    };
    
    Todo.all = [];
    
    Todo.fetchAll = function(callback) {
        $.getJSON(`${API_URL}/todos`)
            .then(data => {
                Todo.all = data.map(each => new Todo(each));
                if(callback) callback();
            })
            .catch(console.log);
    };

    module.Todo = Todo;

})(window.app || (window.app = {}));