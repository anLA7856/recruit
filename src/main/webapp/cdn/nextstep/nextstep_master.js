var createNextStep = function (conf) {
    conf = conf ? conf : {};
    var defaults = {
        modalId: 'nextStep',
        multiple: false,
        showExpression: false,
        url: '/rs/bpm/next',
        processDefinitionId: '',
        processInstanceId: '',
        activityId: '',
        userId: '',
        userUrl: '/rs/approval/users',
        nextStepUrl: '/approval/approval-completeTask.do',
        commentListUrl: '/rs/phrase/list'
    };
    for (var key in defaults) {
        if (!conf[key]) {
            conf[key] = defaults[key];
        }
    }

    if ($('#' + conf.modalId).length == 0) {
        $(document.body).append(
            '<div id="' + conf.modalId + '" class="modal fade">'
            + '  <div class="modal-dialog">'
            + '    <div class="modal-content">'
            + '  <div class="modal-header">'
            + '    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
            + '    <h3>选择下一步</h3>'
            + '  </div>'
            + '  <div class="modal-body">'
            + '  <div class="container-fluid">'
            + '   <div class="row-fluid">'
            + '   <div class="col-sm-6" style="padding:0px;">'
            + '    <div class="tab-content form-group">'
            + '    <div class="panel panel-default" style="margin-bottom:0px;">'
            + '      <div class="panel-heading">'
            + '        下一环节'
            + '      </div>'
            + '      <div class="panel-body" style="padding:0px;height: 166px;overflow-y: auto;">'
            + '  <table id="' + conf.modalId + '_grid" class="table table-hover">'
            + '    <tbody id="' + conf.modalId + '_step">'
            + '    </tbody>'
            + '  </table>'
            + '      </div>'
            + '      </div>'
            + '    </div>'
            + '    <div class="form-group form-inline">'
            + '        <label for="defaultComment" style="display:inline;">常用语:</label>'
            + '<select id="defaultComment" class="form-control" style="margin-bottom:0px;width:80%;">'
            + '<option>同意</option> '
            + '<option>不同意</option> '
            + '<option>请审核</option> '
            + '<option>请审批</option> '
            + '<option>已审核</option>'
            + '</select>'
            + '    </div>'
            + '      </div>'
            + '   <div class="col-sm-offset-6 con-sm-6">'
                /*            +'    <ul class="nav nav-tabs" role="tablist" id="userPickerTabs">'
                 +'      <li role="presentation" class="active"><a href="#user" aria-controls="user" role="tab" data-toggle="tab">选择用户</a></li>'
                 +'      <li role="presentation" ' + (conf.showExpression !== true ? 'style="display:none;"' : '') + '><a href="#common" aria-controls="common" role="tab" data-toggle="tab">常用语</a></li>'
                 +'      <li role="presentation" ' + (conf.showExpression !== true ? 'style="display:none;"' : '') + '><a href="#expr" aria-controls="expr" role="tab" data-toggle="tab">表达式</a></li>'
                 +'    </ul>'*/
            + '    <div class="tab-content form-group">'
                /*            +'      <div role="tabpanel" class="tab-pane active" id="user">'*/
            + '    <div class="panel panel-default" style="margin-bottom:0px;">'
            + '      <div class="panel-heading">'
            + '        下一环节办理人'
            + '      </div>'
            + '      <div class="panel-body" style="padding:0px;height: 166px;overflow-y: auto;">'
            + '  <table id="' + conf.modalId + '_grid" class="table table-hover">'
            + '    <tbody id="' + conf.modalId + '_body">'
            + '    </tbody>'
            + '  </table>'
            + '      </div>'
            + '      </div>'
            + '    </div>'
            + '    <div class="form-group">'
            + '      <div class="pull-left form-inline" style="display:table"><div style="display:table-cell">'
            + '        <label for="' + conf.modalId + '_username" style="display:inline;">账号:</label>'
            + '        <input type="text" id="' + conf.modalId + '_username" value="" class="form-control" style="margin-bottom:0px; width:60%">'
            + '        <button id="' + conf.modalId + '_search" class="btn btn-default">查询</button></div>'
            + '      </div>'
            + '    </div>'
            + '      </div>'
                /*      +'      <div role="tabpanel" class="tab-pane" id="common">'
                 +'    <article class="m-widget">'
                 +'      <header class="header">'
                 +'        <h4 class="title">用户</h4>'
                 +'      </header>'
                 +'      <div class="content">'
                 +'  <table id="' + conf.modalId + '_commonGrid" class="m-table table-hover">'
                 +'    <tbody id="' + conf.modalId + '_commonBody">'
                 +'      <tr>'
                 +'        <td><input id="' + conf.modalId + '_item_common_1" type="radio" name="selectedItem" class="selectedItem" value="常用语:直接上级" title="常用语:直接上级" style="margin-top:0px;"></td>'
                 +'        <td>常用语:直接上级</td>'
                 +'      </tr>'
                 +'      <tr>'
                 +'        <td><input id="' + conf.modalId + '_item_common_2" type="radio" name="selectedItem" class="selectedItem" value="岗位:经理" title="岗位:经理" style="margin-top:0px;"></td>'
                 +'        <td>岗位:经理</td>'
                 +'      </tr>'
                 +'      <tr>'
                 +'        <td><input id="' + conf.modalId + '_item_common_3" type="radio" name="selectedItem" class="selectedItem" value="岗位:总经理" title="岗位:总经理" style="margin-top:0px;"></td>'
                 +'        <td>岗位:总经理</td>'
                 +'      </tr>'
                 +'    </tbody>'
                 +'  </table>'
                 +'      </div>'
                 +'    </article>'
                 +'      </div>'
                 +'      <div role="tabpanel" class="tab-pane" id="expr">'
                 +'    <article class="m-widget">'
                 +'      <header class="header">'
                 +'        <h4 class="title">表达式</h4>'
                 +'      </header>'
                 +'      <div class="content">'
                 +'  <table id="' + conf.modalId + '_exprGrid" class="m-table table-hover">'
                 +'    <tbody id="' + conf.modalId + '_exprBody">'
                 +'      <tr>'
                 +'        <td><input id="' + conf.modalId + '_item_expr_1" type="text" name="selectedItem" class="selectedItem" value="${initiator}" title="${initator}" style="margin-top:0px;"></td>'
                 +'      </tr>'
                 +'    </tbody>'
                 +'  </table>'
                 +'      </div>'
                 +'    </article>'
                 +'      </div>'*/
            + '  </div>'
            + '<div class="row-fluid">'
            + '<div class="col-sm-12" style="padding:0px;">'
            + '    <div class="panel panel-default" style="margin-bottom:0px;">'
            + '      <div class="panel-heading">'
            + '        办理意见'
            + '      </div>'
            + '      <div class="panel-body" style="padding:0px;">'
            + '<textarea id="editComment" rows="3" class="form-control" style="margin-bottom:0px">同意</textarea>'
            + '      </div>'
            + '    </div>'
            + '</div>'
            + '    </div>'
            + '  </div>'
            + '  </div>'
            + '  <div class="modal-footer">'
            + '    <span id="' + conf.modalId + '_result" style="float:left;"></span>'
            + '    <a id="' + conf.modalId + '_close" href="#" class="btn" data-dismiss="modal">关闭</a>'
            + '    <a id="' + conf.modalId + '_select" href="#" class="btn btn-primary">提交</a>'
            + '  </div>'
            + '    </div>'
            + '  </div>'
            + '</div>');

        $('#userPickerTabs a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        })
    }

    var Step = function () {
        $.ajax({
            url: conf.url,
            data: {
                processDefinitionId: conf.processDefinitionId,
                activityId: conf.activityId
            },
            success: function (data) {
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    html +=
                        '<tr>'
                        + '<td><input id="' + conf.modalId + '_item_' + i + '" type="radio" class="selectedItem" name="name" value="'
                        + item.elString + '" title="' + item.id + '"></td>'
                        + '<td><label for="' + conf.modalId + '_item_' + i + '">' + item.name + '</label></td>'
                        + '</tr>'
                }
                $('#' + conf.modalId + '_step').html(html);
            }
        });

    }

    var commentList = function () {
        $.ajax({
            url: conf.commentListUrl,
            success: function(data){
                if (data.data.length > 0){
                    var defaultComment = $('#defaultComment');
                    defaultComment.children().remove();
                    for (var i = 0; i < data.data.length; i++){
                        var item = data.data[i];
                        var html = '<option>'+ item.content +'</option>';
                        defaultComment.append(html);
                    }
                }
            }
        });
    }

    var userList = function (node) {
        $.ajax({
            url: conf.userUrl,
            data: {
                node: node,
                processInstanceId: conf.processInstanceId
            },
            success: function (user) {
                var html = '';
                conf.multiple = user.multiple;
                var data = user.data;
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        var item = data[i];
                        html +=
                            '<tr>'
                            + '<td><input id="' + conf.modalId + '_item_' + i + '" type="' + (conf.multiple ? 'checkbox' : 'radio') + '" class="selectedItem" name="step" value="'
                            + item.id + '" title="' + item.displayName + '"></td>'
                            + '<td><label for="' + conf.modalId + '_item_' + i + '">' + item.displayName + '</label></td>'
                            + '</tr>'
                    }
                }
                $('#' + conf.modalId + '_body').html(html);
            }
        });
    }

    var doSearch = function (username) {
        $.ajax({
            url: '/rs/user/search',
            data: {
                username: username
            },
            success: function (data) {
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    html +=
                        '<tr>'
                        + '<td><input id="' + conf.modalId + '_item_' + i + '" type="' + (conf.multiple ? 'checkbox' : 'radio') + '" class="selectedItem" name="step" value="'
                        + item.id + '" title="' + item.displayName + '"></td>'
                        + '<td><label for="' + conf.modalId + '_item_' + i + '">' + item.displayName + '</label></td>'
                        + '</tr>'
                }
                $('#' + conf.modalId + '_body').html(html);
            }
        });
    }

    $(document).delegate('.nextStep', 'click', function (e) {
        $('#' + conf.modalId).data('userPicker', $(this).parent());
        $('#' + conf.modalId).modal();

        Step();
        commentList();
    });

    // $(document).delegate('#' + conf.modalId + '_body tr', 'click', function(e) {
    //	$('input[type=radio].selectedItem').prop('checked', false);
    //	$(this).find('.selectedItem').prop('checked', true);
    // });

    $(document).delegate('#' + conf.modalId + '_step .selectedItem', 'click', function (e) {
        var step = $(this).val();
        var stepId = $(this).attr('title');
        console.info(step);
        if (step != "null") {
            $('#nextStepEl').attr('name', (step.split("=")[0]).trim().substring(2));
            $('#nextStepEl').val((step.split("=")[2]).trim().substring(1, ((step.split("=")[2]).length - 2)));
            if ((step.split("=")[0]).trim().substring(2) === "start") {
                $('#_humantask_action_').val("提交" + (step.split("=")[2]).trim().substring(1, ((step.split("=")[2]).length - 2)));
            }
        }
        userList(stepId);
        $('#assignee').attr('name', stepId);
        $('#' + conf.modalId + '_result').empty();
    });

    $('#defaultComment').change(function () {
        var comment = $(this).val();
        $('#editComment').text(comment);
    });


    $(document).delegate('#' + conf.modalId + '_body .selectedItem', 'click', function (e) {
        var el = $(this);
        if (conf.multiple) {
            if (el.prop('checked')) {
                //noinspection JSDuplicatedDeclaration
                var html = '&nbsp;<span class="label label-default" id="' + $(this).val() + '" title="' + $(this).attr('title') + '">' + $(this).attr('title').split("-")[1].trim() + '<i class="glyphicon glyphicon-remove" style="cursor:pointer;"></i></span>';
                $('#' + conf.modalId + '_result').append(html);
            } else {
                $('#' + conf.modalId + '_result #' + el.val()).remove();
            }
        } else {
            //noinspection JSDuplicatedDeclaration
            var html = '<span class="label label-default" id="' + $(this).val() + '" title="' + $(this).attr('title') + '">' + $(this).attr('title').split("-")[1].trim() + '<i class="glyphicon glyphicon-remove" style="cursor:pointer;"></i></span>';
            $('#' + conf.modalId + '_result').html(html);


        }
    });

    $(document).delegate('#' + conf.modalId + '_commonBody .selectedItem', 'click', function (e) {
        var html = '<span class="label" id="' + $(this).val() + '" title="' + $(this).attr('title') + '">' + $(this).attr('title') + '<i class="iglyphicon glyphicon-remove" style="cursor:pointer;"></i></span>';
        $('#' + conf.modalId + '_result').html(html);
    });

    $(document).delegate('#' + conf.modalId + '_exprBody .selectedItem', 'click', function (e) {
        var html = '<span class="label" id="' + $(this).val() + '" title="' + $(this).attr('title') + '">' + $(this).attr('title') + '<i class="glyphicon glyphicon-remove" style="cursor:pointer;"></i></span>';
        $('#' + conf.modalId + '_result').html(html);
    });

    $(document).delegate('.icon-minus-sign', 'click', function (e) {
        var id = $(this).parent().attr('id');
        $('#' + conf.modalId + '_item_' + id).prop('checked', false);
        $(this).parent().remove();
    });

    $(document).delegate('#' + conf.modalId + '_search', 'click', function (e) {
        doSearch($('#' + conf.modalId + '_username').val());
    });

    $(document).delegate('#' + conf.modalId + '_select', 'click', function (e) {
        $('#' + conf.modalId).modal('hide');
        var data = $('#editComment').val();
        $('#comment').val(data);
        var userPickerElement = $('#assignee');
        if (conf.multiple) {
            var el = $('#' + conf.modalId + '_result .label');
            var ids = [];
            var names = [];
            el.each(function (index, item) {
                ids.push($(item).attr('id'));
                names.push($(item).attr('title'));
            });
            userPickerElement.val(ids.join(','));
            $('#countersigns').val(ids.join(','));
        } else {
            var el = $('#' + conf.modalId + '_result .label');
            userPickerElement.val(el.attr('id'));
        }

        if (UEDITOR_OPEN) {
            var editor = UE.getEditor("ueditorContent");
            console.info(editor);
            var contentTxt = editor.getPlainTxt();
            console.info(contentTxt);
            $('#contentTxt').val(contentTxt);
        }

        $('#xform').attr('action', ROOT_URL + conf.nextStepUrl);
        $('#xform').submit();
    });
}