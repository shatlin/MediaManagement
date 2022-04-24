var LanguageGridData = [];
var LanguageList = [];
var cellNo;
var selectedrow;
var selrow;
var cellvalue;
var languageGrid;
var Languagetotalrecord = [];
var gridwidth;
var gridheight=410;
var gridContainerDivLanguage = "#LanguageGrid";
var gitems;
var checkLanRepeat = 0;
var defaultLanguageData = [];
var languageColumns = [
    { id: "language", name: "Language", field: "LanguageCode", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage",  validator: languageValidator },
    { id: "isOriginal", name: "Orig?", field: "IsOriginal", cssClass: "cell-effort-driven", formatter: Slick.Formatters.Checkmark, editor: Slick.Editors.Checkbox  },
    { id: "isDubbed", name: "Dub?", field: "IsDubbed", cssClass: "cell-effort-driven", formatter: Slick.Formatters.Checkmark, editor: Slick.Editors.Checkbox  },
    { id: "isSubtitle", name: "S/T?", field: "IsSubtitle", cssClass: "cell-effort-driven", formatter: Slick.Formatters.Checkmark, editor: Slick.Editors.Checkbox  },
    { id: "isVoiceover", name: "V/O", field: "IsVoiceOver", cssClass: "cell-effort-driven", formatter: Slick.Formatters.Checkmark, editor: Slick.Editors.Checkbox  },
    { id: "suppliedBy", name: "Supplied By", field: "SuppliedBy", editor: Slick.Editors.Select  },
    { id: "supplierUserCost", name: "Supplier Use Cost Basis", field: "SupplierUserCost", editor: Slick.Editors.Select  },
    { id: "notes", name: "Notes", field: "Notes", editor: Slick.Editors.LongText  }

  ];

var lcolumns = [
    { id: "Id", name: "Id", field: "Id" },
    { id: "language", name: "Language", field: "LanguageCode" },
    { id: "isOriginal", name: "Orig?", field: "IsOriginal" },
    { id: "isDubbed", name: "Dub?", field: "IsDubbed" },
    { id: "isSubtitle", name: "S/T?", field: "IsSubtitle" },
    { id: "isVoiceover", name: "V/O", field: "IsVoiceOver" },
    { id: "suppliedBy", name: "Supplied By", field: "SuppliedBy" },
    { id: "supplierUserCost", name: "Supplier Use Cost Basis", field: "SupplierUserCost" },
    { id: "notes", name: "Notes", field: "Notes" },
    { id: "UpdateCount", name: "Update Count", field: "UpdateCount" },
    { id: "PersistFlag", name: "Status", field: "PersistFlag" }

  ];

var loptions = {
    enableCellNavigation: true,
    enableColumnReorder: false,
    editable: true,
    forceFitColumns: true,
    enableAddRow: true
};

function languageValidator(value) {
    var no;
    var enteredLang = value.toUpperCase()
    if (value == null || value == undefined || !value.length) {
        return { valid: false, msg: "Language Code is required" };
    }
    var ldata = languageGrid.getData();
    var gitems = ldata[selrow];
    if (LanguageList.length > 0) {
        var stat = 0;
        for (var i = 0; i < LanguageList.length; i++) {
            if (enteredLang == LanguageList[i].LanID) {
                stat = 1;
            }
        }
        if (stat == 0) {
                return { valid: false, msg: "Invalid Language Code" };
        }
        else {
            var duplicate = false;
            for (var i = 0; i < ldata.length; i++) {
                if (ldata[i].LanguageCode != null && i != selrow) {
                    if (ldata[i].LanguageCode == enteredLang)
                        duplicate = true;
                }
            }
            if (duplicate == true) {
                return { valid: false, msg: "Language Name already Exists" };
            }
            else {
                var item = { "LanguageCode": enteredLang };

                if (gitems != null) {
                    gitems.LanguageCode = enteredLang;
                }
                else {
                    ldata.push(item);
                }

                if (ldata[selrow].Id != null)
                    AddtoLanguages(ldata[selrow], "Modified");
                else
                    AddtoLanguages(ldata[selrow], "Added");

                if (!languageGrid.getEditorLock().isActive())
                    languageGrid.getEditorLock().activate(languageGrid.getEditController());
                languageGrid.setData(ldata);
                languageGrid.render();
                languageGrid.setActiveCell(0, 3);
                languageGrid.setActiveCell(selrow, 0);
                languageGrid.editActiveCell();
                return { valid: true, msg: null };
            }
        }
    }
}

function GetAllLanguages() {
    $.ajax({
        url: GetLanguageLOVListactionurl,
        type: "GET",
        dataType: 'Json',
        data: LanguageList,
        async: false,
        cache: false,
        success: function (data) {
            LanguageList = data;
        }
    });
}

function loadLanguages() {
    gridwidth = $("#tabs").width();    
    $("#LanguageGrid").css({ "width": gridwidth - 10  + "px", "height": gridheight });

    GetAllLanguages();

    $.noty.closeAll();


    $.ajax({
        url: GetLanguageactionurl,
        type: "GET",
        dataType: 'Json',
        data: "dmNumber=" + $("#DMVo_DMNumber").val(),
        async: false,
        cache: false,
        success: function (data) {

            for (var i = 0; i < data.length; i++) {

                //Supplied By
                if (data[i].SuppliedBy == "L")
                    data[i].SuppliedBy = "Licensee";
                else if (data[i].SuppliedBy == "S")
                    data[i].SuppliedBy = "Supplier";

                //Supplier User Cost Basis
                if (data[i].SupplierUserCost == "C")
                    data[i].SupplierUserCost = "Cost";
                else if (data[i].SupplierUserCost == "H")
                    data[i].SupplierUserCost = "Half-Cost";
                else if (data[i].SupplierUserCost == "O")
                    data[i].SupplierUserCost = "Other";

            }
            LanguageGridData = data;

            languageGrid = new Slick.Grid("#LanguageGrid", LanguageGridData, lcolumns, loptions);
            languageGrid.setColumns(languageColumns);

            languageGrid.setSelectionModel(new Slick.RowSelectionModel());
            languageGrid.setSelectedRows([0, 0]);
            if (LanguageGridData.length > 0)
                setfooter(gridContainerDivLanguage, 1, LanguageGridData.length);
            else
                setfooter(gridContainerDivLanguage, 0, 0);

            languageGrid.onClick.subscribe(function (e, args) {
                clearAllMessages();
                selrow = args.row;
                var cell = languageGrid.getCellFromEvent(e);
                var row = args.row;
                setfooter(gridContainerDivLanguage, args.row + 1, LanguageGridData.length);

                resetActiveGrids(selTab);

                if (languageGrid.getColumns()[args.cell].id == "suppliedBy") {
                    SelectedUrl = SuppiledByactionUrl;
                }

                if (languageGrid.getColumns()[args.cell].id == "supplierUserCost") {
                    SelectedUrl = SupplierUserCostactionUrl;
                }

            });

            languageGrid.onKeyDown.subscribe(function (e, args) {
                selrow = args.row;
                LanguageGridData = languageGrid.getData();

                var cell = languageGrid.getCellFromEvent(e);
                if (e.shiftKey && e.keyCode == 117) {              //Shift Key & F6
                    if (LanguageGridData[args.row].Id > 0)
                        AddtoLanguages(LanguageGridData[args.row], "Deleted");
                    else
                        AddtoLanguages(LanguageGridData[args.row], "Remove");

                    languageGrid.invalidateRow(LanguageGridData.length);
                    LanguageGridData.splice(args.row, 1);
                    languageGrid.updateRowCount();
                    languageGrid.setData(LanguageGridData);
                    languageGrid.render();
                    languageGrid.setActiveCell(selrow, 2);
                    //                    languageGrid.setActiveCell(selrow, 0);
                    languageGrid.setActiveCell(0, 0);
                    languageGrid.editActiveCell();
                }

                if (e.keyCode == 120) {
                    if (languageGrid.getColumns()[args.cell].id == "language") {
                        if (languageGrid.getEditorLock().isActive())
                            languageGrid.getEditorLock().deactivate(languageGrid.getEditController());
                        selrow = args.row;
                        gitems = LanguageGridData[args.row];
                        selectedrow = LanguageGridData[selrow];
                        if ((selrow + 1) < LanguageGridData.length) {
                            cellvalue = LanguageGridData[args.row].LanguageCode;
                        }
                        LOVLanguages();
                    }
                }
            });

            languageGrid.onAddNewRow.subscribe(function (e, args) {
                var item = args.item;
                var column = args.column;
                languageGrid.invalidateRow(LanguageGridData.length);
                $.extend(item, args.item);
                LanguageGridData.push(item);
                languageGrid.updateRowCount();
                languageGrid.render();
            });

            languageGrid.onCellChange.subscribe(function (e, args) {

                if (typeof (args.item.LanguageCode) != 'undefined') {
                    $.noty.closeAll();
                    if (LanguageGridData[args.row].LanguageCode != null) {
                        if (typeof (args.item.Id) == 'undefined')
                            AddtoLanguages(args.item, "Added");
                        else
                            AddtoLanguages(args.item, "Modified");
                    }
                    else {
                        $.noty.closeAll();
                        showMessage("Enter Language", "warning");
                        languageGrid.setActiveCell(args.row, 0);
                        languageGrid.editActiveCell();
                    }
                }
                else {
                    $.noty.closeAll();
                    showMessage("Enter Language", "warning");
                    languageGrid.setActiveCell(args.row, 0);
                    languageGrid.editActiveCell();
                }
            });

            languageGrid.onValidationError.subscribe(function (e, args) {

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

        }
    });
}

$(function () {
    loadLanguages();  
});

function defaultLanguages() {
//    var DefLanguages = [];
    $.noty.closeAll();

    ShowProgressBar();

    if (checkLanRepeat == 0) {
        $.ajax({
            url: DefaultLanguageactionurl,
            type: "GET",
            dataType: 'Json',
            data: "dmNumber=" + $("#DMVo_DMNumber").val(),
            async: false,
            cache: false,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {

                    //Supplied By
                    if (data[i].SuppliedBy == "L")
                        data[i].SuppliedBy = "Licensee";
                    else if (data[i].SuppliedBy == "S")
                        data[i].SuppliedBy = "Supplier";

                    //Supplier User Cost Basis
                    if (data[i].SupplierUserCost == "C")
                        data[i].SupplierUserCost = "Cost";
                    else if (data[i].SupplierUserCost == "H")
                        data[i].SupplierUserCost = "Half-Cost";
                    else if (data[i].SupplierUserCost == "O")
                        data[i].SupplierUserCost = "Other";

                }

                defaultLanguageData = data;
                LanguageGridData = data;
                languageGrid = new Slick.Grid("#LanguageGrid", LanguageGridData, lcolumns, loptions);
                languageGrid.setColumns(languageColumns);

                for (var i = 0; i < LanguageGridData.length; i++) {
                    AddtoLanguages(LanguageGridData[i], "Added");
                }

                languageGrid.setSelectionModel(new Slick.RowSelectionModel());
                languageGrid.setSelectedRows([0, 0]);

                if (LanguageGridData.length > 0)
                    setfooter(gridContainerDivLanguage, 1, LanguageGridData.length);
                else
                    setfooter(gridContainerDivLanguage, 0, 0);


                languageGrid.onKeyDown.subscribe(function (e, args) {

                    selrow = args.row;
                    LanguageGridData = languageGrid.getData();

                    var cell = languageGrid.getCellFromEvent(e);

                    if (e.shiftKey && e.keyCode == 117) {              //Shift Key & F6
                        if (LanguageGridData[args.row].Id > 0)
                            AddtoLanguages(LanguageGridData[args.row], "Deleted");
                        else
                            AddtoLanguages(LanguageGridData[args.row], "Remove");

                        languageGrid.invalidateRow(LanguageGridData.length);
                        LanguageGridData.splice(args.row, 1);
                        languageGrid.updateRowCount();
                        languageGrid.setData(LanguageGridData);
                        languageGrid.render();
                        //                    languageGrid.setActiveCell(selrow, 0);
                        languageGrid.setActiveCell(0, 0);
                        languageGrid.editActiveCell();
                    }

                    var row = args.row;

                    if (e.keyCode == 120) {
                        if (languageGrid.getColumns()[args.cell].id == "language") {
                            if (languageGrid.getEditorLock().isActive())
                                languageGrid.getEditorLock().deactivate(languageGrid.getEditController());
                            selrow = args.row;
                            gitems = LanguageGridData[args.row];
                            selectedrow = LanguageGridData[selrow];
                            if ((selrow + 1) < LanguageGridData.length) {
                                cellvalue = LanguageGridData[args.row].LanguageCode;
                            }

                            LOVLanguages();
                        }
                    }
                });

                languageGrid.onClick.subscribe(function (e, args) {
                    clearAllMessages();
                    var cell = languageGrid.getCellFromEvent(e);
                    var row = args.row;
                    selrow = args.row;
                    languageGrid.setSelectionModel(new Slick.RowSelectionModel());

                    setfooter(gridContainerDivLanguage, args.row + 1, LanguageGridData.length);

                    resetActiveGrids(selTab);

                    if (languageGrid.getColumns()[args.cell].id == "suppliedBy") {
                        SelectedUrl = SuppiledByactionUrl;
                    }

                    if (languageGrid.getColumns()[args.cell].id == "supplierUserCost") {
                        SelectedUrl = SupplierUserCostactionUrl;
                    }
                });

                languageGrid.onAddNewRow.subscribe(function (e, args) {
                    var item = args.item;
                    var column = args.column;
                    languageGrid.invalidateRow(LanguageGridData.length);
                    $.extend(item, args.item);
                    LanguageGridData.push(item);
                    languageGrid.updateRowCount();
                    languageGrid.render();
                });

                languageGrid.onCellChange.subscribe(function (e, args) {

                    if (typeof (args.item.LanguageCode) != 'undefined') {
                        $.noty.closeAll();
                        if (LanguageGridData[args.row].LanguageCode != null) {
                            if (typeof (args.item.Id) == 'undefined')
                                AddtoLanguages(args.item, "Added");
                            else
                                AddtoLanguages(args.item, "Modified");
                        }
                        else {
                            $.noty.closeAll();
                            showMessage("Enter Language", "warning");
                            languageGrid.setActiveCell(args.row, 0);
                            languageGrid.editActiveCell();
                        }
                    }
                    else {
                        $.noty.closeAll();
                        showMessage("Enter Language", "warning");
                        languageGrid.setActiveCell(args.row, 0);
                        languageGrid.editActiveCell();
                    }
                });

                languageGrid.onValidationError.subscribe(function (e, args) {

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

            },

            error: function () {
            }
        });
        checkLanRepeat = 1;
    }
    else {
        loadLanguagesafterSave(defaultLanguageData);
    }
    RemoveProgressBar();

};

function LOVLanguages() {
    var columns = [
                                  { id: "LanID", name: "LanID", field: "LanID" },
                                  { id: "LanName", name: "LanName", field: "LanName" }
                              ];

    var actionParameters = "";
    var title = "Language Details";
    var listName = null;
    var idfield = "LanID";
    ShowCommonLookup(GetLanguageLOVListactionurl, actionParameters, columns, "LanIDColumn", idfield, title, listName);
}

function SetLookupDataToInvokerLanguage(SelectedRowData, lookupInvokerControl) {
    if (SelectedRowData != null) {
        if (lookupInvokerControl == "LanIDColumn") {
            var cdata = languageGrid.getData();
            var duplicate = false;
            for (var i = 0; i < cdata.length; i++) {
                if (cdata[i].LanguageCode != null && i != selrow) {

                    if (cdata[i].LanguageCode.toUpperCase() == SelectedRowData.LanID) {
                        duplicate = true;
                        $.noty.closeAll();
                        showMessage("Language Name already Exists", "error");
                    }
                }
            }
            if (duplicate == false) {
                $.noty.closeAll();
                var item = { "LanguageCode": SelectedRowData.LanID };
                if (gitems != null) {
                    gitems.LanguageCode = SelectedRowData.LanID;
                }
                else {
                    cdata.push(item);
                }
            }

            if (cdata[selrow].Id != null)
                AddtoLanguages(cdata[selrow], "Modified");
            else
                AddtoLanguages(cdata[selrow], "Added");

            if (!languageGrid.getEditorLock().isActive())
                languageGrid.getEditorLock().activate(languageGrid.getEditController());
            languageGrid.setData(cdata);
            languageGrid.render();         
        }
    }
    else {
        if (!languageGrid.getEditorLock().isActive())
            languageGrid.getEditorLock().activate(languageGrid.getEditController());
    }
    languageGrid.setActiveCell(0, 3);
    languageGrid.setActiveCell(selrow, 0);
    languageGrid.editActiveCell();

};
