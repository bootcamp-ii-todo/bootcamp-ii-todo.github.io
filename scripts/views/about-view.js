'use strict';

(function(module) {
    
    const aboutView = {};

    function resetView() {
        $('.view').hide();
        $('.nav-menu').slideUp(350);
    }

    aboutView.init = () => {
        resetView();
        $('#about-view').show();
    };
  
    module.aboutView = aboutView;

})(window.module);