var FormCrud = {
    init : function() {
        $("#addForm").click(function() {
            FormCrud.createForm();
        });

        $('.form-control').focus(function() {
            $(this).parent().removeClass('has-error');
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
        var validated = this.validateForm();
        if (typeof(validated) == Object) {

            console.log("Criado!");
            this.modalForm.modal('hide');
        }
    },
    editForm: function() {
        console.log("Editado!");
    },
    validateForm: function() {
        var formNameField = $('#name');
        var dateField = $('#expirationDate');
        var errorMsg = "";
        dateField.val().match(/^(\d{2})\/(\d{2})\/(\d{4})$/)

        if(!formNameField.val().trim()) {
            errorMsg += this.errorIcon + "Nome não pode ser vazio!<br>"
            formNameField.parent().addClass('has-error');
        }

        if(!dateField.val().trim()) {
            errorMsg += this.errorIcon + "Escolha uma data de Expiração!<br>"
            dateField.parent().addClass('has-error');
        }

        if(errorMsg) {
            var form = $('.modal-body form');
            form.children('.alert').remove();
            form.prepend(this.errorAlert.replace('MSG', errorMsg));
            return errorMsg;
        }

        //validate questions
        var errorQuestions = '';
        var questions = [];
        $.each($('.list-group').children(), function(itemNo, item) {            
            item = $(item);
            var questionField = item.children('input');.val().trim();
            if(!questionField.val().trim()) {
                questionField.parent().addClass('has-error');
                if(!errorQuestions) {
                    errorQuestions += this.errorIcon + "Verifique as perguntas!<br>";
                }
            }
            var count = 0;
            $.each(item.children('.form-inline'), function() {

            });
        });



    },
    errorIcon: '<span class="glyphicon glyphicon-arrow-right"></span> ',
    errorAlert: '<div class="alert alert-danger alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> <p><strong>Formulário com erros!</strong></p> <p>MSG</p> </div>',
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


var questionHTML = '<div class="form-group list-group-item"> <label class="control-label" for="questionID">Pergunta:</label> <input class="form-control" id="questionID" name="questionID" placeholder="Pergunta"> <div class="form-inline"> <input class="form-control" id="questionID_1" name="questionID_1" placeholder="Resposta 1"> <input class="form-control" id="questionID_1" name="questionID_2" placeholder="Resposta 2"> <input class="form-control" id="questionID_1" name="questionID_3" placeholder="Resposta 3"> <input class="form-control" id="questionID_1" name="questionID_4" placeholder="Resposta 4"> </div> </div>';
// Inicia as callbacks
FormCrud.init();


