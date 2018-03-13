'use strict';

(function (module) {
    const errorView = {};

    function resetView() {
        $('.view').hide();
        $('.nav-menu').slideUp(350);
    }

    const template = Handlebars.compile($('#error-template').text());

    errorView.init = function(err) {
        resetView();
        $('.error-view').show();
        $('#error-message').empty();
        $('#error-message').append(template(err));
    };

    module.errorView = errorView;

})(window.module);
