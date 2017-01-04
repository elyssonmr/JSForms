/*
 * AngularJS Module
 */
var protocolApp = angular.module("protocolApp", ["ngRoute"]);

protocolApp.run(function($rootScope) {
    $rootScope.pageTitle = "";
    $rootScope.setTitle = function(title) {
        if(title) {
            $rootScope.pageTitle = "- " + title;
        } else {
            $rootScope.pageTitle = "";
        }
    };
});
