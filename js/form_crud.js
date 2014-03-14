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

        $('#expirationField').click(function() {
            $('.add-on').click();
        });

        $('#addQuestion').click(function() {
            FormCrud.addQuestion();
        });

        $('.table .btn-danger').click(function() {
            $('#modalConfimation').modal("show");
        });

        $('#btnDelete').click(function() {
            var row = $(FormCrud.deleteRow);
            console.log(row);
            //remove form
            //remove row
            $('#modalConfimation').modal("hide");
        })

        this.modalForm = $("#modalForm");
        this.nameField = $("#nameField");
        this.expirationField = $("#expirationField");
        this.modalTitle = $("#modalTitle");
        this.btnSave = $("#btnSave");
        this.questions = $('.list-group');
        this.lastId = 0;
        this.deleteRow = null;
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
        this.expirationField.val("");
        this.nameField.val("");
        this.lastId = 0;
        $('.alert').remove();
    },
    saveForm: function() {
        var validated = this.validateForm();
        if (typeof(validated) == 'object') {
            //save the form
            console.log(validated);
            //add new table row
            this.addListItem(validated);
            console.log("Criado!");
            this.modalForm.modal('hide');
        }
    },
    editForm: function() {
        console.log("Editado!");
    },
    validateForm: function() {
        var form = {name:'', expirationDate:null, questions:[], answers:0};
        var formNameField = $('#nameField');
        var dateField = $('#expirationField');
        var errorMsg = "";
        var dateFields = dateField.val().match(/^(\d{2})\/(\d{2})\/(\d{4})$/)

        if(!formNameField.val().trim()) {
            errorMsg += this.errorIcon + "Nome não pode ser vazio!<br>"
            formNameField.parent().addClass('has-error');
        }

        if(!dateField.val().trim()) {
            errorMsg += this.errorIcon + "Escolha uma data de Expiração!<br>"
            dateField.parent().addClass('has-error');
        }
        form.name = formNameField.val().trim();
        if(dateFields) {
            console.log(dateFields);
            form.expirationDate = new Date(dateFields[3], parseInt(dateFields[2], 10) -1, dateFields[1]);
        }

        //validate questions
        var errorQuestions = '';
        
        $.each($('.list-group').children(), function() {
            var question = {name:'', aws:[]};
            var item = $(this);
            var questionField = item.children('input');
            if(!questionField.val().trim()) {
                questionField.parent().addClass('has-error');
                if(!errorQuestions) {
                    errorQuestions = FormCrud.errorIcon + "Verifique as perguntas!<br>";
                }
            } else {
                question.name = questionField.val();
            }
            var count = 0;
            $.each(item.children('.form-inline').children(), function() {
                var answerField = $(this);
                if(answerField.val().trim()) {
                    count++;
                    question.aws.push(answerField.val().trim());
                }                       
            });

            if(count >= 2) {
                if(question.name && question.aws.length >= 2) {
                    form.questions.push(question);
                }
            } else {
                $('.form-inline').addClass('has-error');
                if(!errorQuestions) {
                    errorQuestions = FormCrud.errorIcon + "Verifique as perguntas!<br>";
                }
            }                
        });
        if(form.questions.length == 0 && !errorQuestions) {
            errorMsg += this.errorIcon + "Adicione ao menos uma pergunta!<br>";
        }

        if(errorQuestions) {
            errorMsg += errorQuestions;
        }

        if(errorMsg ) {
            var form = $('.modal-body form');
            form.children('.alert').remove();
            form.prepend(this.errorAlert.replace('MSG', errorMsg));
            return errorMsg;            
        } else {
            $('.alert-dismissable').remove();
        }

        return form;
    },
    errorIcon: '<span class="glyphicon glyphicon-arrow-right"></span> ',
    errorAlert: '<div class="alert alert-danger alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> <p><strong>Formulário com erros!</strong></p> <p>MSG</p> </div>',
    loadList: function() {

    },
    addListItem: function(item) {
        var table = $('.table')
        var row = "<tr>";
        row += "<td>" + item.name + "</td>";
        var date = item.expirationDate.getDay() + "/" + (item.expirationDate.getMonth() + 1) + "/" + item.expirationDate.getFullYear();
        row += "<td>" + date + "</td>";
        row += "<td>" + item.questions.length + "</td>";
        row += "<td>" + item.answers + "</td>";
        row += '<td><a class="btn btn-warning" href="#" data-id="' + item.id + '"><i class="glyphicon glyphicon-edit"></i></a></td>';
        row += '<td><a class="btn btn-danger" href="#" data-id="' + item.id + '" data-toggle="modal" data-target="#modalConfimation"><i class="glyphicon glyphicon-remove"></i></a></td>';

        row += "</tr>"
        table.children('tbody').append(row);
        this.reloadActions();
    },    
    removeForm: function() {

    },
    addQuestion: function() {
        var question = new String(questionHTML);
        question = question.replace(/ID/g, ++this.lastId);
        console.log(question);
        this.questions.append(question);
        $('.list-group-item input').focus(function() {
            $(this).parent().removeClass('has-error');
        });
        $('.list-group-item .close').click(function() {
            $(this).parent().remove();
        });
    },
    reloadActions: function() {
        $('.table .btn-danger').unbind();
        $('.table .btn-danger').click(function() {
            $('#modalConfimation').modal("show");
        });
    }
};


var questionHTML = '<div class="form-group list-group-item"> <button type="button" class="close" aria-hidden="true">&times;</button><label class="control-label" for="questionID">Pergunta:</label> <input class="form-control" id="questionID" name="questionID" placeholder="Pergunta"> <div class="form-group form-inline"> <input class="form-control" id="questionID_1" name="questionID_1" placeholder="Resposta 1"> <input class="form-control" id="questionID_1" name="questionID_2" placeholder="Resposta 2"> <input class="form-control" id="questionID_1" name="questionID_3" placeholder="Resposta 3"> <input class="form-control" id="questionID_1" name="questionID_4" placeholder="Resposta 4"> </div> </div>';
// Inicia as callbacks
FormCrud.init();


