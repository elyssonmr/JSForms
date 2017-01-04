/*
 * AngularJS Module
 */
angular.module("protocolApp", ["ngRoute"])
.config(function($routeProvider) {
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
})
.run(function($rootScope, $location) {
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
