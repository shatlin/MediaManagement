var territoryGrid, TerritoryList, RightsList, rightVal, cellNo;
var TerritoryGridData = [];
var Territorytotalrecord = [];
var selrow, gitems, cellvalue, rightscode, rightsdes, territorycode, territorydes, selectedrow, rowid, gridwidth;
var terValue;
var cellNo;
var gridContainerDivTerritory = "#TerritoryGrid";
    var checkTerRepeat = 0;

var tcolumns = [
    { id: "Id", name: "Id", field: "Id" },
    { id: "TerritoryCode", name: "Territory Code", field: "TerritoryCode"},
    { id: "TerritoryDescription", name: "Territory Name", field: "TerritoryDescription" },
    { id: "RightsCode", name: "Rights Code", field: "RightsCode"},
    { id: "RightsDescription", name: "Rights Description", field: "RightsDescription" },
    { id: "UpdateCount", name: "Update Count", field: "UpdateCount" },
    { id: "PersistFlag", name: "Status", field: "PersistFlag" }
  ];
var territorycolumns = [ 
    { id: "TerritoryCode", name: "Territory Code", field: "TerritoryCode", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage",  validator: TerritoryValidator },
    { id: "TerritoryDescription", name: "Territory Name", field: "TerritoryDescription"  },
    { id: "RightsCode", name: "Rights Code", field: "RightsCode", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage",  validator: RightValidator },
    { id: "RightsDescription", name: "Rights Description", field: "RightsDescription"  }
  ];

var toptions = {
    enableCellNavigation: true,
    enableColumnReorder: false,
    editable: true,
    forceFitColumns: true,
    enableAddRow: true
};

function GetAllTerritories() {
    $.ajax({
        url: GetTerritoryLOVListactionurl,
        type: "GET",
        dataType: 'Json',
        data: TerritoryList,
        async: false,
        cache: false,
        success: function (data) {
            TerritoryList = data;
        }
    });
}

function TerritoryValidator(value) {
    $.noty.closeAll();
    if (value == null || value == undefined || !value.length) {
        return { valid: false, msg: "Territory Code is required" };
    }
    var tdata = territoryGrid.getData();
    var gitems = tdata[selrow];
    var enteredTerritory = value.toUpperCase();
    var index;
    if (TerritoryList.length > 0) {
        var stat = 0;
        for (var i = 0; i < TerritoryList.length; i++) {
            if (enteredTerritory == TerritoryList[i].TerritoryCode) {
                stat = 1;
                index = i;
                break;
            }
        }
        if (stat == 0) {
            return { valid: false, msg: "Invalid Territory Code" };
        }
        else {
            var duplicate = false;
            for (var i = 0; i < tdata.length; i++) {
                if (tdata[i].TerritoryCode != null && i != selrow) {
                    if (tdata[i].TerritoryCode == enteredTerritory)
                        duplicate = true;
                }
            }
            if (  duplicate == true) {
                return { valid: false, msg: "Territory Name already Exists" };
            }
            else {

                if (gitems != null) {
                    tdata[selrow].TerritoryCode = enteredTerritory;
                    tdata[selrow].TerritoryDescription = TerritoryList[index].TerritoryName;                    
                }
                else {
                    var item = { "TerritoryCode": enteredTerritory, "TerritoryDescription": TerritoryList[index].TerritoryName, "RightsCode": "E", "RightsDescription": "Exclusive" };
                    tdata.push(item);
                }

                if (!territoryGrid.getEditorLock().isActive())
                    territoryGrid.getEditorLock().activate(territoryGrid.getEditController());

                territoryGrid.setData(tdata);
                territoryGrid.render();
                territoryGrid.setActiveCell(0, 3);
                territoryGrid.setActiveCell(selrow, 0);
                territoryGrid.editActiveCell();

                if (tdata[selrow].Id != null)
                    AddtoTerritories(tdata[selrow], "Modified");
                else
                    AddtoTerritories(tdata[selrow], "Added");
                return { valid: true, msg: null };
            }
        }
    }
}
function RightValidator(value) {

    if (value == null || value == undefined || !value.length) {
        return { valid: false, msg: "Rights Code is required" };
    }

    var tdata = territoryGrid.getData();
    var index;
    if (tdata[selrow] == null) {
        $.noty.closeAll();
        showMessage("Territory code is needed", "error");
        territoryGrid.setActiveCell(selrow, 0);
        territoryGrid.editActiveCell();
    }
    else {
        var enteredRight = value.toUpperCase();
        if (RightsList.length > 0) {
            var stat = 0;
            for (var i = 0; i < RightsList.length; i++) {
                if (enteredRight == RightsList[i].MecValue) {
                    stat = 1;
                    index = i;
                    break;
                }
            }
            if (stat == 0) {
                return { valid: false, msg: "Invalid Right Code" };
            }
            else {
                tdata[selrow].RightsCode = enteredRight;
                tdata[selrow].RightsDescription = RightsList[index].MecDescription;
                }
                territoryGrid.setData(tdata);
                territoryGrid.render();
                territoryGrid.setActiveCell(0, 3);
                territoryGrid.setActiveCell(selrow, 2);
                territoryGrid.editActiveCell();

                if (tdata[selrow].Id != null)
                    AddtoTerritories(tdata[selrow], "Modified");
                else
                    AddtoTerritories(tdata[selrow], "Added");

                return { valid: true, msg: null };
        }
    }
}

function GetAllRights() {
    $.ajax({
        url: GetRightsLOVListactionurl,
        type: "GET",
        dataType: 'Json',
        data: RightsList,
        async: false,
        cache: false,
        success: function (data) {
            RightsList = data;
        }
    });
}

function loadTerritories() {

    GetAllRights();
    GetAllTerritories();

    $.ajax({
        url: GetTerritoryactionurl,
        type: "GET",
        dataType: 'Json',
        data: "dmNumber=" + $("#DMVo_DMNumber").val(),
        async: false,
        cache: false,
        success: function (data) {

            TerritoryGridData = data;
            territoryGrid = new Slick.Grid("#TerritoryGrid", TerritoryGridData, tcolumns, toptions);
            territoryGrid.setColumns(territorycolumns);

            TerritoryGridData = territoryGrid.getData();

            territoryGrid.setSelectionModel(new Slick.RowSelectionModel());
            territoryGrid.setSelectedRows([0, 0]);

            if (TerritoryGridData.length > 0)
                setfooter(gridContainerDivTerritory, 1, TerritoryGridData.length);
            else
                setfooter(gridContainerDivTerritory, 0, 0);

            territoryGrid.onClick.subscribe(function (e, args) {
                clearAllMessages();
                selrow = args.row;
                setfooter(gridContainerDivTerritory, args.row + 1, TerritoryGridData.length);

                resetActiveGrids(selTab);

            });

            territoryGrid.onKeyDown.subscribe(function (e, args) {
                selrow = args.row;
                TerritoryGridData = territoryGrid.getData();

                var cell = territoryGrid.getCellFromEvent(e);

                if (e.shiftKey && e.keyCode == 117) {              //Shift Key & F6
                    if (TerritoryGridData[args.row] != null) {
                        if (TerritoryGridData[args.row].Id > 0)
                            AddtoTerritories(TerritoryGridData[args.row], "Deleted");
                        else
                            AddtoTerritories(TerritoryGridData[args.row], "Remove");
                    }
                    territoryGrid.invalidateRow(TerritoryGridData.length);
                    TerritoryGridData.splice(args.row, 1);
                    territoryGrid.updateRowCount();
                    territoryGrid.setData(TerritoryGridData);
                    territoryGrid.render();
                    territoryGrid.setActiveCell(selrow, 2);
                    //                    territoryGrid.setActiveCell(selrow, 0);
                    territoryGrid.setActiveCell(0, 0);
                    territoryGrid.editActiveCell();
                }
                if (e.keyCode == 120) {

                    if (territoryGrid.getColumns()[args.cell].id == "TerritoryCode") {
                        if (territoryGrid.getEditorLock().isActive())
                            territoryGrid.getEditorLock().deactivate(territoryGrid.getEditController());

                        selrow = args.row;
                        gitems = TerritoryGridData[args.row];
                        selectedrow = TerritoryGridData[selrow];
                        if ((selrow + 1) < TerritoryGridData.length) {
                            cellvalue = TerritoryGridData[args.row].TerritoryCode;
                        }

                        LOVTerritories();
                    }

                    if (territoryGrid.getColumns()[args.cell].id == "RightsCode") {

                        if (territoryGrid.getEditorLock().isActive())
                            territoryGrid.getEditorLock().deactivate(territoryGrid.getEditController());
                        selrow = args.row;
                        gitems = TerritoryGridData[args.row];
                        selectedrow = TerritoryGridData[selrow];
                        if (gitems != null)
                            cellvalue = TerritoryGridData[args.row].RightsCode;
                        else
                            cellvalue = null;

                        if (cellvalue == null) {
                            $.noty.closeAll();
                            showMessage("Select a Territory Code", "error");
                            territoryGrid.setActiveCell(selrow, 0);
                            territoryGrid.editActiveCell();
                        }
                        else
                            LOVRights();
                    }
                }
            });


            territoryGrid.onValidationError.subscribe(function (e, args) {

                var validationResult = args.validationResults;
                activeCellNode = args.cellNode;
                var editor = args.editor;
                var errorMessage = validationResult.msg;
                var valid_result = validationResult.valid;
                if (!valid_result) {
                    $(activeCellNode).attr("title", errorMessage);
                }
                else {
                    $(activeCellNode).attr("title", "");
                }

            });

            territoryGrid.onCellChange.subscribe(function (e, args) {

                if (typeof (args.item.Id) == 'undefined')
                    AddtoTerritories(args.item, "Added");
                else
                    AddtoTerritories(args.item, "Modified");

            });

            territoryGrid.onAddNewRow.subscribe(function (e, args) {
                var item = args.item;
                var column = args.column;
                territoryGrid.invalidateRow(TerritoryGridData.length);
                $.extend(item, args.item);
                TerritoryGridData.push(item);
                territoryGrid.updateRowCount();
                territoryGrid.render();
            });
        },

        error: function () {
        }
    });
}

$(function () {

    gridwidth = $("#TerritoryGrid").width();
    $("#TerritoryGrid").css({ "width": gridwidth + "px" });

    loadTerritories();
});

function setRightValues() {
    var item;
    var cdata = territoryGrid.getData();

    item = { "TerritoryCode": territorycode, "TerritoryDescription": territorydes, "RightsCode": selectedvalue.MecValue, "RightsDescription": selectedvalue.MecDescription };

    $.extend(gitems, item);

    if (cellvalue != null) {
        cdata[selrow].RightsCode = selectedvalue.MecValue;
        cdata[selrow].RightsDescription = selectedvalue.MecDescription;
    }

    if (cdata[selrow].Id != null)
        AddtoTerritories(cdata[selrow], "Modified");
    else
        AddtoTerritories(cdata[selrow], "Added");

    if (!territoryGrid.getEditorLock().isActive())
        territoryGrid.getEditorLock().activate(territoryGrid.getEditController());

    territoryGrid.setData(cdata);
    territoryGrid.render();
    setfooter(gridContainerDivTerritory, 1, cdata.length);

}

function defaultTerritories() {
    var noselection = false;
    var temp = $("#DMVo_RightsCode").val();
    if (temp == "S") {
        noselection = true;
        $.noty.closeAll();
        showMessage("Select a Right", "error");
    }

    if (noselection == false) {
        ShowProgressBar();

    
            //var DefTerritories = [];
            var DealMemoViewModel = { dmNumber: $("#DMVo_DMNumber").val(),
                RightsCode: $("#DMVo_RightsCode").val()
            };
            $.ajax({
                url: DefaultTerritoryactionurl,
                type: "GET",
                dataType: 'Json',
                data: DealMemoViewModel,
                async: false,
                cache: false,
                success: function (data) {

                    TerritoryGridData = data;
                    if (checkTerRepeat == 0) {
                        territoryGrid = new Slick.Grid("#TerritoryGrid", TerritoryGridData, tcolumns, toptions);
                        territoryGrid.setColumns(territorycolumns);
                        territoryGrid.setSelectionModel(new Slick.RowSelectionModel());
                        territoryGrid.setSelectedRows([0, 0]);
                        checkTerRepeat = 1;
                    }
                    else {
                        loadTerritoriesafterSave(TerritoryGridData);
                    }
                    for (var i = 0; i < TerritoryGridData.length; i++) {
                        AddtoTerritories(TerritoryGridData[i], "Added");
                    }
                    if (TerritoryGridData.length > 0)
                        setfooter(gridContainerDivTerritory, 1, TerritoryGridData.length);
                    else
                        setfooter(gridContainerDivTerritory, 0, 0);


                    territoryGrid.onKeyDown.subscribe(function (e, args) {
                        selrow = args.row;
                        TerritoryGridData = territoryGrid.getData();

                        var cell = territoryGrid.getCellFromEvent(e);

                        if (e.shiftKey && e.keyCode == 117) {              //Shift Key & F6
                            if (TerritoryGridData[args.row] != null) {
                                if (TerritoryGridData[args.row].Id > 0)
                                    AddtoTerritories(TerritoryGridData[args.row], "Deleted");
                                else
                                    AddtoTerritories(TerritoryGridData[args.row], "Remove");
                            }
                            territoryGrid.invalidateRow(TerritoryGridData.length);
                            TerritoryGridData.splice(args.row, 1);
                            territoryGrid.updateRowCount();
                            territoryGrid.setData(TerritoryGridData);
                            territoryGrid.render();
                            territoryGrid.setActiveCell(selrow, 2);
                            //                    territoryGrid.setActiveCell(selrow, 0);
                            territoryGrid.setActiveCell(0, 0);
                            territoryGrid.editActiveCell();
                        }

                        if (e.keyCode == 120) {
                            if (territoryGrid.getColumns()[args.cell].id == "TerritoryCode") {

                                if (territoryGrid.getEditorLock().isActive())
                                    territoryGrid.getEditorLock().deactivate(territoryGrid.getEditController());
                                selrow = args.row;
                                gitems = TerritoryGridData[args.row];
                                selectedrow = TerritoryGridData[selrow];
                                if ((selrow + 1) < TerritoryGridData.length) {
                                    cellvalue = TerritoryGridData[args.row].TerritoryCode;
                                }

                                LOVTerritories();
                            }


                            if (territoryGrid.getColumns()[args.cell].id == "RightsCode") {

                                if (territoryGrid.getEditorLock().isActive())
                                    territoryGrid.getEditorLock().deactivate(territoryGrid.getEditController());

                                selrow = args.row;
                                gitems = TerritoryGridData[args.row];
                                selectedrow = TerritoryGridData[selrow];

                                if (gitems != null)
                                    cellvalue = TerritoryGridData[args.row].RightsCode;
                                else
                                    cellvalue = null;

                                if (cellvalue == null) {
                                    $.noty.closeAll();
                                    showMessage("Select a Territory Code", "error");
                                    territoryGrid.setActiveCell(selrow, 0);
                                    territoryGrid.editActiveCell();
                                }
                                else
                                    LOVRights();
                            }
                        }

                    });

                    territoryGrid.onClick.subscribe(function (e, args) {
                        clearAllMessages();
                        selrow = args.row;
                        setfooter(gridContainerDivTerritory, args.row + 1, TerritoryGridData.length);

                        resetActiveGrids(selTab);

                        //                    var tdata = territoryGrid.getData();
                        //                    var gitems = tdata[selrow];
                        //                    if (territoryGrid.getActiveCell() != null) {
                        //                        var ActiveRow = territoryGrid.getActiveCell().row;
                        //                        var Activecell = territoryGrid.getActiveCell().cell;
                        //                        if (territoryGrid.getCellEditor().getValue() == null || territoryGrid.getCellEditor().getValue() == "" || territoryGrid.getCellEditor().getValue() == "undefined") {
                        //                            resetActiveGridsSplitPay();
                        //                        }
                        //                        else {
                        //                            if (Activecell == 0) {
                        //                                territorycode = territoryGrid.getCellEditor().getValue().toUpperCase();
                        //                                var index;
                        //                                if (TerritoryList.length > 0) {
                        //                                    var stat = 0;
                        //                                    for (var i = 0; i < TerritoryList.length; i++) {
                        //                                        if (territorycode == TerritoryList[i].TerritoryCode) {
                        //                                            stat = 1;
                        //                                            index = i;
                        //                                            break;
                        //                                        }
                        //                                    }
                        //                                    if (stat == 0) {
                        //                                        showMessage("Invalid Territory Code", "error");
                        //                                    }
                        //                                    else {
                        //                                        var duplicate = false;
                        //                                        for (var i = 0; i < tdata.length; i++) {
                        //                                            if (tdata[i].TerritoryCode != null && i != ActiveRow) {
                        //                                                if (tdata[i].TerritoryCode == territorycode)
                        //                                                    duplicate = true;
                        //                                            }
                        //                                        }
                        //                                        if (duplicate == true) {
                        //                                            showMessage("Territory Name already Exists", "error");
                        //                                        }
                        //                                        else {
                        //                                            if (gitems != null) {
                        //                                                tdata[ActiveRow].TerritoryCode = territorycode;
                        //                                                tdata[ActiveRow].TerritoryDescription = TerritoryList[index].TerritoryName;
                        //                                            }
                        //                                            else {
                        //                                                var item = { "TerritoryCode": territorycode, "TerritoryDescription": TerritoryList[index].TerritoryName, "RightsCode": "E", "RightsDescription": "Exclusive" };
                        //                                                tdata.push(item);
                        //                                            }

                        //                                            territoryGrid.setData(tdata);
                        //                                            territoryGrid.render();

                        //                                            if (tdata[ActiveRow].Id != null)
                        //                                                AddtoTerritories(tdata[ActiveRow], "Modified");
                        //                                            else
                        //                                                AddtoTerritories(tdata[ActiveRow], "Added");
                        //                                        }
                        //                                    }
                        //                                }
                        //                            }

                        //                            if (Activecell == 2) {
                        //                                rightscode = territoryGrid.getCellEditor().getValue();
                        //                            }
                        //                            territoryGrid.gotoCell(ActiveRow, 1, true);

                        //                        }
                        //                    }

                    });

                    territoryGrid.onAddNewRow.subscribe(function (e, args) {

                        var item = args.item;
                        var column = args.column;
                        territoryGrid.invalidateRow(TerritoryGridData.length);
                        $.extend(item, args.item);
                        TerritoryGridData.push(item);
                        territoryGrid.updateRowCount();
                        territoryGrid.render();

                    });

                    territoryGrid.onValidationError.subscribe(function (e, args) {

                        var validationResult = args.validationResults;
                        activeCellNode = args.cellNode;
                        var editor = args.editor;
                        var errorMessage = validationResult.msg;
                        var valid_result = validationResult.valid;
                        if (!valid_result) {
                            $(activeCellNode).attr("title", errorMessage);
                        }
                        else {
                            $(activeCellNode).attr("title", "");
                        }

                    });

                    territoryGrid.onCellChange.subscribe(function (e, args) {

                        if (typeof (args.item.Id) == 'undefined')
                            AddtoTerritories(args.item, "Added");
                        else
                            AddtoTerritories(args.item, "Modified");

                    });

                },
                error: function () {
                }
            });
    
        RemoveProgressBar();

    }
};

function LOVTerritories() {
    var columns = [
                                  { id: "TerritoryCode", name: "Territory Code", field: "TerritoryCode" },
                                  { id: "TerritoryName", name: "Territory Description", field: "TerritoryName" }
                              ];

    var actionParameters = "";
    var title = "Territory Details";
    var listName = null;
    var idfield = "TerritoryCode";
    ShowCommonLookup(GetTerritoryLOVListactionurl, actionParameters, columns, "TerritoryCodeColumn", idfield, title, listName);
}

function LOVRights() {
                                 var columns = [
                                  { id: "MecValue", name: "Code", field: "MecValue" },
                                  { id: "MecDescription", name: "Description", field: "MecDescription" }
                              ];
    var actionParameters = "";
    var title = "Territory Rights";
    var listName = null;
    var idfield = "MecValue";
    ShowCommonLookup(GetRightsLOVListactionurl, actionParameters, columns, "MecValueColumn", idfield, title, listName);
}

function SetLookupDataToInvokerTerritory(SelectedRowData, lookupInvokerControl) {
    if (SelectedRowData != null) {
        var cdata = territoryGrid.getData();
       
        // Territory LOV

        if (lookupInvokerControl == "TerritoryCodeColumn") {
            var duplicate = false;
            for (var i = 0; i < cdata.length; i++) {
                if (cdata[i].TerritoryCode != null && i != selrow) {
                    if (cdata[i].TerritoryCode.toUpperCase() == SelectedRowData.TerritoryCode) {
                        duplicate = true;
                        $.noty.closeAll();
                        showMessage("Territory Name already Exists", "error");
                    }
                }
            }
            if (duplicate == false) {
                $.noty.closeAll();
                var item = { "TerritoryCode": SelectedRowData.TerritoryCode, "TerritoryDescription": SelectedRowData.TerritoryName, "RightsCode": "E", "RightsDescription": "Exclusive" };
                if (gitems != null) {
                    gitems.TerritoryCode = SelectedRowData.TerritoryCode;
                    gitems.TerritoryDescription = SelectedRowData.TerritoryName;
                }
                else {
                    cdata.push(item);
                }
            }

            if (cdata[selrow].Id != null)
                AddtoTerritories(cdata[selrow], "Modified");
            else
                AddtoTerritories(cdata[selrow], "Added");

            if (!territoryGrid.getEditorLock().isActive())
                territoryGrid.getEditorLock().activate(territoryGrid.getEditController());

            territoryGrid.setData(cdata);
            territoryGrid.render();        
        }

        // Rights LOV

        if (lookupInvokerControl == "MecValueColumn") {
            $.noty.closeAll();
            if (gitems != null) {
                gitems.RightsCode = SelectedRowData.MecValue;
                gitems.RightsDescription = SelectedRowData.MecDescription;
            }
            else {
                cdata.push(item);
            }

            if (cdata[selrow].Id != null)
                AddtoTerritories(cdata[selrow], "Modified");
            else
                AddtoTerritories(cdata[selrow], "Added");

            if (!territoryGrid.getEditorLock().isActive())
                territoryGrid.getEditorLock().activate(territoryGrid.getEditController());
            territoryGrid.setData(cdata);
            territoryGrid.render();         
        }
    }
    else {
        if (!territoryGrid.getEditorLock().isActive())
            territoryGrid.getEditorLock().activate(territoryGrid.getEditController());
    }

    territoryGrid.setActiveCell(0, 3);

    if (lookupInvokerControl == "TerritoryCodeColumn") 
        territoryGrid.setActiveCell(selrow, 0);
    else
        territoryGrid.setActiveCell(selrow, 2);

    territoryGrid.editActiveCell();
};


