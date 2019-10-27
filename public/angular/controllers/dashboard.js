'use strict';
appModule.controller('DashboardController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', 'icdb', 'toaster',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, icdb, toaster) {
      
        $scope.db = {};
        $scope.db.signup = {};
        $scope.db.signup.model = {};
        $scope.db.signup.isSubmit = false;
        $scope.db.signup.isReqSent = false;

        $scope.db.signup.Open = function() {
            $("#signInModal").modal('hide');
            setTimeout(function() {
                $("#signUpModal").modal('show');
            }, 500);
        }

        $scope.db.signup.Submit = function(form) {
            if (!form.$valid) {
                $scope.db.signup.isSubmit = true;
                return;
            }
            $scope.db.signup.isSubmited = false;
            $scope.db.signup.isReqSent = true;
            $http.post('http://localhost:3000/api/user/register', $scope.db.signup.model).success(function(response) {
                $scope.db.signup.isReqSent = false;
                if (response.status == 1) {
                     toaster.pop('error', "error", 'User already register');
                    return;
                }
                if (response.status == 2) {
                     toaster.pop('error', "error", response.errors[0].msg);
                    return;
                }
                $location.path('index');
            });
            $("#signUpModal").modal('hide')
        };


        $scope.db.signin = {};
        $scope.db.signin.model = {};
        $scope.db.signin.isSubmit = false;
        $scope.db.signin.isReqSent = false;

        $scope.db.signin.Submit = function(form) {
            if (!form.$valid) {
                $scope.db.signin.isSubmit = true;
                return;
            }
           
            $http.post('http://localhost:3000/api/user/login', $scope.db.signin.model).success(function(response) {
                $scope.db.signin.isReqSent = false;

                if (!response.status) {
                    toaster.pop('error', "error", response.msg);
                    return;
                }
                
                $scope.db.signin.isReqSent = true;
                $scope.username = $scope.db.signin.model.email;
                
                $("#signInModal").modal('hide');
                toaster.pop('success', "success", "Login successfully");

                $timeout(function() {
                    $location.path('userAccount');
                }, 500);
            });
        };


        $scope.db.forgat = {};
        $scope.db.forgat.model = {};
        $scope.db.forgat.Open = function() {
            $("#signInModal").modal('hide');
            setTimeout(function() {
                $("#forgotpassModal").modal('show');
            }, 500);
        }

        //---------------------------------------------
        // Account Process        
        //---------------------------------------------
        $scope.db.account = {};  
        $scope.db.account.model = {};  
        $scope.db.account.isSubmit = false;
        $scope.db.account.isReqSent = false;

        $scope.db.account.Open = function() {    
            $("#accountModal").modal('show');
        }

        $scope.personalDetails = [{}];  
        $scope.db.account.addStore = function(totstore){                
            for(var i=1;i<totstore;i++)    
            {  
                $scope.personalDetails.push({    

                });
            }
        }; 

        $scope.db.account.stepObj = {
            step1: true,
            step2: false,
            step3: false,
        };
        
        $scope.db.account.backStep = function(key) {
            $scope.db.account.stepObj[key] = false;
        };

        $scope.db.account.step1 = function() {
            $scope.db.account.stepObj.step2 = true;
        };

        $scope.db.account.step2 = function() { 
            $scope.db.account.stepObj.step3 = true;
        };

        $scope.db.account.submit = function(form) { 
             if (!form.$valid) {
                $scope.db.signin.isSubmit = true;
                return;
            }
             console.log($scope.personalDetails)


             $scope.db.account.model = {};
             $scope.personalDetails = [{}];  
             $("#accountModal").modal('hide');             
             toaster.pop('success', "success", "Your account created successfully");
        };
    }
]);