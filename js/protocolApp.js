/*
 * AngularJS Module
 */
var protocolApp = angular.module("protocolApp", ["ngRoute"]);

protocolApp.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/partials/main.html"
        })
        .when("/protocol", {
            templateUrl: "partials/protocols.html",
            controller: "protocolController"
        })
        .when("/report", {
            templateUrl: "partials/reports.html",
            controller: "reportController"
        })
        .otherwise({redirectTo:'/'});
});


protocolApp.run(function($rootScope, $location) {
    $rootScope.pageTitle = "";
    $rootScope.setTitle = function(title) {
        if(title) {
            $rootScope.pageTitle = "- " + title;
        } else {
            $rootScope.pageTitle = "";
        }
    };

    $rootScope.$location = $location;
});
