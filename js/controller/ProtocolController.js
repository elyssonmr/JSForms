/*
 * Protocol Controller
 */
protocolApp.controller('protocolController', function($scope) {
 	//It should be coming from a service or DAO
 	$scope.protocols = [
 		//{desc: 'Descriçao', type: 'Documento', eventDate: '18/03/2014', status: 'Entregue'},
 		//{desc: 'Descriçao2', type: 'Documento', eventDate: '18/03/2014', status: 'Entregue'},
 		//{desc: 'Descriçao3', type: 'Documento', eventDate: '18/03/2014', status: 'Entregue'},
 		//{desc: 'Descriçao4', type: 'Documento', eventDate: '18/03/2014', status: 'Entregue'}
 	];

 	$scope.init = function() {
 		$('#datepicker').datetimepicker({
            language: 'pt-BR',
            pickTime: false,
            startDate: new Date()
        });
 		console.log('INIT');
        $('#eventDate').click(function() {
            $('.add-on').click();
        });

        $('#eventDate').click(function() {
            $('.add-on').click();
        });
        $scope.modalForm = $('#modalForm');
        $scope.modalDelete = $('#modalConfimation');
 	};

 	$scope.addProtocol = function() {
 		var protocol = {};
 		protocol.id = 0;
 		protocol.desc = $scope.desc;
 		protocol.type = $scope.type;
 		//Verify why we need this workaround with Edy
 		protocol.eventDate = $(eventDate).val();
 		protocol.status = $scope.status;

 		if ($scope.index > -1) {
 			$scope.protocols[$scope.index] = protocol;
 			$scope.index = -1;
 			console.log("Editado");
 		} else {
 			$scope.protocols.push(protocol);
 			console.log("Adicionado");
 		}
 		$scope.desc = $scope.type = $scope.date = $scope.status = "";
 		$scope.modalForm.modal('hide');
 	};

 	$scope.prepareEditRow = function(index) {
 		var protocol = $scope.protocols[index];
 		$scope.desc = protocol.desc;
 		$scope.type = protocol.type;
 		$scope.date = protocol.eventDate;
 		$scope.status = protocol.status;
 		$scope.index = index;
 		$scope.showModal('edit');
 	};

 	$scope.prepareDeleteRow = function(index) {
 		$scope.index = index;
 		$scope.modalDelete.modal('show');
 	};

 	$scope.deleteRow = function(confirmation) {
 		if(confirmation) {
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
