angular.module("protocolApp")
.directive('highchartsChart', function() {
    return {
        restrict: 'E',
        template: '',
        scope: {
            options: '='
        },
        link: function (scope, element) {
            scope.$watch('options', function(newVal) {
                if(newVal) {
                    $(element[0]).highcharts(scope.options);
                }
            }, true);
        }
    };
});
