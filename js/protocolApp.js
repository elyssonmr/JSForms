angular.module("protocolApp", ["ngRoute", "bsLoadingOverlay", "ui.bootstrap"])
.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "partials/main.html"
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
    $locationProvider.hashPrefix('');
})
.run(function(bsLoadingOverlayService) {
    bsLoadingOverlayService.setGlobalConfig({
        templateUrl: 'partials/loading.html'
    });
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
