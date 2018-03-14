'use strict';

(function (module) {

    function errorCallback(err) {
        console.log(err);
        module.errorView.init(err);
    }
    
    function Todo(data) {
        Object.keys(data).forEach(key => this[key] = data[key]);
        this.reminder = this.completed ? 'Nice Job' : 'Hurry Up';
    }

    Todo.all = [];
    
    Todo.fetchAll = () => {
        return $.getJSON(`${API_URL}/todos`)
            .then(data => {
                Todo.all = data.map(each => new Todo(each));
            })
            .catch(errorCallback);
    };

    Todo.detail = null;

    Todo.fetchOne = (id) => {
        return $.getJSON(`${API_URL}/todos/${id}`)
            .then(data => {
                Todo.detail = new Todo(data);
            })
            .catch(errorCallback);
    };

    Todo.create = function(data, callback) {
        $.post(`${API_URL}/todos`, data)
            .then((data) => {
                if(callback) callback(data);
            })
            .catch(errorCallback);
    };
    

    module.Todo = Todo;

})(window.module);