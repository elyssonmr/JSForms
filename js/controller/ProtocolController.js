angular.module("protocolApp")
.controller('protocolController', function($rootScope, $scope, IdxDbService, bsLoadingOverlayService, $uibModal) {
    $rootScope.setTitle("Protocols")
 	$scope.protocols = [];

    $scope.typesList = ['Documento', 'Pasta', 'Outros'];
    $scope.statusList = ['Protocolado', 'Com Pendência', 'Recusado'];
    $scope.type = $scope.typesList[0];
    $scope.status = $scope.statusList[0];

    $scope.init = function() {
        $scope.loadProtocols();
    };

    $scope.loadProtocols = function() {
        bsLoadingOverlayService.start();
        IdxDbService.init().then(function() {
            IdxDbService.listAll().then(function(protocols) {
                $scope.protocols = protocols;
                bsLoadingOverlayService.stop();
            });
        });
    };

    $scope.prepararAdd = function() {
        $scope.addModal = $uibModal.open({
            animation: false,
            templateUrl: 'partials/modal/addProtocolModal.html',
            controller: "addProtocolController",
            controllerAs: "ctrl",
        });
        $scope.addModal.result.then(function(reason) {
            if(reason.status == "Adicionado") {
                $scope.protocols.push(reason.resp);
            }
        }).catch(function(reason) {});
    };
 });
