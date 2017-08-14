'use strict';

/* App Module */
var myApp = angular.module('myApp', ['ngRoute', 'parijanControllers','parijanFilters', 'parijanServices']);
  
myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/register', {
            templateUrl: 'partials/register-user-form.html',
            controller: 'RegisterUserCtrl'
        }).
        when('/validateotp', {
            templateUrl: 'partials/validate-otp.html',
            controller: 'ValidateOTPCtrl'
        }).
        when('/login', {
            templateUrl: 'partials/user-login.html',
            controller: 'LoginCtrl'
        }).
        when('/searchvendor', {
             templateUrl: 'partials/search-vendor.html',
             controller: 'SearchVendorCtrl'
        }).
        when('/inbox', {
             templateUrl: 'partials/inbox.html',
             controller: 'InboxCtrl'
        }).
        when('/inbox/:transaction', {
             templateUrl: 'partials/transaction-detail.html',
             controller: 'TxnDetailCtrl'
        }).
        when('/vendors', {
            templateUrl: 'partials/vendor-list.html',
            controller: 'VendorListCtrl'
        }).
        when('/vendors/:vendor', {
            templateUrl: 'partials/vendor-detail.html',
            controller: 'VendorDetailCtrl'
        }).
        when('/cancelordispute/:transaction', {
            templateUrl: 'partials/cancel-dispute.html',
            controller: 'CancelOrDisputeCtrl'
        }).
        when('/bookservice', {
            templateUrl: 'partials/book-service.html',
            controller: 'BookServiceCtrl'
        }).
        otherwise({
            redirectTo: '/searchvendor'
        });
    }]);