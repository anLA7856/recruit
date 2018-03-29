var createNextStep = function (conf) {
    conf = conf ? conf : {};
    var userData;
    var selectData =[];
    var defaults = {
        modalId: 'nextStep',
        multiple: false,
        countersign:false,
        showExpression: false,
        url: '/rs/bpm/next',
        processDefinitionId: '',
        processInstanceId: '',
        activityId: '',
        userId: '',
        userUrl: '/rs/approval/users',
        nextStepUrl: '/approval/approval-completeTask.do',
        commentListUrl: '/rs/phrase/list',
    };
    for (var key in defaults) {
        if (!conf[key]) {
            conf[key] = defaults[key];
        }
    }

    if ($('#' + conf.modalId).length == 0) {
        $(document.body).append(
            '<div id="' + conf.modalId + '" class="modal fade">'
            + '  <div class="modal-dialog" style="width:800px;">'
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
            + '      <div class="panel-body" style="padding:0px;height: 216px;overflow-y: auto;">'
            + '  <table id="' + conf.modalId + '_grid" class="table table-hover table-condensed">'
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
            + '<option>请处理</option>'
            + '<option>已处理</option>'
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
            + '      <div class="panel-body" style="padding:0px;height: 216px;overflow-y: auto;">'
            + '  <table id="' + conf.modalId + '_grid" class="table table-hover table-condensed">'
            + '    <tbody id="' + conf.modalId + '_body">'
            + '    </tbody>'
            + '  </table>'
            + '      </div>'
            + '      </div>'
            + '    </div>'
            + '    <div class="form-group form-inline">'
            + '        <label for="' + conf.modalId + '_username" style="display:inline;">姓名:</label>'
            + '        <input type="text" id="' + conf.modalId + '_username" value="" class="form-control" style="margin-bottom:0px;width:89%;">'
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
            + '<div class="row-fluid">'
            + '<div class="col-sm-12" style="padding:0px;">'
            + '    <div class="panel panel-default" style="margin-bottom:0px;">'
            + '      <div class="panel-heading">'
            + '        办理意见'
            + '      </div>'
            + '      <div class="panel-body" style="padding:0px;">'
            + '<textarea id="editComment" rows="4" class="form-control" style="margin-bottom:0px">同意</textarea>'
            + '      </div>'
            + '    </div>'
            + '    </div>'
            + '</div>'
            + '    </div>'
            + '  </div>'
            + '  <div class="modal-footer">'
            + '    <span id="' + conf.modalId + '_result" style="float:left;"></span>'
            + '    <a id="' + conf.modalId + '_close" href="#" class="btn" data-dismiss="modal">关闭</a>'
            + '    <a id="' + conf.modalId + '_select" href="#" class="btn btn-primary">提交</a>'
            + '  </div>'
            + '    </div>'
            + '    </div>'
            + '  </div>'
            + '</div>');

        $('#userPickerTabs a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        })
    }

    var Step = function () {
    	//统一调用。
        try{
        	//用于更改Conf。
	         if(typeof(eval("checkConf"))=="function"){          //方法存在。
	        	 
	        	 checkConf(conf);
	         }
       }catch(e){
       	//alert("not function"); 
       } 
    	
        $.ajax({
            url: conf.url,
            data: {
                processDefinitionId: conf.processDefinitionId,
                activityId: conf.activityId,
                processInstanceId:conf.processInstanceId
            },
            success: function (data) {
            	//这里设置某某部门领导审批
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    html +=
                        '<tr class="selectedItem">'
                        + '<td><input id="' + conf.modalId + '_item_step' + i + '" type="radio" name="name" value="'
                        + item.elString + '" title="' + item.id + '"></td>'
                        + '<td><label for="' + conf.modalId + '_item_step_' + i + '">' + item.name + '</label></td>'
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
    	
        $('#' + conf.modalId + '_body').empty();
        $('#' + conf.modalId + '_body').html("&nbsp;&nbsp;加载中...");
        userData = null;
        //0509
        var arr = conf.userUrl.split("?");
        var userUrl = arr[0];
        var data;
        
        
        
        //阻止用户在列表加载前提交表单
        var submitButton = $("#nextStep_select");
        submitButton.attr("id","tempID");
        //阻止用户在列表加载前选择下一步
        var steps = $('#' + conf.modalId + '_step .selectedItem');
        steps.removeClass('selectedItem');
        //
        if(arr.length>1)
            data = {
                node: node,
                processInstanceId: conf.processInstanceId,
                step: arr[1].split("=")[0],
                group: arr[1].split("=")[1]
            };
        else
            data = {
                node: node,
                processInstanceId: conf.processInstanceId
            };
        //
        /*url: userUrl,
            data: {
                node: node,
                processInstanceId: conf.processInstanceId
            },*/
        $.ajax({
            url: userUrl,
            data: data,
            success: function (user) {
            	
                var html = '';
                conf.multiple = user.multiple;
            
                
                var data = user.data;
                if (data != null) {
                    if (data == "none") {
                        html = '<tr><td class="alert alert-info" style="text-align: center;">不用选择处理人员</td></tr>';
                        //不用选择
                    } else if(data == "search"){
                    	 html = '<tr><td class="alert alert-info" style="text-align: center;">请输入指派人按下回车搜索,显示10条</td></tr>';
                    }else {
                    	
                    	
                        data.sort(function(a, b){
                            if (a.depSort === b.depSort) {
                                if (a.sortNum===null) {
                                    a.sortNum=9999;
                                }
                                if (b.sortNum===null) {
                                    b.sortNum=9999;
                                }
                                return a.sortNum - b.sortNum;
                            } else {
                                return a.depSort - b.depSort;
                            }
                        });
                        userData = data;
                        var first = true;
                        for (var i = 0; i < data.length; i++) {
                        	
                        	var item = data[i];
                        	//这里面加一条逻辑，暂时只是commission，用于后台判断子流程之间流动，增加网关变量。
                        	if(first){
                        		
                        		//只设置一次
                        		if(item.choice){    //说明是由子流程直接传给网关在判断。
                        			 $('#choice').attr('name', item.key);     //设置名字
                        			 $('#choice').attr('value', item.value);     //设置名字
                        			 
                        			 $('#choice1').attr('name', item.gateWayKey);     //设置名字
                        			 $('#choice1').attr('value', item.gateWayValue);     //设置名字
                        			 first = false;
                        		}
                        	}
                        	
                        	
                            
                            html +=
                                '<tr class="selectedItem">'
                                + '<td><input id="' + conf.modalId + '_item_body' + i + '" type="' + (conf.multiple ? 'checkbox' : 'radio') + '" name="step" depart-id="'+ item.departId +'" value="'
                                + item.id + '" title="' + item.displayName + '"></td>'
                                + '<td><label for="' + conf.modalId + '_item_body_' + i + '">' + item.displayName + '</label></td>'
                                + '</tr>'
                        }
                    }
                } else {
                    html = '<tr><td class="alert alert-danger" style="text-align: center;">请重新选择下一步加载用户列表</td></tr>';
                }
                $('#' + conf.modalId + '_body').html(html);
                //恢复选择列表
                steps.addClass('selectedItem');

                //恢复提交功能
                submitButton.attr("id","nextStep_select");
            }
        });
    }

    //这个就是在下一环节办理人里面筛选。
    var doSearch = function (username) {
        /*var data = userData.filter(function(a){
            return a.displayName.indexOf(username)>-1||a.username.indexOf(username)>-1
        });
        data.sort(function(a, b){
            if (a.depSort === b.depSort) {
                if (a.sortNum===null) {
                    a.sortNum=9999;
                }
                if (b.sortNum===null) {
                    b.sortNum=9999;
                }
                return a.sortNum - b.sortNum;
            } else {
                return a.depSort - b.depSort;
            }
        });
        var html = '';
        for (var i = 0; i < data.length; i++) {
        var item = data[i];
        html +=
            '<tr class="selectedItem">'
            + '<td><input id="' + conf.modalId + '_item_body' + i + '" type="' + (conf.multiple ? 'checkbox' : 'radio') + '" name="step" depart-id="'+ item.departId +'" value="'
            + item.id + '" title="' + item.displayName + '"></td>'
            + '<td><label for="' + conf.modalId + '_item_body_' + i + '">' + item.displayName + '</label></td>'
            + '</tr>'
             }
        $('#' + conf.modalId + '_body').html(html);*/
        var trs = $('#' + conf.modalId + '_body tr.selectedItem');
        trs.css("display", "none");
        userData.forEach(function (value, index) {
            if (value.displayName.indexOf(username)>-1||value.username.indexOf(username)>-1) {
                $(trs[index]).css("display","");
            }
        });
    }

    $(document).delegate('.nextStep', 'click', function (e) {
    	
    	 //统一在这里调用。点击下一步的一个动作。
        try{ 
	         if(typeof(eval("beforeHandle"))=="function"){
	        	 var result = beforeHandle();
	        	 if(!result){
	        		 return;
	        	 }
	       }
        }catch(e){
        	//alert("not function"); 
        } 
    	
        if ($.browser.version > 9){
            $('#' + conf.modalId).removeClass('fade');
        }
        $('#' + conf.modalId).modal({backdrop:'static', keyboard: false});
        Step();
        commentList();
    });

    // $(document).delegate('#' + conf.modalId + '_body tr', 'click', function(e) {
    //	$('input[type=radio].selectedItem').prop('checked', false);
    //	$(this).find('.selectedItem').prop('checked', true);
    // });

    $(document).delegate('#' + conf.modalId + '_step .selectedItem', 'click', function (e) {
    	
        var step = $(this.children[0].children).val();
        var stepId = $(this.children[0].children).attr('title');
        $(this.children[0].children).attr('checked',true);
        if (step != "null") {
            $('#nextStepEl').attr('name', (step.split("=")[0]).trim().substring(2));
            var tstep = step.split("=")[2]==undefined? '' : (step.split("=")[2]).trim().substring(1, ((step.split("=")[2]).length - 2));
            $('#nextStepEl').val(tstep);
            if ((step.split("=")[0]).trim().substring(2) === "start") {
                $('#_humantask_action_').val("提交" + (step.split("=")[2]).trim().substring(1, ((step.split("=")[2]).length - 2)));
            }
        }
        userList(stepId);
        $('#assignee').attr('name', stepId);                  //把名字改为和后台的所需要${}里面名字一致。动态设置为下一个将要进入的节点id。
        selectData = [];
        $('#' + conf.modalId + '_result').empty();
    });

    $('#defaultComment').change(function () {
        var comment = $(this).val();
        $('#editComment').val(comment);
    });

    /**
     * 这个函数，主要目的是选择环节班里人，并将其显示在弹出框的左下角。
     */
    $(document).delegate('#' + conf.modalId + '_body .selectedItem', 'click', function (e) {
    	
        var el = $(this.children[0].children);
        console.info(selectData);
        if (conf.multiple) {
            el.prop('checked',!el.prop('checked'));
            if (conf.countersign) {
                if (el.prop('checked')) {
                    //noinspection JSDuplicatedDeclaration
                    if (selectData.indexOf(el.attr('depart-id'))>-1) {
                        alert("同一部门、同一时间只能选择一个处理人。");
                        el.prop('checked', false);
                    } else {
                        var html = '<span class="label label-default" id="' + el.val() + '" title="' + el.attr('title') + '" depart-id="' + el.attr('depart-id') + '">' +el.attr('title').split("-")[1].trim() + '<i class="glyphicon glyphicon-remove" style="cursor:pointer;"></i></span>';
                        $('#' + conf.modalId + '_result').append(html);
                        selectData.push(el.attr('depart-id'));
                    }
                } else {
                    $('#' + conf.modalId + '_result #' + el.val()).remove();
                    selectData.pop(el.attr('depart-id'));
                }
            } else {
                if (el.prop('checked')) {
                    //noinspection JSDuplicatedDeclaration
                    var html = '<span class="label label-default" id="' + el.val() + '" title="' + el.attr('title') + '" depart-id="' + el.attr('depart-id') + '">' +el.attr('title').split("-")[1].trim() + '<i class="glyphicon glyphicon-remove" style="cursor:pointer;"></i></span>';
                    $('#' + conf.modalId + '_result').append(html);

                } else {
                    $('#' + conf.modalId + '_result #' + el.val()).remove();
                }
            }
        } else {
            el.prop('checked',true);
            //noinspection JSDuplicatedDeclaration
            var html = '<span class="label label-default" id="' + el.val() + '" title="' + el.attr('title') + '" depart-id="' + el.attr('depart-id') + '">' + el.attr('title').split("-")[1].trim() + '<i class="glyphicon glyphicon-remove" style="cursor:pointer;"></i></span>';
            $('#' + conf.modalId + '_result').html(html);
        }
        console.info(selectData);
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

    
    
    $(document).delegate('#' + conf.modalId + '_username', 'keyup', function (e) {            //这个方法就是在下一环节办理人里面筛选。
    	/*
    	if(e.keyCode != 13){
    		return;
    	}
        //统一在这里调用。搜索。
    	*/
        try{
	         if(conf.activityId=="assistantManagerHandle"){          //方法存在。
	        	 //只有是回车，才能搜索。
	        	 if(e.keyCode != 13){
	         		return;
	         	}
	        	 specialDoSearch($('#' + conf.modalId + '_username').val(),conf);
	         }else{
	        	 doSearch($('#' + conf.modalId + '_username').val());
	         }
        }catch(e){
        	//alert("not function"); 
        } 
    });

    /**
     * 浮动窗口，最终提交按钮。
     */
    $(document).delegate('#' + conf.modalId + '_select', 'click', function (e) {
        var data = $('#editComment').val();
        $('#comment').val(data);
        var userPickerElement = $('#assignee');            //获取id为assignee的节点，并设置
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
        	//单选，或者为false情况。
            var el = $('#' + conf.modalId + '_result .label');
            
            userPickerElement.val(el.attr('id'));           //单选设置assignee节点。的value值。
            
        }
      

        if (UEDITOR_OPEN) {
            var editor = UE.getEditor("ueditorContent");
            console.info(editor);
            var contentTxt = editor.getPlainTxt();
            console.info(contentTxt);
            $('#contentTxt').val(contentTxt);
        }

        $('#xform').attr('action', ROOT_URL + conf.nextStepUrl);
        //判断是否选择了候选人
        if($("#nextStep_step .selectedItem input:checked").length==0 && $("#nextStep_step .selectedItem input").length!=0){
        	//意思是，有选择，但是没选。
        	alert("请选择下一步!");
        }else if($("#nextStep_body .selectedItem input:checked").length==0 && $("#nextStep_body .selectedItem input").length!=0){
            alert("请选择办理人!");
        }else{
        	if($("#computeTable").length > 0){
        		//用于集约销账签报页面，提交前再触发一次计算，防止用户更改而发生错误。
        		$("#computeTable").trigger("click");
        	}
            $('#' + conf.modalId).modal('hide');
            
            //最终，弹出宽厚，提交前执行的方法。
            try{
            	
   	         if(typeof(eval("beforeSubmit"))=="function"){          //方法存在。
   	        	beforeSubmit();
   	         }
           }catch(e){
           	//alert("not function"); 
           } 
           
           
            $('#xform').submit();
        }
    });
}