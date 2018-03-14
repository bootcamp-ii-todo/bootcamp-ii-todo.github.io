'use strict';

(function(module) {

    const aboutView = {};

    aboutView.init = () => {
        $('#about-view').show();
    };

    module.aboutView = aboutView;

})(window.module);