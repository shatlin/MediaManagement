var columnFilters = {};
var selectedvalue;
var lookupInvokerControl;
var lookupTitle;
var resetflag = 0;
//var SeasonTitleVal;
//var EpisodeTitleVal;
//var GenreVal;
var grid;
var idfield;
var gridwidth;
var gridheight;
var ToggleButton;
var columns;
var visiblecolumns;
var options;
var actionParameters;
var gridContainerDiv;
var selectedseriestitle;
var selectedseriesno;
var baseaddress;

var errorMessagePanel;
var UserIdVal;
/////////////////// Reset variable //////////////////
var resetNewUserflag = 0;
var resetEditUserflag = 0;
var resetAssignRoleflag = 0;
var resetAssignRegionflag = 0;
var userId = "";
var userName = "";
var departmentName = "";
var managerName = "";
var editUserId = "";
var editUserName = "";
var editDepartmentName = "";
var editManagerName = "";
var editRoleFromUserName = "";
var editUserStatus = false;
var regionName = "";
var regionUserId = "";
var regionUserName = "";
var regionDepartmentName = "";
var regionManagerName = "";
var regionRoleFromUserName = "";
var regionUserStatus = false;

var K = "";
var i = "";
var userName = "";
var password = "";
var resetUserName = "";
var adUserName = "";
$(function () {
    $("#tabs").tabs({
        beforeLoad: function (event, ui) {
            ui.jqXHR.error(function () {
                ui.panel.html(
                        "Couldn't load this tab. We'll try to fix this as soon as possible. " +
                        "If this wouldn't be a demo.");
            });
        }
    });

    $('#txtUserName').attr('readonly', 'true');
    $('#txtFirstName').attr('readonly', 'true');
    $('#txtEditUserName').attr('readonly', 'true');
    $('#txtDepartmentEditRegion').attr('readonly', 'true');
    $('#txtManagerEditRegion').attr('readonly', 'true');
    $('#txtCopyRoleFromUserID').attr('readonly', 'true');
    //$('#chkStatus').attr('enable', 'false');
    $('#chkStatus').attr('readonly', true);
    $('#txtUserName').attr('disabled', true);
    $('#txtUserID').focus();
    shortcut.add("F8", function () {
        // find_click();
    });

    shortcut.add("F7", function () {
        var $AddUser = $('#AddUser').is(':visible')
        var $EditUserRoles = $('#EditUserRoles').is(':visible')
        var $AssignRole = $('#AssignRole').is(':visible')
        var $EditUserRegions = $('#EditUserRegions').is(':visible')
        if ($AddUser) {
            ResetNewUser();
        }
        if ($EditUserRoles) {
            ResetNEditUser();
        }
        if ($AssignRole) {
            ResetAssignRoleToAllUserTab();
        }
        if ($EditUserRegions) {
            ResetNEditRegionTab();
        }
    });

    shortcut.add("F9", function () {
        if ($("#txtUserID").is(":focus")) {
            if (userName != "" && password != "") {
                ShowADUserList();
            }
            else {
                GetUserCredential();
            }
        }

        if ($("#txtEditUserID").is(":focus")) {
            OpenUsersLookup("SystemUser");
        }

        if ($("#txtCopyRoleFromEditUserID").is(":focus")) {
            OpenUsersLookup("RoleFromUser");
        }

        if ($("#txtUser").is(":focus")) {
            OpenUsersLookup("UserRegion");
        }

        if ($("#txtDepartment").is(":focus")) {
            OpenDepartmentLookup(false);
        }

        if ($("#txtEditDepartment").is(":focus")) {
            OpenDepartmentLookup(true);
        }

        if ($("#txttUser").is(":focus")) {
            OpenUsersLookup("UserRegion");
        }

        if ($("#txtRoleName").is(":focus")) {
            OpenRolesLookup();
        }
    });

    shortcut.add("F10", function () {
        var $AddUser = $('#AddUser').is(':visible')
        var $EditUserRoles = $('#EditUserRoles').is(':visible')
        var $AssignRole = $('#AssignRole').is(':visible')
        var $EditUserRegions = $('#EditUserRegions').is(':visible')
        if ($AddUser) {
            //   ResetNewUser();
        }
        if ($EditUserRoles) {
            ShowProgressBar();
            SaveEditUser();
            RemoveProgressBar();
        }
        if ($AssignRole) {
            //  ResetAssignRoleToAllUserTab();
        }
        if ($EditUserRegions) {
            //  ResetNEditRegionTab();
        }
    });

    $("#imgUserID").click(function () {
        ShowADUserList();
    });

    $("#imgEditUserID").click(function () {
        OpenUsersLookup("SystemUser");
    });

    $("#imgCopyRoleFromEditUserID").click(function () {
        OpenUsersLookup("RoleFromUser");
    });

    $("#imgUser").click(function () {
        OpenUsersLookup("UserRegion");
    });

    $("#imgDepartment").click(function () {
        OpenDepartmentLookup(false);
    });

    $("#imgEditDepartment").click(function () {
        OpenDepartmentLookup(true);
    });

    $("#imgRoleName").click(function () {
        OpenRolesLookup();
    });

    //////////////////////// reset
    $("#btnReset").click(function () {
        $.noty.closeAll();
        //userId = $("#txtUserID").val();
        $("#txtUserID").val("");
        //resetUserName = $("#txtUserName").val();
        $("#txtUserName").val("");
        //departmentName = $("#txtDepartment").val();
        $("#txtDepartment").val("");
        //managerName = $("#txtManager").val();
        $("#txtManager").val("");
        resetNewUserflag = 0;
        $('#txtUserID').focus();
    });

    $("#btnResetEdit").click(function () {
        $.noty.closeAll();
        //editUserId = $("#txtEditUserID").val();
        $("#txtEditUserID").val("");
        //editUserName = $("#txtEditUserName").val();
        $("#txtEditUserName").val("");
        //editDepartmentName = $("#txtEditDepartment").val();
        $("#txtEditDepartment").val("");
        //editManagerName = $("#txtEditManager").val();
        $("#txtEditManager").val("");
        //editRoleFromUserName = $("#txtCopyRoleFromEditUserID").val();
        $("#txtCopyRoleFromEditUserID").val("");
        //editUserStatus = $('input#chkEditStatus').is(':checked')
        $('#chkEditStatus').attr('checked', false);
        resetEditUserflag = 0;
        $('#txtEditUserID').focus();
    });

    $("#btnResetRoles").click(function () {
        $.noty.closeAll();
        //regionName = $("#txtRoleName").val();
        $("#txtRoleName").val("");
        resetAssignRoleflag = 0;
        $('#txtRoleName').focus();
    });

    $("#btnResetRegion").click(function () {
        $.noty.closeAll();
        //regionUserId = $("#txttUser").val();
        $("#txttUser").val("");
        //regionUserName = $("#txtFirstName").val();
        $("#txtFirstName").val("");
        //regionDepartmentName = $("#txtDepartmentEditRegion").val();
        $("#txtDepartmentEditRegion").val("");
        //regionManagerName = $("#txtManagerEditRegion").val();
        $("#txtManagerEditRegion").val("");
        //regionRoleFromUserName = $("#txtCopyRoleFromUserID").val();
        $("#txtCopyRoleFromUserID").val("");
        //regionUserStatus = $('input#chkStatus').is(':checked')
        $('#chkStatus').attr('checked', false);
        resetAssignRegionflag = 0;
        $('#txttUser').focus();
    });


    ///////////////////// Save funcnality
    $("#btnSaveNew").click(function () {
        $.noty.closeAll();
        if (userName != "" && password != "") {
            SaveNewUser();
        }
        else {
            GetUserCredential();
        }
    });

    $("#btnAddRoles").click(function () {
        // if ($('#txtUserID').val() != "") {
        if (userName != "" && password != "") {
            SaveNewUserWithRoles();
        }
        else {
            GetUserCredential();
        }
        // }
    });

    $("#btnSaveEdit").click(function () {
        //ShowProgressBar();
        SaveEditUser();
        //RemoveProgressBar();
    });

    $("#btnEditRoles").click(function () {
        //if ($('#txtEditUserID').val() != "")
        SaveEditUserWithRoles();
    });

    $("#btnEditUsers").click(function () {
        OpenAssignRoleToUsers();
    });

    $("#btnEditRegions").click(function () {
        OpenAssignRegionsToUser();
    });

    if (userName == "" && password == "") {
        GetUserCredential();
    }

    /////////////////// tab click ///////////
    //declare event to run when div is visible
    //    function isVisible() {
    //        //do something
    //        $('#txtUserID').focus();
    //    }

    //    //hookup the event
    //    $('#AddUser').bind('isVisible', isVisible);
    //    $('#tabs').click(function () {
    //        $('#txtUserID').focus();
    //    });
    //    $("#AddUser").click(function () {
    //        $('#txtUserID').focus();
    //    });

    $("#addUserLink").click(function () {
        $('#txtUserID').focus();
    });
    $("#editUserRolesLink").click(function () {
        $('#txtEditUserID').focus();
    });
    $("#assignRoleLink").click(function () {
        $('#txtRoleName').focus();
    });
    $("#editUserRegionsLink").click(function () {
        $('#txttUser').focus();
    });
    $('#TypeComboSelection').attr('disabled', true);

});


function GetUserCredential() {
    $.noty.closeAll();
    var div = document.createElement('div');
    div.setAttribute('id', 'LookupDesc');

    actionParameters = { userName: "" };

    $(div).dialog(
    {

        autoOpen: false,
        height: 200,
        width: 400,
        modal: true,
        show: {
        effect: 'fade',
        duration: 350
    },
    hide: {
        effect: 'fade',
        duration: 350
    },
        open: function (event, ui) {


            SetNonStandardDialogStyles();
            $("span.ui-dialog-title").text("Please enter user Credential.");
            $(".ui-dialog-content").css("padding", 0);
            var myData = [];
            var grid;
            var select = document.createElement('select');
            select.setAttribute('id', 'LookupDescd');
            var button = document.createElement('button');
            button.setAttribute('id', 'button1');

            var screenWidth = window.screen.availWidth;


            var table = $('<table></table>');
            var row = $('<tr></tr>');
            var column0 = $('<td id=column0  width=5></td>');
            var column1 = $('<td id=column1  width=100></td>');
            var column2 = $('<td id=toinsert  width=5></td>');
            var column3 = $('<td id=column3 width=100></td>');


            row.append(column0);
            row.append(column1);
            row.append(column2);
            row.append(column3);
            table.append(row);
            $('#LookupDesc').append(table);

            ////////////////////////// Add Buttons////////////////////////////////
            column1.append("<br/>");
            column1.append("<br/>");
            column3.append("<br/>");
            column3.append("<br/>");
            var lblUserName = $("<label id=lblUserName>User Name</label>");
            lblUserName.appendTo("#column1");
            column1.append("<br/>");
            var lblPassword = $("<label>Password</label>");
            lblPassword.appendTo("#column1");
            column1.append("<br/>");

            var txtUserName = $("<input id=txtUserName1 type=text class=inputTextLarge />");
            txtUserName.blur(function () {
                userName = $('#txtUserName1').val();
            });

            txtUserName.appendTo("#column3");
            column3.append("<br/>");

            var txtPassword = $("<input id=txtPassword type=password class=inputTextLarge />");
            txtPassword.blur(function () {
                password = $("#txtPassword").val();
            });
            txtPassword.appendTo("#column3");
            column3.append("<br/>");

            $('#lblUserName').focus();

        },

        buttons: {
            "OK": function () {

                if (userName != "" && password != "") {
                    var isValid = false;
                    var actionParameters = { userName: userName, password: password }
                    $.ajax({
                        async: false,
                        url: setUserCredentialAtionUrl,
                        type: "GET",
                        dataType: 'Json',
                        data: actionParameters,
                        cache: false,
                        contentType: 'application/json; charset=UTF-8',
                        success: function (data) {
                            if (data.Data != null) {
                                userName = data.Data.userName;
                                password = data.Data.password;
                                isValid = true;
                            }
                            else {
                                userName = "";
                                password = "";
                                var message = null;
                                if (data != null) {
                                    if (data.length > 0)
                                        message = data[0].Message;
                                }
                                if (errorMessagePanel != null && errorMessagePanel != undefined) {
                                    if (!errorMessagePanel.closed)
                                        errorMessagePanel.setText(message);
                                    else {
                                        errorMessagePanel = noty({ text: message, type: 'warning', dismissQueue: true,
                                            layout: 'bottom', theme: 'defaultTheme'
                                        });
                                    }
                                }
                                else {
                                    errorMessagePanel = noty({ text: message, type: 'error', dismissQueue: true,
                                        layout: 'bottom', theme: 'defaultTheme'
                                    });
                                }
                            }
                        }, //end of success
                        error: function (error) {
                            showMessage('error', 'error');
                        } //end of error
                    });    //end of ajax call
                    if (isValid)
                        $(this).dialog("close");
                    $('#txtUserID').focus();
                }
            },
            "Cancel": function () {
                // RemoveProgressBar();
                $(this).dialog("close");
              //  $(div).remove();
                $('#txtUserID').focus();
            }
        },
        close: function () {
            RemoveProgressBar();
            $(div).remove();
            $('#txtUserID').focus();
        }

    });

    $(div).dialog("open");
};
function ShowADUserList() {
    if ($.trim($('#txtUserID').val()) != "") {
        if (errorMessagePanel != null && errorMessagePanel != undefined) {
            errorMessagePanel.close();
        }
        OpenUsersLookup("ADUser");
    }
    else {
        showMessage('Input characters for user search.', 'information');
//        if (errorMessagePanel != null && errorMessagePanel != undefined) {
//            if (!errorMessagePanel.closed)
//                errorMessagePanel.setText('Please enter input characters for users search.');
//            else {
//                errorMessagePanel = noty({ text: "Please enter input characters for users search.", type: 'warning', dismissQueue: true,
//                    layout: 'bottom', theme: 'defaultTheme'
//                });
//            }
//        }
//        else {
//            errorMessagePanel = noty({ text: "Please enter input characters for users search.", type: 'warning', dismissQueue: true,
//                layout: 'bottom', theme: 'defaultTheme'
//            });
//        }
    }
};

function ResetNewUser() {
    $.noty.closeAll();
   
    if (resetNewUserflag == 0) {
        userId = $("#txtUserID").val();
        $("#txtUserID").val("");
        resetUserName = $("#txtUserName").val();
        $("#txtUserName").val("");
        departmentName = $("#txtDepartment").val();
        $("#txtDepartment").val("");
        managerName = $("#txtManager").val();
        $("#txtManager").val("");
        resetNewUserflag = 1;
    }
    else if (resetNewUserflag == 1) {
        $("#txtUserID").val(userId);
        $("#txtUserName").val(resetUserName);
        $("#txtDepartment").val(departmentName);
        $("#txtManager").val(managerName);
        resetNewUserflag = 0;
    }
    $('#txtUserID').focus();
};

function ResetNEditUser() {
    $.noty.closeAll();
    if (resetEditUserflag == 0) {
        editUserId = $("#txtEditUserID").val();
        $("#txtEditUserID").val("");
        editUserName = $("#txtEditUserName").val();
        $("#txtEditUserName").val("");
        editDepartmentName = $("#txtEditDepartment").val();
        $("#txtEditDepartment").val("");
        editManagerName = $("#txtEditManager").val();
        $("#txtEditManager").val("");
        editRoleFromUserName = $("#txtCopyRoleFromEditUserID").val();
        $("#txtCopyRoleFromEditUserID").val("");
        editUserStatus = $('input#chkEditStatus').is(':checked')
        $('#chkEditStatus').attr('checked', false);
        resetEditUserflag = 1;
    }
    else if (resetEditUserflag == 1) {
        $("#txtEditUserID").val(editUserId);
        $("#txtEditUserName").val(editUserName);
        $("#txtEditDepartment").val(editDepartmentName);
        $("#txtEditManager").val(editManagerName);
        $("#txtCopyRoleFromEditUserID").val(editRoleFromUserName);
        $('#chkEditStatus').attr('checked', editUserStatus);
        resetEditUserflag = 0;
    }
    $('#txtEditUserID').focus();
};

function ResetAssignRoleToAllUserTab() {
    $.noty.closeAll();
    if (resetAssignRoleflag == 0) {
        regionName = $("#txtRoleName").val();
        $("#txtRoleName").val("");
        resetAssignRoleflag = 1;
    }
    else if (resetAssignRoleflag == 1) {
        $("#txtRoleName").val(regionName);
        resetAssignRoleflag = 0;
    }
    $('#txtRoleName').focus();
};


function ResetNEditRegionTab() {
    $.noty.closeAll();
    if (resetAssignRegionflag == 0) {
        regionUserId = $("#txttUser").val();
        $("#txttUser").val("");
        regionUserName = $("#txtFirstName").val();
        $("#txtFirstName").val("");
        regionDepartmentName = $("#txtDepartmentEditRegion").val();
        $("#txtDepartmentEditRegion").val("");
        regionManagerName = $("#txtManagerEditRegion").val();
        $("#txtManagerEditRegion").val("");
        regionRoleFromUserName = $("#txtCopyRoleFromUserID").val();
        $("#txtCopyRoleFromUserID").val("");
        regionUserStatus = $('input#chkStatus').is(':checked')
        $('#chkStatus').attr('checked', false);
        resetAssignRegionflag = 1;
    }
    else if (resetAssignRegionflag == 1) {
        $("#txttUser").val(regionUserId);
        $("#txtFirstName").val(regionUserName);
        $("#txtDepartmentEditRegion").val(regionDepartmentName);
        $("#txtManagerEditRegion").val(regionManagerName);
        $("#txtCopyRoleFromUserID").val(regionRoleFromUserName);
        $('#chkStatus').attr('checked', regionUserStatus);
        resetAssignRegionflag = 0;
    }
    $('#txttUser').focus();
};
function OpenAssignRegionsToUser() {
    $.noty.closeAll();
    var errorMessage = "";
    var isValid = true;

    if ($.trim($("#txttUser").val()) != "") {
        if (!IsUserValid($('#txttUser').val())) {
            isValid = false;
            errorMessage = "Please enter valid user.";
        }
    }
    else {
        isValid = false;
        errorMessage = "Select user to add\\edit region(s).";
    }
    if (isValid) {
        OpenAssignRegionsToUserLookUp();
    }
    else {
        showMessage(errorMessage, 'information');
//        errorMessagePanel = noty({ text: errorMessage, type: 'information', dismissQueue: false,
//            layout: 'bottom', theme: 'defaultTheme'
//        });
    }
};


function OpenAssignRegionsToUserLookUp() {
    var div = document.createElement('div');
    div.setAttribute('id', 'LookupDesc');

    var allRegionList;
    var selectedRegionList = [];
    var selectedRegionCodeList = [];
    var oldSelectedRegionCodeList = [];

    actionParameters = { userId: $('#txttUser').val() };

    $(div).dialog(
    {

        autoOpen: false,
        height: 500,
        width: 930,
        modal: true,
        show: {
            effect: 'fade',
            duration: 350
        },
        hide: {
            effect: 'fade',
            duration: 350
        },
        open: function (event, ui) {
            SetNonStandardDialogStyles();
            $("span.ui-dialog-title").text("Edit Regions");
            $(".ui-dialog-content").css("padding", 0);
            var myData = [];
            var grid;
            var select = document.createElement('select');
            select.setAttribute('id', 'LookupDescd');
            var button = document.createElement('button');
            button.setAttribute('id', 'button1');
            ShowProgressBar();
            $.ajax({
                url: getRegionsAtionUrl,
                type: "GET",
                dataType: 'Json',
                data: actionParameters,
                cache: false,
                success: function (data) {
                    allRegionList = data;
                    var screenWidth = window.screen.availWidth;

                    var headerLabel = $('<br/><label style=font-weight:bold;margin-left:20px>Add/Edit Region to User</label><br/>');
                    $('#LookupDesc').append(headerLabel);

                    var table = $('<table></table>');
                    var row = $('<tr></tr>');
                    var column0 = $('<td id=column0  width=10></td>');
                    var column1 = $('<td id=column1  width=400></td>');


                    var column2 = $('<td id=toinsert  width=100></td>');
                    var column3 = $('<td id=column3 width=400></td>');


                    row.append(column0);
                    row.append(column1);
                    row.append(column2);
                    row.append(column3);
                    table.append(row);
                    $('#LookupDesc').append(table);

                    ////////////////////////// Add Buttons////////////////////////////////
                    var buttonSelectAll = $("<button class=inputButton  style=width:50px;margin-left:20px>>></button>");
                    buttonSelectAll.click(function () {
                        $.each($('#listBox1 option'), function (index, value) {
                            selectedRegionCodeList.push(value.value);
                            $(this).remove().appendTo("#listBox2");
                        });
                        $('#listBox2 option:selected').removeAttr("selected"); 
                    });
                    buttonSelectAll.appendTo("#toinsert");
                    column2.append("<br/>");

                    var buttonSelectOne = $("<button class=inputButton style=width:50px;margin-left:20px>></button>");
                    buttonSelectOne.click(function () {
                        $.each($('#listBox1 option'), function (index, value) {
                            if (this.selected) { // 'this' is the current DOM element, same as 'value'
                                selectedRegionCodeList.push(value.value);
                                $(this).remove().appendTo("#listBox2");
                            }
                        });
                        $('#listBox2 option:selected').removeAttr("selected"); 
                    });
                    buttonSelectOne.appendTo("#toinsert");
                    column2.append("<br/>");

                    var buttonDeSelectOne = $("<button class=inputButton style=width:50px;margin-left:20px><</button>");
                    buttonDeSelectOne.click(function () {
                        $.each($('#listBox2 option'), function (index, value) {
                            if (this.selected) { // 'this' is the current DOM element, same as 'value'
                                selectedRegionCodeList = jQuery.grep(selectedRegionCodeList, function (arrayValue) {
                                    return arrayValue != value.value;
                                });
                                $(this).remove().appendTo("#listBox1");
                            }
                        });
                        $('#listBox1 option:selected').removeAttr("selected"); 
                    });
                    buttonDeSelectOne.appendTo("#toinsert");
                    column2.append("<br/>");

                    var buttonDeSelectAll = $("<button class=inputButton style=width:50px;margin-left:20px><<</button>");
                    buttonDeSelectAll.click(function () {
                        $.each($('#listBox2 option'), function (index, value) {
                            selectedRegionCodeList = jQuery.grep(selectedRegionCodeList, function (arrayValue) {
                                return arrayValue != value.value;
                            });
                            $(this).remove().appendTo("#listBox1");
                        });
                        $('#listBox1 option:selected').removeAttr("selected"); 
                    });
                    buttonDeSelectAll.appendTo("#toinsert");

                    /////////////////////////////////// List Box ///////////////////////////////////////
                    var listBox1Label = $('<br/><label>Available Region(s) from the System to a user</label><br/>');
                    listBox1Label.appendTo("#column1");
                    var listBox1 = $('<select multiple=multiple  style=height:320px;width:400px  id=listBox1 ></select>');
                    listBox1.appendTo("#column1");

                    var listBox2Label = $('<br/><label>Selected Region(s) for the User</label><br/>');
                    listBox2Label.appendTo("#column3");
                    var listBox2 = $('<select multiple=multiple  style=height:320px;width:400px  id=listBox2 ></select>');
                    listBox2.appendTo("#column3");

                    RemoveProgressBar();


                    //////////////////////////// Get user region /////////////////////////////////
                    var actionParametersForRegions = { userId: $('#txttUser').val() }
                    ShowProgressBar();
                    $.ajax({
                        async: false,
                        url: getUserRegionsAtionUrl,
                        type: "GET",
                        dataType: 'Json',
                        cache: false,
                        data: actionParametersForRegions,
                        success: function (userRegions) {
                            if (userRegions != null) {
                                oldSelectedRoleList = userRegions.RoleList;
                                for (var index = 0; index < userRegions.length; index++) {
                                    selectedRegionCodeList.push(userRegions[index].RegionCode);
                                    oldSelectedRegionCodeList.push(userRegions[index].RegionCode);
                                    listBox2.append('<option value="' + userRegions[index].RegionCode + '">' + userRegions[index].RegionCode + '</option>');
                                }
                            }
                            RemoveProgressBar();
                        }, //end of success
                        error: function () {
                            showMessage('error', 'error');
                        } //end of error
                    });  //end of ajax call

                    ///////////////////////////////// add item in first list box //////////////////////////////////
                    var isSelected = false;
                    for (var x = 0; x < data.length; x++) {
                        isSelected = false;
                        for (var i = 0; i < selectedRegionCodeList.length; i++) {
                            if (selectedRegionCodeList[i] == data[x].RegionCode)
                                isSelected = true;
                        }
                        if (!isSelected)
                            listBox1.append('<option value="' + data[x].RegionCode + '">' + data[x].RegionCode + '</option>');
                    }

                }, //end of success
                error: function () {
                    RemoveProgressBar();
                    showMessage('error', 'error');
                } //end of error
            });  //end of ajax call
        },

        buttons: {
            "Save": function () {

                if (selectedRegionCodeList.length > 0) {
                    var unAssignedRegionCoderList = [];
                    var isRegionSelected = false;
                    if (oldSelectedRegionCodeList != null) {
                        for (var index = 0; index < oldSelectedRegionCodeList.length; index++) {
                            isRegionSelected = false;
                            for (var index1 = 0; index1 < selectedRegionCodeList.length; index1++) {
                                if (selectedRegionCodeList[index1] == oldSelectedRegionCodeList[index].RegionCode) {
                                    isRegionSelected = true;
                                    break;
                                }
                            }
                            if (!isRegionSelected) {
                                unAssignedRegionCoderList.push(oldSelectedRegionCodeList[index]);
                            }
                        }
                    }
                    manageUser = { UserId: $("#txttUser").val(), UserName: $("#txtFirstName").val(),
                        DepartmentName: $("#txtDepartmentEditRegion").val(), UserStatus: $('input#chkStatus').is(':checked'),
                        ManagerName: $("#txtManagerEditRegion").val(), CopyRoleFromEditUserID: $('#txtCopyRoleFromUserID').val(),
                        RegionCodeList: selectedRegionCodeList,
                        UnAssignRegionCodeList: unAssignedRegionCoderList
                    };

                    SaveUserRegion(manageUser);

                    $(this).dialog("close");
                }
                else {
                    showMessage("No data found", 'error');
//                    errorMessagePanel = noty({ text: "No data found", type: 'error', dismissQueue: false,
//                        layout: 'bottom', theme: 'defaultTheme'
//                    });
                }
            },
            "Cancel": function () {
                // RemoveProgressBar();
                $(this).dialog("close");
                $(div).remove();
            }
        },
        close: function () {
            RemoveProgressBar();
            $(div).remove();

        }

    });

    $(div).dialog("open");
};

function SaveUserRegion(manageUser) {
    $.noty.closeAll();

    ShowProgressBarWithMsg("Saving");
    $.ajax({
        url: saveUserRegionsAtionUrl,
        data: JSON.stringify(manageUser),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        type: "POST",
        cache: false,
        success: function (data) {
            RemoveProgressBar();
            DisplayAppMessages(data);
        },
        error: function (data) {
            RemoveProgressBar();
                    showMessage("error", 'error');
//            errorMessagePanel = noty({ text: "error", type: 'error', dismissQueue: true,
//                layout: 'bottom', theme: 'defaultTheme'
//            });
        }

    });
};

function OpenAssignRoleToUsers() {
    $.noty.closeAll();
    var isValid = true;
    var errorMessage = "";

    if ($.trim($("#txtRoleName").val()) != "") {
        if (!IsValidRole($('#txtRoleName').val())) {
            isValid = false;
            errorMessage = "Please enter valid role.";
        }
    }
    else {
        isValid = false;
        errorMessage = "Select Role to Update User(s).";
    }
    if (isValid) {
        OpenAssignRoleToUsersLookUp();
    }
    else {
                    showMessage(errorMessage, 'information');
//        noty({ text: errorMessage, type: 'information', dismissQueue: false,
//            layout: 'bottom', theme: 'defaultTheme'
//        });
    }
};

function IsValidRole(roleId) {
    var isValid = true;
    var actionParameters = { strFilter: roleId }
    $.ajax({
        async: false,
        url: isValidRoleAtionUrl,
        type: "GET",
        dataType: 'Json',
        data: actionParameters,
        cache: false,
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            if (data == null) {
                isValid = false;
            }
        }, //end of success
        error: function (error) {
            showMessage('error', 'error');
        } //end of error
    });    //end of ajax call
    return isValid;
};

function OpenAssignRoleToUsersLookUp() {
    
    $.noty.closeAll();
    var div = document.createElement('div');
    div.setAttribute('id', 'LookupDesc');
    var allUserList;
    var selectedUserList = [];
    var selectedUserNameList = [];
    var oldSelectedUserList = [];

    actionParameters = { userName: "" };

    $(div).dialog(
    {

        autoOpen: false,
        height: 500,
        width: 1000,
        modal: true,
        show: {
            effect: 'fade',
            duration: 350
        },
        hide: {
            effect: 'fade',
            duration: 350
        },
        open: function (event, ui) {

            $("span.ui-dialog-title").text("Add/Edit Role to User(s)");
            $(".ui-dialog-content").css("padding", 0);
            var myData = [];
            var grid;
            var select = document.createElement('select');
            select.setAttribute('id', 'LookupDescd');
            var button = document.createElement('button');
            button.setAttribute('id', 'button1');
            ShowProgressBar();
            $.ajax({
                url: systemUserAtionUrl,
                type: "GET",
                dataType: 'Json',
                data: actionParameters,
                cache: false,
                success: function (data) {
                    allUserList = data;
                    var screenWidth = window.screen.availWidth;

                    var headerLabel = $('<br/><label style=font-weight:bold;margin-left:20px>Edit User(s) For : ' + $('#txtRoleName').val() + '</label><br/>');
                    $('#LookupDesc').append(headerLabel);

                    var table = $('<table></table>');
                    var row = $('<tr></tr>');
                    var column0 = $('<td id=column0  width=10></td>');
                    var column1 = $('<td id=column1  width=400></td>');


                    var column2 = $('<td id=toinsert  width=100></td>');
                    var column3 = $('<td id=column3 width=400></td>');


                    row.append(column0);
                    row.append(column1);
                    row.append(column2);
                    row.append(column3);
                    table.append(row);
                    $('#LookupDesc').append(table);

                    ////////////////////////// Add Buttons////////////////////////////////
                    var buttonSelectAll = $("<button class=inputButton  style=width:50px;margin-left:20px>>></button>");
                    buttonSelectAll.click(function () {
                        $.each($('#listBox1 option'), function (index, value) {
                            selectedUserNameList.push(value.value);
                            $(this).remove().appendTo("#listBox2");
                        });
                        $('#listBox2 option:selected').removeAttr("selected");
                    });
                    buttonSelectAll.appendTo("#toinsert");
                    column2.append("<br/>");

                    var buttonSelectOne = $("<button class=inputButton style=width:50px;margin-left:20px>></button>");
                    buttonSelectOne.click(function () {
                        $.each($('#listBox1 option'), function (index, value) {
                            if (this.selected) { // 'this' is the current DOM element, same as 'value'
                                selectedUserNameList.push(value.value);
                                $(this).remove().appendTo("#listBox2");
                            }
                        });
                        $('#listBox2 option:selected').removeAttr("selected");
                    });
                    buttonSelectOne.appendTo("#toinsert");
                    column2.append("<br/>");

                    var buttonDeSelectOne = $("<button class=inputButton style=width:50px;margin-left:20px><</button>");
                    buttonDeSelectOne.click(function () {
                        $.each($('#listBox2 option'), function (index, value) {
                            if (this.selected) { // 'this' is the current DOM element, same as 'value'
                                selectedUserNameList = jQuery.grep(selectedUserNameList, function (arrayValue) {
                                    return arrayValue != value.value;
                                });
                                $(this).remove().appendTo("#listBox1");
                            }
                        });
                        $('#listBox1 option:selected').removeAttr("selected");
                    });
                    buttonDeSelectOne.appendTo("#toinsert");
                    column2.append("<br/>");

                    var buttonDeSelectAll = $("<button class=inputButton style=width:50px;margin-left:20px><<</button>");
                    buttonDeSelectAll.click(function () {
                        $.each($('#listBox2 option'), function (index, value) {
                            selectedUserNameList = jQuery.grep(selectedUserNameList, function (arrayValue) {
                                return arrayValue != value.value;
                            });
                            $(this).remove().appendTo("#listBox1");
                        });
                        $('#listBox1 option:selected').removeAttr("selected");
                    });
                    buttonDeSelectAll.appendTo("#toinsert");

                    /////////////////////////////////// List Box ///////////////////////////////////////
                    var listBox1 = $('<select multiple=multiple  style=height:350px;width:400px  id=listBox1 ></select>');
                    listBox1.appendTo("#column1");

                    var listBox2 = $('<select multiple=multiple  style=height:350px;width:400px  id=listBox2 ></select>');
                    listBox2.appendTo("#column3");

                    RemoveProgressBar();

                    ///////////////////////////////// populate list box //////////////////////////////////
                    var isUserHasRole = false;
                    var selectedRole = $('#txtRoleName').val();
                    for (var i = 0; i < data.length; i++) {
                        isUserHasRole = false;
                        if (data[i].RoleList != null && data[i].PersistFlag != 0) {
                            for (var j = 0; j < data[i].RoleList.length; j++) {
                                if (selectedRole == data[i].RoleList[j].Name) {
                                    isUserHasRole = true;
                                    selectedUserNameList.push(data[i].UserName);
                                    oldSelectedUserList.push(data[i]);
                                    listBox2.append('<option value="' + data[i].UserName + '">' + data[i].UserName + '</option>');
                                    break;
                                }
                            }
                        }
                        if (!isUserHasRole)
                            listBox1.append('<option value="' + data[i].UserName + '">' + data[i].UserName + '</option>');
                    }

                }, //end of success
                error: function () {
                    RemoveProgressBar();
                    showMessage('error', 'error');
                } //end of error
            });  //end of ajax call
        },

        buttons: {
            "Save": function () {
                var unAssignedUserList = [];
                var unAssignedUserNameList = [];
                if (selectedUserNameList != null && selectedUserNameList.length > 0) {
                    for (var index = 0; index < selectedUserNameList.length; index++) {
                        for (var index1 = 0; index1 < allUserList.length; index1++) {
                            if (allUserList[index1].UserName == selectedUserNameList[index]) {
                                var roleList = [];
                                for (var roleIndex = 0; roleIndex < allUserList[index1].RoleList.length; roleIndex++) {
                                    var role = { Name: allUserList[index1].RoleList[roleIndex].Name,
                                        RoleID: allUserList[index1].RoleList[roleIndex].RoleID, PersistFlag: 3
                                    };
                                    roleList.push(role);
                                }
                                var manageUser = { UserId: allUserList[index1].UserId, UserName: allUserList[index1].UserName,
                                    RoleList: roleList
                                };
                                selectedUserList.push(manageUser);
                                break;
                            }
                        }
                    }
                }
                if (oldSelectedUserList != null) {
                    var isUserSelected = false;
                    for (var index = 0; index < oldSelectedUserList.length; index++) {
                        isUserSelected = false;
                        for (var index1 = 0; index1 < selectedUserList.length; index1++) {
                            if (selectedUserList[index1].UserName == oldSelectedUserList[index].UserName) {
                                isUserSelected = true;
                                break;
                            }
                        }
                        if (!isUserSelected) {
                            var roleList = [];
                            for (var roleIndex = 0; roleIndex < oldSelectedUserList[index].RoleList.length; roleIndex++) {
                                var role = { Name: oldSelectedUserList[index].RoleList[roleIndex].Name,
                                    RoleID: oldSelectedUserList[index].RoleList[roleIndex].RoleID, PersistFlag: 3
                                };
                                roleList.push(role);
                            }
                            var manageUser = { UserId: oldSelectedUserList[index].UserId, UserName: oldSelectedUserList[index].UserName,
                                RoleList: roleList
                            };
                            unAssignedUserList.push(manageUser);
                            unAssignedUserNameList.push(oldSelectedUserList[index].UserName);
                        }
                    }
                }
                //                var manageUsersRole = { RoleName: $("#txtRoleName").val(), UserList: selectedUserList,
                //                    UnAssignedUserList: unAssignedUserList
                //                };
                var manageUsersRole = { roleName: $("#txtRoleName").val(), UserNameList: selectedUserNameList,
                    UnAssignedUserNameList: unAssignedUserNameList
                };
                SaveAssignRole(manageUsersRole);
                //                var ActionParameter = {
                //                    manageUsersRole: manageUsersRole
                //                };
                //                var dataToSend = JSON.stringify(ActionParameter);
                //                //$.noty.closeAll();
                //                //contentType: "application/json; charset=utf-8",
                //                $.ajax({
                //                async:false,
                //                    url: assignRoleToUsersAtionUrl,
                //                    type: "POST",
                //                    data: dataToSend,
                //                    dataType: "json",
                //                    contentType: "application/json; charset=utf-8",
                //                    success: function (data) {

                //                        DisplayAppMessages(data);
                //                    },
                //                    error: function (data) {
                //                        errorMessagePanel = noty({ text: "Error", type: 'error', dismissQueue: true,
                //                            layout: 'bottom', theme: 'defaultTheme'
                //                        });
                //                    }

                //                });


                $(this).dialog("close");
            },
            "Cancel": function () {
                // RemoveProgressBar();
                $(this).dialog("close");
                $(div).remove();
            }
        },
        close: function () {
            RemoveProgressBar();
            $(div).remove();

        }

    });

    $(div).dialog("open");
};

function SaveAssignRole(manageUsersRole) {
    $.noty.closeAll();
    var ActionParameter = {
        manageUsersRole: manageUsersRole
    };
    var dataToSend = JSON.stringify(manageUsersRole); //JSON.stringify({ 'manageUsersRole': manageUsersRole });
  
    ShowProgressBarWithMsg("Saving");
    $.ajax({
        url: assignRoleToUsersAtionUrl,
        type: "POST",
        data: dataToSend,
        dataType: "json",
        cache: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            RemoveProgressBar();
            DisplayAppMessages(data);
        },
        error: function (data) {
            RemoveProgressBar();
                    showMessage("Error", 'error');
//            errorMessagePanel = noty({ text: "Error", type: 'error', dismissQueue: true,
//                layout: 'bottom', theme: 'defaultTheme'
//            });
        }

    });
};

function SaveEditUserWithRoles() {
    $.noty.closeAll();
    var isValid = true;
    var errorMessage = "";
//    if (errorMessagePanel != null && errorMessagePanel != undefined)
//        errorMessagePanel.close();
    if ($.trim($("#txtEditUserID").val()) == "") {
        isValid = false;
        if (errorMessage == null)
            errorMessage = "Select user to add/edit role(s).";
        else
            errorMessage = errorMessage + "<br/> Select user to add/edit role(s).";
        $('#txtEditUserID').focus();
    }
    else {
        if (!IsUserValid($('#txtEditUserID').val())) {
            isValid = false;
            if (errorMessage == null)
                errorMessage = "Please enter valid user.";
            else
                errorMessage = errorMessage + "<br/> Please enter valid user.";
        }
        if (!IsUserValid($('#txtCopyRoleFromEditUserID').val())) {
            isValid = false;
            if (errorMessage == null)
                errorMessage = "Please enter valid role from user.";
            else
                errorMessage = errorMessage + "<br/> Please enter valid role from user.";
        }
        if (!IsManagerValid($("#txtEditManager").val())) {
            isValid = false;
            if (errorMessage == null)
                errorMessage = "Manager Name should contain alphabet only.";
            else
                errorMessage = errorMessage + "<br/> Manager Name should contain alphabet only.";
        }
        if (!IsUserDepartment($("#txtEditDepartment").val())) {
            isValid = false;
            if (errorMessage == null)
                errorMessage = "Please enter valid department.";
            else
                errorMessage = errorMessage + "<br/> Please enter valid department.";
        }
    }
    if (isValid) {
        OpenRoleLookUp(false);
    }
    else {
                    showMessage(errorMessage, 'information');
//        errorMessagePanel = noty({ text: errorMessage, type: 'information', dismissQueue: false,
//            layout: 'bottom', theme: 'defaultTheme'
//        });
    }
};

function SaveEditUser() {
    $.noty.closeAll();
    var isValid = true;
    var errorMessage = "";
    var roleList;
    if (errorMessagePanel != null && errorMessagePanel != undefined)
        errorMessagePanel.close();

    if ($.trim($("#txtEditUserID").val()) == "") {
        isValid = false;
        if (errorMessage == null)
            errorMessage = "Select user to add/edit role(s).";
        else
            errorMessage = errorMessage + "<br/> Select user to add/edit role(s).";
        $('#txtEditUserID').focus();
    }
    else {
        if (!IsUserValid($('#txtEditUserID').val())) {
            isValid = false;
            if (errorMessage == null)
                errorMessage = "Please enter valid user.";
            else
                errorMessage = errorMessage + "<br/> Please enter valid user.";
        }
        else {
            if (selectedUser != null)
                roleList = selectedUser.RoleList;
        }
        if (!IsUserValid($('#txtCopyRoleFromEditUserID').val())) {
            isValid = false;
            if (errorMessage == null)
                errorMessage = "Please enter valid role from user.";
            else
                errorMessage = errorMessage + "<br/> Please enter valid role from user.";
        }
        else {
            var message = IsRoleFromUserValid($('#txtEditUserID').val());
            if (message != "") {
                isValid = false;
                if (errorMessage == null)
                    errorMessage = message;
                else
                    errorMessage = errorMessage + "<br/> " + message;
            }
        }
        if (!IsManagerValid($("#txtEditManager").val())) {
            isValid = false;
            if (errorMessage == null)
                errorMessage = "Manager Name should contain alphabet only.";
            else
                errorMessage = errorMessage + "<br/> Manager Name should contain alphabet only.";
        }
        if (!IsUserDepartment($("#txtEditDepartment").val())) {
            isValid = false;
            if (errorMessage == null)
                errorMessage = "Please enter valid department.";
            else
                errorMessage = errorMessage + "<br/> Please enter valid department.";
        }
    }
    if (isValid) {
        var manageUser = { UserId: $("#txtEditUserID").val(), UserName: $("#txtEditUserName").val(),
            DepartmentName: $("#txtEditDepartment").val(), UserStatus: $('input#chkEditStatus').is(':checked'),
            ManagerName: $("#txtEditManager").val(), RoleList: roleList, OldRoleList:roleList,
             CopyRoleFromEditUserID: $("#txtCopyRoleFromEditUserID").val(),
            IsNew: false
        };
        SaveUser(manageUser);
    }
    else {
                    showMessage(errorMessage, 'information');
//        errorMessagePanel = noty({ text: errorMessage, type: 'information', dismissQueue: false,
//            layout: 'bottom', theme: 'defaultTheme'
//        });
    }
};

function IsUserDepartment(departmentId) {
    $.noty.closeAll();
    var isValid = true;
    var actionParameters = { strFilter: departmentId }
    $.ajax({
        async: false,
        url: isValidDepartmentAtionUrl,
        type: "GET",
        dataType: 'Json',
        data: actionParameters,
        cache: false,
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            if (data == null) {
                isValid = false;
            }
        }, //end of success
        error: function (error) {
            showMessage("Error", 'error');
//            noty({ text: "Error", type: 'error', dismissQueue: false,
//                layout: 'bottom', theme: 'defaultTheme'
//            });
        } //end of error
    });    //end of ajax call
    return isValid;
};


function IsRoleFromUserValid(userIdToValidate) {
    $.noty.closeAll();
    var tenmUsers = [];
    var isPresent = false;
    var message = "";
    
    if ($('#txtCopyRoleFromEditUserID').val() != "") {
        var actionParameters = { userId: userIdToValidate }
        $.ajax({
            async: false,
            url: isValidSystemUserAtionUrl,
            type: "GET",
            dataType: 'Json',
            data: actionParameters,
            cache: false,
            contentType: 'application/json; charset=UTF-8',
            success: function (data) {
                if (data != null && selectedUser != null && selectedUser.RoleList != null && selectedUser.RoleList.length > 0 && data.RoleList != null) {
                    
                    for (var i = 0; i < selectedUser.RoleList.length; i++) {
                        isPresent = false;
                        for (var k = 0; k < data.RoleList.length; k++) {
                            if (selectedUser.RoleList[i].Name == data.RoleList[k].Name) {
                                isPresent = true;
                            }
                        }
                        if (!isPresent)
                            tenmUsers.push(selectedUser.RoleList[i]);
                    }
                    if (tenmUsers.length <= 0)
                        message = "User has already the role(s) you want to assign.";
                }

            }, //end of success
            error: function (error) {
                noty({ text: "Error", type: 'error', dismissQueue: false,
                    layout: 'bottom', theme: 'defaultTheme'
                });
            } //end of error
        });             //end of ajax call
    }
    return message;
};

function IsUserValid(userIdToValidate) {
    $.noty.closeAll();
    var isUserValid = true;
    if (userIdToValidate != "") {
        var actionParameters = { userId: userIdToValidate }
        $.ajax({
            async: false,
            url: isValidSystemUserAtionUrl,
            type: "GET",
            dataType: 'Json',
            data: actionParameters,
            cache: false,
            contentType: 'application/json; charset=UTF-8',
            success: function (data) {
                selectedUser = data;
                if (data == null) {
                    isUserValid = false;
                }
            }, //end of success
            error: function (error) {
                noty({ text: "Error", type: 'error', dismissQueue: false,
                    layout: 'bottom', theme: 'defaultTheme'
                });
            } //end of error
        });     //end of ajax call
    }
    return isUserValid;
};

function SaveNewUserWithRoles() {
    $.noty.closeAll();
    var isValid = true;
    var errorMessage = "";
    ShowProgressBarWithMsg("Validating");
    if (errorMessagePanel != null && errorMessagePanel != undefined)
        errorMessagePanel.close();

    if ($.trim($("#txtUserName").val()) == "") {
        isValid = false;
        if (errorMessage == null)
            errorMessage = "Select user to add role(s).";
        else
            errorMessage = errorMessage + "<br/> Select user to add role(s).";
        $('#txtUserID').focus();
    }
    else {
        if (!IsADUserValid()) {
            isValid = false;
            if (errorMessage == null)
                errorMessage = "Please enter valid user.";
            else
                errorMessage = errorMessage + "<br/> Please enter valid user.";
        }
        if (IsUserExist()) {
            isValid = false;
            if (errorMessage == null)
                errorMessage = "User :" + $("#txtUserName").val() + " already exist in system." + " User Status: " + strSelectedUserActive;
            else
                errorMessage = errorMessage + "<br/> User :" + $("#txtUserName").val() + " already exist in system. User [Edit User Roles] for updating roles." + " User Status: " + strSelectedUserActive;
        }
        if (!IsManagerValid($("#txtManager").val())) {
            isValid = false;
            if (errorMessage == null)
                errorMessage = "Manager Name should contain alphabet only.";
            else
                errorMessage = errorMessage + "<br/> Manager Name should contain alphabet only.";
        }
        if (!IsUserDepartment($("#txtDepartment").val())) {
            isValid = false;
            if (errorMessage == null)
                errorMessage = "Please enter valid department.";
            else
                errorMessage = errorMessage + "<br/> Please enter valid department.";
        }
    }
    RemoveProgressBar();
    if (isValid) {
        OpenRoleLookUp(true);
    }
    else {
        showMessage(errorMessage, 'information');
//        errorMessagePanel = noty({ text: errorMessage, type: 'information', dismissQueue: false,
//            layout: 'bottom', theme: 'defaultTheme'
//        });
    }
};

function SaveNewUser() {
    $.noty.closeAll();
    var isValid = true;
    var errorMessage = "";
    if (errorMessagePanel != null && errorMessagePanel != undefined)
        errorMessagePanel.close();

    if ($.trim($('#txtUserID').val()) == "") {
        isValid = false;
        if (errorMessage == null)
            errorMessage = "Select User.";
        else
            errorMessage = errorMessage + "<br/> Select User.";
    }
    else {
        if (!IsADUserValid()) {
            isValid = false;
            if (errorMessage == null)
                errorMessage = "Please enter valid user.";
            else
                errorMessage = errorMessage + "<br/> Please enter valid user.";
        }
        if (IsUserExist()) {
            isValid = false;
            if (errorMessage == null)
                errorMessage = "User :" + $("#txtUserName").val() + " already exist in system." + " User Status: " + strSelectedUserActive;
            else
                errorMessage = errorMessage + "<br/> User :" + $("#txtUserName").val() + " already exist in system." + " User Status: " + strSelectedUserActive;
        }
        if (!IsManagerValid($("#txtManager").val())) {
            isValid = false;
            if (errorMessage == null)
                errorMessage = "Manager Name should contain alphabet only.";
            else
                errorMessage = errorMessage + "<br/> Manager Name should contain alphabet only.";
        }
        if (!IsUserDepartment($("#txtDepartment").val())) {
            isValid = false;
            if (errorMessage == null)
                errorMessage = "Please enter valid department.";
            else
                errorMessage = errorMessage + "<br/> Please enter valid department.";
        }
    }
    if (isValid) {
        var manageUser = { UserId: $("#txtUserID").val(), UserName: $("#txtUserName").val(),
            DepartmentName: $("#txtDepartment").val(), UserStatus: true,
            ManagerName: $("#txtManager").val(), IsNew: true
        };
        SaveUser(manageUser);
    }
    else {
        showMessage(errorMessage, 'information');
//        errorMessagePanel = noty({ text: errorMessage, type: 'error', dismissQueue: true,
//            layout: 'bottom', theme: 'defaultTheme'
//        });
    }
};

function IsADUserValid() {
    var isADUserValid = true;
    var actionParameters = { userId: $('#txtUserID').val(), secureUserName: userName, securePassword: password }
    $.ajax({
        async: false,
        url: isValidADSystemUser,
        type: "GET",
        dataType: 'Json',
        data: actionParameters,
        cache: false,
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            if (data == null) {
                isADUserValid = false;
            }
        }, //end of success
        error: function (error) {
            showMessage('error', 'error');
        } //end of error
    });    //end of ajax call
    return isADUserValid;
};


function IsManagerValid( managerName) {
    var isManagerValid = true;
    var re = /^[A-Za-z ]+$/;
    if (re.test(managerName)) {
        isManagerValid=true;
    }
    else if (managerName!="") {
        isManagerValid=false;
    }
    return isManagerValid;
};

function IsUserExist() {
    var isUserExist = false;
    var actionParameters = { userName: $('#txtUserName').val() }
    $.ajax({
        async: false,
        url: isUserExistAtionUrl,
        type: "GET",
        dataType: 'Json',
        data: actionParameters,
        cache: false,
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            if (data != null) {
                //strSelectedUserActive = data.SelectedUserActive;
                isUserExist = true;
            }
        }, //end of success
        error: function (error) {
            showMessage('error', 'error');
        } //end of error
    });    //end of ajax call
    if (adUserName != null) {
        $.ajax({
            async: false,
            url: menUserDetailAtionUrl,
            type: "GET",
            dataType: 'Json',
            cache: false,
            data: { userName: adUserName, isAdUser: true },
            success: function (data) {
                if (data != null) {
                    strSelectedUserActive = data.SelectedUserActive;
                }
            }, //end of success
            error: function () {
                RemoveProgressBar();
                showMessage('error', 'error');
            } //end of error
        });   //end of ajax call
    }
    return isUserExist;
};

function SaveUser(manageUser) {
    $.noty.closeAll();
    if (errorMessagePanel != null && errorMessagePanel != undefined)
        errorMessagePanel.close();
    var manageUserData =  manageUser;
    ShowProgressBarWithMsg("Saving");
    $.ajax({
        url: saveNewUserAtionUrl,
        type: "POST",
        dataType: 'Json',
        data: JSON.stringify(manageUser),
        cache: false,
        contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            RemoveProgressBar();
            DisplayAppMessages(data);
        }, //end of success
        error: function (error) {
            RemoveProgressBar();
            showMessage("Error", 'error');
//            noty({ text: "Error", type: 'error', dismissQueue: false,
//                layout: 'bottom', theme: 'defaultTheme'
//            });
        } //end of error
    });     //end of ajax call


};

function OpenRoleLookUp(isNewUser) {
    $.noty.closeAll();
    var div = document.createElement('div');
    div.setAttribute('id', 'LookupDesc');

    var allRoleList ;
    var selectedRoleList = [];
    var selectedRoleNameList = [];
    var oldSelectedRoleList = [];
    var lookupTitle = "";
    if (isNewUser) {
        lookupTitle = "Add Roles";
    }
    else
        lookupTitle = "Edit Roles";
    actionParameters = { strFilter: "" };
   
    gridwidth = 1000;
    gridheight = 500;

    $(div).dialog(
    {

        autoOpen: false,
        height: gridheight,
        width: gridwidth,
        modal: true,
        show: {
            effect: 'fade',
            duration: 350
        },
        hide: {
            effect: 'fade',
            duration: 350
        },
        open: function (event, ui) {

            $("span.ui-dialog-title").text(lookupTitle);
            $(".ui-dialog-content").css("padding", 0);
            var myData = [];
            var grid;
            var select = document.createElement('select');
            select.setAttribute('id', 'LookupDescd');
            var button = document.createElement('button');
            button.setAttribute('id', 'button1');
            ShowProgressBar();
            $.ajax({
                url: userRoleAtionUrl,
                type: "GET",
                dataType: 'Json',
                data: actionParameters,
                cache: false,
                success: function (data) {
                    allRoleList = data;
                    var screenWidth = window.screen.availWidth;
                    var userName = ""; 
                    if (isNewUser) {
                        userName = $('#txtUserID').val();
                    }
                    else
                        userName = $('#txtEditUserID').val();
                    var headerLabel = $('<br/><label style=font-weight:bold;margin-left:20px>Manage Roles For User : ' + userName.toUpperCase() + '</label><br/>');
                    $('#LookupDesc').append(headerLabel);

                    var table = $('<table></table>');
                    var row = $('<tr></tr>');
                    var column0 = $('<td id=column0  width=10></td>');
                    var column1 = $('<td id=column1  width=400></td>');


                    var column2 = $('<td id=toinsert  width=100></td>');
                    var column3 = $('<td id=column3 width=400></td>');


                    row.append(column0);
                    row.append(column1);
                    row.append(column2);
                    row.append(column3);
                    table.append(row);
                    $('#LookupDesc').append(table);

                    ////////////////////////// Add Buttons////////////////////////////////
                    var buttonSelectAll = $("<button class=inputButton  style=width:50px;margin-left:20px>>></button>");
                    buttonSelectAll.click(function () {
                        $.each($('#listBox1 option'), function (index, value) {
                            selectedRoleNameList.push(value.value);
                            $(this).remove().appendTo("#listBox2");
                        });
                        $('#listBox2 option:selected').removeAttr("selected");
                    });
                    buttonSelectAll.appendTo("#toinsert");
                    column2.append("<br/>");

                    var buttonSelectOne = $("<button class=inputButton style=width:50px;margin-left:20px>></button>");
                    buttonSelectOne.click(function () {
                        $.each($('#listBox1 option'), function (index, value) {
                            if (this.selected) { // 'this' is the current DOM element, same as 'value'
                                selectedRoleNameList.push(value.value);
                                $(this).remove().appendTo("#listBox2");
                                //selectedIndices.push(index);
                            }
                        });
                        $('#listBox2 option:selected').removeAttr("selected");
                    });
                    buttonSelectOne.appendTo("#toinsert");
                    column2.append("<br/>");

                    var buttonDeSelectOne = $("<button class=inputButton style=width:50px;margin-left:20px><</button>");
                    buttonDeSelectOne.click(function () {
                        $.each($('#listBox2 option'), function (index, value) {
                            if (this.selected) { // 'this' is the current DOM element, same as 'value'
                                selectedRoleNameList = jQuery.grep(selectedRoleNameList, function (arrayValue) {
                                    return arrayValue != value.value;
                                });
                                $(this).remove().appendTo("#listBox1");
                            }
                        });
                        $('#listBox1 option:selected').removeAttr("selected");
                    });
                    buttonDeSelectOne.appendTo("#toinsert");
                    column2.append("<br/>");

                    var buttonDeSelectAll = $("<button class=inputButton style=width:50px;margin-left:20px><<</button>");
                    buttonDeSelectAll.click(function () {
                        $.each($('#listBox2 option'), function (index, value) {
                            selectedRoleNameList = jQuery.grep(selectedRoleNameList, function (arrayValue) {
                                return arrayValue != value.value;
                            });
                            $(this).remove().appendTo("#listBox1");
                        });
                        $('#listBox1 option:selected').removeAttr("selected");
                    });
                    buttonDeSelectAll.appendTo("#toinsert");

                    /////////////////////////////////// List Box ///////////////////////////////////////
                    var listBox1 = $('<select multiple=multiple  style=height:350px;width:400px  id=listBox1 ></select>');
                    //                    for (var x = 0; x < data.length; x++) {
                    //                            listBox1.append('<option value="' + data[x].RoleID + '">' + data[x].Name + '</option>');
                    //                    }
                    listBox1.appendTo("#column1");

                    var listBox2 = $('<select multiple=multiple  style=height:350px;width:400px  id=listBox2 ></select>');
                    listBox2.appendTo("#column3");

                    RemoveProgressBar();

                    //////////////////////////// Get Roles for user /////////////////////////////////
                    var actionParametersForRoles;
                    //                    var selectedRoleNameList = [];
                    if (isNewUser)
                        actionParametersForRoles = { userId: $('#txtUserID').val() }
                    else
                        actionParametersForRoles = { userId: $('#txtEditUserID').val() }
                    ShowProgressBar();
                    $.ajax({
                        async: false,
                        url: rolesForUserAtionUrl,
                        type: "GET",
                        dataType: 'Json',
                        cache: false,
                        data: actionParametersForRoles,
                        success: function (userRoles) {
                            if (userRoles != null) {
                                oldSelectedRoleList = userRoles.RoleList;
                                for (var index = 0; index < userRoles.RoleList.length; index++) {
                                    //selectedRoleNameList.push(userRoles.RoleList[index].RoleID);
                                    selectedRoleNameList.push(userRoles.RoleList[index].Name);
                                    // $('#listBox1 option[Text=' + userRoles.RoleList[index].Name + ']').remove();
                                    //                                    var selectedOpts = $('#listBox1 option[value=' + userRoles.RoleList[index].RoleID + ']');
                                    //                                    $(selectedOpts).remove();
                                    listBox2.append('<option value="' + userRoles.RoleList[index].Name + '">' + userRoles.RoleList[index].Name + '</option>');
                                }
                            }
                            RemoveProgressBar();
                        }, //end of success
                        error: function () {
                            showMessage('error', 'error');
                        } //end of error
                    });  //end of ajax call

                    ///////////////////////////////// add item in first list box //////////////////////////////////
                    var isSelected = false;
                    for (var x = 0; x < data.length; x++) {
                        isSelected = false;
                        for (var i = 0; i < selectedRoleNameList.length; i++) {
                            if (selectedRoleNameList[i] == data[x].Name)
                                isSelected = true;
                        }
                        if (!isSelected)
                            listBox1.append('<option value="' + data[x].Name + '">' + data[x].Name + '</option>');
                    }

                }, //end of success
                error: function () {
                    RemoveProgressBar();
                    showMessage('error', 'error');
                } //end of error
            });  //end of ajax call
        },

        buttons: {
            "Save": function () {
                if (selectedRoleNameList != null && selectedRoleNameList.length > 0) {
                    for (var index = 0; index < selectedRoleNameList.length; index++) {
                        for (var index1 = 0; index1 < allRoleList.length; index1++) {
                            if (allRoleList[index1].Name == selectedRoleNameList[index]) {
                                var role = { Name: allRoleList[index1].Name,
                                    RoleID: allRoleList[index1].RoleID
                                };
                                selectedRoleList.push(role);
                                break;
                            }
                        }
                    }
                }
                var manageUser;
                if (isNewUser) {
                    manageUser = { UserId: $("#txtUserID").val(), UserName: $("#txtUserName").val(),
                        DepartmentName: $("#txtDepartment").val(), UserStatus: true,
                        ManagerName: $("#txtManager").val(), RoleList: selectedRoleList,
                        OldRoleList: oldSelectedRoleList,
                        IsNew: isNewUser
                    };
                }
                else {
                    manageUser = { UserId: $("#txtEditUserID").val(), UserName: $("#txtEditUserName").val(),
                        DepartmentName: $("#txtEditDepartment").val(), UserStatus: $('input#chkEditStatus').is(':checked'),
                        ManagerName: $("#txtEditManager").val(), RoleList: selectedRoleList,
                        OldRoleList: oldSelectedRoleList,
                        IsNew: isNewUser
                    }; //, CopyRoleFromEditUserID: $("#txtCopyRoleFromEditUserID").val()
                }
                SaveUser(manageUser);

                $(this).dialog("close");
            },
            "Cancel": function () {
                RemoveProgressBar();
                $(this).dialog("close");
                $(div).remove();
            }
        },
        close: function () {
            RemoveProgressBar();
            $(div).remove();

        }

    });

    $(div).dialog("open");
    return selectedRoleList;
};

function showemptygrid() {

    var emptyrow = [];

    emptyrow[0] =
      {
          UserId: "",
          UserName: ""
      };
    setGridParameters();
    ShowGrid(gridContainerDiv, SeriessearchactionUrl, actionParameters, visiblecolumns, null, options, idfield, gridwidth, gridheight, ToggleButton, emptyrow);
}

function OpenRolesLookup() {
    lookupInvokerControl = "#txtRoleName";
    lookupDescriptionControl = "";
    actionParameters = { strFilter: $("#txtRoleName").val() };

    columns = [

                                   { id: "Name", width: 900, name: "Role Name", field: "Name" },
                                   { id: "Description", width: 900, name: "Role Description", field: "Description" }
                               ];
    options = {
        enableCellNavigation: true,
        enableColumnReorder: false,
        forceFitColumns: true,
        editable: true
    };
    //selected dmNumber from the grid will be available in the global variable 'selectedvalue' 
    idfield = "Name";
    gridwidth = 1000;
    gridheight = 400;
    lookupTitle = "User Roles";
    resetAssignRoleflag = 0;
  //ShowUsersLookupDesc(lookupInvokerControl, lookupDescriptionControl, actionUrl, actionParameters, columns, options, idfield, idFieldDesc, gridwidth, gridheight, lookupTitle, LookupOperation);
    ShowLookup(lookupInvokerControl, userRoleAtionUrl, actionParameters, columns, options, idfield, gridwidth, gridheight, lookupTitle);
};


function OpenDepartmentLookup(isEditDepartment) {
    //$.noty.closeAll();
    if (isEditDepartment) {
        lookupInvokerControl = "#txtEditDepartment";
        actionParameters = { strFilter: $("#txtEditDepartment").val() };
    }
    else {
        lookupInvokerControl = "#txtDepartment";
        actionParameters = { strFilter: $("#txtDepartment").val() };
    }
    columns = [

                                   { id: "DepartmentId", width: 900, name: "Department ID", field: "DepartmentId" },
                                   { id: "DepartmentName", width: 900, name: "Department Name", field: "DepartmentName" }
                               ];
    options = {
            enableCellNavigation: true,
            enableColumnReorder: false,
            forceFitColumns: true,
            editable : true,
            autoEdit: true
    };
    //selected dmNumber from the grid will be available in the global variable 'selectedvalue' 
    idfield = "DepartmentId";
    gridwidth = 1000;
    gridheight = 400;
    lookupTitle = "Departments";
    ShowLookup(lookupInvokerControl, departmentAtionUrl, null, columns, options, idfield, gridwidth, gridheight, lookupTitle);
};



function OpenUsersLookup(LookupOperation) {
    $.noty.closeAll();
    var actionUrl;
    var headerName = "";
    if (LookupOperation=="ADUser") {
        lookupInvokerControl = "#txtUserID";
        lookupDescriptionControl = "#txtUserName";
        actionUrl = ADUserAtionUrl;
        lookupTitle = "Active Directory Users";
        actionParameters = { userName: $("#txtUserID").val(), secureUserName: userName, securePassword: password };
        headerName = "Name";
    }
    else if (LookupOperation == "SystemUser") {
        lookupInvokerControl = "#txtEditUserID";
        lookupDescriptionControl = "#txtEditUserName";
        actionUrl = systemUserAtionUrl;
        lookupTitle = "User Details";
        actionParameters = { userName: $("#txtEditUserID").val() };
        headerName = "User Id";
    }
    else if (LookupOperation == "UserRegion") {
        lookupInvokerControl = "#txttUser";
        lookupDescriptionControl = "#txtFirstName";
        actionUrl = systemUserAtionUrl;
        lookupTitle = "User Details";
        actionParameters = { userName: $("#txttUser").val() };
        headerName = "User Id";
    }
    else {
        lookupInvokerControl = "#txtCopyRoleFromEditUserID";
        lookupDescriptionControl = "";
        actionUrl = systemUserAtionUrl;
        lookupTitle = "User Details";
        actionParameters = { userName: $("#txtCopyRoleFromEditUserID").val() };
        headerName = "User Id";
    }
    columns = [

                                   { id: "UserId", width: 900, name: headerName, field: "UserId", sortable: true },
                                   { id: "UserName", width: 900, name: "User name", field: "UserName", sortable: true }
                               ];
    options =
        {
            enableCellNavigation: true,
            enableColumnReorder: false,
            forceFitColumns: true,
            multiColumnSort: true,
            asyncEditorLoading: false,
            showHeaderRow: true,
            explicitInitialization: true
        };
    //selected dmNumber from the grid will be available in the global variable 'selectedvalue' 
    idfield = "UserId";
    idFieldDesc = "UserName";
    gridwidth = 1000;
    gridheight = 410;
    ShowUsersLookupDesc(lookupInvokerControl, lookupDescriptionControl, actionUrl, actionParameters, columns, options, idfield, idFieldDesc, gridwidth, gridheight, lookupTitle, LookupOperation);
};


function ShowUsersLookupDesc(lookupInvokerControl, lookupDescriptionControl, actionUrl, actionParameters, columns, options, idfield, idFieldDesc, gridwidth, gridheight, title, LookupOperation) {
    var div = document.createElement('div');
    div.setAttribute('id', 'LookupDesc');

    var lookupgridvalue;
    var lookupgridDesc;
    var userStatus;
    var managerName;
    var isADUser = false;
    var roleFromUserName = "";
    var colFilters = {};
    $(div).dialog(
    {

        autoOpen: false,
        height: gridheight,
        width: gridwidth,
        modal: true,
        show: {
            effect: 'fade',
            duration: 350
        },
        hide: {
            effect: 'fade',
            duration: 350
        },
        open: function (event, ui) {

            SetNonStandardDialogStyles();
            var title = "User Details";
            if (LookupOperation == "ADUser") {
                title = "Active Directory Users";
            }
            $("span.ui-dialog-title").text(title);
            var myData = [];
            var grid;
            ShowProgressBar();
            $.ajax({
                url: actionUrl,
                type: "GET",
                dataType: 'Json',
                data: actionParameters,
                cache: false,
                success: function (data) {
                    var message = null;
                    if (data != null) {
                        if (data.length > 0)
                            message = data[0].Message;
                    }
                    if (message == null) {
                        myData = data;
                        var gridDiv = document.createElement('div');
                        gridDiv.setAttribute('id', 'gridDiv');
                        $(gridDiv).css('height', gridheight - 125);
                        $(gridDiv).css('width', gridwidth - 15);
                        $('#LookupDesc').append(gridDiv);

                        //grid = new Slick.Grid("#gridDiv", myData, columns, options);

                        dataView = new Slick.Data.DataView();
                        grid = new Slick.Grid("#gridDiv", dataView, columns, options);
                        grid.setSelectionModel(new Slick.RowSelectionModel());


                        grid.onClick.subscribe(function (e, args) {
                            var cell = grid.getCellFromEvent(e);
                            var row = cell.row;
                            lookupgridvalue = dataView.getItem(cell.row)[idfield];
                            lookupgridDesc = dataView.getItem(cell.row)[idFieldDesc];
                            if (dataView.getItem(cell.row).RoleList != null && dataView.getItem(cell.row).RoleList.length > 0)
                                roleFromUserName = dataView.getItem(cell.row).RoleList[0].Name;
                        });

                        grid.onSort.subscribe(function (e, args) {
                            SortGrid(args, dataView);
                        });
                        dataView.onRowCountChanged.subscribe(function (e, args) {
                            grid.updateRowCount();
                            grid.render();
                        });

                        dataView.onRowsChanged.subscribe(function (e, args) {
                            grid.invalidateRows(args.rows);
                            grid.render();
                        });


                        $(grid.getHeaderRow()).delegate(":input", "change keyup", function (e) {

                            var columnId = $(this).data("columnId");

                            if (columnId != null) {

                                colFilters[columnId] = $.trim($(this).val());
                                //alert(colFilters[columnId]);    
                                dataView.refresh();
                            }
                        });

                        grid.onKeyDown.subscribe(function (e, args) {
                            if (e.keyCode == 13) {
                                var lookupObject = {
                                    lookupInvokerControl: lookupInvokerControl,
                                    lookupDescriptionControl: lookupDescriptionControl,
                                    LookupOperation: LookupOperation,
                                    lookupgridvalue: lookupgridvalue,
                                    lookupgridDesc: lookupgridDesc,
                                    departmentName: departmentName,
                                    managerName: managerName,
                                    userStatus: userStatus,
                                    roleFromUserName: roleFromUserName
                                };
                                AssignUserLookupValue(lookupObject);
                            }
                        });
                        grid.onDblClick.subscribe(function (e, args) {
                            var lookupObject = {
                                lookupInvokerControl: lookupInvokerControl,
                                lookupDescriptionControl: lookupDescriptionControl,
                                LookupOperation: LookupOperation,
                                lookupgridvalue: lookupgridvalue,
                                lookupgridDesc: lookupgridDesc,
                                departmentName: departmentName,
                                managerName: managerName,
                                userStatus: userStatus,
                                roleFromUserName: roleFromUserName
                            };
                            //$('#Ok').click();
                            AssignUserLookupValue(lookupObject);
                            //                                                        $(this).dialog("close");
                            //                                                        $(div).remove();
                            //                                                        $(lookupObject.lookupInvokerControl).focus();

                        });
                        grid.onHeaderRowCellRendered.subscribe(function (e, args) {
                            $(args.node).empty();
                            $("<input type='text'>")
                           .data("columnId", args.column.id)
                           .val(colFilters[args.column.id])
                           .appendTo(args.node);
                        });
                        dataView.onRowCountChanged.subscribe(function (e, args) {
                            grid.updateRowCount();
                            grid.render();
                            setPopupFooter('#LookupDesc', dataView.getLength());
                        });

                        //                        dataView.onRowsChanged.subscribe(function (e, args) {
                        //                            grid.invalidateRows(args.rows);
                        //                            grid.render();                            
                        //                        });
                        function filter(item) {

                            for (var columnId in colFilters) {

                                if (columnId !== undefined && colFilters[columnId] !== "") {
                                    var c = grid.getColumns()[grid.getColumnIndex(columnId)];
                                    if (String(item[c.field].toUpperCase()).indexOf(colFilters[columnId].toUpperCase()) != 0) {
                                        if (String(item[c.field]).indexOf(colFilters[columnId]) != 0) {
                                            return false;
                                        }
                                    }

                                }
                            }
                            return true;
                        }
                        grid.init();
                        dataView.beginUpdate();
                        dataView.setItems(data, 'UserId');
                        dataView.setFilter(filter);
                        dataView.endUpdate();
                        grid.setActiveCell(0, 0);
                        ///////////////////////////////////// set first row data /////////////////////////////
                        if (data.length > 0) {
                            lookupgridvalue = data[0][idfield];
                            lookupgridDesc = data[0][idFieldDesc];
                            if (data[0].RoleList != null && data[0].RoleList.length > 0)
                                roleFromUserName = data[0].RoleList[0].Name;                           

                            lookupgridDesc = data[0][idFieldDesc];
                        }
                        var rowCount = 0;
                        if (data != null)
                            rowCount = data.length;
                        var totalrecord = $('<br/><label>Total number of rows displayed: ' + rowCount + '</label><br/>');
                        //$('#LookupDesc').append(totalrecord);
                        setPopupFooter('#LookupDesc', dataView.getLength());
                        grid.focus();
                    }
                    else {
                        var errorMessage = "";
                        for (var index = 0; index < data.length; index++) {
                            if (errorMessage == "")
                                errorMessage = data[index].Message;
                            else
                                errorMessage = errorMessage + "<br/>" + data[index].Message;
                        }
                        if (errorMessage != "") {
                            showMessage(errorMessage, 'error');
                            //                            noty({ text: errorMessage, type: 'error', dismissQueue: true,
                            //                                layout: 'bottom', theme: 'defaultTheme'
                            //                            });
                        }
                    }
                    RemoveProgressBar();
                }, //end of success
                error: function () {
                    RemoveProgressBar();
                    showMessage('error', 'error');
                } //end of error
            });  //end of ajax call
        },

        buttons: {
            "OK": function () {
                var lookupObject = {
                    lookupInvokerControl: lookupInvokerControl,
                    lookupDescriptionControl: lookupDescriptionControl,
                    LookupOperation: LookupOperation,
                    lookupgridvalue: lookupgridvalue,
                    lookupgridDesc: lookupgridDesc,
                    departmentName: departmentName,
                    managerName: managerName,
                    userStatus: userStatus,
                    roleFromUserName: roleFromUserName
                };
                AssignUserLookupValue(lookupObject);
                //                $(lookupInvokerControl).val(lookupgridvalue);
                //                $(lookupInvokerControl).focus();
                //                if (LookupOperation == "ADUser") {
                //                    resetNewUserflag = 0;
                //                    $(lookupDescriptionControl).val(lookupgridDesc);
                //                    $('#txtDepartment').val(departmentName);
                //                    $('#txtManager').val(managerName);
                //                }
                //                else if (LookupOperation == "SystemUser") {
                //                    resetEditUserflag = 0;
                //                    $(lookupDescriptionControl).val(lookupgridDesc);
                //                    $('#txtEditDepartment').val(departmentName);
                //                    $('#txtEditManager').val(managerName);
                //                    $('#chkEditStatus').attr("checked", userStatus);
                //                }
                //                else if (LookupOperation == "UserRegion") {
                //                    resetAssignRegionflag = 0;
                //                    $(lookupDescriptionControl).val(lookupgridDesc);
                //                    $('#txtDepartmentEditRegion').val(departmentName);
                //                    $('#txtManagerEditRegion').val(managerName);
                //                    $('#chkStatus').attr("checked", userStatus);
                //                    $('#txtCopyRoleFromUserID').val(roleFromUserName);
                //                }

                //                $(this).dialog("close");
            },
            "Cancel": function () {
                $(lookupInvokerControl).focus();
                RemoveProgressBar();
                $(this).dialog("close");
                $(div).remove();
            }
        },
        close: function () {
            $(lookupInvokerControl).focus();
            RemoveProgressBar();
            $(div).remove();

        }

    });

    $(div).dialog("open");


};
 

function AssignUserLookupValue(lookupObject) {
    //    $.noty.closeAll();
    //var domen=document.domain;
    $(lookupObject.lookupInvokerControl).val(lookupObject.lookupgridvalue);
    if (lookupObject.LookupOperation != "RoleFromUser") {
        var isADUser = false;
        if (lookupObject.LookupOperation == "ADUser") {
            isADUser = true;
        }
        adUserName = lookupObject.lookupgridDesc;
        $.ajax({
            async: false,
            url: menUserDetailAtionUrl,
            type: "GET",
            dataType: 'Json',
            cache: false,
            data: { userName: lookupObject.lookupgridDesc, isAdUser: isADUser },
            success: function (data) {
                myData = data;
                if (lookupObject.LookupOperation == "ADUser") {
                    lookupObject.lookupgridDesc = data.UserNameDesc;
                }
                lookupObject.departmentName = data.DepartmentName;
                lookupObject.managerName = data.ManagerName;
                strSelectedUserActive = data.SelectedUserActive;
                lookupObject.userStatus = data.UserStatus;
            }, //end of success
            error: function () {
                RemoveProgressBar();
                showMessage('error', 'error');
            } //end of error
        });  //end of ajax call
    }
    if (lookupObject.LookupOperation == "ADUser") {
        resetNewUserflag = 0;
        $(lookupDescriptionControl).val(lookupObject.lookupgridDesc);
        if (lookupObject.departmentName!=null)
            $('#txtDepartment').val(lookupObject.departmentName);
        if (lookupObject.managerName!=null)
            $('#txtManager').val(lookupObject.managerName);
    }
    else if (lookupObject.LookupOperation == "SystemUser") {
        resetEditUserflag = 0;
        $(lookupDescriptionControl).val(lookupObject.lookupgridDesc);
        $('#txtEditDepartment').val(lookupObject.departmentName);
        $('#txtEditManager').val(lookupObject.managerName);
        $('#chkEditStatus').attr("checked", lookupObject.userStatus);
    }
    else if (lookupObject.LookupOperation == "UserRegion") {
        resetAssignRegionflag = 0;
        $(lookupDescriptionControl).val(lookupObject.lookupgridDesc);
        $('#txtDepartmentEditRegion').val(lookupObject.departmentName);
        $('#txtManagerEditRegion').val(lookupObject.managerName);
        $('#chkStatus').attr("checked", lookupObject.userStatus);
        $('#txtCopyRoleFromUserID').val(lookupObject.roleFromUserName);
    }

    $('#LookupDesc').dialog("close");
    $(lookupObject.lookupInvokerControl).focus();
};