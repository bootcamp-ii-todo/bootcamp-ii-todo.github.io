'use strict';

(function (module) {
    const errorView = {};

    function resetView() {
        $('.view').hide();
    }

    const template = Handlebars.compile($('#error-template').text());

    errorView.init = function(err) {
        resetView();

        const html = template(err);
        
        $('#error-view')
            .empty()
            .append(html)
            .show();

    };

    module.errorView = errorView;

})(window.module);
