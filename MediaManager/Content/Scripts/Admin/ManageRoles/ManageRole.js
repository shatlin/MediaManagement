var progressbar_x;
var progressbar_y;
var dataView;
var grid;
var roleid;
var selectedvalue;
var x;
var UpData = [];
var emptyrow = [];
var visiblecolumns = [];
var selectedvalue = [];
var gridContainerDiv;
var ToggleButton1;
var ToggleButton2;
var columns;
var options;
var actionParameters;
var idfield;
var gridwidth;
var gridheight;
var dataView;
var selectedRoletitle;
var selectedRoleno;
var members = [];
var selectedRole = "";
var roleList = [];
var columnFilters = {};
var changedrow = -1;
var newrowids = -1;
var newRoleList = [];
var MySuperDuper;
var roleDataList = [];
var dirtyRowId = null;
$(function () {
    setGridParameters();
    DisplayGrid("");
    RoleSearch();
    shortcut.add("F10", function () {
        find_click();
    });
    $("#btnmanagerole").click(function () {
        AssignTasksToRole();
    });
});
function AssignTasksToRole() {
    $.noty.closeAll();
    if (selectedRole != "" && selectedRole.Name != null) {
        OpenAssignTasksToRoleLookUp();
    }
};

function OpenAssignTasksToRoleLookUp() {
    var div = document.createElement('div');
    $(div).after('<div style="margin:15px 15px 15px 15px;border:15 px solid red;" ></div>');
    div.setAttribute('id', 'LookupDesc');
    var allTaskList;
    var selectedTaskList = [];
    var selectedTaskIdList = [];
    var oldselectedTaskIdList = [];
    actionParameters = { userId: $('#txttUser').val() };
    $(div).dialog(
    {
        autoOpen: false,
        height: 500,
        width: 930,
        modal: true,
        show: {
            effect: 'fade',
            duration: 100
        },
        hide: {
            effect: 'fade',
            duration: 100
        },
        open: function (event, ui) {
            SetNonStandardDialogStyles();






            $("span.ui-dialog-title").text("Manage Role Tasks");
            $(".ui-dialog-contentManagerRoles").css("padding", 0);
            var myData = [];
            //var grid;
            var select = document.createElement('select');
            select.setAttribute('id', 'LookupDescd');
            var button = document.createElement('button');
            button.setAttribute('id', 'button1');
            ShowProgressBar();
            $.ajax({
                url: GetAllTasksDetails,
                type: "GET",
                dataType: 'Json',
                data: actionParameters,
                cache: false,
                success: function (data) {
                    allTaskList = data;
                    var screenWidth = window.screen.availWidth;
                    if ((grid.getSelectedRows() != null) && dataView.getItem(grid.getSelectedRows()) != null)
                        selectedRole = dataView.getItem(grid.getSelectedRows()[0]);

                    var headerLabel = $('<br/><label class=subHeading >Manage Tasks For Role : ' + selectedRole.Name + '</label><br/>');
                    //style=font-weight:bold;font-size:13px;margin-left:20px;font-family:Verdana,,arial,sans-serif;

                    headerLabel.css("padding-left", 10);

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
                            selectedTaskIdList.push(value.value);
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
                                selectedTaskIdList.push(value.value);
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
                                selectedTaskIdList = jQuery.grep(selectedTaskIdList, function (arrayValue) {
                                    return arrayValue != value.value;
                                });
                                $(this).remove().appendTo("#listBox1");
                                this.selected = false;
                            }
                        });
                        $('#listBox1 option:selected').removeAttr("selected");
                    });
                    buttonDeSelectOne.appendTo("#toinsert");
                    column2.append("<br/>");

                    var buttonDeSelectAll = $("<button class=inputButton style=width:50px;margin-left:20px><<</button>");
                    buttonDeSelectAll.click(function () {
                        $.each($('#listBox2 option'), function (index, value) {
                            selectedTaskIdList = jQuery.grep(selectedTaskIdList, function (arrayValue) {
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
                    //////////////////////////// Get user region /////////////////////////////////
                    var actionParametersForTask = { roleId: selectedRole.Name }
                    ShowProgressBar();
                    $.ajax({
                        async: false,
                        url: GetRoleTasksDetails,
                        type: "GET",
                        dataType: 'Json',
                        cache: false,
                        data: actionParametersForTask,
                        success: function (userTasks) {
                            if (userTasks != null) {
                                // oldSelectedRoleList = userRegions.RoleList;
                                for (var index = 0; index < userTasks.length; index++) {
                                    selectedTaskIdList.push(userTasks[index].Id);
                                    oldselectedTaskIdList.push(userTasks[index].Id);
                                    listBox2.append('<option value="' + userTasks[index].Id + '">' + userTasks[index].Description + '</option>');
                                }
                            }
                            RemoveProgressBar();
                        }, //end of success
                        error: function () {
                            alert("error");
                        } //end of error
                    });  //end of ajax call
                    ///////////////////////////////// add item in first list box //////////////////////////////////
                    var isSelected = false;
                    for (var x = 0; x < data.length; x++) {
                        isSelected = false;
                        for (var i = 0; i < selectedTaskIdList.length; i++) {
                            if (selectedTaskIdList[i] == data[x].Id)
                                isSelected = true;
                        }
                        if (!isSelected)
                            listBox1.append('<option value="' + data[x].Id + '">' + data[x].Description + '</option>');
                    }
                }, //end of success
                error: function () {
                    RemoveProgressBar();
                    alert("error");
                } //end of error
            });  //end of ajax call
        },
        buttons: {
            "Save": function () {
                var unAssignedRegionCoderList = [];
                var isTaskSelected = false;
                var isNewTask = false;
                if (selectedTaskIdList != null && selectedRole != null) {
                    selectedRole.TasksList = [];
                    if (oldselectedTaskIdList != null) {
                        for (var index = 0; index < oldselectedTaskIdList.length; index++) {
                            isTaskSelected = false;
                            for (var index1 = 0; index1 < selectedTaskIdList.length; index1++) {
                                if (selectedTaskIdList[index1] == oldselectedTaskIdList[index]) {
                                    isTaskSelected = true;
                                    break;
                                }
                            }
                            if (!isTaskSelected) {
                                var taskVO = { Id: oldselectedTaskIdList[index],
                                    PersistFlag: 2
                                };
                                selectedRole.TasksList.push(taskVO);
                            }
                        }
                    }
                    for (var index = 0; index < selectedTaskIdList.length; index++) {
                        isNewTask = true;
                        for (var index1 = 0; index1 < oldselectedTaskIdList.length; index1++) {
                            if (selectedTaskIdList[index] == oldselectedTaskIdList[index1]) {
                                isNewTask = false;
                                break;
                            }
                        }
                        if (isNewTask) {
                            var taskVO = { Id: selectedTaskIdList[index],
                                PersistFlag: 0
                            };
                            selectedRole.TasksList.push(taskVO);
                        }
                    }
                }
                var status = "";
                if (selectedRole.RoleID < 0 || selectedRole.RoleID == "new row")  //== 'undefined'
                    status = "Added";
                else
                    status = "Modified";
                var fieldName = grid.getColumns()[grid.getActiveCell().cell].field;
                if (grid.getCellEditor() != null) {
                    //var data = grid.getData().getItem(grid.getActiveCell().row);
                    selectedRole[fieldName] = grid.getCellEditor().getValue();
                }
                if ((grid.getSelectedRows() != null) && grid.getSelectedRows().length>0)
                    dirtyRowId = grid.getSelectedRows()[0];

                AddToBasket(selectedRole, status)
                if (IsValidForm()) {

                    //var cdata = grid.getData();
                    var item = { "RoleID": "new row", "Name": "Click here to add a new row", "Description": "", "PersistFlag": "" };

                    roleDataList.splice(roleDataList.length + 1, 0, selectedRole);
                    roleDataList[0] = item;
                    dataView.refresh();
                    grid.render();
                    isEnterKeyPress = true;
                    grid.setActiveCell(0, 0);
                    grid.editActiveCell();
                    //grid.setActiveCell(0, 0);
                    grid.setActiveCell(1, 0);
                    grid.editActiveCell();
                    grid.render();

                    PostData();
                    $(this).dialog("close");
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

function setGridParameters() {
    gridContainerDiv = "#teamGrid";
    ToggleButton1 = "#btnmanagerole";
    ToggleButton2 = "#btnsave";
    columns = [
                        { id: "RoleID", name: "ROLEID", field: "RoleID", editor: Slick.Editors.Text, sortable: true },
                        { id: "ROLENAME", name: "Name", field: "Name", editor: Slick.Editors.Text, sortable: true },
                        { id: "DESCRIPTION", name: "Description", field: "Description", editor: Slick.Editors.Text, sortable: true },
                        { id: "PersistFlag", name: "PersistFlagEnum", field: "PersistFlag", sortable: true }
                  ];
    visiblecolumns = [
                        { id: "ROLENAME", name: "Name", field: "Name", editor: Slick.Editors.Text, sortable: true },
                        { id: "DESCRIPTION", name: "Description", field: "Description", editor: Slick.Editors.Text, sortable: true }
                ];
    options =
        {
            enableCellNavigation: true,
            enableColumnReorder: false,
            forceFitColumns: true,
            multiColumnSort: true,
            editable: true,
            asyncEditorLoading: false,
            autoEdit: true,
            showHeaderRow: true,
            explicitInitialization: true
        };
    actionParameters = null;
    idfield = "RoleID";
    gridwidth = 600;
    gridheight = 410;
}


function RoleSearch() {
    setGridParameters();
    ShowProgressBar($(gridContainerDiv).position().left + (gridwidth / 2),
                        $(gridContainerDiv).position().top + (gridheight / 2));
    $.ajax({
        url: SearchAllDetails,
        type: "GET",
        dataType: 'Json',
        data: actionParameters,
        cache: false,
        success: function (data) {
            if (data.length == 0) {
                alert("No data found");
            }
            DisplayGrid(data);
        },
        error: function () {
            alert("error fetching data.Please try again");
        }
    });                   //end of ajax call
    RemoveProgressBar();
};

function Remove_Addrow() {
    dataView.deleteItem("new row");
}

function Create_Addrow() {
    var item = { "RoleID": "new row", "Name": "Click here to add a new row", "Description": "", "PersistFlag": "" };
    dataView.insertItem(0, item);
}


function DisplayGrid(data) {
    var row = { Name: "",
        Description: ""
    };
    emptyrow = [];
    emptyrow.push(row);
    roleList = emptyrow.concat(data);
    gridwidth = $(gridContainerDiv).width();
    $(gridContainerDiv).css({ "width": gridwidth + "px", "height": gridheight });
    dataView = new Slick.Data.DataView();
    grid = new Slick.Grid(gridContainerDiv, dataView, columns, options);
    grid.setSelectionModel(new Slick.RowSelectionModel());
    if (visiblecolumns != null) {
        grid.setColumns(visiblecolumns);
    }
    if (data.length == 0) {
        data = [];
        setfooter(gridContainerDiv, 0, 0);
    }
    else {
        selectedRole = data[0];
        setfooter(gridContainerDiv, 1, data.length - 1);
    }
    roleDataList = data;
    grid.onBeforeCellEditorDestroy.subscribe(function (e, args) {
        var typevalue = args.editor.getValue();
    });
    $(grid.getHeaderRow()).click(function () {
    });
    grid.onClick.subscribe(function (e, args) {
        $.noty.closeAll();
        var cell = grid.getCellFromEvent(e);
        var row = cell.row;
        selectedRole = data[cell.row];
        setfooter(gridContainerDiv, row, dataView.getLength() );
        if (row == 0) {
            
        }
        else if (row > 0) {
             
        }
        if (row == 0 && cell.cell == 0 && data[0].Name == "Click here to add a new row") {
            data[0].Name = "";
            grid.setActiveCell(0, 1);
            grid.editActiveCell();
            grid.setActiveCell(1, 0);
            grid.editActiveCell();
        }
    });
    grid.onSort.subscribe(function (e, args) {

        Remove_Addrow();
        SortGrid(args, dataView);
        Create_Addrow();
        grid.setActiveCell(1, 0);
        grid.editActiveCell();
    });

    FilterGridWithRowCount(grid, dataView, gridContainerDiv);
    
    var isEnterKeyPress = false;
    grid.onKeyDown.subscribe(function (e, args) {
        if ((grid.getActiveCell() != null) && (grid.getActiveCell().row != null))
            dirtyRowId = grid.getActiveCell().row;
        if (e.keyCode == 13) {
            if ((grid.getActiveCell() != null) && (changedrow > -1)) {
                if (changedrow == 0) {
                    //data[changedrow].RoleID = newrowids;

                    var fieldName = grid.getColumns()[grid.getActiveCell().cell].field;
                    data[changedrow][fieldName] = grid.getCellEditor().getValue();

                    var newAddedrow = {
                        RoleID: newrowids,
                        Name: data[changedrow].Name,
                        Description: data[changedrow].Description,
                        PersistFlag: data[changedrow].PersistFlag
                    };
                    if (data[0].Name.length > 0) {

                        newRoleList.push(newAddedrow);
                        data.splice(data.length + 1, 0, newAddedrow);
                        var selectedRole = grid.getData().getItem(changedrow);
                        selectedRole.RoleID = newrowids;
                        AddToBasket(newAddedrow, "Added");
                        newrowids = newrowids - 1;
                        var item = { "RoleID": "new row", "Name": "Click here to add a new row", "Description": "", "PersistFlag": "" };

                        data[0] = item;
                        dataView.refresh();
                        grid.render();
                        isEnterKeyPress = true;
                        grid.setActiveCell(0, 0);
                        grid.editActiveCell();
                        //grid.setActiveCell(0, 0);
                        grid.setActiveCell(1, 0);
                        grid.editActiveCell();
                        grid.render();
                    }
                }
                changedrow = -1;
                dirtyRowId = null;
                setfooter(gridContainerDiv, 0, data.length - 1);
            }
        }
    });
    grid.onSelectedRowsChanged.subscribe(function (e, args) {

        if (isEnterKeyPress && (grid.getActiveCell() != null) && (grid.getActiveCell().row == 1 && grid.getActiveCell().cell == 0)) {
            isEnterKeyPress = false;
            grid.setActiveCell(0, 0);
            grid.editActiveCell();
            grid.render();
        }
        //        if (grid.getActiveCell() == null &&  grid.getCellFromEvent(e) ==null) {
        //            grid.setActiveCell(0, 0);
        //            grid.editActiveCell();
        //        }
        if ((grid.getActiveCell() != null) && (changedrow > -1) && (changedrow != grid.getActiveCell().row)) {
            if (changedrow == 0 && (data[0].Name.length > 0)) {
                dataView.getItem(changedrow).RoleID = newrowids;
                //              newRoleList.push(data[changedrow]);
                //                var newAddedrow = {
                //                    RoleID: newrowids,
                //                    Name: data[changedrow].Name,
                //                    Description: data[changedrow].Description,
                //                    PersistFlag: data[changedrow].PersistFlag
                //                };

                //                //                DisableToggleButton(ToggleButton1, false);
                //                //                DisableToggleButton(ToggleButton2, false);
                //                data.splice(1, 0, newAddedrow);
                //                AddToBasket(newAddedrow, "Added");
                //                newrowids = newrowids - 1;
                //                var item = { "RoleID": "new row", "Name": "Click here to add a new row", "Description": "", "PersistFlag": "" };
                //                data[0] = item;
                //                dataView.refresh();
                //                grid.setActiveCell(0, 1);
                //                grid.editActiveCell();
                //                //grid.setActiveCell(0, 0);
                //                grid.setActiveCell(1, 0);
                //                grid.editActiveCell();
                //                changedrow = -1;
            }
            else if (changedrow > 0) {
                var status = "";
                if (dataView.getItem(changedrow).RoleID < 0)
                    status = "Added";
                else
                    status = "Modified";
                var newEditedrow = {
                    RoleID: dataView.getItem(changedrow).RoleID,
                    Name: dataView.getItem(changedrow).Name,
                    Description: dataView.getItem(changedrow).Description,
                    PersistFlag: dataView.getItem(changedrow).PersistFlag
                };
                newRoleList.push(dataView.getItem(changedrow));
                var selectedRole = grid.getData().getItem(changedrow);
                AddToBasket(dataView.getItem(changedrow), status);
                grid.focus();
                changedrow = -1;
                dirtyRowId = null;
            }
        }
        if (grid.getActiveCell() != null)
            setfooter(gridContainerDiv, grid.getActiveCell().row, dataView.getLength() );
    });

    grid.onCellChange.subscribe(function (e, args) {
        changedrow = args.row;
    });
    grid.init();
    var item = { "RoleID": "new row", "Name": "Click here to add a new row", "Description": "", "PersistFlag": "" };
    data.splice(0, 0, item);
    dataView.beginUpdate();
    dataView.setItems(data, 'RoleID');
    dataView.setFilter(filter);
    dataView.endUpdate();
    var rows = [];
    rows.push(0);
    grid.setSelectedRows("1");
    setfooter(gridContainerDiv, 1, data.length - 1);
}
function AddToBasket(item, status) {
    // If data array [UpData] is empy then add item directly otherwise check for existing item to avoid duplicate
    if (dirtyRowId !=null) {
        if (UpData.length == 0) {
            if (status == "Modified") {
                item1 = { "PersistFlag": status };
                $.extend(item, item1);
                UpData.push(item);
            }
            else if (status == "Added") {
                item1 = { "PersistFlag": status };
                $.extend(item, item1);
                UpData.push(item);
            }
            else {
            }
        }
        else {
            for (var i = 0; i < UpData.length; i++) {
                if (UpData[i]["RoleID"] == item["RoleID"]) {
                    UpData.splice(i, 1);
                }
            }
            item1 = { "PersistFlag": status };
            $.extend(item, item1);
            UpData.push(item);
        }
        dirtyRowId = null;
    }
    //Just to check record in alert
}
function PrepareGridtoSave() {
    //to save data if user changed a cell and clicked directly on save button
    if (grid.getActiveCell() != null) {
        var row = grid.getActiveCell().row;
        var cell = grid.getActiveCell().cell;
        grid.focus();

        if (row == (grid.getDataLength() - 1)) {
            grid.gotoCell(row - 1, cell, true);
        }
        else {
            grid.gotoCell(row + 1, cell, true);
        }
        grid.gotoCell(row, cell, true);
    }
}

// Call this function on Button click  Ex -     <input type="button" value="Find"  onclick="find_click()" />
function find_click() {
    //PrepareGridtoSave();
    AddSelectedRowToBasket(); 
    if (UpData.length == 0) {
        // alert('No record(s) available for update.');
        $.noty.closeAll();
        noty({ text: 'No record(s) available for update !', type: 'information', dismissQueue: false,
            layout: 'bottom', theme: 'defaultTheme'
        });
    }
    else if (IsValidForm()) {
        PostData();
    }
};

function IsValidForm() {
    var isValid = true;
    if (UpData != null) {
        for (var index = 0; index < UpData.length; index++) {
            if (UpData[index].Name.trim() == "" || UpData[index].Description.trim() == "") {
                isValid = false;
                $.noty.closeAll();
                noty({ text: "Please insert role details.", type: 'information', dismissQueue: false,
                    layout: 'bottom', theme: 'defaultTheme'
                });
            }
        }
    }
    return isValid;
};

function AddSelectedRowToBasket() {
    dataView.refresh();
    grid.render();
    if (grid.getActiveCell() != null) {
//        if (grid.getActiveCell().row >= 0) {
            var data = grid.getData().getItem(grid.getActiveCell().row);
            var fieldName = grid.getColumns()[grid.getActiveCell().cell].field;
            data[fieldName] = grid.getCellEditor().getValue();
            if (data != null) {
                if (grid.getActiveCell().row == 0 && data.Name == "Click here to add a new row") {
                    return true;
                }
                var roleID = 0;
                var status = "";
                if (data.RoleID < 0) {
                    status = "Added";
                }
                else {
                    status = "Modified";
                }
                newRoleList.push(data);
                var newAddedrow = {
                    RoleID: data.RoleID,
                    Name: data.Name,
                    Description: data.Description,
                    PersistFlag: data.PersistFlag
                };
                AddToBasket(data, status);
//            }

        }
    }
};

//// This function will pass data (new & updated records) to controller 
function PostData() {
    $.noty.closeAll();
    var dataToSend = JSON.stringify(UpData);
    DisableToggleButton(ToggleButton2, true);
    $.ajax({
        url: SaveAllDetails,
        type: "POST",
        data: dataToSend,
        dataType: "json",
        cache: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {

                var errorMessage = "";
                var informationMessage = "";
                var warningMessage = "";
                for (var index = 0; index < data.length; index++) {
                    if (index < UpData.length && data[index].Type != 2) {
                        if ((UpData[index].RoleID < 0 || selectedRole.RoleID == "new row") && data[index].Message != "Role Name should be unique.") {
                            UpData[index].RoleID = 0;
                            UpData[index].TasksList = [];
                        }
                    }
                    if (data[index].Type == 0) {
                        if (informationMessage == "")
                            informationMessage = data[index].Message;
                        else
                            informationMessage = informationMessage + "<br/>" + data[index].Message;
                    }
                    else if (data[index].Type == 1) {
                        if (warningMessage == "")
                            warningMessage = data[index].Message;
                        else
                            warningMessage = warningMessage + "<br/>" + data[index].Message;
                    }
                    else if (data[index].Type == 2) {
                        if (errorMessage == "")
                            errorMessage = data[index].Message;
                        else
                            errorMessage = errorMessage + "<br/>" + data[index].Message;
                    }
                }
                if (informationMessage != "") {
                    noty({ text: informationMessage, type: 'information', dismissQueue: false,
                        layout: 'bottom', theme: 'defaultTheme'
                    });
                }
                if (warningMessage != "") {
                    noty({ text: warningMessage, type: 'warning', dismissQueue: false,
                        layout: 'bottom', theme: 'defaultTheme'
                    });
                }
                if (errorMessage != "") {
                    noty({ text: errorMessage, type: 'error', dismissQueue: false,
                        layout: 'bottom', theme: 'defaultTheme'
                    });
                }
                dataView.refresh();
                UpData = [];
                newRoleList = [];
                grid.setActiveCell(0, 0);
                grid.editActiveCell();
                DisableToggleButton(ToggleButton2, false);
            }
        },
        error: function () {
            DisableToggleButton(ToggleButton2, false);
            $.noty.closeAll();
            noty({ text: "Error", type: 'error', dismissQueue: true,
                layout: 'bottom', theme: 'defaultTheme'
            });
        }
    });
}

