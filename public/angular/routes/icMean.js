'use strict';

var appModule = angular.module('smModule', ['ngRoute', 'ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router', 'toaster', 'ngAnimate']);

appModule.run(function($rootScope, $timeout, $location, $http) {
    $rootScope.g = {};

    $rootScope.g.logout = function() {
        $http.post('/api/user/logout').success(function(userResponse) {
            $rootScope.g.loggedUser = '';
            $location.path('/');
        });
    };

    $rootScope.$on( "$stateChangeSuccess", function(event, next, current) {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $rootScope.g.location = $location.path();
    });
});


appModule.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});

var checkLogIn = function($q, $timeout, $http, $location, $rootScope, status) {
    var deferred = $q.defer();

    // Make an AJAX call to check if the user is logged in
    $http.get('/api/user/me').success(function(userResponse) {

        // If user is not logged in
        if(!userResponse || !userResponse._id) {
            $location.path('/login');
            $timeout(deferred.reject);
            return;
        }

        $rootScope.g.loggedUser = userResponse;
        console.log($rootScope.g.loggedUser);

        $timeout(deferred.reject);
    }).error(function() {
        $timeout(deferred.reject);
    });

    $timeout(deferred.reject);

    return deferred.promise;
}

// Check if the user is logged in
var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope) {
    checkLogIn($q, $timeout, $http, $location, $rootScope, true);
};



appModule.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode({
            enabled: false,
            requireBase: true
        }).hashPrefix('!');

        $stateProvider.state('login', {
            url: '/login',
            templateUrl: '/angular/views/users/login.html',
        });

        $stateProvider.state('home', {
            url: '/home',
            templateUrl: '/angular/views/index.html',
        });

        $stateProvider.state('userAccount', {
            url: '/userAccount',
            templateUrl: '/angular/views/useraccount.html',
            resolve: {
                loggedin: checkLoggedIn
            }
        });

        $urlRouterProvider.otherwise('/home');
    }
]);