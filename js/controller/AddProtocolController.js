angular.module("protocolApp")
.controller('addProtocolController', function($scope, $uibModalInstance) {
    $scope.typesList = ['Documento', 'Pasta', 'Outros'];
    $scope.statusList = ['Protocolado', 'Com Pendência', 'Recusado'];
    $scope.title = "Adicionar Protocolo";

    $scope.type = $scope.typesList[0];
    $scope.status = $scope.statusList[0];
    $scope.protocol = {};

    $scope.eventDate = new Date();
    $scope.dtPicker = {
        options: {
            showWeeks: false,
            minDate: new Date()
        },
        opened: false
    };

    $scope.exibirCalendario = function() {
        console.log("Calendario");
        $scope.dtPicker.opened = true;
    }

    $scope.addProtocol = function() {
        console.log("Save Protocol");

        $uibModalInstance.close('done');
    };

    $scope.cancelar = function() {
        $uibModalInstance.dismiss('cancel');
    }
 });
