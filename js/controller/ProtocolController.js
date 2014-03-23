/*
 * Protocol Controller
 */
protocolApp.controller('protocolController', function($scope, IdxDbService) {
 	//It should be coming from a service or DAO
 	$scope.protocols = [
 		//{desc: 'Descriçao', type: 'Documento', eventDate: '18/03/2014', status: 'Entregue'},
 		//{desc: 'Descriçao2', type: 'Documento', eventDate: '18/03/2014', status: 'Entregue'},
 		//{desc: 'Descriçao3', type: 'Documento', eventDate: '18/03/2014', status: 'Entregue'},
 		//{desc: 'Descriçao4', type: 'Documento', eventDate: '18/03/2014', status: 'Devolvido'}
 	];

    $scope.typesList = ['Documento', 'Pasta', 'Outros'];
    $scope.statusList = ['Protocolado', 'Com Pendência', 'Recusado'];
    $scope.type = $scope.typesList[0];
    $scope.status = $scope.statusList[0];

 	$scope.init = function() {
        $('.selectpicker').selectpicker();

 		$('#datepicker').datetimepicker({
            language: 'pt-BR',
            pickTime: false
        });
 		console.log('INIT');
        $('#eventDate').click(function() {
            $('.add-on').click();
        });

        $('#eventDate').focus(function() {
            $('.add-on').click();
        });
        $scope.modalForm = $('#modalForm');
        $scope.modalDelete = $('#modalConfimation');

        IdxDbService.init();
		
        $('#loading').modal('show');
        //loading Popup
		console.log("Lendo os protocolos");        
        setTimeout(function () {
            $scope.$apply(function () {
                $scope.protocols = IdxDbService.getProtocols();
                $('#loading').modal('hide');
            });
        }, 2000);
 	};

 	$scope.addProtocol = function() {
 		var protocol = {};
 		protocol.desc = $scope.desc;
 		protocol.type = $scope.type;
		protocol.key = $scope.key;
 		//Verify why we need this workaround with Edy
 		protocol.eventDate = $(eventDate).val();
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
 		$scope.desc = $scope.date = "";
        $scope.type = $scope.typesList[0];
        $scope.status = $scope.statusList[0];
 		$scope.modalForm.modal('hide');
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
 			IdxDbService.delete(key);
            $scope.protocols.splice($scope.index, 1);
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
