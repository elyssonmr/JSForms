var FormCrud = {
	init : function() {
		$("#addForm").click(function() {
			FormCrud.createForm();
		});

		$('#datepicker').datetimepicker({
      		language: 'pt-BR',
      		pickTime: false,
      		startDate: new Date()
    	});

    	$('#expirationDate').click(function() {
    		$('.add-on').click();
    	});

		this.modalForm = $("#modalForm");
		this.nameField = $("#nameField");
		this.expirationField = $("#expirationField");
		this.numQuestions = $("#expirationField");
		this.modalTitle = $("#modalTitle");
		this.btnSave = $("#btnSave");
	},
	createForm: function() {
		this.modalTitle.html("Adicionar Formulário");
		this.btnSave.unbind("click");
		this.btnSave.click(function() {
			FormCrud.saveForm();
		});
		this.modalForm.modal("show");
	},
	editionForm: function() {
		this.modalTitle.html("Editar Formulário");
		this.btnSave.unbind("click");		
		this.btnSave.click(function() {
			FormCrud.editForm();
		});
		this.modalForm.modal("show");
	},
	clearFields: function() {

	},
	saveForm: function() {
		console.log("Criado!");
	},
	editForm: function() {
		console.log("Editado!");
	},

	loadList: function() {

	},
	addListItem: function(item) {

	},
	
	removeForm: function() {

	}
};

// Inicia as callbacks
FormCrud.init();