angular.module("protocolApp")
.controller('updateProtocolController', function($scope, $uibModalInstance, IdxDbService, $filter, uibDateParser, protocolo) {
    $scope.typesList = ['Documento', 'Pasta', 'Outros'];
    $scope.statusList = ['Protocolado', 'Com Pendência', 'Recusado'];
    $scope.title = "Editar Protocolo";
    function getDate(dateString) {
        return uibDateParser.parse(dateString, "dd/MM/yyyy")
    };
    $scope.desc = protocolo.desc;
    $scope.type = protocolo.type;
    $scope.eventDate = getDate(protocolo.eventDate);
    $scope.status = protocolo.status;
    $scope.protocol = protocolo;

    var minDate = new Date().getTime() < getDate(protocolo.eventDate).getTime() ? new Date() : getDate(protocolo.eventDate);
    $scope.dtPicker = {
        options: {
            showWeeks: false,
            minDate: minDate
        },
        opened: false
    };

    $scope.exibirCalendario = function() {
        $scope.dtPicker.opened = true;
    }

    $scope.addProtocol = function() {
        $scope.protocol.desc = $scope.desc;
        $scope.protocol.type = $scope.type;
        $scope.protocol.eventDate = $filter("date")($scope.eventDate, "dd/MM/yyyy");
        $scope.protocol.status = $scope.status;

        IdxDbService.update($scope.protocol).then(function(resp) {
            $uibModalInstance.close({status: "Atualizado", resp: resp});
        });
    };

    $scope.cancelar = function() {
        $uibModalInstance.dismiss('cancel');
    }
 });
