'use strict';

appModule.controller('CommonController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state) {
        $scope.comnObj1 = {};

        $scope.comnObj1.getSection = function(sectionId) {
			$rootScope.g.activeSection = sectionId;
            $('html, body').animate({
                scrollTop: $("#" + sectionId).offset().top - 60
            },1500);
        };
	}
]);