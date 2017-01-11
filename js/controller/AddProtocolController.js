angular.module("protocolApp")
.controller('addProtocolController', function($scope, $uibModalInstance, IdxDbService, $filter) {
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
        var protocol = {
            desc: $scope.desc,
            type: $scope.type,
            eventDate: $filter("date")($scope.eventDate, "dd/MM/yyyy"),
            status: $scope.status
        };
        IdxDbService.create(protocol).then(function(resp) {
            $uibModalInstance.close({status: "Adicionado", resp: resp});
        });
    };

    $scope.cancelar = function() {
        $uibModalInstance.dismiss('cancel');
    }
 });
