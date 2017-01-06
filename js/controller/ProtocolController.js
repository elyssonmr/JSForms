angular.module("protocolApp")
.controller('protocolController', function($rootScope, $scope, IdxDbService) {
    $rootScope.setTitle("Protocols")
 	$scope.protocols = [];

    $scope.typesList = ['Documento', 'Pasta', 'Outros'];
    $scope.statusList = ['Protocolado', 'Com Pendência', 'Recusado'];
    $scope.type = $scope.typesList[0];
    $scope.status = $scope.statusList[0];

 	$scope.init = function() {
 		$('#datepicker').datetimepicker({
            language: 'pt-BR',
            pickTime: false
        });
        $('#eventDate').click(function() {
            $('.add-on').click();
        });

        $scope.eventDate = $('#eventDate');
        $scope.eventDate.focus(function() {
            $('.add-on').click();
        });
        $scope.modalForm = $('#modalForm');
        $scope.modalDelete = $('#modalConfimation');

        $('#loading').modal('show');
        IdxDbService.init().then(function() {
            IdxDbService.listAll().then(function(protocols) {
                $scope.protocols = protocols;
                $('#loading').modal('hide');
            });
        });
 	};

 	$scope.addProtocol = function() {
 		var protocol = {};
 		protocol.desc = $scope.desc;
 		protocol.type = $scope.type;
		protocol.key = $scope.key;

 		protocol.eventDate = $scope.eventDate.val();
 		protocol.status = $scope.status;

 		if ($scope.index > -1) {
 			$scope.protocols[$scope.index] = protocol;
 			$scope.index = -1;
			IdxDbService.update(protocol);
 			console.log("Editado");
 		} else {
			protocol = IdxDbService.create(protocol);
 			$scope.protocols.push(protocol);
 			console.log("Adicionado");
 		}
 		$scope.clearFields();
 		$scope.modalForm.modal('hide');
 	};

    $scope.clearFields = function() {
        $scope.desc = $scope.date = "";
        $scope.type = $scope.typesList[0];
        $scope.status = $scope.statusList[0];
        $scope.eventDate.val("");
    };

 	$scope.prepareEditRow = function(index) {
 		var protocol = $scope.protocols[index];
 		$scope.desc = protocol.desc;
 		$scope.type = protocol.type;
 		$scope.date = protocol.eventDate;
 		$scope.status = protocol.status;
		$scope.key = protocol.key;
 		$scope.index = index;
 		$scope.showModal('edit');
 	};

 	$scope.prepareDeleteRow = function(index) {
 		$scope.index = index;
 		$scope.modalDelete.modal('show');
 	};

 	$scope.deleteRow = function(confirmation) {
 		if(confirmation) {
            var key = $scope.protocols[$scope.index].key;
 			IdxDbService.deleteProtocol(key);
            $scope.protocols.splice($scope.index, 1);
			$scope.protocols = IdxDbService.getProtocols();
 		}
        $scope.index = -1;
 		$scope.modalDelete.modal('hide');
 	};

 	$scope.showModal = function(type) {
 		if(type == 'add') {
 			$scope.title = 'Adicionar Protocolo';
 		} else {
 			$scope.title = 'Editar Protocolo';
 		}
 		$scope.modalForm.modal('show');
 	};
 });
