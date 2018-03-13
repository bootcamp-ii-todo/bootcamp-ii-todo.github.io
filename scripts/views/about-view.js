'use strict';

(function(module) {

    const aboutView = {};

    aboutView.init = () => {
        $('.view').hide();
        $('#about-view').show();
    };

    module.aboutView = aboutView;

})(window.module);