angular.module("protocolApp")
.controller('protocolController', function($rootScope, $scope, IdxDbService, bsLoadingOverlayService) {
    $rootScope.setTitle("Protocols")
 	$scope.protocols = [];

    $scope.typesList = ['Documento', 'Pasta', 'Outros'];
    $scope.statusList = ['Protocolado', 'Com Pendência', 'Recusado'];
    $scope.type = $scope.typesList[0];
    $scope.status = $scope.statusList[0];

    $scope.init = function() {
        bsLoadingOverlayService.start();
        IdxDbService.init().then(function() {
            IdxDbService.listAll().then(function(protocols) {
                $scope.protocols = protocols;
                bsLoadingOverlayService.stop();
            });
        });
    };
 });
