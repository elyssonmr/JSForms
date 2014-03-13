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

        $('#addQuestion').click(function() {
            FormCrud.addQuestion();
        });

        this.modalForm = $("#modalForm");
        this.nameField = $("#nameField");
        this.expirationField = $("#expirationField");
        this.numQuestions = $("#expirationField");
        this.modalTitle = $("#modalTitle");
        this.btnSave = $("#btnSave");
        this.questions = $('.list-group');
        this.lastId = 0;
    },
    createForm: function() {
        this.modalTitle.html("Adicionar Formulário");
        this.btnSave.unbind("click");
        this.clearFields();
        this.btnSave.click(function() {
            FormCrud.saveForm();
        });
        this.modalForm.modal("show");
    },
    editionForm: function() {
        this.modalTitle.html("Editar Formulário");
        this.btnSave.unbind("click");
        this.clearFields();     
        this.btnSave.click(function() {
            FormCrud.editForm();
        });
        this.modalForm.modal("show");
    },
    clearFields: function() {
        this.questions.html("");
        this.lastId = 0;
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

    },
    addQuestion: function() {
        var question = new String(questionHTML);
        question = question.replace(/ID/g, ++this.lastId);
        console.log(question);
        this.questions.append(question);
    }
};


var questionHTML = '<div class="form-group list-group-item"> <label for="questionID">Pergunta ID:</label> <input class="form-control" id="questionID" name="questionID" placeholder="Pergunta"> <div class="form-inline"> <input class="form-control" id="questionID_1" name="questionID_1" placeholder="Resposta 1"> <input class="form-control" id="questionID_1" name="questionID_2" placeholder="Resposta 2"> <input class="form-control" id="questionID_1" name="questionID_3" placeholder="Resposta 3"> <input class="form-control" id="questionID_1" name="questionID_4" placeholder="Resposta 4"> </div> </div>';
// Inicia as callbacks
FormCrud.init();