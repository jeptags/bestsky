'use strict';

angular.module('smModule').config(function() {});


angular.element(document).ready(function() {
    if (window.location.hash === '#_=_') window.location.hash = '#!';
    angular.bootstrap(document, ['smModule']);

    setTimeout(function() {
        $("#front-spinner-bx").hide();
        $(".body-main-cn").show();
    }, 500);
});
