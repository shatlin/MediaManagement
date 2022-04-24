var gridProgrammeParticulars, gridLicenseeAllocation, gridCatchUpLicenseeAllocation, gridRunsPerChannel, gridPlatformRights;

var gridProgrammeParticularId = "#gridProgramParticular";
var gridLicenseeAllocationId = "#gridLicensee";
var gridRunsPerChannelId = "#gridRunsPerChannel";
var gridCatchUpLicenseeAllocationId = "#gridCatchUpLicenseeAllocation";
var gridPlatformRightsId = "#gridPlatformRights";

var divTypeShowLOVId = "#TypeShowLOV";
var divEventTypeLOVId = "#EventTypeLOV";
var divProgramCategoryLOVId = "#ProgramCategoryLOV";
var divBOCategoryLOVId = "#BOCategoryLOV";
var divTitleLOVId = "#TitleLOV";
var divLicenseeLOVId = "#LicenseeLOV";
var divChannelServiceLOVId = "#ChannelServiceLOV";
var divChannelListLOVId = "#ChannelListLOV";
var divPlateformRightsId = "#PlateformRights";

var txtDMVo_CurrencyId = "#DMVo_Currency";
var comboTypeComboSelectionId = "#TypeComboSelection";
var txtDMVo_LicenseNoId = "#DMVo_LicenseNo";
var txtDMVo_ContractEntityId = "#DMVo_ContractEntity";
var txtDMVo_MainLicenseeId = "#DMVo_MainLicensee";

var ProgrammeVOModifiedData=[];
var ProgrammeParticulargridData = [];
var LicenseeDetailsgridData = [];
var RunsPerChannelgridData = [];
var CatchUpLicenseeAllocationgridData = [];
var PlatfromRightsAllocationgridData = [];

var GlobalTypeComboSelection;
var GlobalDMVo_DMNumber;
var GlobalRefNo;
var GlobalType;
var GlobalReleaseYear;
var SeriesTreeParameters;
var GlobalId;

var IsSeasonAddedInSeriesTree = false;
var IsSeasonSelected = false;
var UpDataSeriesTree = [];

var IsbtnTitleDetailsClicked = false;
var IsbtnSeriesDetailsClicked = false;
var SelectedRowforDetails = null;

var IsBugeted = false;

var UpData = [];
var UpdatedData = [];
var selTab;
var nochanges = true;
var activeCellNode;
var onClickLOV = false;

function ShowDealMemoLookup(actionUrl, actionParameters, columns, lookupInvokerControl, idfield, title, listName) {

    var lookUpData = [];
    var i;
    $.ajax({
        url: actionUrl,
        type: "GET",
        dataType: 'Json',
        async: false,
        cache: false,
        data: actionParameters,
        success: function (myData) {
            lookUpData = DisplayDealMemoLookupWithExistingData(columns, lookupInvokerControl, idfield, title, listName, myData);
            RemoveProgressBar();
        }, //end of success
        error: function () {
            RemoveProgressBar();
            showMessage("Some exception occured.Please contact the Administrator.", "error");
        } //end of error
    });  //end of ajax call
    return lookUpData;
};

function SetNewDialogStyles(title) {
    $("span.ui-dialog-title").text(title);
    $(".ui-dialog  ").css("-moz-border-radius", "5px");
    $(".ui-dialog  ").css("-webkit-border-radius", "5px");
    $(".ui-dialog  ").css("-khtml-border-radius", "5px");
    $(".ui-dialog ").css("border-radius", "8px");

    $(".ui-dialog  .ui-widget-content ").css("background-color", "transparent");
    $(".ui-dialog").css("box-shadow", "  2px 2px 5px #333");
    $(".ui-dialog  ").css({ "padding": "10px" });
    $(".ui-dialog-titlebar-close", this.parentNode).remove();

    if ($.browser.msie) {
        $(".ui-dialog").css("background", "rgba(216,216,216,1)");
        $(".ui-dialog").css("-ms-filter", "progid:DXImageTransform.Microsoft.gradient(startColorstr=#d8d8d8,endColorstr=#868688)");
        $(".ui-dialog").css("filter", "progid:DXImageTransform.Microsoft.gradient(startColorstr=#d8d8d8,endColorstr=#868688)");
        $(".ui-dialog").css("zoom", "1");
    }

    $(".ui-dialog").css("background", "-moz-linear-gradient(top, #d8d8d8 65%, #d8d8d8 30%, #868688 100%");
    $(".ui-dialog").css("background", "-webkit-gradient(linear, left top, left bottom, color-stop(30%,#d8d8d8), color-stop(37%,#d8d8d8), color-stop(100%,#868688))");
    $(".ui-dialog").css("background", " -webkit-linear-gradient(top, #d8d8d8 60%,#d8d8d8 30%,#868688 100%)");
    $(".ui-dialog").css("background", " -o-linear-gradient(top, #d8d8d8 65%,#d8d8d8 30%,#868688 100%)");
    $(".ui-dialog").css("background", " -ms-linear-gradient(top, #d8d8d8 65%,#d8d8d8 30%,#868688 100%)");
    $(".ui-dialog").css("background", " linear-gradient(to bottom, #d8d8d8 65%,#d8d8d8 30%,#868688 100%)");

}

var DealMemolookupGridOptions = {
            enableCellNavigation: true,
            enableColumnReorder: false,
            forceFitColumns: true,
            multiColumnSort: true,
            editable: true,
            autoEdit: true,
            asyncEditorLoading: false,
            showHeaderRow: true,
            explicitInitialization: true,
            multiSelect: false
        };

function DisplayDealMemoLookupWithExistingData(columns, lookupInvokerControl, idfield, title, listName, myData) {

    var options = DealMemolookupGridOptions;
    var lookUpData = [];
    var lookUpGrid;
    var colFilters = {};
    var lookUpDataView = "";
    var SelectedRowData;
    var gridwidth = 1000;
    var gridheight = 500;
    CreateLookupHtml(gridheight, gridwidth);

    $('#ShowLookup').dialog(DialogcommonVars,
    {

        height: gridheight + 50,
        width: gridwidth + 15,
        open: function (event, ui) {


            SetNewDialogStyles(title);


            if ((listName != null) && listName != "") {
                lookUpData = myData[listName];
            }
            else
                lookUpData = myData;

            lookUpDataView = new Slick.Data.DataView();
            lookUpGrid = new Slick.Grid("#gridLookup", lookUpDataView, columns, options);
            lookUpGrid.setSelectionModel(new Slick.RowSelectionModel());

            lookUpGrid.onActiveCellChanged.subscribe(function (e, args) {


                lookUpGrid.setCellCssStyles('highlight', 'red');
                if (lookUpGrid.getActiveCell() != null) {

                    SelectedRowData = lookUpDataView.getItem(lookUpGrid.getActiveCell().row);

                }

            });

            lookUpGrid.onDblClick.subscribe(function (e, args) {
                SetLookupDataToInvoker(SelectedRowData, lookupInvokerControl);
                CloseLookup();
            });

            lookUpGrid.onSort.subscribe(function (e, args) {
                SortGrid(args, lookUpDataView);
            });

            lookUpDataView.onRowCountChanged.subscribe(function (e, args) {
                lookUpGrid.updateRowCount();
                lookUpGrid.render();
            });

            lookUpDataView.onRowsChanged.subscribe(function (e, args) {
                lookUpGrid.invalidateRows(args.rows);
                lookUpGrid.render();
            });


            $(lookUpGrid.getHeaderRow()).delegate(":input", "change keyup", function (e) {
                var columnId = $(this).data("columnId");
                if (columnId != null) {
                    colFilters[columnId] = $.trim($(this).val());
                    lookUpDataView.refresh();
                }
            });

            lookUpGrid.onKeyDown.subscribe(function (e, args) {
                if (e.keyCode == 13) {
                    SetLookupDataToInvoker(SelectedRowData, lookupInvokerControl);
                    CloseLookup();
                }
            });

            lookUpGrid.onHeaderRowCellRendered.subscribe(function (e, args) {
                $(args.node).empty();
                $("<input type='text'>")
                           .data("columnId", args.column.id)
                           .val(colFilters[args.column.id])
                           .appendTo(args.node);
            });

            lookUpDataView.onRowCountChanged.subscribe(function (e, args) {
                lookUpGrid.updateRowCount();
                lookUpGrid.render();
                setPopupFooter('#placeholder', lookUpDataView.getLength());
            });

            function filter(item) {
                for (var columnId in colFilters) {
                    if (columnId !== undefined && colFilters[columnId] !== "") {
                        var c = lookUpGrid.getColumns()[lookUpGrid.getColumnIndex(columnId)];

                        //if not type casted to string, number filtering will throw error
                        if (String(item[c.field].toUpperCase()).indexOf(colFilters[columnId].toUpperCase()) != 0) {
                            return false;
                        }

                    }
                }
                return true;
            }




            lookUpGrid.init();
            lookUpDataView.beginUpdate();
            lookUpDataView.setItems(lookUpData, idfield);
            lookUpDataView.setFilter(filter);
            lookUpDataView.endUpdate();
            var rowCount = 0
            if (lookUpData != null) {
                rowCount = lookUpData.length;
            }
            setPopupFooter('#placeholder', rowCount);
            RemoveProgressBar();
            lookUpGrid.focus();

        },

        buttons: {
            "Ok": function () {

                SetLookupDataToInvoker(SelectedRowData, lookupInvokerControl);
                CloseLookup();
            },
            "Cancel": function () {
                SetLookupDataToInvoker(null, lookupInvokerControl);
                CloseLookup();
            }
        },
        close: function () {
        }
    });

    $('#ShowLookup').dialog("open");
    return lookUpData;
}

$(function () {

    var queryDMNumber, querystatus;
    var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    var arrQrStr = new Array();
    var arr = spQrStr.split('&');

    for (var i = 0; i < arr.length; i++) {
        if (i == 0)
            queryDMNumber = (arr[i].split('='))[1];
        if (i == 1)
            querystatus = (arr[i].split('='))[1];
    }

    var $tabs = $("#tabs").tabs({
        select: function (event, ui) {
            var indexVal = ui.index;
            switch (indexVal) {
                case 0:
                    selTab = "Programme";
                    break;
                case 1:
                    selTab = "Language";
                    break;
                case 2:
                    selTab = "Territory";
                    break;
                case 3:
                    selTab = "Payment";
                    break;
            }
        },
        show: function (event, ui) {
            $(ui.tab);
            ui.index;
        }
    });

    if (queryDMNumber != null) {
        if (querystatus == "BUDGETED") {
            var $tabs = $("#tabs").tabs({
                disabled: [2, 3]
            });
        }
    }
    else {
        var $tabs = $("#tabs").tabs({
            disabled: [1, 2, 3]
        });
    }

    selTab = "Programme";


    $('#DMVo_MemoDate').attr('disabled', true);
    $('#DMVo_Status').attr('disabled', true);
    $('#DMVo_DMNumber').attr('disabled', true);
    $('#DMVo_ContractNo').focus();

    $('#LicensorDesc').attr('disabled', true);
    $('#ContractEntityDesc').attr('disabled', true);
    $('#MainLicenseeDesc').attr('disabled', true);
    $('#AmortMethodDesc').attr('disabled', true);
    $('#DMVO_Align').attr('disabled', true);
    $('#DMVO_Multiplex').attr('disabled', true);

    if ($("#TypeComboSelection").val() != "") {
        $('#TypeComboSelection').attr('disabled', true);
    }
    $('#DMVo_ContractPrice').attr('disabled', true);
    $('#DMVo_PriceperHour').attr('disabled', true);
    $('#DMVo_MemoHoursRemaining').attr('disabled', true);
    $('#DMVo_MemoPrice').attr('disabled', true);
    $('#DMVo_Hours').attr('disabled', true);
    $('#DMVo_LicensedHoursRemaining').attr('disabled', true);

    if ($('#DMVo_Status').val() == "EXECUTED") {
        $('#btnSave').prop("disabled", true);
        $('#btnSave').removeClass('inputButton').addClass('inputButtonDisable');
    }
    if ($('#DMVo_DMNumber').val() == "") {
        $("#txtTotalRuns").val(0);
        $('#SeriesTreeContextMenu').disableContextMenuItems('#contextMenuDefaultLanguages,#contextMenuDefaultTerritories,#contextMenuCheck,#contextMenuBudget,#contextMenuUnBudget,#contextMenuSignBuyer,#contextMenuUnSignBuyer');
    }
    var AmortMethodValue = null;
    if ($('#DMVo_DMNumber').val() != "") {
        AmortMethodValue = $('#DMVo_AmortMethod').val();
        $('#SeriesTreeContextMenu').disableContextMenuItems('#contextMenuDefaultLanguages,#contextMenuDefaultTerritories,#contextMenuCheck,#contextMenuBudget,#contextMenuUnBudget,#contextMenuSignBuyer,#contextMenuUnSignBuyer');
        if ($('#DMVo_Status').val() == "EXECUTED") {
            $('#SeriesTreeContextMenu').enableContextMenuItems('#contextMenuCheck');
        }
        if ($('#DMVo_Status').val() == "SIGNEDPD") {
            $('#SeriesTreeContextMenu').enableContextMenuItems('#contextMenuCheck');
        }
        if ($('#DMVo_Status').val() == "BEXECUTED") {
            $('#SeriesTreeContextMenu').enableContextMenuItems('#contextMenuCheck');
        }
        if ($('#DMVo_Status').val() == "REGISTERED") {
            $('#SeriesTreeContextMenu').enableContextMenuItems('#contextMenuDefaultLanguages,#contextMenuDefaultTerritories,#contextMenuCheck,,#contextMenuSignBuyer,#contextMenuBudget');
        }
        if ($('#DMVo_Status').val() == "SIGNEDB") {
            $('#SeriesTreeContextMenu').enableContextMenuItems('#contextMenuCheck,#contextMenuUnSignBuyer');
        }
        if ($('#DMVo_Status').val() == "BUDGETED") {
            $('#SeriesTreeContextMenu').enableContextMenuItems('#contextMenuDefaultLanguages,#contextMenuDefaultTerritories,#contextMenuCheck,#contextMenuUnBudget');
        }
        if ($('#DMVo_Status').val() == "BEXECUTED") {
            $('#SeriesTreeContextMenu').enableContextMenuItems('#contextMenuCheck,#contextMenuSignBuyer');
        }
    }
    $("#DMVo_ContractNo").change(function (e) {
        nochanges = false;
        if ($('#DMVo_ContractNo').val() != "") {
            var ContractList = GetListobj(GetContractLOVListactionUrl, { "ContractLOVHint": $("#DMVo_ContractNo").val() });
            var valid = false;
            if (ContractList != null) {
                for (var i = 0; i < ContractList.length; i++) {
                    if (ContractList[i].ConShortName == $('#DMVo_ContractNo').val().toUpperCase()) {
                        valid = true;
                        $.noty.closeAll();
                        break;
                    }
                }
            }
            if (valid == false) {
                if (onClickLOV == false) {
                    $('#DMVo_ContractNo').focus();
                    showMessage("Invalid Contract Code", "warning");
                }
                if (onClickLOV == true) {
                    onClickLOV = false;
                    $.noty.closeAll();
                }
            }
        }
    });
    $("#DMVo_Currency").change(function (e) {
        nochanges = false;
        if ($('#DMVo_Currency').val() != "") {
            var CurrencyList = GetListobj(GetCurrencyLOVListactionUrl, null);
            var valid = false;
            if (CurrencyList != null) {
                for (var i = 0; i < CurrencyList.length; i++) {
                    if (CurrencyList[i].CurrencyCode == $('#DMVo_Currency').val().toUpperCase()) {
                        valid = true;
                        $.noty.closeAll();
                        break;
                    }
                }
            }
            if (valid == false) {
                $('#DMVo_Currency').focus();
                showMessage("Invalid Currency Code", "warning");
            }
        }
        else {
            if (onClickLOV == false) {
                $('#DMVo_Currency').focus();
                showMessage("Currency Code is required", "warning");
            }
            if (onClickLOV == true) {
                onClickLOV = false;
                $.noty.closeAll();
            }
        }

    });
    $('#DMVo_LicenseNo').change(function (e) {
        nochanges = false;
        if ($('#DMVo_LicenseNo').val() != "") {
            var LicenseeNo = GetListobj(GetLicensorDescactionurl, { "LicenseHint": $("#DMVo_LicenseNo").val() });
            if (LicenseeNo != null) {
                $('#LicensorDesc').val(LicenseeNo);
                $.noty.closeAll();
            }
            else {
                $('#DMVo_LicenseNo').focus();
                showMessage("Invalid Licensor Code", "warning");
            }
        }
        else {
            if (onClickLOV == false) {
                $('#DMVo_LicenseNo').focus();
                showMessage("Licensor Code is required", "warning");
            }
            if (onClickLOV == true) {
                onClickLOV = false;
                $.noty.closeAll();
            }
        }
    });
    $('#DMVo_ContractEntity').change(function (e) {
        nochanges = false;
        if ($('#DMVo_ContractEntity').val() != "") {
            var ContractEntity = GetListobj(GetContractEntityDescactionurl, { "ContractEntityHint": $("#DMVo_ContractEntity").val() });
            if (ContractEntity != null) {
                $('#ContractEntityDesc').val(ContractEntity);
                $.noty.closeAll();
            }
            else {
                $('#DMVo_ContractEntity').focus();
                showMessage("Invalid Contract Entity Code", "warning");
            }
        }
        else {
            if (onClickLOV == false) {
                $('#DMVo_ContractEntity').focus();
                showMessage("Contract Entity is required", "warning");
            }
            if (onClickLOV == true) {
                onClickLOV = false;
                $.noty.closeAll();
            }
        }
    });
    $('#DMVo_MainLicensee').change(function (e) {
        nochanges = false;
        if ($('#DMVo_MainLicensee').val() != "") {
            var MainLicensee = GetListobj(GetMainLicenseeDescactionurl, { "MainLicenseeHint": $("#DMVo_MainLicensee").val() });
            if (MainLicensee != null) {
                $('#MainLicenseeDesc').val(MainLicensee);
                $.noty.closeAll();
            }
            else {
                $('#DMVo_MainLicensee').focus();
                showMessage("Invalid Main Licensee Code", "warning");
            }
        }
        else {
            if (onClickLOV == false) {
                $('#DMVo_MainLicensee').focus();
                showMessage("Main Licensee is required", "warning");
            }
            if (onClickLOV == true) {
                onClickLOV = false;
                $.noty.closeAll();
            }
        }
    });
    $('#DMVo_AmortMethod').change(function (e) {
        nochanges = false;
        var changeValid = null;
        if (ProgrammeParticulargridData != null) {
            for (var i = 0; i < ProgrammeParticulargridData.length; i++) {
                if (ProgrammeParticulargridData[i].LicenseeAllocationData != null && ProgrammeParticulargridData[i].LicenseeAllocationData.length > 0) {
                    changeValid = false;
                    alert("Cannot change multiplexing when programme allocations exist. Delete allocations first and retry operation.");
                }
            }
        }
        if (changeValid != false) {
            var AmortMethod = GetListobj(GetAmortMethodDescactionurl, { "AmortMethodHint": $("#DMVo_AmortMethod").val() });
            if (AmortMethod != null) {
                $('#AmortMethodDesc').val(AmortMethod.FsrDesc1);
                if (AmortMethod.FsrValue2 == "Y") {
                    $('#DMVO_Align').prop('checked', true);
                    $('#DMVO_Align').attr('disabled', false);
                    $('#DMVO_Multiplex').attr('disabled', false);
                }
                else {
                    $('#DMVO_Align').prop('checked', false);
                }
                if (AmortMethod.FsrValue3 == "Y") {
                    $('#DMVO_Multiplex').prop('checked', true);
                    $('#DMVO_Align').attr('disabled', false);
                    $('#DMVO_Multiplex').attr('disabled', false);
                }
                else {
                    $('#DMVO_Multiplex').prop('checked', false);
                }
                if ($('#DMVo_AmortMethod').val() == "D") {
                    $('#DMVO_Align').attr('disabled', true);
                }
            }
            else {
                if (AmortMethodValue != null) {
                    $('#DMVo_AmortMethod').val(AmortMethodValue);
                    $('#DMVo_AmortMethod').focus();
                }
                else {
                    showMessage("Invalid Method Id", "warning");
                }
            }
        }
        else {
            if (AmortMethodValue != null) {
                $('#DMVo_AmortMethod').val(AmortMethodValue);
                $('#DMVo_AmortMethod').focus();
            }
            else {
                showMessage("Invalid Method Id", "warning");
            }
        }
    });

    $("#DMVo_AmortMethod").keydown(function (e) {
        if (e.keyCode == 120) {
            $.noty.closeAll();
            onClickLOV = true;
            var changeValid = null;
            if (ProgrammeParticulargridData != null) {
                for (var i = 0; i < ProgrammeParticulargridData.length; i++) {
                    if (ProgrammeParticulargridData[i].LicenseeAllocationData != null && ProgrammeParticulargridData[i].LicenseeAllocationData.length > 0) {
                        changeValid = false;
                        alert("Cannot change multiplexing when programme allocations exist. Delete allocations first and retry operation.");
                    }
                }
            }
            if (changeValid != false) {
                OpenAmortLOVMethod();
            }
            else {
                if (AmortMethodValue != null) {
                    $('#DMVo_AmortMethod').val(AmortMethodValue);
                    $('#DMVo_AmortMethod').focus();
                }
                else {
                    showMessage("Invalid Method Id", "warning");
                }
            }
        }
    });
    $("#DMVo_Currency").keydown(function (e) {
        if (e.keyCode == 120) {
            $.noty.closeAll();
            onClickLOV = true;
            OpenCurrencyLOVMethod();
        }
    });
    $("#DMVo_LicenseNo").keydown(function (e) {
        if (e.keyCode == 120) {
            $.noty.closeAll();
            onClickLOV = true;
            OpenLicensorLOVMethod();
        }
    });
    $("#DMVo_ContractEntity").keydown(function (e) {
        if (e.keyCode == 120) {
            $.noty.closeAll();
            onClickLOV = true;
            OpenContractEntityLOVMethod();
        }
    });
    $("#DMVo_MainLicensee").keydown(function (e) {
        if (e.keyCode == 120) {
            $.noty.closeAll();
            onClickLOV = true;
            OpenMainLicenseeLOVMethod();
        }
    });
    $("#DMVo_ContractNo").keydown(function (e) {
        if (e.keyCode == 120) {
            $.noty.closeAll();
            onClickLOV = true;
            OpenContractLOVMethod();
        }
    });



    $("#DealMemoMaintenanceContentZone").contextMenu({

        menu: 'SeriesTreeContextMenu'
    },
					function (action, el, pos) {
					    if (action == 'contextMenuDefaultLanguages') {
					        if ($("#DMVo_DMNumber").val() != "") {
					            if (selTab != "Language") {
					                save();
					            }
					            $('#tabs').tabs('enable', '#Language');
					            $('#tabs').tabs('select', '#Language');
					            defaultLanguages();
					        }
					    }
					    else if (action == 'contextMenuDefaultTerritories') {
					        if ($("#DMVo_DMNumber").val() != "") {
					            if (selTab != "Territory") {
					                save();
					            }
					            $('#tabs').tabs('enable', '#Territory');
					            $('#tabs').tabs('select', '#Territory');
					            $("#DMVo_RightsCode").val("E");
					            defaultTerritories();
					        }
					    }
					    else if (action == 'contextMenuCheck') {
					        if ($("#DMVo_DMNumber").val() != "") {
					            contextMenuCheck_Click();
					        }
					    }
					    else if (action == 'contextMenuBudget') {
					        if ($("#DMVo_DMNumber").val() != "") {
					            if ($('#DMVo_Status').val() != "BUDGETED" && $('#DMVo_Status').val() != "SIGNEDB") {
					                contextMenuBudget_Click();
					            }
					        }
					    }
					    else if (action == 'contextMenuUnBudget') {
					        if ($("#DMVo_DMNumber").val() != "") {
					            if ($('#DMVo_Status').val() == "BUDGETED") {
					                contextMenuUnBudget_Click();
					            }
					        }
					    }
					    else if (action == 'contextMenuSignBuyer') {
					        if ($("#DMVo_DMNumber").val() != "") {
					            if ($('#DMVo_Status').val() != "SIGNEDB" && $('#DMVo_Status').val() != "BUDGETED") {
					                contextMenuSignBuyer_Click();
					            }
					        }
					    }
					    else if (action == 'contextMenuUnSignBuyer') {
					        if ($("#DMVo_DMNumber").val() != "") {
					            if ($('#DMVo_Status').val() == "SIGNEDB") {
					                contextMenuUnSignBuyer_Click();
					            }
					        }
					    }

					});

});


    var lookupInvokerControl;
	var lookupDescriptionControl;
	var actionParameters;
	var columns;
	var idfield;
	var idFieldDesc;
	var title;
	var SelectedRowData;

    function SetLookupDataToInvoker(SelectedRowData, lookupInvokerControl) {
        if (lookupInvokerControl == "ProgrammeTypeColumn" || lookupInvokerControl == "ProgrammeTitleColumn"
            || lookupInvokerControl == "ProgrammeEventTypeColumn" || lookupInvokerControl == "ProgramCategoryColumn"
            || lookupInvokerControl == "ProgramBOCategoryColumn") {
            if (SelectedRowData == null) {
                if (!gridProgrammeParticulars.getEditorLock().isActive()) {
                    gridProgrammeParticulars.getEditorLock().activate(gridProgrammeParticulars.getEditController());
                }
            }
            else {
                SetLookupDataToInvokerProgramParticulars(SelectedRowData, lookupInvokerControl);
            }
        }
        else if (lookupInvokerControl == "ProgramLinearLicenseeColumn" || lookupInvokerControl == "ProgramChannelServiceColumn") {
            if (SelectedRowData == null) {
                if (!gridLicenseeAllocation.getEditorLock().isActive()) {
                    gridLicenseeAllocation.getEditorLock().activate(gridLicenseeAllocation.getEditController());
                }
            }
            else {
                SetLookupDataToInvokerProgramParticulars(SelectedRowData, lookupInvokerControl);
            }
        }
        else if (lookupInvokerControl == "ProgramCatchUpLicenseeColumn") {
            if (SelectedRowData == null) {
                if (!gridCatchUpLicenseeAllocation.getEditorLock().isActive())
                    gridCatchUpLicenseeAllocation.getEditorLock().activate(gridCatchUpLicenseeAllocation.getEditController());
            }
            else {
                SetLookupDataToInvokerProgramParticulars(SelectedRowData, lookupInvokerControl);
            }
        }
        else if (lookupInvokerControl == "ProgramChannelListColumn") {
            if (SelectedRowData == null) {
                if (!gridRunsPerChannel.getEditorLock().isActive()) {
                    gridRunsPerChannel.getEditorLock().activate(gridRunsPerChannel.getEditController());
                }
            }
            else {
                SetLookupDataToInvokerProgramParticulars(SelectedRowData, lookupInvokerControl);
            }
        }
        else if (lookupInvokerControl == "ProgramPlateformRightsColumn") {
            if (SelectedRowData == null) {
                if (!gridPlatformRights.getEditorLock().isActive())
                    gridPlatformRights.getEditorLock().activate(gridPlatformRights.getEditController());
            }
            else {
                SetLookupDataToInvokerProgramParticulars(SelectedRowData, lookupInvokerControl);
            }
        }
        else if (lookupInvokerControl == "#DMVo_AmortMethod") {
            if (SelectedRowData != null) {
                $('#DMVo_AmortMethod').val(SelectedRowData.FsrValue1);
                $('#AmortMethodDesc').val(SelectedRowData.FsrDesc1);
                if (SelectedRowData.FsrValue2 == "Y") {
                    $('#DMVO_Align').prop('checked', true);
                    $('#DMVO_Align').attr('disabled', false);
                    $('#DMVO_Multiplex').attr('disabled', false);
                }
                else {
                    $('#DMVO_Align').prop('checked', false);
                }
                if (SelectedRowData.FsrValue3 == "Y") {
                    $('#DMVO_Multiplex').prop('checked', true);
                    $('#DMVO_Align').attr('disabled', false);
                    $('#DMVO_Multiplex').attr('disabled', false);
                }
                else {
                    $('#DMVO_Multiplex').prop('checked', false);
                }
                if ($('#DMVo_AmortMethod').val() == "D") {
                    $('#DMVO_Align').attr('disabled', true);
                    $('#DMVO_Multiplex').attr('disabled', true);
                }
            }
            else {
                $('#DMVo_AmortMethod').focus();
            }
        }
        else if (lookupInvokerControl == "LanIDColumn") {
            SetLookupDataToInvokerLanguage(SelectedRowData, lookupInvokerControl); //Language Code
        }
         else if (lookupInvokerControl == "TerritoryCodeColumn") {
             SetLookupDataToInvokerTerritory(SelectedRowData, lookupInvokerControl); //Territory Code
        }
         else if (lookupInvokerControl == "MecValueColumn") {
             SetLookupDataToInvokerTerritory(SelectedRowData, lookupInvokerControl); //Rights Code
        }
         else if (lookupInvokerControl == "PatCodeColumn") {
              SetLookupDataToInvokerPayment(SelectedRowData, lookupInvokerControl);  //Payment Code
        }
         else if (lookupInvokerControl == "SportTypeLOV") {
             if (SelectedRowData != null) {
                 $("#TextSportType").val(SelectedRowData[idfield]);
                 $(lookupInvokerControl).focus();
             }
        }
         else if (lookupInvokerControl == "SubGenreLOV") {
             if (SelectedRowData != null) {
                 $("#TextSubGenre").val(SelectedRowData[idfield]);
                 $(lookupInvokerControl).focus();
             }
        }
         else if (lookupInvokerControl == "EventTypeLOV") {
             if (SelectedRowData != null) {
                 $("#TextEventType").val(SelectedRowData[idfield]);
                 $(lookupInvokerControl).focus();
             }
        }
        else {
            if (SelectedRowData != null) {
                $(lookupInvokerControl).val(SelectedRowData[idfield]);
                if (idFieldDesc.length > 0) {
                    $(lookupDescriptionControl).val(SelectedRowData[idFieldDesc]);
                }
            }
            $(lookupInvokerControl).focus();
        }
    }


    function OpenAmortLOVMethod() {
        nochanges = false;
	lookupInvokerControl = "#DMVo_AmortMethod";
	lookupDescriptionControl = "#AmortMethodDesc";
	actionParameters = null;

	columns = [
							 { id: "FsrValue1", name: "FsrValue1", field: "FsrValue1" },
							 { id: "FsrDesc1", name: "FsrDesc1", field: "FsrDesc1" },
							 { id: "FsrValue2", name: "FsrValue2", field: "FsrValue2" },
							 { id: "FsrDesc2", name: "FsrDesc2", field: "FsrDesc2" },
							 { id: "FsrValue3", name: "FsrValue3", field: "FsrValue3" },
							 { id: "FsrDesc3", name: "FsrDesc3", field: "FsrDesc3" },
							 { id: "FsrValue4", name: "FsrValue4", field: "FsrValue4" },
							 { id: "FsrDesc4", name: "FsrDesc4", field: "FsrDesc4" }
					  ];



	idfield = "FsrValue1";
	idFieldDesc = "FsrDesc1";

	title = "Amortization Method";
	//ShowLookupDesc(lookupInvokerControl, lookupDescriptionControl, GetAmortMethodLOVListactionUrl, actionParameters, columns, options, idfield, idFieldDesc, gridwidth, gridheight, title);
	ShowDealMemoLookup(GetAmortMethodLOVListactionUrl, actionParameters, columns, lookupInvokerControl, idfield, title, null);

};
function OpenCurrencyLOVMethod() {
    nochanges = false;
	lookupInvokerControl = "#DMVo_Currency";
	actionParameters = null;

	columns = [
						 { id: "CurrencyCode", name: "Currency Code", field: "CurrencyCode" },
						 { id: "CurrencyName", name: "Currency Name", field: "CurrencyName" }

					  ];



	idfield = "CurrencyCode";
    idFieldDesc="";
	title = "Currencies";
	//ShowLookup(lookupInvokerControl, GetCurrencyLOVListactionUrl, actionParameters, columns, options, idfield, gridwidth, gridheight, title);
	ShowDealMemoLookup(GetCurrencyLOVListactionUrl, actionParameters, columns, lookupInvokerControl, idfield, title, null);
};

function OpenLicensorLOVMethod() {
    nochanges = false;
	lookupInvokerControl = "#DMVo_LicenseNo";
	lookupDescriptionControl = "#LicensorDesc";
	actionParameters = "LicensorHint=" + $("#DMVo_LicenseNo").val();

	columns = [
							 { id: "ShortName", name: "Short Name", field: "ShortName" },
							 { id: "Name", name: "Name", field: "Name" }
					  ];

	
	idfield = "ShortName";
	idFieldDesc = "Name";
	title = "Companies";
	//ShowLookupDesc(lookupInvokerControl, lookupDescriptionControl, GetLicensorLOVListactionUrl, actionParameters, columns, options, idfield, idFieldDesc, gridwidth, gridheight, title);
	ShowDealMemoLookup(GetLicensorLOVListactionUrl, actionParameters, columns, lookupInvokerControl, idfield, title, null);
};

function OpenContractEntityLOVMethod() {
    nochanges = false;
	lookupInvokerControl = "#DMVo_ContractEntity";
	lookupDescriptionControl = "#ContractEntityDesc";
	actionParameters = "ContractEntityLOVHint=" + $("#DMVo_ContractEntity").val();

	columns = [
							  { id: "ShortName", name: "Short Name", field: "ShortName" },
							  { id: "Name", name: "Name", field: "Name" }
					  ];



	idfield = "ShortName";
	idFieldDesc = "Name";
	title = "Agencies/Buying Companies";
	//ShowLookupDesc(lookupInvokerControl, lookupDescriptionControl, GetContractEntityLOVListactionUrl, actionParameters, columns, options, idfield, idFieldDesc, gridwidth, gridheight, title);
	ShowDealMemoLookup(GetContractEntityLOVListactionUrl, actionParameters, columns, lookupInvokerControl, idfield, title, null);
};


function OpenContractLOVMethod() {
    nochanges = false;
	lookupInvokerControl = "#DMVo_ContractNo";
	lookupDescriptionControl = "#TypeComboSelection";
	actionParameters = "ContractLOVHint=" + $("#DMVo_ContractNo").val();

	columns = [
							 { id: "ConShortName", name: "Contract Short Name", field: "ConShortName" },
							 { id: "ConName", name: "Contract Name", field: "ConName" },
							 { id: "ConCalcType", name: "Contract Calc Type", field: "ConCalcType" }
					  ];

	
	idfield = "ConShortName";
	idFieldDesc = "ConCalcType";
	title = "Contracts";
	//ShowLookupDesc(lookupInvokerControl, lookupDescriptionControl, GetContractLOVListactionUrl, actionParameters, columns, options, idfield, idFieldDesc, gridwidth, gridheight, title);
	ShowDealMemoLookup(GetContractLOVListactionUrl, actionParameters, columns, lookupInvokerControl, idfield, title, null);
};

function OpenMainLicenseeLOVMethod() {
    nochanges = false;
	lookupInvokerControl = "#DMVo_MainLicensee";
	lookupDescriptionControl = "#MainLicenseeDesc";
	actionParameters = "MainLicenseeLOVHint=" + $("#DMVo_MainLicensee").val();

	columns = [
						   { id: "ShortName", name: "Licensee ShortName", field: "ShortName" },
						   { id: "Name", name: "Licensee Name", field: "Name" }

					  ];

	

	idfield = "ShortName";
	idFieldDesc = "Name";
	title = "Licensees";
	ShowDealMemoLookup(GetMainLicenseeLOVListactionUrl, actionParameters, columns, lookupInvokerControl, idfield, title, null);
	//ShowLookupDesc(lookupInvokerControl, lookupDescriptionControl, GetMainLicenseeLOVListactionUrl, actionParameters, columns, options, idfield, idFieldDesc, gridwidth, gridheight, title);
};



function save() {
    if (nochanges == false) {
        switch (selTab) {
            case "Programme":
                var MandatoryFlag = CheckMadatoryFields();
                if (MandatoryFlag == true) {
                    saveDealMemoProgrammeDetails();
                }
                break;
            case "Language":
                var MandatoryFlag = CheckMadatoryFields();
                if (MandatoryFlag == true) {
                    saveLanguageDetails();
                }
                break;
            case "Territory":
                var MandatoryFlag = CheckMadatoryFields();
                if (MandatoryFlag == true) {
                    saveTerritoryDetails();
                }
                break;
            case "Payment":
                var MandatoryFlag = CheckMadatoryFields();
                if (MandatoryFlag == true) {
                    if (UpData.length > 0) {                   
                            UpData[0].SplitPaymentDetails = UpdatedData;
                    }
                    savePaymentDetails();
                }
                break;
        }
      
    }
};


function saveDealMemoProgrammeDetails() {
    ShowProgressBar();

    if (gridProgrammeParticulars.getActiveCell() != null) {
        if (gridProgrammeParticulars.getDataLength() > 0) {
            var ActiveRow = gridProgrammeParticulars.getActiveCell().row;
            var Activecell = gridProgrammeParticulars.getActiveCell().cell;

            if (Activecell == 1) {
                var cellvalue = null;
                if (gridProgrammeParticulars.getCellEditor() != null) {
                    if (gridProgrammeParticulars.getCellEditor().getValue() != null) {
                        if (typeof ProgrammeParticulargridData[ActiveRow][gridProgrammeParticulars.getColumns()[Activecell].field] == "string") {
                            cellvalue = gridProgrammeParticulars.getCellEditor().getValue().toUpperCase();
                        }
                    }
                }
                if (cellvalue != null && cellvalue != "" && cellvalue != "null") {
                    SetProgramTitleDetails(ActiveRow, cellvalue);
                }
                gridProgrammeParticulars.gotoCell(ActiveRow, 0, true);
                RemoveProgressBar();
                return;
            }
            if (Activecell == 0) {
                gridProgrammeParticulars.gotoCell(ActiveRow, 1, true);
            }
            else {
                gridProgrammeParticulars.gotoCell(ActiveRow, 0, true);
            }
            gridProgrammeParticulars.setData(ProgrammeParticulargridData);
            gridProgrammeParticulars.render();
        }
    }
    if (gridLicenseeAllocation.getActiveCell() != null) {
        if (gridLicenseeAllocation.getDataLength() > 0) {
            var ActiveRow = gridLicenseeAllocation.getActiveCell().row;
            var Activecell = gridLicenseeAllocation.getActiveCell().cell;
            if (Activecell == 0) {
                gridLicenseeAllocation.gotoCell(ActiveRow, 1, true);
            }
            else {
                gridLicenseeAllocation.gotoCell(ActiveRow, 0, true);
            }
        }
        gridLicenseeAllocation.setData(LicenseeDetailsgridData);
        gridLicenseeAllocation.render();
    }
    if (gridRunsPerChannel.getActiveCell() != null) {
        if (gridRunsPerChannel.getDataLength() > 0) {
            var ActiveRow = gridRunsPerChannel.getActiveCell().row;
            var Activecell = gridRunsPerChannel.getActiveCell().cell;
            if (Activecell == 0) {
                gridRunsPerChannel.gotoCell(ActiveRow, 1, true);
            }
            else {
                gridRunsPerChannel.gotoCell(ActiveRow, 0, true);
            }
        }
        gridRunsPerChannel.setData(RunsPerChannelgridData);
        gridRunsPerChannel.render();
    }
    if (gridCatchUpLicenseeAllocation.getActiveCell() != null) {
        if (gridCatchUpLicenseeAllocation.getDataLength() > 0) {
            var ActiveRow = gridCatchUpLicenseeAllocation.getActiveCell().row;
            var Activecell = gridCatchUpLicenseeAllocation.getActiveCell().cell;
            if (Activecell == 0) {
                gridCatchUpLicenseeAllocation.gotoCell(ActiveRow, 1, true);
            }
            else {
                gridCatchUpLicenseeAllocation.gotoCell(ActiveRow, 0, true);
            }
        }
        gridCatchUpLicenseeAllocation.setData(CatchUpLicenseeAllocationgridData);
        gridCatchUpLicenseeAllocation.render();
    }
    if (gridPlatformRights.getActiveCell() != null) {
        if (gridPlatformRights.getDataLength() > 0) {
            var ActiveRow = gridPlatformRights.getActiveCell().row;
            var Activecell = gridPlatformRights.getActiveCell().cell;
            if (Activecell == 0) {
                gridPlatformRights.gotoCell(ActiveRow, 1, true);
            }
            else {
                gridPlatformRights.gotoCell(ActiveRow, 0, true);
            }
        }
        gridPlatformRights.setData(PlatfromRightsAllocationgridData);
        gridPlatformRights.render();
    }

    if(ProgrammeParticulargridData!=null) {
         for (var i = 0; i < ProgrammeParticulargridData.length; i++) {
             if(ProgrammeParticulargridData[i].PersistFlag==0){
                ProgrammeVOModifiedData.push(JSON.parse(JSON.stringify(ProgrammeParticulargridData[i])));
              }
              if(ProgrammeParticulargridData[i].PersistFlag==1||ProgrammeParticulargridData[i].PersistFlag==3){
                 if(ProgrammeParticulargridData[i].LicenseeAllocationData!=null){
                    for (var j = 0; j < ProgrammeParticulargridData[i].LicenseeAllocationData.length; j++) {
                        if(ProgrammeParticulargridData[i].LicenseeAllocationData[j].PersistFlag==0) {
                            for (var m = 0; m < ProgrammeVOModifiedData.length; m++) {
                                if (ProgrammeVOModifiedData[m].Id == ProgrammeParticulargridData[i].Id) {
                                    ProgrammeVOModifiedData[m].LicenseeAllocationData.push(JSON.parse(JSON.stringify(ProgrammeParticulargridData[i].LicenseeAllocationData[j])));
                                 }
                            }
                        }
                         if(ProgrammeParticulargridData[i].LicenseeAllocationData[j].PersistFlag==1||ProgrammeParticulargridData[i].LicenseeAllocationData[j].PersistFlag==3) {
                            if(ProgrammeParticulargridData[i].LicenseeAllocationData[j].RunsPerChannelData!=null){
                                 for (var k = 0; k < ProgrammeParticulargridData[i].LicenseeAllocationData[j].RunsPerChannelData.length; k++) {
                                    if(ProgrammeParticulargridData[i].LicenseeAllocationData[j].RunsPerChannelData[k].PersistFlag==0) {
                                        for (var m = 0; m < ProgrammeVOModifiedData.length; m++) {
                                            if (ProgrammeVOModifiedData[m].Id == ProgrammeParticulargridData[i].Id) {
                                                 for (var n = 0; n < ProgrammeVOModifiedData[i].LicenseeAllocationData.length; n++) {
                                                    if (ProgrammeVOModifiedData[m].LicenseeAllocationData[n].Id == ProgrammeParticulargridData[i].LicenseeAllocationData[j].Id) {
                                                        ProgrammeVOModifiedData[m].LicenseeAllocationData[n].RunsPerChannelData.push(JSON.parse(JSON.stringify(ProgrammeParticulargridData[i].LicenseeAllocationData[j].RunsPerChannelData[k])));
                                                    }
                                                 }
                                            }
                                        }
                                    }
                                 }
                            }
                        }
                    }
                 }
                  if(ProgrammeParticulargridData[i].CatchUpLicenseeAllocationVOList!=null){
                    for (var j = 0; j < ProgrammeParticulargridData[i].CatchUpLicenseeAllocationVOList.length; j++) {
                        if(ProgrammeParticulargridData[i].CatchUpLicenseeAllocationVOList[j].PersistFlag==0) {
                            for (var m = 0; m < ProgrammeVOModifiedData.length; m++) {
                                 if (ProgrammeVOModifiedData[m].Id == ProgrammeParticulargridData[i].Id) {
                                    ProgrammeVOModifiedData[m].CatchUpLicenseeAllocationVOList.push(JSON.parse(JSON.stringify(ProgrammeParticulargridData[i].CatchUpLicenseeAllocationVOList[j])));
                                 }
                            }
                        }
                        if(ProgrammeParticulargridData[i].CatchUpLicenseeAllocationVOList[j].PersistFlag==1||ProgrammeParticulargridData[i].CatchUpLicenseeAllocationVOList[j].PersistFlag==3) {
                            if(ProgrammeParticulargridData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList!=null){
                                 for (var k = 0; k < ProgrammeParticulargridData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList.length; k++) {
                                    if(ProgrammeParticulargridData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].PersistFlag==0) {
                                        for (var m = 0; m < ProgrammeVOModifiedData.length; m++) {
                                            if (ProgrammeVOModifiedData[m].Id == ProgrammeParticulargridData[i].Id) {
                                                 for (var n = 0; n < ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList.length; n++) {
                                                    if (ProgrammeVOModifiedData[m].CatchUpLicenseeAllocationVOList[n].Id == ProgrammeParticulargridData[i].CatchUpLicenseeAllocationVOList[j].Id) {
                                                        ProgrammeVOModifiedData[m].CatchUpLicenseeAllocationVOList[n].MediaServicePlatformList.push(JSON.parse(JSON.stringify(ProgrammeParticulargridData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k])));
                                                    }
                                                 }
                                            }
                                        }
                                    }
                                 }
                            }
                        }
                    }
                 }
              }
         }
     }
    
  
    var DealMemoProgramDetails = {
        DMVo_Currency: $("#DMVo_Currency").val(),
        TypeComboSelection: $("#TypeComboSelection").val(),
        DMVo_LicenseNo: $("#DMVo_LicenseNo").val(),
        DMVo_ContractEntity: $("#DMVo_ContractEntity").val(),
        DMVo_MainLicensee: $("#DMVo_MainLicensee").val(),
        DMVo_AmortMethod: $("#DMVo_AmortMethod").val(),
        DMVo_DMNumber: $("#DMVo_DMNumber").val(),
        DMVo_Status: $("#DMVo_Status").val(),
        DMVo_MemoDate: $("#DMVo_MemoDate").val(),
        DMVo_ContractNo: $("#DMVo_ContractNo").val(),
        DMVo_ContractPrice: $('#DMVo_ContractPrice').val(),
        DMVo_PriceperHour:$('#DMVo_PriceperHour').val(),
        DMVo_MemoHoursRemaining: $('#DMVo_MemoHoursRemaining').val(),
        DMVo_MemoPrice:$('#DMVo_MemoPrice').val(),
        DMVo_Hours:$('#DMVo_Hours').val(),
        DMVo_LicensedHoursRemaining: $('#DMVo_LicensedHoursRemaining').val(),
        ProgramVO: ProgrammeVOModifiedData
    };
    $.ajax({
        url: SaveDealMemoUrl,
        type: "POST",
        dataType: 'Json',
        data: JSON.stringify(DealMemoProgramDetails),
        contentType: "application/json; charset=utf-8",
        async: false,
        cache: false,

        success: function (data) {
            if (data.successflag == true) {
                $("#DMVo_DMNumber").val(data.DealMemoValues.DMVo_DMNumber);
                $("#TypeComboSelection").val(data.DealMemoValues.TypeComboSelection);
                $('#TypeComboSelection').attr('disabled', true);
                $("#DMVo_LicenseNo").val(data.DealMemoValues.DMVo_LicenseNo);
                $("#DMVo_ContractEntity").val(data.DealMemoValues.DMVo_ContractEntity);
                $("#DMVo_MainLicensee").val(data.DealMemoValues.DMVo_MainLicensee);
                $("#DMVo_AmortMethod").val(data.DealMemoValues.DMVo_AmortMethod);
                $("#DMVo_Currency").val(data.DealMemoValues.DMVo_Currency);
                $("#DMVo_Status").val(data.DealMemoValues.DMVo_Status);
                $("#DMVo_MemoDate").val(data.DealMemoValues.DMVo_MemoDate);
                $("#DMVo_ContractNo").val(data.DealMemoValues.DMVo_ContractNo);
                AmortMethodValue = $('#DMVo_AmortMethod').val();
                if (data.DealMemoValues.DMVo_Status = "REGISTERED") {
                    $('#SeriesTreeContextMenu').enableContextMenuItems('#contextMenuDefaultLanguages,#contextMenuDefaultTerritories,#contextMenuCheck,#contextMenuSignBuyer,#contextMenuBudget');
                }
                if (data.DealMemoValues.BindingListProgrammeParticulars != undefined && data.DealMemoValues.BindingListProgrammeParticulars != null) {
                    ProgrammeParticulargridData = data.DealMemoValues.BindingListProgrammeParticulars;
                    ProgrammeVOModifiedData = JSON.parse(JSON.stringify(ProgrammeParticulargridData));
                    gridProgrammeParticulars.setData(ProgrammeParticulargridData);
                    gridProgrammeParticulars.render();
                    ShowProgrammeParticularDetails(0);
                }
                else {
                    ProgrammeParticulargridData = [];
                    ProgrammeVOModifiedData = [];
                    gridProgrammeParticulars.setData(ProgrammeParticulargridEmptyRow);
                    gridProgrammeParticulars.render();
                    SetEmptyGridProperty(gridProgrammeParticulars, gridProgrammeParticularId);
                    SetNewProgrammeDetails();

                }
                IsbtnSeriesDetailsClicked = false;
                IsbtnTitleDetailsClicked = false;
                SelectedRowforDetails = null;
                if (data.DealMemoValues.BindingListHistoryDetails != undefined && data.DealMemoValues.BindingListHistoryDetails != null) {
                    HistoryGridData = data.DealMemoValues.BindingListHistoryDetails;
                    historyGrid.setData(HistoryGridData);
                    historyGrid.render();
                    setfooter(gridContainerDivHistoryGrid, 1, HistoryGridData.length);
                }
                if ($("#DMVo_DMNumber").val() != "" || $("#DMVo_DMNumber").val() != null || $("#DMVo_DMNumber").val() != "null") {
                    $('#tabs').tabs('enable', '#Language');
                    $('#tabs').tabs('enable', '#Territory');
                    $('#tabs').tabs('enable', '#Payment');
                    loadPayments();
                }
                if (data.messages != null) {
                    DisplayAppMessages(data.messages);
                    nochanges = true;
                }
                else {
                    if (data.Applicationmessage = "Transaction completed successfully.") {
                        showMessage(data.Applicationmessage, "information");
                    }
                    else {
                        showMessage(data.Applicationmessage, "warning");
                    }

                    nochanges = true;
                }
            }
            else {
                if (ProgrammeVOModifiedData != undefined) {
                    if (ProgrammeVOModifiedData != null) {
                        for (var i = 0; i < ProgrammeVOModifiedData.length; i++) {
                            if (ProgrammeVOModifiedData[i] != undefined && ProgrammeVOModifiedData[i] != null) {
                                if (ProgrammeVOModifiedData[i].PersistFlag == 0) {
                                    ProgrammeVOModifiedData.splice(i, 1);
                                }
                                else {
                                    if (ProgrammeVOModifiedData[i].PersistFlag == 1 || ProgrammeVOModifiedData[i].PersistFlag == 3) {
                                        if (ProgrammeVOModifiedData[i].LicenseeAllocationData != undefined) {
                                            if (ProgrammeVOModifiedData[i].LicenseeAllocationData != null) {
                                                for (var j = 0; j < ProgrammeVOModifiedData[i].LicenseeAllocationData.length; j++) {
                                                    if (ProgrammeVOModifiedData[i].LicenseeAllocationData[j] != undefined && ProgrammeVOModifiedData[i].LicenseeAllocationData[j] != null) {
                                                        if (ProgrammeVOModifiedData[i].LicenseeAllocationData[j].PersistFlag == 0) {
                                                            ProgrammeVOModifiedData[i].LicenseeAllocationData.splice(j, 1);
                                                        }
                                                        else {
                                                            if (ProgrammeVOModifiedData[i].LicenseeAllocationData[j].PersistFlag == 1 || ProgrammeVOModifiedData[i].LicenseeAllocationData[j].PersistFlag == 3) {
                                                                if (ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData != undefined) {
                                                                    if (ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData != null) {
                                                                        for (var k = 0; k < ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData.length; k++) {
                                                                            if (ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData[k] !== undefined && ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData[k] !== null) {
                                                                                if (ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData[k].PersistFlag == 0) {
                                                                                    ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData.splice(k, 1);
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if (ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList != undefined) {
                                            if (ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList != null) {
                                                for (var j = 0; j < ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList.length; j++) {
                                                    if (ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j] != undefined && ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j] != null) {
                                                        if (ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].PersistFlag == 0) {
                                                            ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList.splice(j, 1);
                                                        }
                                                        else {
                                                            if (ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].PersistFlag == 1 || ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].PersistFlag == 3) {
                                                                if (ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList != undefined) {
                                                                    if (ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList != null) {
                                                                        for (var k = 0; k < ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList.length; k++) {
                                                                            if (ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k] != undefined && ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k] != null) {
                                                                                if (ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].PersistFlag == 0) {
                                                                                    ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList.splice(k, 1);
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }

                                                }
                                            }

                                        }

                                    }

                                }

                            }
                        }
                    }
                }
                IsbtnTitleDetailsClicked = false;
                IsbtnSeriesDetailsClicked = false;
                SelectedRowforDetails = null;
                if (data.messages != null) {
                    DisplayAppMessages(data.messages);
                    nochanges = true;
                }
                else {
                    showMessage(data.Applicationmessage, "warning");
                }
            }
            RemoveProgressBar();
        },
        error: function () {
            showMessage("Some exception occured.Please contact the Administrator.", "error");
        }
    });
};


function saveLanguageDetails() {
$.noty.closeAll();
	for (var i = 0; i < UpData.length; i++) {
		if (UpData[i].SuppliedBy != null)
			UpData[i].SuppliedBy = (UpData[i].SuppliedBy).substring(0, 1);
		if (UpData[i].SupplierUserCost != null)
			UpData[i].SupplierUserCost = (UpData[i].SupplierUserCost).substring(0, 1);

		UpData[i].IsOriginal = UpData[i].IsOriginal ? "true" : "false";
		UpData[i].IsDubbed = UpData[i].IsDubbed ? "true" : "false";
		UpData[i].IsSubtitle = UpData[i].IsSubtitle ? "true" : "false";
		UpData[i].IsVoiceOver = UpData[i].IsVoiceOver ? "true" : "false";
	}


var SaveLanguagesactionParameters = {
     DMVo_Currency: $("#DMVo_Currency").val(),
        TypeComboSelection: $("#TypeComboSelection").val(),
        DMVo_LicenseNo: $("#DMVo_LicenseNo").val(),
        DMVo_ContractEntity: $("#DMVo_ContractEntity").val(),
        DMVo_MainLicensee: $("#DMVo_MainLicensee").val(),
        DMVo_AmortMethod: $("#DMVo_AmortMethod").val(),
        DMVo_DMNumber: $("#DMVo_DMNumber").val(),
        DMVo_Status: $("#DMVo_Status").val(),
        DMVo_MemoDate: $("#DMVo_MemoDate").val(),
        DMVo_ContractNo: $("#DMVo_ContractNo").val(),
        DMVo_ContractPrice: $('#DMVo_ContractPrice').val(),
        DMVo_PriceperHour:$('#DMVo_PriceperHour').val(),
        DMVo_MemoHoursRemaining: $('#DMVo_MemoHoursRemaining').val(),
        DMVo_MemoPrice:$('#DMVo_MemoPrice').val(),
        DMVo_Hours:$('#DMVo_Hours').val(),
        DMVo_LicensedHoursRemaining: $('#DMVo_LicensedHoursRemaining').val(),
    Languages: UpData
};

$.ajax({
    url: SaveLanguagesactionurl,
    type: "POST",
    data: JSON.stringify(SaveLanguagesactionParameters),
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    async: false,
    cache: false,

    success: function (data) {

        if (data.Messages != null)
            DisplayAppMessages(data.Messages);
        else
            showMessage("Transaction completed successfully.", "information");
        UpData = [];
        nochanges = true;
        loadLanguagesafterSave(data.Languages);
        //            loadLanguages();

        if (languageGrid.getEditorLock().isActive())
            languageGrid.getEditorLock().deactivate(languageGrid.getEditController());

    },

    error: function (data) {
        showMessage("Transaction Not Saved", "information");
        loadLanguages();
    }
});
}
var updata1 = [], updata2 = [];
function saveTerritoryDetails() {

$.noty.closeAll();
var SaveTerritoryactionParameters = {
     DMVo_Currency: $("#DMVo_Currency").val(),
        TypeComboSelection: $("#TypeComboSelection").val(),
        DMVo_LicenseNo: $("#DMVo_LicenseNo").val(),
        DMVo_ContractEntity: $("#DMVo_ContractEntity").val(),
        DMVo_MainLicensee: $("#DMVo_MainLicensee").val(),
        DMVo_AmortMethod: $("#DMVo_AmortMethod").val(),
        DMVo_DMNumber: $("#DMVo_DMNumber").val(),
        DMVo_Status: $("#DMVo_Status").val(),
        DMVo_MemoDate: $("#DMVo_MemoDate").val(),
        DMVo_ContractNo: $("#DMVo_ContractNo").val(),
        DMVo_ContractPrice: $('#DMVo_ContractPrice').val(),
        DMVo_PriceperHour:$('#DMVo_PriceperHour').val(),
        DMVo_MemoHoursRemaining: $('#DMVo_MemoHoursRemaining').val(),
        DMVo_MemoPrice:$('#DMVo_MemoPrice').val(),
        DMVo_Hours:$('#DMVo_Hours').val(),
        DMVo_LicensedHoursRemaining: $('#DMVo_LicensedHoursRemaining').val(),
    Territories: UpData
};

$.ajax({
    url: SaveTerritoryactionurl,
    type: "POST",
    data: JSON.stringify(SaveTerritoryactionParameters),
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    async: false,
    cache: false,

    success: function (data) {

        if (data.Messages != null)
            DisplayAppMessages(data.Messages);
        else {
            if (updata2.length != 0) {
                UpData = updata2;
                updata2 = [];

                saveTerritoryDetails();
            }
        }
        if (UpData.length > 0) {
            showMessage("Transaction completed successfully.", "information");
            UpData = [];
            nochanges = true;
            loadTerritoriesafterSave(data.Territorries);
        }

    },
    error: function () {
        var len1, len2;
        var len = UpData.length;

        if (len % 2 == 0)
            len1 = len / 2;
        else
            len1 = (len / 2) + 0.5;

        for (var i = 0; i < len1; i++)
            updata1[i] = UpData[i];

        var j = 0;
        for (var i = len1; i < len; i++) {
            updata2[j] = UpData[i];
            j++;
        }

        if (updata1.length != 0) {  
            if (UpData.length != updata1.length) {
                UpData = updata1;
                updata1 = [];
                saveTerritoryDetails();
            }
        }
      
        loadTerritories();
    }

});
}

var valid = true;
function savePaymentDetails() {
    $.noty.closeAll();
    validatePaymentUpdata(UpData);


    if (valid) {
        var SavePaymentactionParameters = {
            DMVo_Currency: $("#DMVo_Currency").val(),
            TypeComboSelection: $("#TypeComboSelection").val(),
            DMVo_LicenseNo: $("#DMVo_LicenseNo").val(),
            DMVo_ContractEntity: $("#DMVo_ContractEntity").val(),
            DMVo_MainLicensee: $("#DMVo_MainLicensee").val(),
            DMVo_AmortMethod: $("#DMVo_AmortMethod").val(),
            DMVo_DMNumber: $("#DMVo_DMNumber").val(),
            DMVo_Status: $("#DMVo_Status").val(),
            DMVo_MemoDate: $("#DMVo_MemoDate").val(),
            DMVo_ContractNo: $("#DMVo_ContractNo").val(),
            DMVo_ContractPrice: $('#DMVo_ContractPrice').val(),
            DMVo_PriceperHour: $('#DMVo_PriceperHour').val(),
            DMVo_MemoHoursRemaining: $('#DMVo_MemoHoursRemaining').val(),
            DMVo_MemoPrice: $('#DMVo_MemoPrice').val(),
            DMVo_Hours: $('#DMVo_Hours').val(),
            DMVo_LicensedHoursRemaining: $('#DMVo_LicensedHoursRemaining').val(),
            Payments: UpData
        };


        $.ajax({
            url: SavePaymentactionurl,
            type: "POST",
            data: JSON.stringify(SavePaymentactionParameters),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: false,
            cache: false,

            success: function (data) {
                if (data.Messages != null)
                    DisplayAppMessages(data.Messages);
                else 
                    showMessage("Transaction completed successfully.", "information");
                UpData = [];
                UpdatedData = [];
                nochanges = true;
                    loadPaymentsafterSave(data.Payments);
            },
            error: function () {
                showMessage("Transaction Not Saved", "information");
                loadPayments();
            }
        });
    }
}

shortcut.add("Esc", function () {
    $.noty.closeAll();
    $(activeCellNode).attr("title", "");
});

shortcut.add("F10", function () {
    if (nochanges == false) {
        save();
    }
    else {
        showMessage("No changes to save", "information");
    }
});

function SaveDealMemo_click() {
    if (nochanges == false) {
        save();
    }
    else {
        showMessage("No changes to save", "information");
    }
};

function contextMenuCheck_Click() {
    if ($("#DMVo_DMNumber").val() != "") {
        if (nochanges == true) {
            var SelectedProgIndex = gridProgrammeParticulars.getSelectedRows();
            var SelectedProgId = ProgrammeParticulargridData[SelectedProgIndex].Id;
            var contextMenuCheckParameters = {
                DMNumber: $("#DMVo_DMNumber").val(),
                SelectedProgId: SelectedProgId,
                ProgramVO: ProgrammeVOModifiedData
            };
            $.ajax({
                url: contextMenuCheckUrl,
                type: "POST",
                data: JSON.stringify(contextMenuCheckParameters),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: false,
                cache: false,

                success: function (data) {
                    if (data.successflag == true) {
                        showMessage(data.Applicationmessage, "information");
                    }
                    else {
                        if (data.messages != null) {
                            DisplayAppMessages(data.messages);
                        }
                        else {
                            showMessage(data.Applicationmessage, "error");
                        }
                    }
                },
                error: function () {
                    showMessage("error in contextMenuCheck_Click event.Please contact the Administrator.", "error");
                }
            });
        }
        else {
            showMessage("Save the changes first.", "information");
        }
    }
}
function contextMenuBudget_Click() {
    if ($("#DMVo_DMNumber").val() != "") {
        if (nochanges == true) {
            var contextMenuBudgetParameters = {
                DMNumber: $("#DMVo_DMNumber").val()
            };
            $.ajax({
                url: contextMenuBudgetUrl,
                type: "POST",
                data: JSON.stringify(contextMenuBudgetParameters),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: false,
                cache: false,

                success: function (data) {

                    if (data.successflag == true) {
                        $('#DMVo_Status').val(data.status);
                        $("#tabs").tabs('option', 'disabled', [2, 3]);
                        gridProgrammeParticulars.setOptions({ editable: false });
                        gridLicenseeAllocation.setOptions({ editable: false });
                        gridRunsPerChannel.setOptions({ editable: false });
                        gridCatchUpLicenseeAllocation.setOptions({ editable: false });
                        gridPlatformRights.setOptions({ editable: false });

                        if (data.HistoryDetails != undefined && data.HistoryDetails != null) {
                            HistoryGridData = data.HistoryDetails;
                            historyGrid.setData(HistoryGridData);
                            historyGrid.render();
                            setfooter(gridContainerDivHistoryGrid, 1, HistoryGridData.length);
                            $('#SeriesTreeContextMenu').enableContextMenuItems('#contextMenuDefaultLanguages,#contextMenuDefaultTerritories,#contextMenuCheck,#contextMenuUnBudget');
                            $('#SeriesTreeContextMenu').disableContextMenuItems('#contextMenuBudget,#contextMenuSignBuyer,#contextMenuUnSignBuyer');
                        }

                        showMessage(data.Applicationmessage, "information");
                    }
                    else {
                        if (data.messages != null) {
                            DisplayAppMessages(data.messages);
                        }
                        else {
                            showMessage(data.Applicationmessage, "error");
                        }
                    }
                },
                error: function () {
                    showMessage("error in contextMenuCheck_Click event.Please contact the Administrator.", "error");
                }
            });
        }
        else {
            showMessage("Save the changes.", "information");
        }
    }
}
function contextMenuUnBudget_Click() {
    if ($("#DMVo_DMNumber").val() != "") {
        if (nochanges == true) {
            var contextMenuBudgetParameters = {
                DMNumber: $("#DMVo_DMNumber").val()
            };
            $.ajax({
                url: contextMenuUnBudgetUrl,
                type: "POST",
                data: JSON.stringify(contextMenuBudgetParameters),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: false,
                cache: false,

                success: function (data) {

                    if (data.successflag == true) {
                        $('#DMVo_Status').val(data.status);
                        $('#tabs').tabs('enable', '#Territory');
                        $('#tabs').tabs('enable', '#Payment');
                        gridProgrammeParticulars.setOptions({ editable: true });
                        gridLicenseeAllocation.setOptions({ editable: true });
                        gridRunsPerChannel.setOptions({ editable: true });
                        gridCatchUpLicenseeAllocation.setOptions({ editable: true });
                        gridPlatformRights.setOptions({ editable: true });
                        if (data.HistoryDetails != undefined && data.HistoryDetails != null) {
                            HistoryGridData = data.HistoryDetails;
                            historyGrid.setData(HistoryGridData);
                            historyGrid.render();
                            setfooter(gridContainerDivHistoryGrid, 1, HistoryGridData.length);
                            $('#SeriesTreeContextMenu').enableContextMenuItems('#contextMenuDefaultLanguages,#contextMenuDefaultTerritories,#contextMenuCheck,#contextMenuSignBuyer,#contextMenuBudget');
                            $('#SeriesTreeContextMenu').disableContextMenuItems('#contextMenuUnSignBuyer,#contextMenuUnBudget');
                        }
                        showMessage(data.Applicationmessage, "information");
                    }
                    else {
                        if (data.messages != null) {
                            DisplayAppMessages(data.messages);
                        }
                        else {
                            showMessage(data.Applicationmessage, "error");
                        }
                    }
                },
                error: function () {
                    showMessage("error in contextMenuCheck_Click event.Please contact the Administrator.", "error");
                }
            });
        }
        else {
            showMessage("Save the changes.", "information");
        }
    }
}
function contextMenuSignBuyer_Click() {
    if ($("#DMVo_DMNumber").val() != "") {
        if (nochanges == true) {
            var contextMenuSignBuyerParameters = {
                DMNumber: $("#DMVo_DMNumber").val()
            };
            $.ajax({
                url: contextMenuSignBuyerUrl,
                type: "POST",
                data: JSON.stringify(contextMenuSignBuyerParameters),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: false,
                cache: false,

                success: function (data) {
                    if (data.successflag == true) {
                        $('#DMVo_Status').val(data.status);
                        if (data.HistoryDetails != undefined && data.HistoryDetails != null) {
                            HistoryGridData = data.HistoryDetails;
                            historyGrid.setData(HistoryGridData);
                            historyGrid.render();
                            setfooter(gridContainerDivHistoryGrid, 1, HistoryGridData.length);
                            $('#SeriesTreeContextMenu').enableContextMenuItems('#contextMenuDefaultLanguages,#contextMenuDefaultTerritories,#contextMenuCheck,#contextMenuUnSignBuyer');
                            $('#SeriesTreeContextMenu').disableContextMenuItems('#contextMenuBudget,#contextMenuSignBuyer,#contextMenuUnBudget');
                        }
                        showMessage(data.Applicationmessage, "information");
                    }
                    else {
                        if (data.messages != null) {
                            DisplayAppMessages(data.messages);
                        }
                        else {
                            showMessage(data.Applicationmessage, "error");
                        }
                    }
                },
                error: function () {
                    showMessage("error in contextMenuCheck_Click event.Please contact the Administrator.", "error");
                }
            });

        }
        else {
            showMessage("Save the changes.", "information");
        }
    }
}

function contextMenuUnSignBuyer_Click() {
    if ($("#DMVo_DMNumber").val() != "") {
        if (nochanges == true) {
            var contextMenuUnSignBuyerParameters = {
                DMNumber: $("#DMVo_DMNumber").val()
            };
            $.ajax({
                url: contextMenuUnSignBuyerUrl,
                type: "POST",
                data: JSON.stringify(contextMenuUnSignBuyerParameters),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: false,
                cache: false,

                success: function (data) {

                    if (data.successflag == true) {
                        $('#DMVo_Status').val(data.status);
                        if (data.HistoryDetails != undefined && data.HistoryDetails != null) {
                            HistoryGridData = data.HistoryDetails;
                            historyGrid.setData(HistoryGridData);
                            historyGrid.render();
                            setfooter(gridContainerDivHistoryGrid, 1, HistoryGridData.length);
                            $('#SeriesTreeContextMenu').enableContextMenuItems('#contextMenuDefaultLanguages,#contextMenuDefaultTerritories,#contextMenuCheck,#contextMenuSignBuyer,#contextMenuBudget');
                            $('#SeriesTreeContextMenu').disableContextMenuItems('#contextMenuUnSignBuyer,#contextMenuUnBudget');
                        }
                        showMessage(data.Applicationmessage, "information");
                    }
                    else {
                        if (data.messages != null) {
                            DisplayAppMessages(data.messages);
                        }
                        else {
                            showMessage(data.Applicationmessage, "error");
                        }
                    }
                },
                error: function () {
                    showMessage("error in contextMenuCheck_Click event.Please contact the Administrator.", "error");
                }
            });

        }
        else {
            showMessage("Save the changes.", "information");
        }
    }
}

function btnTitleDetails_click() {
    if (nochanges) {
        var selectedPg = gridProgrammeParticulars.getSelectedRows();
        var selectedPgData = ProgrammeParticulargridData[selectedPg];
        if (selectedPgData.RefNo != null && selectedPgData.RefNo != 0) {
            window.open(ProgramTitleUrl + '?RefNo=' + selectedPgData.RefNo);
        }
        else {
            showMessage("Save the changes.", "information");
//            IsbtnTitleDetailsClicked = true;
//            SelectedRowforDetails = selectedPg[0];
//            saveDealMemoProgrammeDetails();

        }
    }
    else {
        showMessage("Save the changes.", "information");
    }
}
function btnSeriesTree_click() {
    if (nochanges) {
        var selectedPg = gridProgrammeParticulars.getSelectedRows();
        var selectedPgData = ProgrammeParticulargridData[selectedPg];
        if (selectedPgData.RefNo != null && selectedPgData.RefNo != 0) {
            OpenSeriesTree(selectedPgData);
        }
        else {
            showMessage("Save the changes.", "information");
//            IsbtnSeriesDetailsClicked = true;
//            SelectedRowforDetails = selectedPg[0];
//            saveDealMemoProgrammeDetails();
        }
    }
    else {
        showMessage("Save the changes.", "information");
    }
}

function OpenSeriesTree(selectedPgData) {
    if (!IsSeasonAddedInSeriesTree) {
        SeriesTreeParameters = {
            TypeComboSelection: $("#TypeComboSelection").val(),
            DMVo_DMNumber: $("#DMVo_DMNumber").val(),
            RefNo: selectedPgData.RefNo,
            Type: selectedPgData.Type,
            ReleaseYear: selectedPgData.ReleaseYear,
            Id: selectedPgData.Id
        };


        GlobalTypeComboSelection = $("#TypeComboSelection").val();
        GlobalDMVo_DMNumber = $("#DMVo_DMNumber").val();
        GlobalRefNo = selectedPgData.RefNo;
        GlobalType = selectedPgData.Type;
        GlobalReleaseYear = selectedPgData.ReleaseYear;
        GlobalId = selectedPgData.Id;
    }

    $("#SeriesTreeDiv").html("");
    $('#SeriesTreeDiv').load(SeriesTreeUrl, SeriesTreeParameters);
    $("#SeriesTreeDiv").dialog({
        autoOpen: false,
        height: 700,
        width: 1200,
        modal: true,
        title: "Series Tree",
        open: function (event, ui) {

            $('#SeriesTreeDiv').css({ "width": "auto", "height": "700px", "padding": "10px" });
            dialoghandler = $(this);

        },
        close: function () {
            IsSeasonSelected = false;
            UpDataSeriesTree.splice(0, UpDataSeriesTree.length);
        }
    });

    $("#SeriesTreeDiv").dialog("open");
}

function AddtoLanguages(item, status) {
    item1 = { "PersistFlag": status };
    $.extend(item, item1);

    if (UpData.length == 0) {
        UpData.push(item);
    }
    else {
        for (var i = 0; i < UpData.length; i++) {
            if (UpData[i].LanguageCode == item.LanguageCode && UpData[i].PersistFlag == item.PersistFlag)
                UpData.splice(i, 1);
        }

        if (status != "Remove")
            UpData.push(item);
    }
    nochanges = false;
}

function AddtoTerritories(item, status) {
    item1 = { "PersistFlag": status };
    $.extend(item, item1);

    if (UpData.length == 0) {
        UpData.push(item);
    }
    else {
        for (var i = 0; i < UpData.length; i++) {
            if (UpData[i].TerritoryCode == item.TerritoryCode && UpData[i].PersistFlag == item.PersistFlag)
                UpData.splice(i, 1);
        }
        if (status != "Remove")
            UpData.push(item);
    }
    nochanges = false;
}

function AddtoPayments(item, status) {
    item1 = { "PersistFlag": status };
    $.extend(item, item1);

    if (UpData.length == 0)
        UpData.push(item);
    else {
        for (var i = 0; i < UpData.length; i++) {
            if (UpData[i].SortOrder == item.SortOrder && UpData[i].PersistFlag == item.PersistFlag)
                UpData.splice(i, 1);
        }
        if (status != "Remove")
            UpData.push(item);
    }
    nochanges = false;
}

function AddtoSplitPayments(item, status) {
    if (UpData.length == 0)
        UpData = paymentGrid.getData();

    item1 = { "PersistFlag": status };
    $.extend(item, item1);

    if (UpdatedData.length == 0)
        UpdatedData.push(item);

    else {
        for (var i = 0; i < UpdatedData.length; i++) {
            if (UpdatedData[i].SortOrder == item.SortOrder && UpdatedData[i].PersistFlag == item.PersistFlag)
                UpdatedData.splice(i, 1);
        }

        if (status != "Remove")
            UpdatedData.push(item);
    }

    nochanges = false;
}

var validSplitpayment = true;
function validatePaymentUpdata(UpData) {
    valid = true;
    for (var i = 0; i < UpData.length; i++) {
        if (UpData[i].PersistFlag != "Deleted") {
            if (UpData[i].SortOrder == null) {
                showMessage("Sort Order is Required", "error");
                valid = false;
            }
            else if (UpData[i].Amount == null || UpData[i].PaymentPercent == null) {
                showMessage("Please Enter Amount or Payment Percent", "error");
                valid = false;
            }
            else if (UpData[i].PaymentCode == "" || UpData[i].PaymentCode == null) {
                showMessage("Payment Code is Required", "error");
                valid = false;
            }
            else if ($('#TypeComboSelection').val() == "ROY") {
                if (UpData[i].MonthNumber == null) {
                    showMessage("Month Number is Required", "error");
                    valid = false;
                }
            }
        }
    }

    if (UpdatedData.length > 0) {
        validatesplitpaymentdata(UpdatedData);
        if (!validSplitpayment)
            valid = false;
    }

}

function validatesplitpaymentdata(UpdatedData) {
    validSplitpayment = true;
    for (var i = 0; i < UpdatedData.length; i++) {
        if (UpdatedData[i].PersistFlag != "Deleted") {
            if (UpdatedData[i].SortOrder == null) {
                showMessage("Sort Order is Required", "error");
                validSplitpayment = false;
            }
            else if (UpdatedData[i].MonthNumber == null) {
                showMessage("Month Number is Required", "error");
                validSplitpayment = false;
            }
            else if (UpdatedData[i].PaymentPercent == null) {
                showMessage("Payment Percent is required", "error");
                validSplitpayment = false;
            }
        }
    }
    if (validSplitpayment) {
        if ($('#tbSplitPayPercent').val() != "100.0000" && $('#tbSplitPayPercent').val() != "0.0000") {
            showMessage("In Split Payment, Total Payment Percent should be equal to 100.0000", "error");
            validSplitpayment = false;
        }
    }
}

function loadLanguagesafterSave(LanguageGridData) {

    for (var i = 0; i < LanguageGridData.length; i++) {

        //Supplied By
        if (LanguageGridData[i].SuppliedBy == "L")
            LanguageGridData[i].SuppliedBy = "Licensee";
        else if (LanguageGridData[i].SuppliedBy == "S")
            LanguageGridData[i].SuppliedBy = "Supplier";

        //Supplier User Cost Basis
        if (LanguageGridData[i].SupplierUserCost == "C")
            LanguageGridData[i].SupplierUserCost = "Cost";
        else if (LanguageGridData[i].SupplierUserCost == "H")
            LanguageGridData[i].SupplierUserCost = "Half-Cost";
        else if (LanguageGridData[i].SupplierUserCost == "O")
            LanguageGridData[i].SupplierUserCost = "Other";

    }
    languageGrid.setColumns(lcolumns);
    languageGrid.setData(LanguageGridData);
    languageGrid.setColumns(languageColumns);
    
    languageGrid.setSelectionModel(new Slick.RowSelectionModel());
    languageGrid.setSelectedRows([0, 0]);
    if (LanguageGridData.length > 0)
        setfooter(gridContainerDivLanguage, 1, LanguageGridData.length);
    else
        setfooter(gridContainerDivLanguage, 0, 0);

}

function loadTerritoriesafterSave(TerritoryGridData) {

    territoryGrid.setColumns(tcolumns);
    territoryGrid.setData(TerritoryGridData);
    territoryGrid.setColumns(territorycolumns);

    territoryGrid.setSelectionModel(new Slick.RowSelectionModel());
    territoryGrid.setSelectedRows([0, 0]);

    if (TerritoryGridData.length > 0)
        setfooter(gridContainerDivTerritory, 1, TerritoryGridData.length);
    else
        setfooter(gridContainerDivTerritory, 0, 0);
}


function loadPaymentsafterSave(PaymentGridData) {
    if (PaymentGridData.length > 0) {
        var amt = $("#DMVo_MemoPrice").val();
        var payamt = 0, payperc = 0;
        for (var i = 0; i < PaymentGridData.length; i++) {
            payperc = parseFloat(payperc) + parseFloat(PaymentGridData[i].PaymentPercent);
            payamt = parseFloat(payamt) + parseFloat(PaymentGridData[i].Amount);
         
            PaymentGridData[i].PaymentPercent = parseFloat(PaymentGridData[i].PaymentPercent).toFixed(4);
            PaymentGridData[i].Amount = parseFloat(PaymentGridData[i].Amount).toFixed(4);
//            PaymentGridData[i].Amount = CommaSeperator(parseFloat(PaymentGridData[i].Amount).toFixed(4));

        }

        paymentGrid.setColumns(pcolumns);
        paymentGrid.setData(PaymentGridData);
        paymentGrid.setColumns(paymentcolumns);

        paymentGrid.setSelectionModel(new Slick.RowSelectionModel());
        paymentGrid.setSelectedRows([0, 0]);

        if (amt == 0) {           //&& ($("#TypeComboSelection").val() == "FLF")
            $("#tbPayPercent").val(parseFloat(hundred).toFixed(4));
            $("#tbPayAmount").val(parseFloat(zero).toFixed(4));
        }
        else {
            $("#tbPayPercent").val(parseFloat(payperc).toFixed(4));
            $("#tbPayAmount").val(parseFloat(payamt).toFixed(4));
//            $("#tbPayAmount").val(CommaSeperator(parseFloat(payamt).toFixed(4)));

        }
        setfooter(gridContainerDivPayment, 1, PaymentGridData.length);
    }
    var mycolumns = paymentGrid.getColumns();

    if ($("#TypeComboSelection").val() == "ROY") {
        mycolumns[3] = { id: "Amount", name: "Amount", field: "Amount" };
        mycolumns[5] = { id: "DueDateDMPayment", name: "Due Date", field: "DueDateDMPayment" };

        //Split Payment grid 

        if (PaymentGridData.length > 0)
            SplitPaymentGridData = PaymentGridData[0].SplitPaymentDetails;
        else
            SplitPaymentGridData = [];

        var spayperc = 0;
        for (var i = 0; i < SplitPaymentGridData.length; i++) {
            spayperc = parseFloat(spayperc) + parseFloat(SplitPaymentGridData[i].PaymentPercent);
            SplitPaymentGridData[i].PaymentPercent = parseFloat(SplitPaymentGridData[i].PaymentPercent).toFixed(4);
        }
        $("#tbSplitPayPercent").val(parseFloat(spayperc).toFixed(4));

        gridwidth = $("#SplitPaymentGrid").width();
        $("#SplitPaymentGrid").css({ "width": gridwidth + "px" });

        splitPaymentGrid.setColumns(spcolumns);
        splitPaymentGrid.setData(SplitPaymentGridData);
        splitPaymentGrid.setColumns(splitpaymentcolumns);

        splitPaymentGrid.setSelectionModel(new Slick.RowSelectionModel());
        splitPaymentGrid.setSelectedRows([0, 0]);

        if (SplitPaymentGridData.length > 0)
            setfooter(gridContainerDivsplitPayment, 1, SplitPaymentGridData.length);
        else
            setfooter(gridContainerDivsplitPayment, 0, 0);

        if ($("#tbPayPercent").val() == 100 && PaymentGridData.length == 1) {
            splitPaymentGrid.setColumns(splitpaymentcolumns);
            monthNumber = PaymentGridData[0].MonthNumber;
        }
        else {
            splitPaymentGrid.setColumns(splitpaymentcolumns_noneditable);
        }
    }

    else if ($("#TypeComboSelection").val() == "FLF") {
        mycolumns[1] = { id: "MonthNumber", name: "Payment Month No", field: "MonthNumber" };

        document.getElementById('divSplitPayment').setAttribute("style", "visibility:hidden");
        document.getElementById('SplitPaymentGrid').setAttribute("style", "width: 0px; height:0px");
        document.getElementById('PaymentGrid').setAttribute("style", "width:" + gridwidth + "px;" + "height:375px");
    }
    paymentGrid.setColumns(mycolumns);
}

function resetGrid(gridDealMemo) {
    if (gridDealMemo.getActiveCell() != null) {
        gridDealMemo.resetActiveCell();
        $(activeCellNode).attr("title", "");        
    }
}

function resetActiveGrids(selTab) {
    switch (selTab) {
        case "Programme":
            resetGrid(territoryGrid);
            resetGrid(languageGrid);
            resetGrid(splitPaymentGrid);
            resetGrid(paymentGrid);
            break;
        case "Language":
            resetGrid(territoryGrid);
            resetGrid(splitPaymentGrid);
            resetGrid(paymentGrid);
            resetGrid(gridProgrammeParticulars);
            resetGrid(gridLicenseeAllocation);
            resetGrid(gridCatchUpLicenseeAllocation);
            resetGrid(gridRunsPerChannel);
            resetGrid(gridPlatformRights);
            break;
        case "Territory":
            resetGrid(languageGrid);
            resetGrid(splitPaymentGrid);
            resetGrid(paymentGrid);
            resetGrid(gridProgrammeParticulars);
            resetGrid(gridLicenseeAllocation);
            resetGrid(gridCatchUpLicenseeAllocation);
            resetGrid(gridRunsPerChannel);
            resetGrid(gridPlatformRights);
            break;
        case "Payment":
            resetGrid(territoryGrid);
            resetGrid(languageGrid);
            resetGrid(gridProgrammeParticulars);
            resetGrid(gridLicenseeAllocation);
            resetGrid(gridCatchUpLicenseeAllocation);
            resetGrid(gridRunsPerChannel);
            resetGrid(gridPlatformRights);
            break;
    }
}

function CommaSeperator(Val) {
    var arr = Val.split('.');
    var forVal = arr[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return forVal+"."+arr[1];
}

function removeCommas(Val) {
    debugger;
    if (parseInt(Val) > 0) {
      var   newString = Val.replace(/,/g, ""); 
//        Val = Val.replace(",", "");
    }
  return newString;
}