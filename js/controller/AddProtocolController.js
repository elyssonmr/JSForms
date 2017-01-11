angular.module("protocolApp")
.controller('addProtocolController', function($scope, $uibModalInstance) {
    $scope.typesList = ['Documento', 'Pasta', 'Outros'];
    $scope.statusList = ['Protocolado', 'Com Pendência', 'Recusado'];
    $scope.title = "Adicionar Protocolo";

    $scope.type = $scope.typesList[0];
    $scope.status = $scope.statusList[0];
    $scope.protocol = {};

    $scope.addProtocol = function() {
        console.log("Save Protocol");

        $uibModalInstance.close('done');
    };

    $scope.cancelar = function() {
        $uibModalInstance.dismiss('cancel');
    }
 });
