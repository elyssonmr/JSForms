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
            controller: "ProtocolController",
            reloadOnSearch: false
        })
        .when("/report", {
            templateUrl: "partials/report.html",
            controller: "ReportController"
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
