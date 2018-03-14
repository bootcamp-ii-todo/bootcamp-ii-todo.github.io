'use strict';

(function (module) {

    function User(auth) {
        this.isAdmin = auth.admin;
    }

    User.current = null;

    User.auth = passphrase => {
        return $.getJSON(`${API_URL}/admin?token=${passphrase}`)
            .then(response => {
                const user = new User(response);
                User.current = user;
                
                if(user.isAdmin) {
                    $.ajaxSetup({
                        headers: { token: passphrase }
                    });
                }

                return user;
            });
    };

    module.User = User;

})(window.module);