var createUserPicker = function(conf) {
	conf = conf ? conf : {};
    var userData;
	var defaults = {
		modalId: 'userPicker',
		multiple: false,
		showExpression: false,
        showGroup: false,
        searchUrl: '/mossle-app-lemon/rs/party/searchUser',
		treeUrl: '/mossle-app-lemon/rs/party/tree?partyStructTypeId=1',
        childUrl: '',
        groupUrl: '',
        submitCallback: function(ids, names){
            var userPickerElement = $('.'+conf.modalId);
            if(conf.multiple){
                userPickerElement.children('input[type=hidden]').val(ids.join(','));
			    userPickerElement.children('input[type=text]').val(names.join(','));
            }else{
                userPickerElement.children('input[type=hidden]').val(ids[0]);
			    userPickerElement.children('input[type=text]').val(names[0]);
            }
        }
	};

	for (var key in defaults) {
		if (!conf[key]) {
			conf[key] = defaults[key];
		}
	}

    if ($('#' + conf.modalId).length == 0) {
        $(document.body).append(
'<div id="' + conf.modalId + '" class="modal fade">'
+'  <div class="modal-dialog" style="width:800px;">'
+'    <div class="modal-content">'
+'      <div class="modal-header">'
+'        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
+'        <h3>选择用户</h3>'
+'      </div>'
+'      <div class="modal-body">'
+'    <ul class="nav nav-tabs" role="tablist" id="userPickerTabs">'
		+'      <li role="presentation" class="active"><a href="#user" aria-controls="user" role="tab" data-toggle="tab">选择用户</a></li>'
        +'      <li role="presentation" ' + (conf.showGroup !== true ? 'style="display:none;"' : '') + '><a href="#group" aria-controls="group" role="tab" data-toggle="tab">流程组</a></li>'
		+'      <li role="presentation" ' + (conf.showExpression !== true ? 'style="display:none;"' : '') + '><a href="#common" aria-controls="common" role="tab" data-toggle="tab">常用语</a></li>'
		+'      <li role="presentation" ' + (conf.showExpression !== true ? 'style="display:none;"' : '') + '><a href="#expr" aria-controls="expr" role="tab" data-toggle="tab">表达式</a></li>'
		+'    </ul>'
        +'<div class="tab-content">'
        +'<div role="tabpanel" class="tab-pane active" id="user">'
+'        <div class="row">'
+'          <div class="col-md-6">'
+'            <div style="padding-top:20px;">&nbsp;</div>'
+'            <ul id="' + conf.modalId + 'treeMenu" class="ztree" style="height: 400px;overflow: auto;"></ul>'
+'          </div>'
+'          <div class="col-md-6">'
+'        <div><br>'
+'          <label for="' + conf.modalId + '_username" style="display:inline" class="">姓名/账号:</label>'
+'          <input type="text" id="' + conf.modalId + '_username" value="" style="margin-bottom:0px; width:70%; display:inline;" class="form-control">'
+'        </div><br>'
+'        <div class="panel panel-default" style="max-height:400px;overflow:auto;">'
+'          <div class="panel-heading">'
+'            <h3 class="panel-title">用户</h3>'
+'          </div>'
+'  <table id="' + conf.modalId + '_grid" class="table table-hover table-condensed">'
+'    <thead>'
+'      <tr>'
+'        <th width="10" class="m-table-check">&nbsp;</th>'
+'        <th>姓名</th>'
+'      </tr>'
+'    </thead>'
+'    <tbody id="' + conf.modalId + '_body">'
/*
+'      <tr>'
+'        <td><input id="' + conf.modalId + '_item_1" type="' + (conf.multiple ? 'checkbox' : 'radio') + '" name="selectedItem" class="selectedItem" value="1" title="admin" style="margin-top:0px;"></td>'
+'        <td>admin</td>'
+'      </tr>'
+'      <tr>'
+'        <td><input id="' + conf.modalId + '_item_2" type="' + (conf.multiple ? 'checkbox' : 'radio') + '" name="selectedItem" class="selectedItem" value="2" title="user" style="margin-top:0px;"></td>'
+'        <td>user</td>'
+'      </tr>'
*/
+'    </tbody>'
+'  </table>'
+'        </div>'
+'          </div>'
+'        </div></div>'
 +'      <div role="tabpanel" class="tab-pane" id="group">'
		+'    <div class="panel panel-default" style="max-height: 400px;overflow:auto;">'
		+'      <div class="panel-heading">'
		+'        <h3 class="panel-title">流程组</h3>'
		+'      </div>'
        +'      <div class="panel-content">'
		+'  <table id="' + conf.modalId + '_groupGrid" class="table table-hover table-condensed">'
		+'    <thead>'
		+'      <tr>'
		+'        <th width="10" class="m-table-check">&nbsp;</th>'
		+'        <th>组名</th>'
		+'      </tr>'
		+'    </thead>'
		+'    <tbody id="' + conf.modalId + '_groupBody">'
		+'    </tbody>'
		+'  </table>'
		+'      </div>'
        +'      </div>'
        +'      </div>'       
		+'      <div role="tabpanel" class="tab-pane" id="common">'
		+'    <div class="panel panel-default" style="max-height: 400px;overflow:auto;">'
		+'      <div class="panel-heading">'
		+'        <h3 class="panel-title">用户</h3>'
		+'      </div>'
        +'      <div class="panel-content">'
		+'  <table id="' + conf.modalId + '_commonGrid" class="table table-hover  table-condensed">'
		+'    <thead>'
		+'      <tr>'
		+'        <th width="10" class="m-table-check">&nbsp;</th>'
		+'        <th>姓名</th>'
		+'      </tr>'
		+'    </thead>'
		+'    <tbody id="' + conf.modalId + '_commonBody">'
        +'      <tr>'
		+'        <td><input id="' + conf.modalId + '_item_common_0" type="radio" name="selectedItem" class="selectedItem" value="常用语:流程发起人" title="常用语:流程发起人" style="margin-top:0px;"></td>'
		+'        <td>常用语:流程发起人</td>'
		+'      </tr>'
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
        +'      </div>'
        +'      </div>'
		+'      <div role="tabpanel" class="tab-pane" id="expr">'
		+'    <div class="panel panel-default">'
		+'      <div class="panel-heading">'
		+'        <h3 class="panel-title">表达式</h3>'
		+'      </div>'
		+'      <div class="panel-content">'
		+'  <table id="' + conf.modalId + '_exprGrid" class="table table-hover">'
		+'    <thead>'
		+'      <tr>'
		+'        <th>姓名</th>'
		+'      </tr>'
		+'    </thead>'
		+'    <tbody id="' + conf.modalId + '_exprBody">'
		+'      <tr>'
		+'        <td><input id="' + conf.modalId + '_item_expr_1" type="text" name="selectedItem" class="selectedItem form-control" value="${initiator}" title="${initator}" style="margin-top:0px;"></td>'
		+'      </tr>'
		+'    </tbody>'
		+'  </table>'
		+'      </div>'
		+'    </div>'
		+'      </div>'
+'        </div>'
+'      </div>'
+'      <div class="modal-footer">'
+'        <span id="' + conf.modalId + '_result" style="float:left;"></span>'
+'        <a id="' + conf.modalId + '_close" href="#" class="btn" data-dismiss="modal">关闭</a>'
+'        <a id="' + conf.modalId + '_select" href="#" class="btn btn-primary">选择</a>'
+'      </div>'
+'    </div>'
+'  </div>'
+'</div>');
    }

	var doSearch = function(username) {
        var data = userData.filter(function(a){
            return a.displayName.indexOf(username)>-1||a.username.indexOf(username)>-1
        });
        data.sort(function(a, b){
        	if (a.sortNum===null) {
                a.sortNum=9999;
            }
            if (b.sortNum===null) {
                b.sortNum=9999;
            }
			return a.sortNum - b.sortNum;
        });
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    html +=
                      '<tr class="selectedItem">'
                        +'<td><input id="' + conf.modalId + '_item_' + i + '" type="' + (conf.multiple ? 'checkbox' : 'radio')
						+ '"name="name" value="'
                        + item.id + '" title="' + item.displayName + '"></td>'
                        +'<td><label for="' + conf.modalId + '_item_' + i + '">' + item.displayName + '</label></td>'
                      +'</tr>'
                }
                $('#' + conf.modalId + '_body').html(html);

	};

	var doSearchChild = function(position_id,dep_type,dep_id) {
        $('#' + conf.modalId + '_result').empty();
        $('#' + conf.modalId + '_body').empty();
        $.ajax({
            url: conf.childUrl,
            data: {
				position_id: position_id,
				dep_type: dep_type,
				dep_id: dep_id
            },
            success: function(data) {
                data.sort(function(a, b){
                    if (a.sortNum===null) {
                        a.sortNum=9999;
                    }
                    if (b.sortNum===null) {
                        b.sortNum=9999;
                    }
                    return a.sortNum - b.sortNum;
                });
                userData = data;
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    html +=
                      '<tr class="selectedItem">'
                        +'<td><input id="' + conf.modalId + '_item_' + i + '" type="' + (conf.multiple ? 'checkbox' : 'radio')
						+ '" name="name" value="'
                        + item.id + '" title="' + item.displayName + '"></td>'
                        +'<td><label for="' + conf.modalId + '_item_' + i + '">' + item.displayName + '</label></td>'
                      +'</tr>'
                }
                $('#' + conf.modalId + '_body').html(html);
            }
        });
	};

    var doSearchGroup = function(){
        $.ajax({
            url: conf.groupUrl,
            data:{},
            success: function(data){
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    html +=
                      '<tr data-toggle="tooltip" data-placement="top" data-html="true" title="<p align=\'left\'>描述：'+ (item.discription == null ? '无' : item.discription) +'<br>人数：'+ item.memberCount +'<br>别名：'+ item.alias +'<br>成员：'+ item.members +'<br>子节点：'+ item.child +'</p>">'
                        +'<td><input id="' + conf.modalId + '_item_' + i + '" type="' + (conf.multiple ? 'checkbox' : 'radio')
						+ '" class="selectedItem" name="name" value="'
                        + item.id + '" title="' + item.name + '"></td>'
                        +'<td><label for="' + conf.modalId + '_item_' + i + '">' + item.name + '</label></td>'
                      +'</tr>'
                }
                $('#' + conf.modalId + '_groupBody').html(html);
                $("[data-toggle='tooltip']").tooltip();
            }
        });
    };
    
    $(document).delegate('.userPicker', 'click', function(e) {

		var multiple = $(this).parent().data('multiple');
		if (multiple) {
			conf.multiple = true;
		}

        if(conf.showGroup){
            doSearchGroup();
        }
		
        var setting = {
			async: {
				enable: true,
				url: conf.treeUrl
			},
			callback: {
				onClick: function(event, treeId, treeNode) {
					// console.info(treeNode.id);
					doSearchChild(treeNode.getParentNode().id, treeNode.getParentNode().type, treeNode.id);
				}
			}
		};

		var zNodes = [];

		try {
			$.fn.zTree.init($("#" + conf.modalId + "treeMenu"), setting, zNodes);
		} catch(e) {
			console.error(e);
		}

        $('#' + conf.modalId).data('userPicker', $(this).parent());
        $('#' + conf.modalId).modal();
		// doSearch('');
    });

    // $(document).delegate('#' + conf.modalId + '_body tr', 'click', function(e) {
	//	$('input[type=radio].selectedItem').prop('checked', false);
	//	$(this).find('.selectedItem').prop('checked', true);
    // });

    $(document).delegate('#' + conf.modalId + '_body .selectedItem', 'click', function(e) {
        var el = $(this.children[0].children);
        if (conf.multiple) {
            el.attr('checked',true);
            if (el.prop('checked')) {
				var html = '&nbsp;<span class="label label-default" id="' + $(this.children[0].children).val() + '" title="' + $(this.children[0].children).attr('title') + '">' + $(this.children[0].children).attr('title') + '<i class="glyphicon glyphicon-remove" style="cursor:pointer;"></i></span>';
				$('#' + conf.modalId + '_result').append(html);
			} else {
				$('#' + conf.modalId + '_result #' + el.val()).remove();
			}
		} else {
            el.attr('checked',true);
            var html = '<span class="label label-default" id="' + $(this.children[0].children).val() + '" title="' + $(this.children[0].children).attr('title') + '">' + $(this.children[0].children).attr('title') + '<i class="glyphicon glyphicon-remove" style="cursor:pointer;"></i></span>';
			$('#' + conf.modalId + '_result').html(html);
		}
	});
 
    $(document).delegate('#' + conf.modalId + '_groupBody .selectedItem', 'click', function(e) {
		if (conf.multiple) {
			var el = $(this);
			if (el.prop('checked')) {
				var html = '&nbsp;<span class="label label-default" id="' + $(this).val() + '" title="' + $(this).attr('title') + '">' + $(this).attr('title') + '<i class="glyphicon glyphicon-remove" style="cursor:pointer;"></i></span>';
				$('#' + conf.modalId + '_result').append(html);
			} else {
				$('#' + conf.modalId + '_result #' + el.val()).remove();
			}
		} else {
			var html = '<span class="label label-default" id="' + $(this).val() + '" title="' + $(this).attr('title') + '">' + $(this).attr('title') + '<i class="glyphicon glyphicon-remove" style="cursor:pointer;"></i></span>';
			$('#' + conf.modalId + '_result').html(html);
		}
	});

     $(document).delegate('#' + conf.modalId + '_commonBody .selectedItem', 'click', function(e) {
		var html = '<span class="label label-default" id="' + $(this).val() + '" title="' + $(this).attr('title') + '">' + $(this).attr('title') + '<i class="glyphicon glyphicon-remove" style="cursor:pointer;"></i></span>';
		$('#' + conf.modalId + '_result').html(html);
	});

    $(document).delegate('#' + conf.modalId + '_exprBody .selectedItem', 'blur', function(e) {
		var html = '<span class="label lablel-default" id="' + $(this).val() + '" title="' + $(this).val() + '">' + $(this).val() + '<i class="glyphicon glyphicon-remove" style="cursor:pointer;"></i></span>';
		$('#' + conf.modalId + '_result').html(html);
	});


	$(document).delegate('.glyphicon-remove', 'click', function(e) {
		var id = $(this).parent().attr('id');
		$('#' + conf.modalId + '_item_' + id).prop('checked', false);
		$(this).parent().remove();
	});

    $(document).delegate('#' + conf.modalId + '_username', 'keyup', function (e) {
        doSearch($('#' + conf.modalId + '_username').val());
    });

    $(document).delegate('#' + conf.modalId + '_select', 'click', function(e) {
        $('#' + conf.modalId).modal('hide');
		var ids = [];
        var names = [];
        var el = $('#' + conf.modalId + '_result .label');
        el.each(function(index, item) {
				ids.push($(item).attr('id'));
				names.push($(item).attr('title'));
			});
        conf.submitCallback(ids, names);
    });
}
