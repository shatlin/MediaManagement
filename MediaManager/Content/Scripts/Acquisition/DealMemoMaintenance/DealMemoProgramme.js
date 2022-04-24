function IntegerValidation(value) {
    if (value == null || value == undefined || isNaN(value)) {
        return { valid: false, msg: "Please enter a valid integer" };
    }
    else {
        return { valid: true, msg: null };
    }
}
var ProgramVOObj = [];
var LicenseeAllocationVOObj = [];
var RunsPerChannelVOobj = [];
var CatchUpLicenseeVOObj = [];
var MediaPlatformRightsVOObj = [];

var TypeList = [];
var CategoryCodeList = [];
var BOCategoryList = [];
var EventTypeList = [];
var ChannelServiceList = [];

function GetListobj(LookUpUrl, value) {
    ShowProgressBar();
    var List = [];
    $.ajax({
        async: false,
        url: LookUpUrl,
        type: "GET",
        dataType: 'Json',
        data: value,
        async: false,
        cache: false,

        success: function (data) {
            List = data;
        },
        error: function () {
            showMessage("Some exception occured.Please contact the Administrator.", "error");
        }
    });
    RemoveProgressBar();
    return List;
}
function ProgrammeTypeValidation(value) {
    if (TypeList != null && TypeList.length == 0) {
        TypeList = GetListobj(GetTypeShowLOVListUrl, value);
    }
    if (TypeList.length > 0) {
        var stat = 0;
        for (var i = 0; i < TypeList.length; i++) {
            if (value.toUpperCase() == TypeList[i].CodeValue) {
                stat = 1;
                break;
            }
        }
        if (stat == 0) {
            if (value == "" || value == null || value == undefined)
                return { valid: false, msg: "Invalid Type" };
            else {
                value = "";
                return { valid: false, msg: "Invalid Type" };
            }
        }
        else {
            return { valid: true, msg: null };
        }
    }
    else {
        return { valid: false, msg: "Invalid Type" };
    }
}
function ProgrammeTitleValidation(value) {
    if (value == "" || value == null || value == undefined)
        return { valid: false, msg: "Title is Required" };
    else {
        return { valid: true, msg: null };
    }
}
function ProgrammeProductionYearVlidation(value) {
    if (value == "" || value == null || value == undefined) {
        return { valid: false, msg: "Production Year is Mandatory" };
    }
    else if (isNaN(value)) {
        return { valid: false, msg: "Invalid Production Year" };
    }
    else if (value.length != 4) {
        return { valid: false, msg: "Invalid Production Year" };
    }
    else {
        return { valid: true, msg: null };
    }
}
function ProgrammeCategoryCodeValidation(value) {
    if (CategoryCodeList != null && CategoryCodeList.length == 0) {
        CategoryCodeList = GetListobj(GetProgramCategoryLOVListUrl, value);
    }
    if (CategoryCodeList.length > 0) {
        var stat = 0;
        for (var i = 0; i < CategoryCodeList.length; i++) {
            if (value.toUpperCase() == CategoryCodeList[i].ProgrammeCategoryCode) {
                stat = 1;
                break;
            }
        }
        if (stat == 0) {
            if (value == "" || value == null || value == undefined)
                return { valid: true, msg: null };
            else {
                value = "";
                return { valid: false, msg: "Invalid Programme Category." };
            }
        }
        else {
            return { valid: true, msg: null };
        }
    }
    else {
        return { valid: false, msg: "Invalid Programme Category." };
    }
}
function ProgrammeBOCategoryValidation(value) {
    if (BOCategoryList != null && BOCategoryList.length == 0) {
        BOCategoryList = GetListobj(GetBOCategoryLOVListUrl, value);
    }
    if (BOCategoryList.length > 0) {
        var stat = 0;
        for (var i = 0; i < BOCategoryList.length; i++) {
            if (value.toUpperCase() == BOCategoryList[i].BOCategoryCode) {
                stat = 1;
                break;
            }
        }
        if (stat == 0) {
            if (value == "" || value == null || value == undefined)
                return { valid: true, msg: null };
            else {
                value = "";
                return { valid: false, msg: "Invalid BO Category." };
            }
        }
        else {
            return { valid: true, msg: null };
        }
    }
    else {
        return { valid: false, msg: "Invalid BO Category." };
    }
}
function ProgrammeEventTypeValidation(value) {
    if (EventTypeList != null && EventTypeList.length == 0) {
        EventTypeList = GetListobj(GetEventTypeLOVListUrl, value);
    }
    if (EventTypeList.length > 0) {
        var stat = 0;
        for (var i = 0; i < EventTypeList.length; i++) {
            if (value.toUpperCase() == EventTypeList[i].CodeValue) {
                stat = 1;
                break;
            }
        }
        if (stat == 0) {
            if (value == "" || value == null || value == undefined)
                return { valid: false, msg: "Invalid Event Type." };
            else {
                value = "";
                return { valid: false, msg: "Invalid Event Type." };
            }
        }
        else {
            return { valid: true, msg: null };
        }
    }
    else {
        return { valid: false, msg: "Invalid Event Type." };
    }
}
function ProgrammeDurationValidation(value) {
    if (value == null || value == undefined || value == "") {
        value = null;
        return { valid: false, msg: "Duration is Required." };
    }
    else {
        var validDuration = false;
        var ActionParameters = {
            Duration: value.toString()
        };
        $.ajax({
            async: false,
            url: ValidateProgramDurationUrl,
            type: "POST",
            dataType: 'Json',
            data: JSON.stringify(ActionParameters),
            contentType: "application/json; charset=utf-8",
            async: false,
            cache: false,

            success: function (data) {
                if (data.successflag == true) {
                    value = data.DurationValue;
                    validDuration = true;
                }
            },
            error: function () {
                showMessage("Some exception occured.Please contact the Administrator.", "error");
            }
        });
        if (validDuration == false) {
            value = null;
            return { valid: true, msg: "Duration must be in the format 0000:00:00 to 0099:59:59" };
        }
        else {
            return { valid: true, msg: null };
        }
    }
}
function ChannelServiceValidation(value) {
    if (ChannelServiceList != null && ChannelServiceList.length == 0) {
        ChannelServiceList = GetListobj(getChannelServiceListUrl, value);
    }
    if (ChannelServiceList.length > 0) {
        var stat = 0;
        for (var i = 0; i < ChannelServiceList.length; i++) {
            if (value.toUpperCase() == ChannelServiceList[i].ChannelServiceCode) {
                stat = 1;
                break;
            }
        }
        if (stat == 0) {
            if (value == "" || value == null || value == undefined)
                return { valid: false, msg: "Channel Service is required." };
            else {
                value = "";
                return { valid: false, msg: "Invalid Channel Service code." };
            }
        }
        else {
            return { valid: true, msg: null };
        }
    }
    else {
        return { valid: false, msg: "Invalid Channel Service code." };
    }
}
function LicenseeValidation(value) {
    var LicenseeList = GetListobj(getLicenseeListUrl, { "hintLicensee": null, "LeeType": "LINEAR" });
    if (LicenseeList.length > 0) {
        var stat = 0;
        for (var i = 0; i < LicenseeList.length; i++) {
            if (value.toUpperCase() == LicenseeList[i].ShortName) {
                stat = 1;
                break;
            }
        }
        if (stat == 0) {
            if (value == "" || value == null || value == undefined)
                return { valid: false, msg: "Licensee is Required." };
            else {
                value = "";
                return { valid: false, msg: "Invalid Licensee." };
            }
        }
        else {
            return { valid: true, msg: null };
        }
    }
    else {
        return { valid: false, msg: "Invalid Licensee." };
    }
}

function CatchUpLicenseeValidation(value) {
    var LicenseeList = GetListobj(getLicenseeListUrl, { "hintLicensee": null, "LeeType": "CATCHUP" });
    if (LicenseeList.length > 0) {
        var stat = 0;
        for (var i = 0; i < LicenseeList.length; i++) {
            if (value.toUpperCase() == LicenseeList[i].ShortName) {
                stat = 1;
                break;
            }
        }
        if (stat == 0) {
            if (value == "" || value == null || value == undefined)
                return { valid: false, msg: "Licensee is Required." };
            else {
                value = "";
                return { valid: false, msg: "Invalid Licensee." };
            }
        }
        else {
            return { valid: true, msg: null };
        }
    }
    else {
        return { valid: false, msg: "Invalid Licensee." };
    }
}
function ChannelValidation(value){
    var selectedRow = gridLicenseeAllocation.getSelectedRows();
    var ChannelList = GetListobj(getChannelListUrl, { "ChannelService": LicenseeDetailsgridData[selectedRow].ChannelService.toString(), "hintChannel": null, "Type": $("#TypeComboSelection").val() });
    if (ChannelList.length > 0) {
        var stat = 0;
        for (var i = 0; i < ChannelList.length; i++) {
            if (value.toUpperCase() == ChannelList[i].ChannelID) {
                stat = 1;
                break;
            }
        }
        if (stat == 0) {
            if (value == "")
                return { valid: false, msg: "Cha is Required." };
            else {
                value = "";
                return { valid: false, msg: "Invalid Channel code." };
            }
        }
        else {
            return { valid: true, msg: null };
        }
    }
    else {
        return { valid: false, msg: "Invalid Channel code." };
    }
}
function PlateFormRightsValidation(value) {
    var SelectedCatchUpLicensee = gridCatchUpLicenseeAllocation.getSelectedRows();
    var allocationId = CatchUpLicenseeAllocationgridData[SelectedCatchUpLicensee].Id;
    var PlatformRightsList = GetListobj(GetPlateFormRightsListUrl, { "DMNumber": $("#DMVo_DMNumber").val(), "AllocationId": allocationId });
    if (PlatformRightsList.length > 0) {
        var stat = 0;
        for (var i = 0; i < PlatformRightsList.length; i++) {
            if (value.toUpperCase() == PlatformRightsList[i].PlatformCode) {
                stat = 1;
                break;
            }
        }
        if (stat == 0) {
            if (value == "")
                return { valid: false, msg: "Plateform is Requireed." };
            else {
                value = "";
                return { valid: false, msg: "Invalid Plateform." };
            }
        }
        else {
            return { valid: true, msg: null };
        }
    }
    else {
        return { valid: false, msg: "Invalid Plateform." };
    }
}



   
    var ProgrammeParticulargridcolumns = [
             { id: "Type", name: "Type", field: "Type", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage",validator: ProgrammeTypeValidation },
             { id: "Title", name: "Title", field: "Title", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage", validator: ProgrammeTitleValidation },
             { id: "RefNo", name: "Ref No", field: "RefNo" },
             { id: "ReleaseYear", name: "Prod Year", field: "ReleaseYear", editor: Slick.Editors.Text, validator: ProgrammeProductionYearVlidation},
             { id: "CategoryCode", name: "Program Category", field: "CategoryCode", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage", width: 120, validator: ProgrammeCategoryCodeValidation },
             { id: "BOCategory", name: "BO Category", field: "BOCategory", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage", width: 90, validator: ProgrammeBOCategoryValidation },
             { id: "BORevenueUSD", name: "BO Rev(USD)", field: "BORevenueUSD", editor: Slick.Editors.Text, validator: IntegerValidation },
             { id: "BORevenueZAR", name: "BO Rev(ZAR)", field: "BORevenueZAR", editor: Slick.Editors.Text, validator: IntegerValidation },
             { id: "SportType_Genre", name: "Primary Genre", field: "SportType_Genre" },
             { id: "SubGenre", name: "Secondary Genre", field: "SubGenre" },
             { id: "TertiaryGenre", name: "Tertiary Genre", field: "TertiaryGenre" },
             { id: "EventType", name: "Event Type", field: "EventType", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage", validator: ProgrammeEventTypeValidation },
             { id: "Duration", name: "Duration", field: "Duration", editor: Slick.Editors.Text, validator: ProgrammeDurationValidation },
             { id: "strTotalPrice", name: "Total Price", field: "strTotalPrice", editor: Slick.Editors.Text, validator: IntegerValidation }, 
             { id: "SeriesTitle", name: "Series Title", field: "SeriesTitle" }
    ];
    var LicenseeDetailsgridcolumns = [
              { id: "Licesee", name: "L'ee", field: "Licesee", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage", validator: LicenseeValidation },
              { id: "strAllocation", name: "Allocation", field: "strAllocation", editor: Slick.Editors.Text, validator: IntegerValidation, width: 130 },
              { id: "ChannelRuns", name: "Chs Runs", field: "ChannelRuns", editor: Slick.Editors.Text, validator: IntegerValidation },
              { id: "BlackDays", name: "Black Days", field: "BlackDays", editor: Slick.Editors.Text, validator: IntegerValidation },
              { id: "ChannelService", name: "Chan Serv", field: "ChannelService", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage", width: 150, validator: ChannelServiceValidation },
             // { id: "LicenseType", name: "Lic&#13;&#10;Type", field: "LicenseType" },
             { id: "TBA", name: "TBA", field: "TBA",formatter: Slick.Formatters.Checkmark, editor: Slick.Editors.Checkbox},
              { id: "StartDate", name: "Start Date", field: "StartDate", editor: Slick.Editors.Date, width: 120 },
              { id: "EndDate", name: "End Date", field: "EndDate", editor: Slick.Editors.Date, width: 120 },
              { id: "No_Months", name: "No. of Months", field: "No_Months"},
              { id: "No_Days", name: "No. of Days", field: "No_Days"},
              { id: "Cost_Runs", name: "Cost Runs", field: "Cost_Runs", editor: Slick.Editors.Text, validator: IntegerValidation },
              { id: "Max_channel_Service", name: "Max Chs", field: "Max_channel_Service", editor: Slick.Editors.Text, validator: IntegerValidation },
              { id: "Max_channel_Number", name: "Max Cha", field: "Max_channel_Number", editor: Slick.Editors.Text, validator: IntegerValidation }
      ];
    var RunsPerChannelGridColumns = [
              { id: "Channel", name: "Cha", field: "Channel", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage", validator: ChannelValidation },
              { id: "Max_channel_Number", name: "Max Cha", field: "Max_channel_Number", editor: Slick.Editors.Integer },
              { id: "Cost", name: "Cost", field: "Cost" ,formatter: Slick.Formatters.Checkmark, editor: Slick.Editors.Checkbox},
              { id: "Runs", name: "Total Runs", field: "Runs", editor: Slick.Editors.Integer },
              { id: "CostingRuns", name: "Costed Runs", field: "CostingRuns", editor: Slick.Editors.Integer }
      ];
    var CatchUpLicenseeAllocationGridColumns = [
              { id: "Licesee", name: "L'ee", field: "Licesee", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage", validator: CatchUpLicenseeValidation },
              { id: "strAllocation", name: "Allocation", field: "strAllocation", editor: Slick.Editors.Integer, width: 130 },
              { id: "TBA", name: "TBA", field: "TBA", formatter: Slick.Formatters.Checkmark, editor: Slick.Editors.Checkbox},
              { id: "StartDate", name: "Start Date", field: "StartDate", editor: Slick.Editors.Date, width: 130 },
              { id: "EndDate", name: "End Date", field: "EndDate", editor: Slick.Editors.Date, width: 130 },
              { id: "No_Months", name: "No. of Months", field: "No_Months"},
              { id: "No_Days", name: "No. of Days", field: "No_Days"},
              { id: "CostedViewingPeriod", name: "Costed V.P.", field: "CostedViewingPeriod", editor: Slick.Editors.Integer,width: 120 },
              { id: "MaxViewingPeriodDays", name: "Max No.of Viewing Period", field: "MaxViewingPeriodDays", editor: Slick.Editors.Integer, width: 125 },
              { id: "MaxViewingPeriod", name: "Max Viewing Days", field: "MaxViewingPeriod", editor: Slick.Editors.Integer, width: 135 },
              { id: "NonConsecutiveMonth", name: "Non-Consecutive Month", field: "NonConsecutiveMonth", width: 140,formatter: Slick.Formatters.Checkmark, editor: Slick.Editors.Checkbox }
      ];
    var PlatformRightsGridColumns = [
              { id: "PlatformCode", name: "Platform", field: "PlatformCode", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage" },
              { id: "IsSelected", name: "Rights", field: "IsSelected",formatter: Slick.Formatters.Checkmark, editor: Slick.Editors.Checkbox}
      ];

    var options = { enableCellNavigation: true,
        enableColumnReorder: false,
        forceFitColumns: true,
        multiColumnSort: true,
        editable: true,
        asyncEditorLoading: false,
        autoEdit: true,
        enableAddRow: true
    };

    var selrow;
    var gitems;
    var cellvalue;
    var selectedrow;

    var LicenseeType;
    var IsSeries;
    var TitleLookupData;

    var ProgrammeParticulargridEmptyRow = [];
    var LicenseeDetailsgridEmptyRow = [];
    var RunsPerChannelGridEmptyRow = [];
    var CatchUpLicenseeAllocationGridEmptyRow = [];
    var PlatformRightsGridEmptyRow = [];

     function SetGridProperty(GridName, GridDivId, GridData) {
        GridName.setSelectionModel(new Slick.RowSelectionModel());
        GridName.setSelectedRows([0, 0]);
        setfooter(GridDivId, 1, GridData.length);
    };
    function SetEmptyGridProperty(GridName, GridDivId) {
        GridName.setSelectionModel(new Slick.RowSelectionModel());
        GridName.setSelectedRows([0, 0]);
        setfooter(GridDivId, 0, 0);
    };

    function SetGridWidth() {

        $(gridProgrammeParticularId).css({ "width": $(gridProgrammeParticularId).width() + "px" });
        $(gridLicenseeAllocationId).css({ "width": $(gridLicenseeAllocationId).width() + "px" });
        $(gridRunsPerChannelId).css({ "width": $(gridRunsPerChannelId).width() + "px" });
        $(gridCatchUpLicenseeAllocationId).css({ "width": $(gridCatchUpLicenseeAllocationId).width() + "px" });
        $(gridPlatformRightsId).css({ "width": $(gridPlatformRightsId).width() + "px" });
    };

    function SetNewProgrammeDetails() {
        ShowProgressBar();

        gridLicenseeAllocation.setData(LicenseeDetailsgridEmptyRow);
        gridLicenseeAllocation.render();
        SetEmptyGridProperty(gridLicenseeAllocation, gridLicenseeAllocationId);

        gridRunsPerChannel.setData(RunsPerChannelGridEmptyRow);
        gridRunsPerChannel.render();
        SetEmptyGridProperty(gridRunsPerChannel, gridRunsPerChannelId);
        $("#txtTotalRuns").val(0);

        gridCatchUpLicenseeAllocation.setData(CatchUpLicenseeAllocationGridEmptyRow);
        gridCatchUpLicenseeAllocation.render();
        SetEmptyGridProperty(gridCatchUpLicenseeAllocation, gridCatchUpLicenseeAllocationId);

        gridPlatformRights.setData(PlatformRightsGridEmptyRow);
        gridPlatformRights.render();
        SetEmptyGridProperty(gridPlatformRights, gridPlatformRightsId);
        RemoveProgressBar();
    };

    function ShowProgrammeParticularDetails(row) {
        // alert("ShowProgrammeParticularDetails method called");
        ShowProgressBar();

        if (ProgrammeParticulargridData[row].LicenseeAllocationData != null && ProgrammeParticulargridData[row].LicenseeAllocationData[0] != undefined) {
            LicenseeDetailsgridData = ProgrammeParticulargridData[row].LicenseeAllocationData;
            gridLicenseeAllocation.setData(LicenseeDetailsgridData);
            gridLicenseeAllocation.render();
            SetGridProperty(gridLicenseeAllocation, gridLicenseeAllocationId, LicenseeDetailsgridData);
            if (ProgrammeParticulargridData[row].LicenseeAllocationData[0].RunsPerChannelData != null && ProgrammeParticulargridData[row].LicenseeAllocationData[0].RunsPerChannelData[0] != undefined) {
                RunsPerChannelgridData = ProgrammeParticulargridData[row].LicenseeAllocationData[0].RunsPerChannelData;
                gridRunsPerChannel.setData(RunsPerChannelgridData);
                gridRunsPerChannel.render();
                SetGridProperty(gridRunsPerChannel, gridRunsPerChannelId, RunsPerChannelgridData);
                SetTotalRuns();
            }
            else {
                gridRunsPerChannel.setData(RunsPerChannelGridEmptyRow);
                gridRunsPerChannel.render();
                SetEmptyGridProperty(gridRunsPerChannel, gridRunsPerChannelId);
                $("#txtTotalRuns").val(0);
            }
        }
        else {
            gridLicenseeAllocation.setData(LicenseeDetailsgridEmptyRow);
            gridLicenseeAllocation.render();
            SetEmptyGridProperty(gridLicenseeAllocation, gridLicenseeAllocationId);

            gridRunsPerChannel.setData(RunsPerChannelGridEmptyRow);
            gridRunsPerChannel.render();
            SetEmptyGridProperty(gridRunsPerChannel, gridRunsPerChannelId);
        }
        if (ProgrammeParticulargridData[row].CatchUpLicenseeAllocationVOList != null && ProgrammeParticulargridData[row].CatchUpLicenseeAllocationVOList[0] != undefined) {
            CatchUpLicenseeAllocationgridData = ProgrammeParticulargridData[row].CatchUpLicenseeAllocationVOList;
            gridCatchUpLicenseeAllocation.setData(CatchUpLicenseeAllocationgridData);
            gridCatchUpLicenseeAllocation.render();
            SetGridProperty(gridCatchUpLicenseeAllocation, gridCatchUpLicenseeAllocationId, CatchUpLicenseeAllocationgridData);
            if (ProgrammeParticulargridData[row].CatchUpLicenseeAllocationVOList[0].MediaServicePlatformList != null && ProgrammeParticulargridData[row].CatchUpLicenseeAllocationVOList[0].MediaServicePlatformList[0] != undefined) {
                PlatfromRightsAllocationgridData = ProgrammeParticulargridData[row].CatchUpLicenseeAllocationVOList[0].MediaServicePlatformList;
                gridPlatformRights.setData(PlatfromRightsAllocationgridData);
                gridPlatformRights.render();
                SetGridProperty(gridPlatformRights, gridPlatformRightsId, PlatfromRightsAllocationgridData);
            }
            else {
                gridPlatformRights.setData(PlatformRightsGridEmptyRow);
                gridPlatformRights.render();
                SetEmptyGridProperty(gridPlatformRights, gridPlatformRightsId);
            }
        }
        else {

            gridCatchUpLicenseeAllocation.setData(CatchUpLicenseeAllocationGridEmptyRow);
            gridCatchUpLicenseeAllocation.render();
            SetEmptyGridProperty(gridCatchUpLicenseeAllocation, gridCatchUpLicenseeAllocationId);

            gridPlatformRights.setData(PlatformRightsGridEmptyRow);
            gridPlatformRights.render();
            SetEmptyGridProperty(gridPlatformRights, gridPlatformRightsId);
        }

        RemoveProgressBar();
    };
    function SetDealMemoEditability() {
        if ($('#DMVo_Status').val() == "EXECUTED") {
            gridProgrammeParticulars.setOptions({ enableAddRow: false });
            gridLicenseeAllocation.setOptions({ enableAddRow: false });
            gridRunsPerChannel.setOptions({ enableAddRow: false });
            gridCatchUpLicenseeAllocation.setOptions({ enableAddRow: false });
            gridPlatformRights.setOptions({ enableAddRow: false });
        }
    };
    function SetButtons(row) {
        if (ProgrammeParticulargridData[row].Type == null || ProgrammeParticulargridData[row].Type == "" || ProgrammeParticulargridData[row].Type == "null") {
            $('#btnSeriesTree').prop("disabled", false);
            $('#btnSeriesTree').removeClass('inputButton').addClass('inputButtonDisable');
            $('#btnTitleDetails').prop("disabled", false);
            $('#btnTitleDetails').removeClass('inputButton').addClass('inputButtonDisable');
        }
        else {
            if (ProgrammeParticulargridData[row].IsSeries == false) {
                $('#btnSeriesTree').prop("disabled", false);
                $('#btnSeriesTree').removeClass('inputButton').addClass('inputButtonDisable');
                $('#btnTitleDetails').prop("enabled", true);
                $('#btnTitleDetails').removeClass('inputButtonDisable').addClass('inputButton');
            }
            else {
                $('#btnTitleDetails').prop("disabled", false);
                $('#btnTitleDetails').removeClass('inputButton').addClass('inputButtonDisable');
                $('#btnSeriesTree').prop("enabled", true);
                $('#btnSeriesTree').removeClass('inputButtonDisable').addClass('inputButton');
            }
        }
    };
    function SetTotalRuns() {
        var TotalRuns = null;
        if (RunsPerChannelgridData != null) {
            for (var i = 0; i < RunsPerChannelgridData.length; i++) {
                TotalRuns = TotalRuns + RunsPerChannelgridData[i].Runs;
                if (TotalRuns != null) {
                    $("#txtTotalRuns").val(TotalRuns);
                }
                else {
                    $("#txtTotalRuns").val(0);
                }
            }
        }
        else {
            $("#txtTotalRuns").val(0);
        }
    }

    function CheckMadatoryFields() {
        if ($(txtDMVo_CurrencyId).val() == "") {
            $(txtDMVo_CurrencyId).focus();
            showMessage("Currency Code is required", "warning");
            return false;
        }
        else if ($(comboTypeComboSelectionId).val() == "") {
            $(comboTypeComboSelectionId).focus();
            showMessage("Type is required", "warning");
            return false;
        }
        else if ($(txtDMVo_LicenseNoId).val() == "") {
            $(txtDMVo_LicenseNoId).focus();
            showMessage("Licensor Code is required", "warning");
            return false;
        }
        else if ($(txtDMVo_ContractEntityId).val() == "") {
            $(txtDMVo_ContractEntityId).focus();
            showMessage("Contract Entity is required", "warning");
            return false;
        }
        else if ($(txtDMVo_MainLicenseeId).val() == "") {
            $(txtDMVo_MainLicenseeId).focus();
            showMessage("Main Licensee is required", "warning");
            return false;
        }
        else {
            return true;
        }

    };

    $(function () {
        ShowProgressBar();
        SetGridWidth();
        $.ajax({
            url: GetProgrammeParticularsUrl,
            type: "POST",
            dataType: 'Json',
            data: "ModelDMNumber=" + $("#DMVo_DMNumber").val(),
            async: false,
            cache: false,

            success: function (data) {
                //    alert("main function called");
                if (data.ProgramDetails != null) {
                    ProgrammeParticulargridData = data.ProgramDetails;
                    ProgrammeVOModifiedData = JSON.parse(JSON.stringify(ProgrammeParticulargridData));
                    var MemoPrice = null;
                    for (var i = 0; i < ProgrammeParticulargridData.length; i++) {
                        if (ProgrammeParticulargridData[i].IsSeries && ProgrammeParticulargridData[i].EpisodeCount == 0) {
                            alert(ProgrammeParticulargridData[i].Title + " is a Series , or Episodes does not Exist the Season ");
                        }
                        MemoPrice = MemoPrice + parseFloat(ProgrammeParticulargridData[i].strTotalPrice);
                    }
                    if (MemoPrice != null) {
                        $("#DMVo_MemoPrice").val(MemoPrice.toFixed(4));
                    }
                    ShowDealMemoDetails(0);
                    SetDealMemoEditability();
                }
                else {
                    ShowProgramDetailsGrid();
                    SetDealMemoEditability();
                    $("#txtTotalRuns").val(0);
                }

                RemoveProgressBar();



                function ShowProgramDetailsGrid() {
                    gridProgrammeParticulars = new Slick.Grid(gridProgrammeParticularId, ProgrammeParticulargridEmptyRow, ProgrammeParticulargridcolumns, options);
                    SetEmptyGridProperty(gridProgrammeParticulars, gridProgrammeParticularId);
                    gridLicenseeAllocation = new Slick.Grid(gridLicenseeAllocationId, LicenseeDetailsgridEmptyRow, LicenseeDetailsgridcolumns, options);
                    SetEmptyGridProperty(gridLicenseeAllocation, gridLicenseeAllocationId);
                    gridRunsPerChannel = new Slick.Grid(gridRunsPerChannelId, RunsPerChannelGridEmptyRow, RunsPerChannelGridColumns, options);
                    SetEmptyGridProperty(gridRunsPerChannel, gridRunsPerChannelId);
                    gridCatchUpLicenseeAllocation = new Slick.Grid(gridCatchUpLicenseeAllocationId, CatchUpLicenseeAllocationGridEmptyRow, CatchUpLicenseeAllocationGridColumns, options);
                    SetEmptyGridProperty(gridCatchUpLicenseeAllocation, gridCatchUpLicenseeAllocationId);
                    gridPlatformRights = new Slick.Grid(gridPlatformRightsId, PlatformRightsGridEmptyRow, PlatformRightsGridColumns, options);
                    SetEmptyGridProperty(gridPlatformRights, gridPlatformRightsId);
                    $('#btnSeriesTree').prop("disabled", false);
                    $('#btnSeriesTree').removeClass('inputButton').addClass('inputButtonDisable');
                    $('#btnTitleDetails').prop("disabled", false);
                    $('#btnTitleDetails').removeClass('inputButton').addClass('inputButtonDisable');
                };

                function ShowDealMemoDetails(row) {
                    ShowProgressBar();
                    gridProgrammeParticulars = new Slick.Grid(gridProgrammeParticularId, ProgrammeParticulargridData, ProgrammeParticulargridcolumns, options);
                    SetGridProperty(gridProgrammeParticulars, gridProgrammeParticularId, ProgrammeParticulargridData);
                    SetButtons(row);
                    if (ProgrammeParticulargridData[row].LicenseeAllocationData[0] != undefined && ProgrammeParticulargridData[row].LicenseeAllocationData[0] != null) {
                        LicenseeDetailsgridData = ProgrammeParticulargridData[row].LicenseeAllocationData;
                        gridLicenseeAllocation = new Slick.Grid(gridLicenseeAllocationId, LicenseeDetailsgridData, LicenseeDetailsgridcolumns, options);
                        SetGridProperty(gridLicenseeAllocation, gridLicenseeAllocationId, LicenseeDetailsgridData);
                        if (ProgrammeParticulargridData[row].LicenseeAllocationData[0].RunsPerChannelData[0] != undefined && ProgrammeParticulargridData[row].LicenseeAllocationData[0].RunsPerChannelData[0] != null) {
                            RunsPerChannelgridData = ProgrammeParticulargridData[row].LicenseeAllocationData[0].RunsPerChannelData;
                            gridRunsPerChannel = new Slick.Grid(gridRunsPerChannelId, RunsPerChannelgridData, RunsPerChannelGridColumns, options);
                            SetGridProperty(gridRunsPerChannel, gridRunsPerChannelId, RunsPerChannelgridData);
                            SetTotalRuns();
                        }
                        else {
                            gridRunsPerChannel = new Slick.Grid(gridRunsPerChannelId, RunsPerChannelGridEmptyRow, RunsPerChannelGridColumns, options);
                            SetEmptyGridProperty(gridRunsPerChannel, gridRunsPerChannelId);
                            $("#txtTotalRuns").val(0);
                        }
                    }
                    else {
                        gridLicenseeAllocation = new Slick.Grid(gridLicenseeAllocationId, LicenseeDetailsgridEmptyRow, LicenseeDetailsgridcolumns, options);
                        SetEmptyGridProperty(gridLicenseeAllocation, gridLicenseeAllocationId);

                        gridRunsPerChannel = new Slick.Grid(gridRunsPerChannelId, RunsPerChannelGridEmptyRow, RunsPerChannelGridColumns, options);
                        SetEmptyGridProperty(gridRunsPerChannel, gridRunsPerChannelId);
                        $("#txtTotalRuns").val(0);
                    }
                    if (ProgrammeParticulargridData[row].CatchUpLicenseeAllocationVOList[0] != undefined && ProgrammeParticulargridData[row].CatchUpLicenseeAllocationVOList[0] != null) {
                        CatchUpLicenseeAllocationgridData = ProgrammeParticulargridData[row].CatchUpLicenseeAllocationVOList;
                        gridCatchUpLicenseeAllocation = new Slick.Grid(gridCatchUpLicenseeAllocationId, CatchUpLicenseeAllocationgridData, CatchUpLicenseeAllocationGridColumns, options);
                        SetGridProperty(gridCatchUpLicenseeAllocation, gridCatchUpLicenseeAllocationId, CatchUpLicenseeAllocationgridData);
                        if (ProgrammeParticulargridData[row].CatchUpLicenseeAllocationVOList[0].MediaServicePlatformList[0] != undefined && ProgrammeParticulargridData[row].CatchUpLicenseeAllocationVOList[0].MediaServicePlatformList[0] != null) {
                            PlatfromRightsAllocationgridData = ProgrammeParticulargridData[row].CatchUpLicenseeAllocationVOList[0].MediaServicePlatformList;
                            gridPlatformRights = new Slick.Grid(gridPlatformRightsId, PlatfromRightsAllocationgridData, PlatformRightsGridColumns, options);
                            SetEmptyGridProperty(gridPlatformRights, gridPlatformRightsId);
                        }
                        else {
                            gridPlatformRights = new Slick.Grid(gridPlatformRightsId, PlatformRightsGridEmptyRow, PlatformRightsGridColumns, options);
                            SetEmptyGridProperty(gridPlatformRights, gridPlatformRightsId);
                        }
                    }
                    else {

                        gridCatchUpLicenseeAllocation = new Slick.Grid(gridCatchUpLicenseeAllocationId, CatchUpLicenseeAllocationGridEmptyRow, CatchUpLicenseeAllocationGridColumns, options);
                        SetEmptyGridProperty(gridCatchUpLicenseeAllocation, gridCatchUpLicenseeAllocationId);

                        gridPlatformRights = new Slick.Grid(gridPlatformRightsId, PlatformRightsGridEmptyRow, PlatformRightsGridColumns, options);
                        SetEmptyGridProperty(gridPlatformRights, gridPlatformRightsId);
                    }

                    RemoveProgressBar();
                };

                gridProgrammeParticulars.onClick.subscribe(function (e, args) {
                    // alert("main function gridProgrammeParticulars onClick called");
                    resetActiveGrids(selTab);
                    clearAllMessages();
                    var cell = gridProgrammeParticulars.getCellFromEvent(e);
                    var row = cell.row;
                    var MandatoryFlag = CheckMadatoryFields();
                    if ($('#DMVo_Status').val() == "EXECUTED") {
                        gridProgrammeParticulars.setOptions({ editable: false });
                        if (ProgrammeParticulargridData[row] != undefined || ProgrammeParticulargridData[row] != null) {
                            setfooter(gridProgrammeParticularId, (row + 1), ProgrammeParticulargridData.length);
                            ShowProgrammeParticularDetails(row);
                        }
                    }
                    else {
                        if (MandatoryFlag == true) {
                            if (ProgrammeParticulargridData[row] == undefined || ProgrammeParticulargridData[row] == null) {
                                if (ProgrammeParticulargridData[row - 1] != undefined && (ProgrammeParticulargridData[row - 1].Type == null || ProgrammeParticulargridData[row - 1].Type == "")) {
                                    showMessage("Type is required.", "error");
                                }
                                else {
                                    var NewProgram = [];
                                    if (ProgramVOObj != null && ProgramVOObj.length == 0) {
                                        ProgramVOObj = GetListobj(AddNewProgrammeUrl, "");
                                        NewProgram = JSON.parse(JSON.stringify(ProgramVOObj));
                                    }
                                    else {
                                        NewProgram = JSON.parse(JSON.stringify(ProgramVOObj));
                                    }
                                    ProgrammeParticulargridData.push(NewProgram);
                                    nochanges = false;
                                    gridProgrammeParticulars.setData(ProgrammeParticulargridData);
                                    gridProgrammeParticulars.render();
                                    SetButtons(row);
                                    setfooter(gridProgrammeParticularId, 1, ProgrammeParticulargridData.length);
                                    SetNewProgrammeDetails();
                                }
                            }
                            else {
                                setfooter(gridProgrammeParticularId, (row + 1), ProgrammeParticulargridData.length);
                                ShowProgrammeParticularDetails(row);
                                SetButtons(row);
                            }
                        }
                    }
                });




                gridLicenseeAllocation.onClick.subscribe(function (e, args) {
                    // alert("main function gridLicenseeAllocation onClick called");
                    resetActiveGrids(selTab);
                    clearAllMessages();
                    var cell = gridLicenseeAllocation.getCellFromEvent(e);
                    var row = cell.row;
                    var selectedProgram = gridProgrammeParticulars.getSelectedRows();
                    if ($('#DMVo_Status').val() == "EXECUTED") {
                        gridLicenseeAllocation.setOptions({ editable: false });
                        if (ProgrammeParticulargridData[selectedProgram].LicenseeAllocationData[row] != undefined) {
                            setfooter(gridLicenseeAllocationId, (row + 1), LicenseeDetailsgridData.length);
                            ShowLicenseeAllocationDetails(row);
                        }
                    }
                    else {
                        if (ProgrammeParticulargridData[selectedProgram] != undefined) {
                            if (ProgrammeParticulargridData[selectedProgram].Type != "" && ProgrammeParticulargridData[selectedProgram].Type != null) {
                                gridLicenseeAllocation.setOptions({ editable: true });
                                var LicenseeDetail = [];
                                if (LicenseeAllocationVOObj != null && LicenseeAllocationVOObj.length == 0) {
                                    LicenseeAllocationVOObj = GetListobj(AddNewLicenseeDetailUrl, "");
                                    LicenseeDetail = JSON.parse(JSON.stringify(LicenseeAllocationVOObj));
                                }
                                else {
                                    LicenseeDetail = JSON.parse(JSON.stringify(LicenseeAllocationVOObj));
                                }
                                if (ProgrammeParticulargridData[selectedProgram].LicenseeAllocationData == null) {
                                    var NewLicenseeDetail = [];
                                    NewLicenseeDetail.push(LicenseeDetail);
                                    ProgrammeParticulargridData[selectedProgram].LicenseeAllocationData = NewLicenseeDetail;
                                    LicenseeDetailsgridData = ProgrammeParticulargridData[selectedProgram].LicenseeAllocationData;
                                    nochanges = false;
                                    SetNewLicenseAllocationDetails(row);
                                }
                                else {
                                    if (ProgrammeParticulargridData[selectedProgram].LicenseeAllocationData[row] == undefined) {
                                        if (ProgrammeParticulargridData[selectedProgram].LicenseeAllocationData[row - 1] != undefined &&
                                (ProgrammeParticulargridData[selectedProgram].LicenseeAllocationData[row - 1].Licesee == null ||
                                 ProgrammeParticulargridData[selectedProgram].LicenseeAllocationData[row - 1].Licesee == undefined)) {
                                            showMessage("Licesee is required.", "error");
                                        }
                                        else {
                                            ProgrammeParticulargridData[selectedProgram].LicenseeAllocationData.push(LicenseeDetail);
                                            LicenseeDetailsgridData = ProgrammeParticulargridData[selectedProgram].LicenseeAllocationData;
                                            nochanges = false;
                                            SetNewLicenseAllocationDetails(row);
                                        }
                                    }
                                    else {
                                        setfooter(gridLicenseeAllocationId, (row + 1), LicenseeDetailsgridData.length);
                                        ShowLicenseeAllocationDetails(row);
                                    }
                                }
                            }
                            else {
                                gridLicenseeAllocation.setOptions({ editable: false });
                                showMessage("Type is required.", "error");
                            }
                        }
                        else {
                            gridLicenseeAllocation.setOptions({ editable: false });
                        }
                    }
                });

                function SetNewLicenseAllocationDetails(row) {
                    ShowProgressBar();

                    gridLicenseeAllocation.setData(LicenseeDetailsgridData);
                    gridLicenseeAllocation.render();
                    setfooter(gridLicenseeAllocationId, (row + 1), LicenseeDetailsgridData.length);

                    gridRunsPerChannel.setData(RunsPerChannelGridEmptyRow);
                    gridRunsPerChannel.render();
                    SetEmptyGridProperty(gridRunsPerChannel, gridRunsPerChannelId);
                    $("#txtTotalRuns").val(0);

                    RemoveProgressBar();
                };

                function ShowLicenseeAllocationDetails(row) {
                    //   alert("ShowLicenseeAllocationDetails method called");
                    ShowProgressBar();
                    if (LicenseeDetailsgridData[row].RunsPerChannelData != null) {
                        RunsPerChannelgridData = LicenseeDetailsgridData[row].RunsPerChannelData;
                        gridRunsPerChannel.setData(RunsPerChannelgridData);
                        gridRunsPerChannel.render();
                        SetGridProperty(gridRunsPerChannel, gridRunsPerChannelId, RunsPerChannelgridData);
                        SetTotalRuns();
                    }
                    else {
                        gridRunsPerChannel.setData(RunsPerChannelGridEmptyRow);
                        gridRunsPerChannel.render();
                        SetEmptyGridProperty(gridRunsPerChannel, gridRunsPerChannelId);
                        $("#txtTotalRuns").val(0);
                    }

                    RemoveProgressBar();

                };

                gridRunsPerChannel.onClick.subscribe(function (e, args) {
                    // alert("main function gridRunsPerChannel onClick called");
                    resetActiveGrids(selTab);
                    clearAllMessages();
                    var cell = gridRunsPerChannel.getCellFromEvent(e);
                    var row = cell.row;
                    var selectedProgram = gridProgrammeParticulars.getSelectedRows();
                    var SelectedLicensee = gridLicenseeAllocation.getSelectedRows();
                    if ($('#DMVo_Status').val() == "EXECUTED") {
                        gridRunsPerChannel.setOptions({ editable: false });
                        if (LicenseeDetailsgridData[SelectedLicensee].RunsPerChannelData[row] != undefined) {
                            setfooter(gridRunsPerChannelId, (row + 1), RunsPerChannelgridData.length);
                        }
                    }
                    else {
                        if (LicenseeDetailsgridData[SelectedLicensee] != undefined) {
                            if (LicenseeDetailsgridData[SelectedLicensee].Licesee != "" && LicenseeDetailsgridData[SelectedLicensee].Licesee != null) {
                                if (LicenseeDetailsgridData[SelectedLicensee].ChannelService != "" && LicenseeDetailsgridData[SelectedLicensee].ChannelService != null) {
                                    gridRunsPerChannel.setOptions({ editable: true });
                                    var RunsPerChannelDetail = [];
                                    if (RunsPerChannelVOobj != null && RunsPerChannelVOobj.length == 0) {
                                        RunsPerChannelVOobj = GetListobj(AddNewRunsPerChannelUrl, "");
                                        RunsPerChannelDetail = JSON.parse(JSON.stringify(RunsPerChannelVOobj));
                                    }
                                    else {
                                        RunsPerChannelDetail = JSON.parse(JSON.stringify(RunsPerChannelVOobj));
                                    }
                                    if (LicenseeDetailsgridData[SelectedLicensee].RunsPerChannelData == null) {
                                        var NewRunsPerChannelDetail = [];
                                        NewRunsPerChannelDetail.push(RunsPerChannelDetail);
                                        LicenseeDetailsgridData[SelectedLicensee].RunsPerChannelData = NewRunsPerChannelDetail;
                                        RunsPerChannelgridData = LicenseeDetailsgridData[SelectedLicensee].RunsPerChannelData;
                                        nochanges = false;
                                        SetNewRunsPerChannelDetails(row);
                                    }
                                    else {
                                        if (LicenseeDetailsgridData[SelectedLicensee].RunsPerChannelData[row] == undefined) {
                                            if (LicenseeDetailsgridData[SelectedLicensee].RunsPerChannelData[row - 1] != undefined &&
                                (LicenseeDetailsgridData[SelectedLicensee].RunsPerChannelData[row - 1].Channel == null ||
                                 LicenseeDetailsgridData[SelectedLicensee].RunsPerChannelData[row - 1].Channel == "")) {
                                                showMessage("Channel is required.", "error");
                                            }
                                            else {
                                                LicenseeDetailsgridData[SelectedLicensee].RunsPerChannelData.push(RunsPerChannelDetail);
                                                RunsPerChannelgridData = LicenseeDetailsgridData[SelectedLicensee].RunsPerChannelData;
                                                nochanges = false;
                                                SetNewRunsPerChannelDetails(row);
                                            }
                                        }
                                        else {
                                            setfooter(gridRunsPerChannelId, (row + 1), RunsPerChannelgridData.length);
                                        }
                                    }
                                }
                                else {
                                    showMessage("Channel Service is required.", "error");
                                    gridRunsPerChannel.setOptions({ editable: false });
                                }
                            }
                            else {
                                showMessage("Licensee is required.", "error");
                                gridRunsPerChannel.setOptions({ editable: false });
                            }
                        }
                        else {
                            gridRunsPerChannel.setOptions({ editable: false });
                        }
                    }

                });

                function SetNewRunsPerChannelDetails(row) {
                    gridRunsPerChannel.setData(RunsPerChannelgridData);
                    gridRunsPerChannel.render();
                    setfooter(gridRunsPerChannelId, (row + 1), RunsPerChannelgridData.length);
                };

                gridCatchUpLicenseeAllocation.onClick.subscribe(function (e, args) {
                    //   alert("main function gridCatchUpLicenseeAllocation onClick called");
                    resetActiveGrids(selTab);
                    clearAllMessages();
                    var cell = gridCatchUpLicenseeAllocation.getCellFromEvent(e);
                    var row = cell.row;
                    var selectedProgram = gridProgrammeParticulars.getSelectedRows();
                    if ($('#DMVo_Status').val() == "EXECUTED") {
                        gridCatchUpLicenseeAllocation.setOptions({ editable: false });
                        if (ProgrammeParticulargridData[selectedProgram].CatchUpLicenseeAllocationVOList[row] != undefined) {
                            setfooter(gridCatchUpLicenseeAllocationId, (row + 1), CatchUpLicenseeAllocationgridData.length);
                            ShowCatchupLicenseeAllocationDetails(row);
                        }
                    }
                    else {
                        if (ProgrammeParticulargridData[selectedProgram] != undefined) {
                            if (ProgrammeParticulargridData[selectedProgram].Type != "" && ProgrammeParticulargridData[selectedProgram].Type != null) {
                                gridCatchUpLicenseeAllocation.setOptions({ editable: true });
                                var CatchUpLicensee = [];
                                if (CatchUpLicenseeVOObj != null && CatchUpLicenseeVOObj.length == 0) {
                                    CatchUpLicenseeVOObj = GetListobj(AddNewCatchUpLicenseeDetailUrl, "");
                                    CatchUpLicensee = JSON.parse(JSON.stringify(CatchUpLicenseeVOObj));
                                }
                                else {
                                    CatchUpLicensee = JSON.parse(JSON.stringify(CatchUpLicenseeVOObj));
                                }
                                if (ProgrammeParticulargridData[selectedProgram].CatchUpLicenseeAllocationVOList == null) {
                                    var NewCatchUpLicensee = [];
                                    NewCatchUpLicensee.push(CatchUpLicensee);
                                    ProgrammeParticulargridData[selectedProgram].CatchUpLicenseeAllocationVOList = NewCatchUpLicensee;
                                    CatchUpLicenseeAllocationgridData = ProgrammeParticulargridData[selectedProgram].CatchUpLicenseeAllocationVOList;
                                    nochanges = false;
                                    SetNewCatchUpLicenseeDetail(row);
                                }
                                else {
                                    if (ProgrammeParticulargridData[selectedProgram].CatchUpLicenseeAllocationVOList[row] == undefined) {
                                        if (ProgrammeParticulargridData[selectedProgram].CatchUpLicenseeAllocationVOList[row - 1] != undefined &&
                                (ProgrammeParticulargridData[selectedProgram].CatchUpLicenseeAllocationVOList[row - 1].Licesee == null ||
                                ProgrammeParticulargridData[selectedProgram].CatchUpLicenseeAllocationVOList[row - 1].Licesee == "")) {
                                            showMessage("CatchUp Licensee is required.", "error");
                                        }
                                        else {
                                            ProgrammeParticulargridData[selectedProgram].CatchUpLicenseeAllocationVOList.push(CatchUpLicensee);
                                            CatchUpLicenseeAllocationgridData = ProgrammeParticulargridData[selectedProgram].CatchUpLicenseeAllocationVOList;
                                            nochanges = false;
                                            SetNewCatchUpLicenseeDetail(row);
                                        }
                                    }

                                    else {
                                        setfooter(gridCatchUpLicenseeAllocationId, (row + 1), CatchUpLicenseeAllocationgridData.length);
                                        ShowCatchupLicenseeAllocationDetails(row);
                                    }
                                }
                            }
                            else {
                                gridCatchUpLicenseeAllocation.setOptions({ editable: false });
                                showMessage("Type is required.", "error");
                            }
                        }
                        else {
                            gridCatchUpLicenseeAllocation.setOptions({ editable: false });
                        }
                    }
                });

                function SetNewCatchUpLicenseeDetail(row) {

                    ShowProgressBar();
                    gridCatchUpLicenseeAllocation.setData(CatchUpLicenseeAllocationgridData);
                    gridCatchUpLicenseeAllocation.render();
                    setfooter(gridCatchUpLicenseeAllocationId, (row + 1), CatchUpLicenseeAllocationgridData.length);

                    gridPlatformRights.setData(PlatformRightsGridEmptyRow);
                    gridPlatformRights.render();
                    SetEmptyGridProperty(gridPlatformRights, gridPlatformRightsId);

                    RemoveProgressBar();

                };

                function ShowCatchupLicenseeAllocationDetails(row) {
                    //   alert("ShowCatchupLicenseeAllocationDetails method called");
                    ShowProgressBar();

                    if (CatchUpLicenseeAllocationgridData[row].MediaServicePlatformList != null) {
                        PlatfromRightsAllocationgridData = CatchUpLicenseeAllocationgridData[row].MediaServicePlatformList;
                        gridPlatformRights.setData(PlatfromRightsAllocationgridData);
                        gridPlatformRights.render();
                        SetGridProperty(gridPlatformRights, gridPlatformRightsId, PlatfromRightsAllocationgridData);
                    }
                    else {
                        gridPlatformRights.setData(PlatformRightsGridEmptyRow);
                        gridPlatformRights.render();
                        SetEmptyGridProperty(gridPlatformRights, gridPlatformRightsId);
                    }

                    RemoveProgressBar();
                };

                gridPlatformRights.onClick.subscribe(function (e, args) {
                    //    alert("main function gridPlatformRights onClick called");
                    resetActiveGrids(selTab);
                    clearAllMessages();
                    var cell = gridPlatformRights.getCellFromEvent(e);
                    var row = cell.row;
                    var selectedProgram = gridProgrammeParticulars.getSelectedRows();
                    var SelectedCatchUpLicensee = gridCatchUpLicenseeAllocation.getSelectedRows();
                    if ($('#DMVo_Status').val() == "EXECUTED") {
                        gridPlatformRights.setOptions({ editable: false });
                        if (CatchUpLicenseeAllocationgridData[SelectedCatchUpLicensee].MediaServicePlatformList[row] != undefined) {
                            setfooter(gridPlatformRightsId, (row + 1), PlatfromRightsAllocationgridData.length);
                        }
                    }
                    else {
                        if (CatchUpLicenseeAllocationgridData[SelectedCatchUpLicensee] != undefined) {
                            if (CatchUpLicenseeAllocationgridData[SelectedCatchUpLicensee].Licesee != "" && CatchUpLicenseeAllocationgridData[SelectedCatchUpLicensee].Licesee != null) {
                                gridPlatformRights.setOptions({ editable: true });
                                var PlateformRightsDetail = [];
                                if (MediaPlatformRightsVOObj != null && MediaPlatformRightsVOObj.length == 0) {
                                    MediaPlatformRightsVOObj = GetListobj(AddNewPlateformRightsUrl, "");
                                    PlateformRightsDetail = JSON.parse(JSON.stringify(MediaPlatformRightsVOObj));
                                }
                                else {
                                    PlateformRightsDetail = JSON.parse(JSON.stringify(MediaPlatformRightsVOObj));
                                }
                                if (CatchUpLicenseeAllocationgridData[SelectedCatchUpLicensee].MediaServicePlatformList == null) {
                                    var NewPlateformRightsDetail = [];
                                    NewPlateformRightsDetail.push(PlateformRightsDetail);
                                    CatchUpLicenseeAllocationgridData[SelectedCatchUpLicensee].MediaServicePlatformList = NewPlateformRightsDetail;
                                    PlatfromRightsAllocationgridData = CatchUpLicenseeAllocationgridData[SelectedCatchUpLicensee].MediaServicePlatformList;
                                    nochanges = false;
                                    SetNewMediaPlatformDetails(row);
                                }
                                else {
                                    if (CatchUpLicenseeAllocationgridData[SelectedCatchUpLicensee].MediaServicePlatformList[row] == undefined) {
                                        if (CatchUpLicenseeAllocationgridData[SelectedCatchUpLicensee].MediaServicePlatformList[row - 1] != undefined &&
                                (CatchUpLicenseeAllocationgridData[SelectedCatchUpLicensee].MediaServicePlatformList[row - 1].PlatformCode == null ||
                                CatchUpLicenseeAllocationgridData[SelectedCatchUpLicensee].MediaServicePlatformList[row - 1].PlatformCode == "")) {
                                            showMessage("PlateformCode is required.", "error");
                                        }
                                        else {
                                            CatchUpLicenseeAllocationgridData[SelectedCatchUpLicensee].MediaServicePlatformList.push(PlateformRightsDetail);
                                            PlatfromRightsAllocationgridData = CatchUpLicenseeAllocationgridData[SelectedCatchUpLicensee].MediaServicePlatformList;
                                            nochanges = false;
                                            SetNewMediaPlatformDetails(row);
                                        }
                                    }
                                    else {
                                        setfooter(gridPlatformRightsId, (row + 1), PlatfromRightsAllocationgridData.length);
                                    }
                                }
                            }
                            else {
                                showMessage("CatchUp Licensee is required.", "error");
                                gridPlatformRights.setOptions({ editable: false });
                            }
                        }
                        else {
                            gridPlatformRights.setOptions({ editable: false });
                        }
                    }

                });

                function SetNewMediaPlatformDetails(row) {
                    ShowProgressBar();
                    gridPlatformRights.setData(PlatfromRightsAllocationgridData);
                    gridPlatformRights.render();
                    setfooter(gridPlatformRightsId, (row + 1), PlatfromRightsAllocationgridData.length);
                    RemoveProgressBar();
                };

                gridProgrammeParticulars.onBeforeEditCell.subscribe(function (e, args) {
                    // alert("main function gridProgrammeParticulars onBeforeEditCell called");
                    var GridData = gridProgrammeParticulars.getData();
                    if (GridData == "") {
                        return false;
                    }
                    selectedrow = ProgrammeParticulargridData[args.row];
                    if (selectedrow == undefined) {
                        return false;
                    }
                    else {
                        if (gridProgrammeParticulars.getColumns()[args.cell].id != "Type") {
                            if (selectedrow.Type == null || selectedrow.Type == "" || selectedrow.Type == "null") {
                                showMessage("Please provide Type", "information");
                                if (gridProgrammeParticulars.getColumns()[args.cell].id == "Title" || gridProgrammeParticulars.getColumns()[args.cell].id == "EventType" || gridProgrammeParticulars.getColumns()[args.cell].id == "Duration") {
                                    return false;
                                }
                            }
                            else {
                                if (selectedrow.IsSeries == true) {
                                    if (gridProgrammeParticulars.getColumns()[args.cell].id == "EventType" || gridProgrammeParticulars.getColumns()[args.cell].id == "Duration") {
                                        return false;
                                    }
                                }
                            }
                        }

                        if ($("#DMVo_Status").val() == "REGISTERED" && (selectedrow.PersistFlag == 1 || selectedrow.PersistFlag == 3)) {
                            if (gridProgrammeParticulars.getColumns()[args.cell].id == "Type" || gridProgrammeParticulars.getColumns()[args.cell].id == "Title" ||
                                 gridProgrammeParticulars.getColumns()[args.cell].id == "RefNo" || gridProgrammeParticulars.getColumns()[args.cell].id == "SportType_Genre" ||
                                 gridProgrammeParticulars.getColumns()[args.cell].id == "SubGenre" || gridProgrammeParticulars.getColumns()[args.cell].id == "TertiaryGenre" ||
                                 gridProgrammeParticulars.getColumns()[args.cell].id == "Duration" || gridProgrammeParticulars.getColumns()[args.cell].id == "SeriesTitle") {
                                return false;
                            }
                        }
                    }
                    return true;
                });

                gridLicenseeAllocation.onBeforeEditCell.subscribe(function (e, args) {
                    //  alert("main function gridProgrammeParticulars onBeforeEditCell called");
                    var GridData = gridLicenseeAllocation.getData();
                    if (GridData == "") {
                        return false;
                    }
                    selectedrow = LicenseeDetailsgridData[args.row];
                    if (selectedrow == undefined) {
                        return false;
                    }
                    else {
                        if (gridLicenseeAllocation.getColumns()[args.cell].id != "Licesee" && (selectedrow.Licesee == null || selectedrow.Licesee == "" || selectedrow.Licesee == "null")) {
                            showMessage("Please provide Licensee", "information");
                            return false;
                        }
                        if (selectedrow.TBA == true && (gridLicenseeAllocation.getColumns()[args.cell].id == "StartDate" || gridLicenseeAllocation.getColumns()[args.cell].id == "EndDate")) {
                            return false;
                        }
                        if (gridLicenseeAllocation.getColumns()[args.cell].id == "Max_channel_Number") {
                            var RunsPerChanneldata = gridRunsPerChannel.getData();
                            var NotAllowed = false;
                            if (RunsPerChanneldata != "") {
                                for (var i = 0; i < RunsPerChannelgridData.length; i++) {
                                    if (RunsPerChannelgridData[i].Max_channel_Number == undefined || RunsPerChannelgridData[i].Max_channel_Number == null || RunsPerChannelgridData[i].Max_channel_Number == "null" || RunsPerChannelgridData[i].Max_channel_Number == 0) {
                                        //
                                    }
                                    else {
                                        NotAllowed = true;
                                    }
                                }
                            }
                            if (NotAllowed == true) {
                                return false;
                            }
                        }

                    }
                    return true;
                });

                gridRunsPerChannel.onBeforeEditCell.subscribe(function (e, args) {
                    // alert("main function gridProgrammeParticulars onBeforeEditCell called");
                    var GridData = gridRunsPerChannel.getData();
                    if (GridData == "") {
                        return false;
                    }
                    selectedrow = RunsPerChannelgridData[args.row];
                    if (selectedrow == undefined) {
                        return false;
                    }
                    else {
                        var GridData = gridLicenseeAllocation.getData();
                        if (GridData == "") {
                            return false;
                        }
                        var selectedRow = gridLicenseeAllocation.getSelectedRows();
                        if (selectedRow == undefined || selectedRow == null || selectedRow == "null") {
                            return false;
                        }
                        var selectedLicensee = LicenseeDetailsgridData[selectedRow];
                        if (selectedLicensee == undefined || selectedLicensee == null || selectedLicensee == "null") {
                            return false;
                        }
                        if (selectedLicensee.ChannelService == null || selectedLicensee.ChannelService == "" || selectedLicensee.ChannelService == "null") {
                            showMessage("Please provide Channel Service.", "information");
                            return false;
                        }
                        if (selectedLicensee.Max_channel_Number != null && selectedLicensee.Max_channel_Number != "" && selectedLicensee.Max_channel_Number != "null") {
                            if (gridRunsPerChannel.getColumns()[args.cell].id == "Max_channel_Number") {
                                return false;
                            }
                        }
                        if (selectedrow.Cost != true) {
                            if (gridRunsPerChannel.getColumns()[args.cell].id == "CostingRuns") {
                                return false;
                            }
                        }
                        if (selectedrow.Cost == true) {
                            var Types = [];
                            var Readonly = true;
                            Types.push("FEA");
                            Types.push("TV");
                            Types.push("LIB");
                            var ProgramSelectedRow = gridProgrammeParticulars.getSelectedRows();
                            var selectedProgram = ProgrammeParticulargridData[ProgramSelectedRow];
                            for (var i = 0; i < Types.length; i++) {
                                if (selectedProgram.Type == Types[i]) {
                                    Readonly = false;
                                    break;
                                }
                            }
                            if (Readonly == true) {
                                if (gridRunsPerChannel.getColumns()[args.cell].id == "CostingRuns") {
                                    return false;
                                }
                            }
                            else {
                                var ReadOnly = true;
                                var Licensee = [];
                                Licensee.push("DOM");
                                Licensee.push("AFR");
                                Licensee.push("AFE");
                                Licensee.push("MST");
                                Licensee.push("MZA");
                                Licensee.push("ADO");
                                Licensee.push("AAF");
                                for (var i = 0; i < Licensee.length; i++) {
                                    if (selectedLicensee.Licesee == Licensee[i]) {
                                        ReadOnly = false;
                                        break;
                                    }
                                }
                                if (ReadOnly == true) {
                                    if (gridRunsPerChannel.getColumns()[args.cell].id == "CostingRuns") {
                                        return false;
                                    }
                                }
                            }
                        }
                        if (gridRunsPerChannel.getColumns()[args.cell].id == "Max_channel_Number") {
                            if (gridLicenseeAllocation.getActiveCell() != null) {
                                if (gridLicenseeAllocation.getDataLength() > 0) {
                                    var ActiveRow = gridLicenseeAllocation.getActiveCell().row;
                                    var Activecell = gridLicenseeAllocation.getActiveCell().cell;
                                    var cellvalue = null;
                                    if (Activecell == 12) {
                                        if (gridLicenseeAllocation.getCellEditor() != null) {
                                            if (gridLicenseeAllocation.getCellEditor().getValue() != null) {
                                                cellvalue = gridLicenseeAllocation.getCellEditor().getValue();
                                            }
                                        }
                                    }
                                    if (cellvalue != null) {
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                    return true;
                });

                gridCatchUpLicenseeAllocation.onBeforeEditCell.subscribe(function (e, args) {
                    // alert("main function gridProgrammeParticulars onBeforeEditCell called");
                    var GridData = gridCatchUpLicenseeAllocation.getData();
                    if (GridData == "") {
                        return false;
                    }
                    selectedrow = CatchUpLicenseeAllocationgridData[args.row];
                    if (selectedrow == undefined) {
                        return false;
                    }
                    else {
                        if (gridCatchUpLicenseeAllocation.getColumns()[args.cell].id != "Licesee" && (selectedrow.Licesee == null || selectedrow.Licesee == "" || selectedrow.Licesee == "null")) {
                            showMessage("Please provide Licensee", "information");
                            return false;
                        }
                        if (selectedrow.TBA == true && (gridCatchUpLicenseeAllocation.getColumns()[args.cell].id == "StartDate" || gridCatchUpLicenseeAllocation.getColumns()[args.cell].id == "EndDate")) {
                            return false;
                        }
                    }
                    return true;
                });

                gridPlatformRights.onBeforeEditCell.subscribe(function (e, args) {
                    // alert("main function gridProgrammeParticulars onBeforeEditCell called");
                    var GridData = gridPlatformRights.getData();
                    if (GridData == "") {
                        return false;
                    }
                    return true;
                });

                gridProgrammeParticulars.onCellChange.subscribe(function (e, args) {
                    nochanges = false;
                    cellvalue = ProgrammeParticulargridData[args.row][gridProgrammeParticulars.getColumns()[args.cell].field];
                    columnId = gridProgrammeParticulars.getColumns()[args.cell].id;
                    if (typeof cellvalue == "string") {
                        cellvalue = cellvalue.toUpperCase();
                        ProgrammeParticulargridData[args.row][gridProgrammeParticulars.getColumns()[args.cell].field] = cellvalue;
                    }
                    if ($("#DMVo_DMNumber").val() != "") {
                        if (ProgrammeParticulargridData[args.row].PersistFlag == 3) {
                            ProgrammeParticulargridData[args.row].PersistFlag = parseInt("1");
                        }
                    }
                    if (gridProgrammeParticulars.getColumns()[args.cell].id == "Type") {
                        if (cellvalue != null && cellvalue != "" && cellvalue != "null") {
                            if (TypeList != null && TypeList.length == 0) {
                                TypeList = GetListobj(GetTypeShowLOVListUrl, value);
                            }
                            if (TypeList != null) {
                                for (var i = 0; i < TypeList.length; i++) {
                                    if (cellvalue == TypeList[i].CodeValue) {
                                        ProgrammeParticulargridData[args.row].Type = ProgrammeParticulargridData[args.row].Type.toUpperCase();
                                        ProgrammeParticulargridData[args.row].SeriesTitle = TypeList[i].Attribute == "Y" ? "" : "NON SERIES";
                                        ProgrammeParticulargridData[args.row].IsSeries = TypeList[i].Attribute == "Y" ? true : false;
                                        SetButtons([args.row]);
                                    }
                                }
                            }
                        }
                    }
                    if (gridProgrammeParticulars.getColumns()[args.cell].id == "Title") {
                        var errorMsg = null;
                        if (cellvalue != null && cellvalue != "" && cellvalue != "null") {
                            $.ajax({
                                async: false,
                                url: GetTitleListUrl,
                                type: "POST",
                                dataType: 'Json',
                                data: { "TypeHint": ProgrammeParticulargridData[args.row].Type, "TitleHint": cellvalue },
                                async: false,
                                cache: false,

                                success: function (data) {
                                    var TitleData = data;
                                    var IsSeriesTitle = ProgrammeParticulargridData[args.row].IsSeries == true ? "Y" : "N";
                                    if (TitleData != null) {
                                        if (TitleData.length > 0) {
                                            if (cellvalue == (IsSeriesTitle == "N" ? TitleData[0].WT_Text : TitleData[0].Title)) {
                                                if ((IsSeriesTitle == "N" ? TitleData[0].DMGenRefNo : TitleData[0].Id) == -1) {
                                                    showMessage("Ambiguous programme name.Press List for lookup", "information");
                                                }
                                                else {
                                                    ProgrammeParticulargridData[args.row].Title = ProgrammeParticulargridData[args.row].Title.toUpperCase();
                                                    ProgrammeParticulargridData[args.row].RefNo = IsSeriesTitle == "N" ? TitleData[0].DMGenRefNo : TitleData[0].Id;
                                                    ProgrammeParticulargridData[args.row].ReleaseYear = TitleData[0].Production_Year;
                                                    ProgrammeParticulargridData[args.row].CategoryCode = TitleData[0].CategoryCode;
                                                    ProgrammeParticulargridData[args.row].BOCategory = TitleData[0].BOCategory;
                                                    ProgrammeParticulargridData[args.row].BORevenueUSD = TitleData[0].BORevenueUSD;
                                                    ProgrammeParticulargridData[args.row].BORevenueZAR = TitleData[0].BORevenueZAR;
                                                    ProgrammeParticulargridData[args.row].SportType_Genre = IsSeriesTitle == "N" ? TitleData[0].SportType_Genre : "-";
                                                    ProgrammeParticulargridData[args.row].SubGenre = IsSeriesTitle == "N" ? TitleData[0].Genre : "-";
                                                    ProgrammeParticulargridData[args.row].TertiaryGenre = IsSeriesTitle == "N" ? TitleData[0].TertiaryGenre : "-";
                                                    ProgrammeParticulargridData[args.row].EventType = IsSeriesTitle == "N" ? TitleData[0].Event_Type : "-";
                                                    ProgrammeParticulargridData[args.row].Duration = IsSeriesTitle == "N" ? TitleData[0].Duration : "0000:00:00";

                                                    gridProgrammeParticulars.setData(ProgrammeParticulargridData);
                                                    gridProgrammeParticulars.render();
                                                    errorMsg = "Title Accepted.";
                                                }
                                            }
                                        }
                                    }
                                    if (errorMsg == null || errorMsg == "" || errorMsg == "null") {
                                        if (cellvalue.indexOf("%") == -1) {
                                            if (IsSeriesTitle == "Y") {
                                                $.noty.closeAll();
                                                noty({
                                                    text: 'This series does not exist. Would you like to add it',
                                                    modal: true,
                                                    type: 'alert',
                                                    title: 'Series does not exist',
                                                    buttons: [
                                                            { addClass: 'inputButton', text: 'Yes', onClick: function ($noty) {
                                                                ProgrammeParticulargridData[args.row].Title = cellvalue;
                                                                ProgrammeParticulargridData[args.row].RefNo = 0;
                                                                ProgrammeParticulargridData[args.row].SportType_Genre = "-";
                                                                ProgrammeParticulargridData[args.row].SubGenre = "-";
                                                                ProgrammeParticulargridData[args.row].TertiaryGenre = "-";
                                                                ProgrammeParticulargridData[args.row].EventType = "-";
                                                                ProgrammeParticulargridData[args.row].Duration = "0000:00:00";

                                                                gridProgrammeParticulars.setData(ProgrammeParticulargridData);
                                                                gridProgrammeParticulars.render();
                                                                $noty.close();

                                                            }
                                                            },
                                                           { addClass: 'inputButton', text: 'No', onClick: function ($noty) {
                                                               ProgrammeParticulargridData[args.row].Title = null;
                                                               ProgrammeParticulargridData[args.row].RefNo = 0;
                                                               ProgrammeParticulargridData[args.row].SportType_Genre = "-";
                                                               ProgrammeParticulargridData[args.row].SubGenre = "-";
                                                               ProgrammeParticulargridData[args.row].TertiaryGenre = "-";
                                                               ProgrammeParticulargridData[args.row].EventType = "-";
                                                               ProgrammeParticulargridData[args.row].Duration = "0000:00:00";

                                                               gridProgrammeParticulars.setData(ProgrammeParticulargridData);
                                                               gridProgrammeParticulars.render();
                                                               $noty.close();
                                                           }
                                                           }
                                                         ]
                                                });
                                            }
                                            if (IsSeriesTitle == "N") {
                                                $.noty.closeAll();
                                                noty({
                                                    text: 'There are no programmes that match this hint. Would you like the system to create a programme of this title right now, using a set of default values?(Can be edited later using Programme Maintenance)',
                                                    modal: true,
                                                    type: 'alert',
                                                    buttons: [
                                                            { addClass: 'inputButton', text: 'Yes', onClick: function ($noty) {
                                                                ProgrammeParticulargridData[args.row].Title = cellvalue;
                                                                ProgrammeParticulargridData[args.row].RefNo = 0;
                                                                ProgrammeParticulargridData[args.row].SportType_Genre = "-";
                                                                ProgrammeParticulargridData[args.row].SubGenre = "-";
                                                                ProgrammeParticulargridData[args.row].TertiaryGenre = "-";
                                                                ProgrammeParticulargridData[args.row].EventType = "-";
                                                                ProgrammeParticulargridData[args.row].Duration = "0000:00:00";

                                                                gridProgrammeParticulars.setData(ProgrammeParticulargridData);
                                                                gridProgrammeParticulars.render();
                                                                $noty.close();

                                                            }
                                                            },
                                                           { addClass: 'inputButton', text: 'No', onClick: function ($noty) {
                                                               ProgrammeParticulargridData[args.row].Title = null;
                                                               ProgrammeParticulargridData[args.row].RefNo = 0;
                                                               ProgrammeParticulargridData[args.row].SportType_Genre = "-";
                                                               ProgrammeParticulargridData[args.row].SubGenre = "-";
                                                               ProgrammeParticulargridData[args.row].TertiaryGenre = "-";
                                                               ProgrammeParticulargridData[args.row].EventType = "-";
                                                               ProgrammeParticulargridData[args.row].Duration = "0000:00:00";

                                                               gridProgrammeParticulars.setData(ProgrammeParticulargridData);
                                                               gridProgrammeParticulars.render();
                                                               $noty.close();
                                                           }
                                                           }
                                                         ]
                                                });
                                            }
                                        }
                                        else {
                                            showMessage("Entered titles may not contain the % sign.Use % sign for query purposes onlys", "information");
                                        }
                                        errorMsg = null;
                                    }
                                },
                                error: function () {
                                    showMessage("Some exception occured.Please contact the Administrator.", "error");
                                }
                            });
                        }
                    }
                    if (gridProgrammeParticulars.getColumns()[args.cell].id == "strTotalPrice") {
                        if (cellvalue != "") {
                            ProgrammeParticulargridData[args.row][gridProgrammeParticulars.getColumns()[args.cell].field] = parseFloat(cellvalue).toFixed(4);
                        }
                        else {
                            ProgrammeParticulargridData[args.row][gridProgrammeParticulars.getColumns()[args.cell].field] = parseFloat(0).toFixed(4);
                        }
                        var MemoPrice = null;
                        if (ProgrammeParticulargridData != null) {
                            for (var i = 0; i < ProgrammeParticulargridData.length; i++) {
                                MemoPrice = MemoPrice + parseFloat(ProgrammeParticulargridData[i].strTotalPrice);
                                $("#DMVo_MemoPrice").val(MemoPrice.toFixed(4));
                            }
                        }
                    }
                    if (gridProgrammeParticulars.getColumns()[args.cell].id == "Duration") {
                        if (cellvalue != "" && cellvalue != undefined && cellvalue != "null") {
                            var validDuration = false;
                            var ActionParameters = {
                                Duration: cellvalue.toString()
                            };
                            $.ajax({
                                async: false,
                                url: ValidateProgramDurationUrl,
                                type: "POST",
                                dataType: 'Json',
                                data: JSON.stringify(ActionParameters),
                                contentType: "application/json; charset=utf-8",
                                async: false,
                                cache: false,

                                success: function (data) {
                                    if (data.successflag == true) {
                                        cellvalue = data.DurationValue;
                                        validDuration = true;
                                    }
                                },
                                error: function () {
                                    showMessage("Some exception occured.Please contact the Administrator.", "error");
                                }
                            });
                            if (validDuration == true) {

                                ProgrammeParticulargridData[args.row][gridProgrammeParticulars.getColumns()[args.cell].field] = cellvalue;
                            }
                            else {
                                ProgrammeParticulargridData[args.row][gridProgrammeParticulars.getColumns()[args.cell].field] = "0000:00:00";
                            }
                        }
                        else {
                            ProgrammeParticulargridData[args.row][gridProgrammeParticulars.getColumns()[args.cell].field] = "0000:00:00";
                        }
                    }
                    if (ProgrammeParticulargridData[args.row].Id != 0) {
                        if (ProgrammeVOModifiedData != null) {
                            for (var i = 0; i < ProgrammeVOModifiedData.length; i++) {
                                if (ProgrammeVOModifiedData[i].Id == ProgrammeParticulargridData[args.row].Id) {
                                    ProgrammeVOModifiedData[i].PersistFlag = ProgrammeParticulargridData[args.row].PersistFlag;
                                    ProgrammeVOModifiedData[i].ReleaseYear = columnId == "ReleaseYear" ? cellvalue : ProgrammeParticulargridData[args.row].ReleaseYear;
                                    ProgrammeVOModifiedData[i].CategoryCode = columnId == "CategoryCode" ? cellvalue : ProgrammeParticulargridData[args.row].CategoryCode;
                                    ProgrammeVOModifiedData[i].BOCategory = columnId == "BOCategory" ? cellvalue : ProgrammeParticulargridData[args.row].BOCategory;
                                    ProgrammeVOModifiedData[i].BORevenueUSD = columnId == "BORevenueUSD" ? cellvalue : ProgrammeParticulargridData[args.row].BORevenueUSD;
                                    ProgrammeVOModifiedData[i].BORevenueZAR = columnId == "BORevenueZAR" ? cellvalue : ProgrammeParticulargridData[args.row].BORevenueZAR;
                                    ProgrammeVOModifiedData[i].EventType = columnId == "EventType" ? cellvalue : ProgrammeParticulargridData[args.row].EventType;
                                    ProgrammeVOModifiedData[i].strTotalPrice = columnId == "strTotalPrice" ? cellvalue : parseFloat(ProgrammeParticulargridData[args.row].strTotalPrice).toFixed(4);
                                }
                            }
                        }
                    }
                    gridProgrammeParticulars.setData(ProgrammeParticulargridData);
                    gridProgrammeParticulars.invalidateRow([args.row]);
                    gridProgrammeParticulars.render();
                });
                gridLicenseeAllocation.onCellChange.subscribe(function (e, args) {
                    nochanges = false;
                    cellvalue = LicenseeDetailsgridData[args.row][gridLicenseeAllocation.getColumns()[args.cell].field];
                    columnId = gridLicenseeAllocation.getColumns()[args.cell].id;
                    if (typeof cellvalue == "string") {
                        cellvalue = cellvalue.toUpperCase();
                        LicenseeDetailsgridData[args.row][gridLicenseeAllocation.getColumns()[args.cell].field] = cellvalue;
                    }
                    if ($("#DMVo_DMNumber").val() != "") {
                        if (LicenseeDetailsgridData[args.row].PersistFlag == 3) {
                            LicenseeDetailsgridData[args.row].PersistFlag = parseInt("1");
                        }
                    }
                    if (gridLicenseeAllocation.getColumns()[args.cell].id == "Licesee") {
                        if (cellvalue != null && cellvalue != "" && cellvalue != "null") {
                            var LicenseeList = GetListobj(getLicenseeListUrl, { "hintLicensee": cellvalue.toUpperCase(), "LeeType": "LINEAR" });
                            if (LicenseeList != null) {
                                for (var i = 0; i < LicenseeList.length; i++) {
                                    if (cellvalue == LicenseeList[i].ShortName) {
                                        LicenseeDetailsgridData[args.row].strAllocation = (LicenseeDetailsgridData[args.row].strAllocation == "" || LicenseeDetailsgridData[args.row].strAllocation == null || LicenseeDetailsgridData[args.row].strAllocation == "null") ? "0.0000" : LicenseeDetailsgridData[args.row].strAllocation;
                                        LicenseeDetailsgridData[args.row].Cost_Runs = (LicenseeDetailsgridData[args.row].Cost_Runs == "" || LicenseeDetailsgridData[args.row].Cost_Runs == null || LicenseeDetailsgridData[args.row].Cost_Runs == "null") ? parseInt("7") : LicenseeDetailsgridData[args.row].Cost_Runs;
                                        LicenseeDetailsgridData[args.row].Max_channel_Service = (LicenseeDetailsgridData[args.row].Max_channel_Service == "" || LicenseeDetailsgridData[args.row].Max_channel_Service == null || LicenseeDetailsgridData[args.row].Cost_Runs == "null") ? parseInt("50") : LicenseeDetailsgridData[args.row].Max_channel_Service;
                                        LicenseeDetailsgridData[args.row].Max_channel_Number = (LicenseeDetailsgridData[args.row].Max_channel_Number == "" || LicenseeDetailsgridData[args.row].Max_channel_Number == null || LicenseeDetailsgridData[args.row].Max_channel_Number == "null") ? parseInt("15") : LicenseeDetailsgridData[args.row].Max_channel_Number;
                                    }
                                }
                            }
                        }
                    }
                    for (var i = 0; i < LicenseeDetailsgridData.length; i++) {
                        if (i != args.row) {
                            if (LicenseeDetailsgridData[args.row].ChannelService != null && LicenseeDetailsgridData[args.row].ChannelService != "" && LicenseeDetailsgridData[args.row].ChannelService != "null") {
                                if (LicenseeDetailsgridData[args.row].ChannelService.toUpperCase() == LicenseeDetailsgridData[i].ChannelService && LicenseeDetailsgridData[args.row].Licesee == LicenseeDetailsgridData[i].Licesee) {
                                    LicenseeDetailsgridData[args.row].ChannelService = null;
                                    showMessage("Allocation already exists for this licensee.", "information");
                                    break;
                                }
                            }
                        }
                    }
                    if (gridLicenseeAllocation.getColumns()[args.cell].id == "EndDate") {
                        var StartDate = LicenseeDetailsgridData[args.row].StartDate;
                        if (cellvalue != "" && cellvalue != undefined && cellvalue != "null" && cellvalue != NaN
                        && StartDate != "" && StartDate != undefined && StartDate != "null" && StartDate != NaN) {
                            var IsValid = false;
                            var No_Days = null;
                            var No_Months = null;
                            var ActionParameters = {
                                startDateValue: StartDate,
                                EndDateValue: cellvalue
                            };
                            $.ajax({
                                async: false,
                                url: CalculateLicenseeTimeUrl,
                                type: "POST",
                                dataType: 'Json',
                                data: JSON.stringify(ActionParameters),
                                contentType: "application/json; charset=utf-8",
                                async: false,
                                cache: false,

                                success: function (data) {
                                    if (data.successflag == true) {
                                        No_Days = data.No_Days;
                                        No_Months = data.No_Months;
                                        IsValid = true;
                                    }
                                },
                                error: function () {
                                    showMessage("Some exception occured.Please contact the Administrator.", "error");
                                }
                            });
                            if (IsValid == true) {
                                LicenseeDetailsgridData[args.row].No_Months = No_Months;
                                LicenseeDetailsgridData[args.row].No_Days = No_Days;
                            }
                            else {
                                LicenseeDetailsgridData[args.row].No_Months = null;
                                LicenseeDetailsgridData[args.row].No_Days = null;
                                LicenseeDetailsgridData[args.row].EndDate = null;
                                showMessage("End Date should be greater than Start Date.", "information");
                            }
                        }
                    }
                    if (gridLicenseeAllocation.getColumns()[args.cell].id == "strAllocation") {
                        if (cellvalue != "") {
                            LicenseeDetailsgridData[args.row][gridLicenseeAllocation.getColumns()[args.cell].field] = parseFloat(cellvalue).toFixed(4);
                        }
                        else {
                            LicenseeDetailsgridData[args.row][gridLicenseeAllocation.getColumns()[args.cell].field] = parseFloat(0).toFixed(4);
                        }
                    }
                    if (gridLicenseeAllocation.getColumns()[args.cell].id == "ChannelRuns") {
                        if (LicenseeDetailsgridData[args.row][gridLicenseeAllocation.getColumns()[args.cell].field] == "" ||
                            LicenseeDetailsgridData[args.row][gridLicenseeAllocation.getColumns()[args.cell].field] == null ||
                            LicenseeDetailsgridData[args.row][gridLicenseeAllocation.getColumns()[args.cell].field] == "null") {
                            LicenseeDetailsgridData[args.row][gridLicenseeAllocation.getColumns()[args.cell].field] = 0;
                        }
                    }
                    if (gridLicenseeAllocation.getColumns()[args.cell].id == "BlackDays") {
                        if (LicenseeDetailsgridData[args.row][gridLicenseeAllocation.getColumns()[args.cell].field] == "" ||
                            LicenseeDetailsgridData[args.row][gridLicenseeAllocation.getColumns()[args.cell].field] == null ||
                            LicenseeDetailsgridData[args.row][gridLicenseeAllocation.getColumns()[args.cell].field] == "null") {
                            LicenseeDetailsgridData[args.row][gridLicenseeAllocation.getColumns()[args.cell].field] = 0;
                        }
                    }
                    if (gridLicenseeAllocation.getColumns()[args.cell].id == "TBA") {
                        LicenseeDetailsgridData[args.row].StartDate = null;
                        LicenseeDetailsgridData[args.row].EndDate = null;
                        LicenseeDetailsgridData[args.row].No_Months = "";
                        LicenseeDetailsgridData[args.row].No_Days = "";
                    }

                    var selectedPg = gridProgrammeParticulars.getSelectedRows();
                    if (ProgrammeParticulargridData[selectedPg].Id != 0) {
                        if (ProgrammeVOModifiedData != null) {
                            for (var i = 0; i < ProgrammeVOModifiedData.length; i++) {
                                if (ProgrammeVOModifiedData[i].Id == ProgrammeParticulargridData[selectedPg].Id) {
                                    for (var j = 0; j < ProgrammeVOModifiedData[i].LicenseeAllocationData.length; j++) {
                                        if (ProgrammeVOModifiedData[i].LicenseeAllocationData[j].Id == LicenseeDetailsgridData[args.row].Id) {
                                            ProgrammeVOModifiedData[i].LicenseeAllocationData[j].PersistFlag = LicenseeDetailsgridData[args.row].PersistFlag;
                                            ProgrammeVOModifiedData[i].LicenseeAllocationData[j].Licesee = columnId == "Licesee" ? cellvalue : LicenseeDetailsgridData[args.row].Licesee;
                                            ProgrammeVOModifiedData[i].LicenseeAllocationData[j].strAllocation = columnId == "strAllocation" ? cellvalue : LicenseeDetailsgridData[args.row].strAllocation;
                                            ProgrammeVOModifiedData[i].LicenseeAllocationData[j].ChannelRuns = columnId == "ChannelRuns" ? cellvalue : LicenseeDetailsgridData[args.row].ChannelRuns;
                                            ProgrammeVOModifiedData[i].LicenseeAllocationData[j].BlackDays = columnId == "BlackDays" ? cellvalue : LicenseeDetailsgridData[args.row].BlackDays;
                                            ProgrammeVOModifiedData[i].LicenseeAllocationData[j].ChannelService = columnId == "ChannelService" ? cellvalue : LicenseeDetailsgridData[args.row].ChannelService;
                                            ProgrammeVOModifiedData[i].LicenseeAllocationData[j].TBA = columnId == "TBA" ? cellvalue : LicenseeDetailsgridData[args.row].TBA;
                                            ProgrammeVOModifiedData[i].LicenseeAllocationData[j].StartDate = columnId == "StartDate" ? cellvalue : LicenseeDetailsgridData[args.row].StartDate;
                                            ProgrammeVOModifiedData[i].LicenseeAllocationData[j].EndDate = columnId == "EndDate" ? cellvalue : LicenseeDetailsgridData[args.row].EndDate;
                                            ProgrammeVOModifiedData[i].LicenseeAllocationData[j].No_Months = columnId == "No_Months" ? cellvalue : LicenseeDetailsgridData[args.row].No_Months;
                                            ProgrammeVOModifiedData[i].LicenseeAllocationData[j].No_Days = columnId == "No_Days" ? cellvalue : LicenseeDetailsgridData[args.row].No_Days;
                                            ProgrammeVOModifiedData[i].LicenseeAllocationData[j].Cost_Runs = columnId == "Cost_Runs" ? cellvalue : LicenseeDetailsgridData[args.row].Cost_Runs;
                                            ProgrammeVOModifiedData[i].LicenseeAllocationData[j].Max_channel_Service = columnId == "Max_channel_Service" ? cellvalue : LicenseeDetailsgridData[args.row].Max_channel_Service;
                                            ProgrammeVOModifiedData[i].LicenseeAllocationData[j].Max_channel_Number = columnId == "Max_channel_Service" ? cellvalue : LicenseeDetailsgridData[args.row].Max_channel_Number;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    gridLicenseeAllocation.setData(LicenseeDetailsgridData);
                    gridLicenseeAllocation.invalidateRow([args.row]);
                    gridLicenseeAllocation.render();
                });
                gridRunsPerChannel.onCellChange.subscribe(function (e, args) {
                    nochanges = false;
                    cellvalue = RunsPerChannelgridData[args.row][gridRunsPerChannel.getColumns()[args.cell].field];
                    columnId = gridRunsPerChannel.getColumns()[args.cell].id;
                    if (typeof cellvalue == "string") {
                        cellvalue = cellvalue.toUpperCase();
                        RunsPerChannelgridData[args.row][gridRunsPerChannel.getColumns()[args.cell].field] = cellvalue;
                    }
                    if ($("#DMVo_DMNumber").val() != "") {
                        if (RunsPerChannelgridData[args.row].PersistFlag == 3) {
                            RunsPerChannelgridData[args.row].PersistFlag = parseInt("1");
                        }
                    }
                    if (gridRunsPerChannel.getColumns()[args.cell].id == "Channel") {
                        if (cellvalue != null && cellvalue != "" && cellvalue != "null") {
                            var selectedRow = gridLicenseeAllocation.getSelectedRows();
                            if (selectedRow != null) {
                                var ChannelList = GetListobj(getChannelListUrl, { "ChannelService": LicenseeDetailsgridData[selectedRow].ChannelService.toString(), "hintChannel": null, "Type": $("#TypeComboSelection").val() });
                                if (ChannelList.length > 0) {
                                    for (var i = 0; i < ChannelList.length; i++) {
                                        if (cellvalue == ChannelList[i].ChannelID) {
                                            RunsPerChannelgridData[args.row].Runs = (RunsPerChannelgridData[args.row].Runs == "" || RunsPerChannelgridData[args.row].Runs == null || RunsPerChannelgridData[args.row].Runs == "null") ? parseInt("1") : RunsPerChannelgridData[args.row].Runs;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (gridRunsPerChannel.getColumns()[args.cell].id == "Cost") {
                        if (RunsPerChannelgridData[args.row].Cost != true) {
                            RunsPerChannelgridData[args.row].CostingRuns = 0;
                        }
                    }
                    if (gridRunsPerChannel.getColumns()[args.cell].id == "Max_channel_Number") {
                        if (RunsPerChannelgridData[args.row].Max_channel_Number == "") {
                            RunsPerChannelgridData[args.row].Max_channel_Number = null;
                        }
                    }
                    if (gridRunsPerChannel.getColumns()[args.cell].id == "Runs") {
                        if (cellvalue == "" || cellvalue == undefined || cellvalue == "null" || cellvalue == 0 || cellvalue == null) {
                            RunsPerChannelgridData[args.row].Runs = 1;
                        }
                    }

                    var TotalRuns = null;
                    if (RunsPerChannelgridData != null) {
                        for (var i = 0; i < RunsPerChannelgridData.length; i++) {
                            TotalRuns = TotalRuns + RunsPerChannelgridData[i].Runs;
                        }
                        if (TotalRuns == null) {
                            $("#txtTotalRuns").val(0);
                        }
                        else {
                            $("#txtTotalRuns").val(TotalRuns);
                            var selectedRow = gridLicenseeAllocation.getSelectedRows();
                            if (selectedRow != null) {
                                LicenseeDetailsgridData[selectedRow].ChannelRuns = TotalRuns;
                                if (LicenseeDetailsgridData[selectedRow].PersistFlag == 3) {
                                    LicenseeDetailsgridData[selectedRow].PersistFlag = parseInt("1");
                                }
                                gridLicenseeAllocation.setData(LicenseeDetailsgridData);
                                gridLicenseeAllocation.render();
                                var selectedPg = gridProgrammeParticulars.getSelectedRows();
                                if (ProgrammeParticulargridData[selectedPg].Id != 0) {
                                    if (ProgrammeVOModifiedData != null) {
                                        for (var i = 0; i < ProgrammeVOModifiedData.length; i++) {
                                            if (ProgrammeVOModifiedData[i].Id == ProgrammeParticulargridData[selectedPg].Id) {
                                                for (var j = 0; j < ProgrammeVOModifiedData[i].LicenseeAllocationData.length; j++) {
                                                    if (ProgrammeVOModifiedData[i].LicenseeAllocationData[j].Id == LicenseeDetailsgridData[selectedRow].Id) {
                                                        ProgrammeVOModifiedData[i].LicenseeAllocationData[j].PersistFlag = LicenseeDetailsgridData[selectedRow].PersistFlag;
                                                        ProgrammeVOModifiedData[i].LicenseeAllocationData[j].ChannelRuns = columnId == "ChannelRuns" ? cellvalue : LicenseeDetailsgridData[selectedRow].ChannelRuns;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    var selectedPg = gridProgrammeParticulars.getSelectedRows();
                    var selectedLc = gridLicenseeAllocation.getSelectedRows();
                    if (ProgrammeParticulargridData[selectedPg].Id != 0) {
                        if (ProgrammeVOModifiedData != null) {
                            for (var i = 0; i < ProgrammeVOModifiedData.length; i++) {
                                if (ProgrammeVOModifiedData[i].Id == ProgrammeParticulargridData[selectedPg].Id) {
                                    for (var j = 0; j < ProgrammeVOModifiedData[i].LicenseeAllocationData.length; j++) {
                                        if (ProgrammeVOModifiedData[i].LicenseeAllocationData[j].Id == LicenseeDetailsgridData[selectedLc].Id) {
                                            if (ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData != null) {
                                                for (var k = 0; k < ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData.length; k++) {
                                                    if (ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData[k].Id == RunsPerChannelgridData[args.row].Id) {
                                                        ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData[k].PersistFlag = RunsPerChannelgridData[args.row].PersistFlag;
                                                        ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData[k].Channel = columnId == "Channel" ? cellvalue : RunsPerChannelgridData[args.row].Channel;
                                                        ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData[k].Max_channel_Number = columnId == "Max_channel_Number" ? cellvalue : RunsPerChannelgridData[args.row].Max_channel_Number;
                                                        ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData[k].Cost = columnId == "Cost" ? cellvalue : RunsPerChannelgridData[args.row].Cost;
                                                        ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData[k].Runs = columnId == "Runs" ? cellvalue : RunsPerChannelgridData[args.row].Runs;
                                                        ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData[k].CostingRuns = columnId == "CostingRuns" ? cellvalue : RunsPerChannelgridData[args.row].CostingRuns;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    gridRunsPerChannel.setData(RunsPerChannelgridData);
                    gridRunsPerChannel.invalidateRow([args.row]);
                    gridRunsPerChannel.render();
                });
                gridCatchUpLicenseeAllocation.onCellChange.subscribe(function (e, args) {
                    nochanges = false;
                    cellvalue = CatchUpLicenseeAllocationgridData[args.row][gridCatchUpLicenseeAllocation.getColumns()[args.cell].field];
                    columnId = gridCatchUpLicenseeAllocation.getColumns()[args.cell].id;
                    if (typeof cellvalue == "string") {
                        cellvalue = cellvalue.toUpperCase();
                        CatchUpLicenseeAllocationgridData[args.row][gridCatchUpLicenseeAllocation.getColumns()[args.cell].field] = cellvalue;
                    }
                    if ($("#DMVo_DMNumber").val() != "") {
                        if (CatchUpLicenseeAllocationgridData[args.row].PersistFlag == 3) {
                            CatchUpLicenseeAllocationgridData[args.row].PersistFlag = parseInt("1");
                        }
                    }
                    if (gridCatchUpLicenseeAllocation.getColumns()[args.cell].id == "Licesee") {
                        if (cellvalue != null && cellvalue != "" && cellvalue != "null") {
                            var LicenseeList = GetListobj(getLicenseeListUrl, { "hintLicensee": cellvalue.toUpperCase(), "LeeType": "CATCHUP" });
                            if (LicenseeList != null) {
                                for (var i = 0; i < LicenseeList.length; i++) {
                                    if (cellvalue == LicenseeList[i].ShortName) {
                                        CatchUpLicenseeAllocationgridData[args.row].strAllocation = (CatchUpLicenseeAllocationgridData[args.row].strAllocation == "" || CatchUpLicenseeAllocationgridData[args.row].strAllocation == null || CatchUpLicenseeAllocationgridData[args.row].strAllocation == "null") ? "0.0000" : CatchUpLicenseeAllocationgridData[args.row].strAllocation;
                                    }
                                }
                            }
                        }
                    }
                    if (gridCatchUpLicenseeAllocation.getColumns()[args.cell].id == "EndDate") {
                        var StartDate = CatchUpLicenseeAllocationgridData[args.row].StartDate;
                        if (cellvalue != "" && cellvalue != undefined && cellvalue != "null" && cellvalue != NaN
                        && StartDate != "" && StartDate != undefined && StartDate != "null" && StartDate != NaN) {
                            var IsValid = false;
                            var No_Days = null;
                            var No_Months = null;
                            var ActionParameters = {
                                startDateValue: StartDate,
                                EndDateValue: cellvalue
                            };
                            $.ajax({
                                async: false,
                                url: CalculateLicenseeTimeUrl,
                                type: "POST",
                                dataType: 'Json',
                                data: JSON.stringify(ActionParameters),
                                contentType: "application/json; charset=utf-8",
                                async: false,
                                cache: false,

                                success: function (data) {
                                    if (data.successflag == true) {
                                        No_Days = data.No_Days;
                                        No_Months = data.No_Months;
                                        IsValid = true;
                                    }
                                },
                                error: function () {
                                    showMessage("Some exception occured.Please contact the Administrator.", "error");
                                }
                            });
                            if (IsValid == true) {
                                CatchUpLicenseeAllocationgridData[args.row].No_Months = No_Months;
                                CatchUpLicenseeAllocationgridData[args.row].No_Days = No_Days;
                            }
                            else {
                                CatchUpLicenseeAllocationgridData[args.row].No_Months = null;
                                CatchUpLicenseeAllocationgridData[args.row].No_Days = null;
                                CatchUpLicenseeAllocationgridData[args.row].EndDate = null;
                                showMessage("End Date should be greater than Start Date.", "information");
                            }
                        }
                    }
                    if (gridCatchUpLicenseeAllocation.getColumns()[args.cell].id == "strAllocation") {
                        if (cellvalue != "") {
                            CatchUpLicenseeAllocationgridData[args.row][gridCatchUpLicenseeAllocation.getColumns()[args.cell].field] = parseFloat(cellvalue).toFixed(4);
                        }
                        else {
                            CatchUpLicenseeAllocationgridData[args.row][gridCatchUpLicenseeAllocation.getColumns()[args.cell].field] = parseFloat(0).toFixed(4);
                        }
                    }
                    if (gridCatchUpLicenseeAllocation.getColumns()[args.cell].id == "MaxViewingPeriodDays") {
                        if (CatchUpLicenseeAllocationgridData[args.row][gridCatchUpLicenseeAllocation.getColumns()[args.cell].field] == "" ||
                            CatchUpLicenseeAllocationgridData[args.row][gridCatchUpLicenseeAllocation.getColumns()[args.cell].field] == null ||
                            CatchUpLicenseeAllocationgridData[args.row][gridCatchUpLicenseeAllocation.getColumns()[args.cell].field] == "null") {
                            CatchUpLicenseeAllocationgridData[args.row][gridCatchUpLicenseeAllocation.getColumns()[args.cell].field] = 0;
                        }
                    }
                    if (gridCatchUpLicenseeAllocation.getColumns()[args.cell].id == "MaxViewingPeriod") {
                        if (CatchUpLicenseeAllocationgridData[args.row][gridCatchUpLicenseeAllocation.getColumns()[args.cell].field] == "" ||
                            CatchUpLicenseeAllocationgridData[args.row][gridCatchUpLicenseeAllocation.getColumns()[args.cell].field] == null ||
                            CatchUpLicenseeAllocationgridData[args.row][gridCatchUpLicenseeAllocation.getColumns()[args.cell].field] == "null") {
                            CatchUpLicenseeAllocationgridData[args.row][gridCatchUpLicenseeAllocation.getColumns()[args.cell].field] = 0;
                        }
                    }
                    if (gridCatchUpLicenseeAllocation.getColumns()[args.cell].id == "TBA") {
                        CatchUpLicenseeAllocationgridData[args.row].StartDate = null;
                        CatchUpLicenseeAllocationgridData[args.row].EndDate = null;
                        CatchUpLicenseeAllocationgridData[args.row].No_Months = "";
                        CatchUpLicenseeAllocationgridData[args.row].No_Days = "";
                    }
                    for (var i = 0; i < CatchUpLicenseeAllocationgridData.length; i++) {
                        if (i != args.row) {
                            if (CatchUpLicenseeAllocationgridData[args.row].Licesee != null && CatchUpLicenseeAllocationgridData[args.row].Licesee != "" && CatchUpLicenseeAllocationgridData[args.row].Licesee != "null") {
                                if (CatchUpLicenseeAllocationgridData[args.row].Licesee.toUpperCase() == CatchUpLicenseeAllocationgridData[i].Licesee) {
                                    CatchUpLicenseeAllocationgridData[args.row].Licesee = null;
                                    //showMessage("Licensee already exists for this CatchUpAllocation.", "error");
                                    break;
                                }
                            }
                        }
                    }
                    var selectedPg = gridProgrammeParticulars.getSelectedRows();
                    if (ProgrammeParticulargridData[selectedPg].Id != 0) {
                        if (ProgrammeVOModifiedData != null) {
                            for (var i = 0; i < ProgrammeVOModifiedData.length; i++) {
                                if (ProgrammeVOModifiedData[i].Id == ProgrammeParticulargridData[selectedPg].Id) {
                                    for (var j = 0; j < ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList.length; j++) {
                                        if (ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].Id == CatchUpLicenseeAllocationgridData[args.row].Id) {
                                            ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].PersistFlag = CatchUpLicenseeAllocationgridData[args.row].PersistFlag;
                                            ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].Licesee = columnId == "Licesee" ? cellvalue : CatchUpLicenseeAllocationgridData[args.row].Licesee;
                                            ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].strAllocation = columnId == "strAllocation" ? cellvalue : CatchUpLicenseeAllocationgridData[args.row].strAllocation;
                                            ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].TBA = columnId == "TBA" ? cellvalue : CatchUpLicenseeAllocationgridData[args.row].TBA;
                                            ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].StartDate = columnId == "StartDate" ? cellvalue : CatchUpLicenseeAllocationgridData[args.row].StartDate;
                                            ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].EndDate = columnId == "EndDate" ? cellvalue : CatchUpLicenseeAllocationgridData[args.row].EndDate;
                                            ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].No_Months = columnId == "No_Months" ? cellvalue : CatchUpLicenseeAllocationgridData[args.row].No_Months;
                                            ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].No_Days = columnId == "No_Days" ? cellvalue : CatchUpLicenseeAllocationgridData[args.row].No_Days;
                                            ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].CostedViewingPeriod = columnId == "CostedViewingPeriod" ? cellvalue : CatchUpLicenseeAllocationgridData[args.row].CostedViewingPeriod;
                                            ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MaxViewingPeriodDays = columnId == "MaxViewingPeriodDays" ? cellvalue : CatchUpLicenseeAllocationgridData[args.row].MaxViewingPeriodDays;
                                            ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MaxViewingPeriod = columnId == "MaxViewingPeriod" ? cellvalue : CatchUpLicenseeAllocationgridData[args.row].MaxViewingPeriod;
                                            ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].NonConsecutiveMonth = columnId == "NonConsecutiveMonth" ? cellvalue : CatchUpLicenseeAllocationgridData[args.row].NonConsecutiveMonth;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    gridCatchUpLicenseeAllocation.setData(CatchUpLicenseeAllocationgridData);
                    gridCatchUpLicenseeAllocation.invalidateRow([args.row]);
                    gridCatchUpLicenseeAllocation.render();
                });
                gridPlatformRights.onCellChange.subscribe(function (e, args) {
                    nochanges = false;
                    cellvalue = PlatfromRightsAllocationgridData[args.row][gridPlatformRights.getColumns()[args.cell].field];
                    columnId = gridPlatformRights.getColumns()[args.cell].id;
                    var selectedPg = gridProgrammeParticulars.getSelectedRows();
                    var selectedLc = gridCatchUpLicenseeAllocation.getSelectedRows();
                    if (typeof cellvalue == "string") {
                        cellvalue = cellvalue.toUpperCase();
                        PlatfromRightsAllocationgridData[args.row][gridPlatformRights.getColumns()[args.cell].field] = cellvalue;
                    }
                    if ($("#DMVo_DMNumber").val() != "") {
                        if (PlatfromRightsAllocationgridData[args.row].PersistFlag == 3) {
                            PlatfromRightsAllocationgridData[args.row].PersistFlag = parseInt("1");
                        }
                    }
                    if (gridPlatformRights.getColumns()[args.cell].id == "PlatformCode") {
                        if (cellvalue != null && cellvalue != "" && cellvalue != "null") {
                            var allocationId = CatchUpLicenseeAllocationgridData[selectedLc].Id;
                            var PlatformRightsList = GetListobj(GetPlateFormRightsListUrl, { "DMNumber": $("#DMVo_DMNumber").val(), "AllocationId": allocationId });
                            if (PlatformRightsList != null) {
                                for (var i = 0; i < PlatformRightsList.length; i++) {
                                    if (cellvalue == PlatformRightsList[i].PlatformCode) {
                                        PlatfromRightsAllocationgridData[args.row].IsSelected = true;
                                    }
                                }
                            }
                        }
                    }
                    for (var i = 0; i < PlatfromRightsAllocationgridData.length; i++) {
                        if (i != args.row) {
                            if (PlatfromRightsAllocationgridData[args.row].PlatformCode != null && PlatfromRightsAllocationgridData[args.row].PlatformCode != "" && PlatfromRightsAllocationgridData[args.row].PlatformCode != "null") {
                                if (PlatfromRightsAllocationgridData[args.row].PlatformCode.toUpperCase() == PlatfromRightsAllocationgridData[i].PlatformCode) {
                                    PlatfromRightsAllocationgridData[args.row].PlatformCode = null;
                                    showMessage("Platform already exists.", "error");
                                    break;
                                }
                            }
                        }
                    }
                    if (ProgrammeParticulargridData[selectedPg].Id != 0) {
                        if (ProgrammeVOModifiedData != null) {
                            for (var i = 0; i < ProgrammeVOModifiedData.length; i++) {
                                if (ProgrammeVOModifiedData[i].Id == ProgrammeParticulargridData[selectedPg].Id) {
                                    for (var j = 0; j < ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList.length; j++) {
                                        if (ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].Id == CatchUpLicenseeAllocationgridData[selectedLc].Id) {
                                            if (ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList != null) {
                                                for (var k = 0; k < ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList.length; k++) {
                                                    if (ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].Id == PlatfromRightsAllocationgridData[args.row].Id &&
                                                        ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].MapId == PlatfromRightsAllocationgridData[args.row].MapId) {
                                                        ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].PersistFlag = PlatfromRightsAllocationgridData[args.row].PersistFlag;
                                                        ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].PlatformCode = columnId == "PlatformCode" ? cellvalue : PlatfromRightsAllocationgridData[args.row].PlatformCode;
                                                        ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].IsSelected = columnId == "IsSelected" ? cellvalue : PlatfromRightsAllocationgridData[args.row].IsSelected;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    gridPlatformRights.setData(PlatfromRightsAllocationgridData);
                    gridPlatformRights.invalidateRow([args.row]);
                    gridPlatformRights.render();
                });

                gridProgrammeParticulars.onValidationError.subscribe(function (e, args) {

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
                gridLicenseeAllocation.onValidationError.subscribe(function (e, args) {

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
                gridRunsPerChannel.onValidationError.subscribe(function (e, args) {

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
                gridCatchUpLicenseeAllocation.onValidationError.subscribe(function (e, args) {

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
                gridPlatformRights.onValidationError.subscribe(function (e, args) {

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

                gridProgrammeParticulars.onKeyDown.subscribe(function (e, args) {
                    // alert("main function gridProgrammeParticulars onKeyDown called");
                    var GridData = gridProgrammeParticulars.getData();
                    if (GridData != "") {
                        nochanges = false;
                        var cell = gridProgrammeParticulars.getCellFromEvent(e);
                        if (e.shiftKey && e.keyCode == 117) {
                            //  alert("shift+f6 has been called");
                            if (ProgrammeParticulargridData[args.row].PersistFlag == 0) {
                                ProgrammeParticulargridData.splice([args.row], 1);
                                if (ProgrammeParticulargridData.length > 0) {
                                    gridProgrammeParticulars.invalidate();
                                    gridProgrammeParticulars.render();
                                    if (gridProgrammeParticulars.getSelectedRows() == undefined) {
                                        gridProgrammeParticulars.setSelectedRows([(ProgrammeParticulargridData.length - 1), 0]);
                                    }
                                    ShowProgrammeParticularDetails((ProgrammeParticulargridData.length - 1));
                                }
                                else {
                                    gridProgrammeParticulars.setData(ProgrammeParticulargridEmptyRow);
                                    gridProgrammeParticulars.render();
                                    SetEmptyGridProperty(gridProgrammeParticulars, gridProgrammeParticularId);
                                    SetNewProgrammeDetails();
                                }
                            }
                            else {
                                for (var i = 0; i < ProgrammeVOModifiedData.length; i++) {
                                    if (ProgrammeVOModifiedData[i].Id == ProgrammeParticulargridData[args.row].Id) {
                                        ProgrammeVOModifiedData[i].PersistFlag = 2;
                                    }
                                }
                                ProgrammeParticulargridData.splice([args.row], 1);
                                if (ProgrammeParticulargridData.length > 0) {
                                    gridProgrammeParticulars.invalidate();
                                    gridProgrammeParticulars.render();
                                    if (gridProgrammeParticulars.getSelectedRows() == undefined) {
                                        gridProgrammeParticulars.setSelectedRows([(ProgrammeParticulargridData.length - 1), 0]);
                                    }
                                    ShowProgrammeParticularDetails((ProgrammeParticulargridData.length - 1));
                                }
                                else {
                                    gridProgrammeParticulars.setData(ProgrammeParticulargridEmptyRow);
                                    gridProgrammeParticulars.render();
                                    SetEmptyGridProperty(gridProgrammeParticulars, gridProgrammeParticularId);
                                    SetNewProgrammeDetails();
                                }
                            }
                        }
                        if (e.keyCode == 120) {
                            selrow = cell.row;
                            gitems = ProgrammeParticulargridData[cell.row];
                            selectedrow = ProgrammeParticulargridData[selrow];
                            if (gridProgrammeParticulars.getColumns()[cell.cell].id == "Type") {
                                cellvalue = ProgrammeParticulargridData[args.row][gridProgrammeParticulars.getColumns()[args.cell].field];
                                if (gridProgrammeParticulars.getEditorLock().isActive())
                                    gridProgrammeParticulars.getEditorLock().deactivate(gridProgrammeParticulars.getEditController());
                                LOVTypeShow();
                            }
                            if (gridProgrammeParticulars.getColumns()[cell.cell].id == "Title") {
                                if (gridProgrammeParticulars.getCellEditor() != null) {
                                    var fieldName = gridProgrammeParticulars.getColumns()[gridProgrammeParticulars.getActiveCell().cell].field;
                                    if (gridProgrammeParticulars.getCellEditor().getValue() != null) {
                                        ProgrammeParticulargridData[args.row][gridProgrammeParticulars.getColumns()[args.cell].field] = gridProgrammeParticulars.getCellEditor().getValue().toUpperCase();
                                    }
                                }
                                cellvalue = ProgrammeParticulargridData[args.row][gridProgrammeParticulars.getColumns()[args.cell].field];
                                if (cellvalue == null || cellvalue == "" || cellvalue == "null") {
                                    showMessage("There are many titles, Please give a hint", "information");
                                }
                                else {
                                    $.ajax({
                                        async: false,
                                        url: GetTitleListUrl,
                                        type: "POST",
                                        dataType: 'Json',
                                        data: { "TypeHint": selectedrow.Type.toString(), "TitleHint": cellvalue },
                                        async: false,
                                        cache: false,

                                        success: function (data) {
                                            TitleLookupData = data;
                                            // IsSeries = data.IsSeries;
                                            IsSeries = ProgrammeParticulargridData[args.row].IsSeries == true ? "Y" : "N";
                                            if (TitleLookupData != null) {
                                                if (TitleLookupData.length > 0) {
                                                    if (gridProgrammeParticulars.getEditorLock().isActive())
                                                        gridProgrammeParticulars.getEditorLock().deactivate(gridProgrammeParticulars.getEditController());
                                                    LOVProgrammeTitle(selectedrow.Type.toString(), cellvalue);
                                                    //$(divTitleLOVId).dialog("open");
                                                }
                                                else {
                                                    showMessage("No matching Programme Title exists", "information");
                                                }
                                            }
                                            else {
                                                showMessage("No matching Programme Title exists", "information");
                                            }
                                        },
                                        error: function () {
                                            showMessage("Some exception occured.Please contact the Administrator.", "error");
                                        }
                                    });
                                }
                            }
                            if (gridProgrammeParticulars.getColumns()[cell.cell].id == "EventType") {
                                cellvalue = ProgrammeParticulargridData[args.row][gridProgrammeParticulars.getColumns()[args.cell].field];
                                if (gridProgrammeParticulars.getEditorLock().isActive())
                                    gridProgrammeParticulars.getEditorLock().deactivate(gridProgrammeParticulars.getEditController());
                                LOVEventType();
                            }
                            if (gridProgrammeParticulars.getColumns()[cell.cell].id == "CategoryCode") {
                                cellvalue = ProgrammeParticulargridData[args.row][gridProgrammeParticulars.getColumns()[args.cell].field];
                                if (gridProgrammeParticulars.getEditorLock().isActive())
                                    gridProgrammeParticulars.getEditorLock().deactivate(gridProgrammeParticulars.getEditController());
                                LOVProgramCategory();
                            }
                            if (gridProgrammeParticulars.getColumns()[cell.cell].id == "BOCategory") {
                                cellvalue = ProgrammeParticulargridData[args.row][gridProgrammeParticulars.getColumns()[args.cell].field];
                                if (gridProgrammeParticulars.getEditorLock().isActive())
                                    gridProgrammeParticulars.getEditorLock().deactivate(gridProgrammeParticulars.getEditController());
                                LOVBOCategory();
                            }
                        }
                    }
                    var MemoPrice = null;
                    if (ProgrammeParticulargridData != null && ProgrammeParticulargridData.length > 0) {
                        for (var i = 0; i < ProgrammeParticulargridData.length; i++) {
                            MemoPrice = MemoPrice + parseFloat(ProgrammeParticulargridData[i].strTotalPrice);
                        }
                    }
                    if (MemoPrice != null) {
                        $("#DMVo_MemoPrice").val(MemoPrice.toFixed(4));
                    }
                });

                gridLicenseeAllocation.onKeyDown.subscribe(function (e, args) {
                    //  alert("main function gridLicenseeAllocation onKeyDown called");
                    var GridData = gridLicenseeAllocation.getData();
                    if (GridData != "") {
                        nochanges = false;
                        var cell = gridLicenseeAllocation.getCellFromEvent(e);
                        if (e.shiftKey && e.keyCode == 117) {
                            // alert("shift+f6 has been called");
                            if (LicenseeDetailsgridData[args.row].PersistFlag == 0) {
                                LicenseeDetailsgridData.splice([args.row], 1);
                                if (LicenseeDetailsgridData.length > 0) {
                                    gridLicenseeAllocation.invalidate();
                                    gridLicenseeAllocation.render();
                                    if (gridLicenseeAllocation.getSelectedRows() == undefined) {
                                        gridLicenseeAllocation.setSelectedRows([(LicenseeDetailsgridData.length - 1), 0]);
                                    }
                                    ShowLicenseeAllocationDetails((LicenseeDetailsgridData.length - 1));
                                }
                                else {
                                    gridLicenseeAllocation.setData(LicenseeDetailsgridEmptyRow);
                                    gridLicenseeAllocation.render();
                                    SetEmptyGridProperty(gridLicenseeAllocation, gridLicenseeAllocationId);
                                    gridRunsPerChannel.setData(RunsPerChannelGridEmptyRow);
                                    gridRunsPerChannel.render();
                                    SetEmptyGridProperty(gridRunsPerChannel, gridRunsPerChannelId);
                                }
                            }
                            else {
                                //  LicenseeDetailsgridData[cell.row].PersistFlag = 2;
                                var selectedpg = gridProgrammeParticulars.getSelectedRows();
                                for (var i = 0; i < ProgrammeVOModifiedData.length; i++) {
                                    if (ProgrammeVOModifiedData[i].Id == ProgrammeParticulargridData[selectedpg].Id) {
                                        if (ProgrammeVOModifiedData[i].LicenseeAllocationData != null) {
                                            for (var j = 0; j < ProgrammeVOModifiedData[i].LicenseeAllocationData.length; j++) {
                                                if (ProgrammeVOModifiedData[i].LicenseeAllocationData[j].Id == LicenseeDetailsgridData[args.row].Id) {
                                                    ProgrammeVOModifiedData[i].LicenseeAllocationData[j].PersistFlag = 2;
                                                }
                                            }
                                        }
                                    }
                                }
                                LicenseeDetailsgridData.splice([args.row], 1);
                                if (LicenseeDetailsgridData.length > 0) {
                                    gridLicenseeAllocation.invalidate();
                                    gridLicenseeAllocation.render();
                                    if (gridLicenseeAllocation.getSelectedRows() == undefined) {
                                        gridLicenseeAllocation.setSelectedRows([(LicenseeDetailsgridData.length - 1), 0]);
                                    }
                                    ShowLicenseeAllocationDetails((LicenseeDetailsgridData.length - 1));
                                }
                                else {
                                    gridLicenseeAllocation.setData(LicenseeDetailsgridEmptyRow);
                                    gridLicenseeAllocation.render();
                                    SetEmptyGridProperty(gridLicenseeAllocation, gridLicenseeAllocationId);
                                    gridRunsPerChannel.setData(RunsPerChannelGridEmptyRow);
                                    gridRunsPerChannel.render();
                                    SetEmptyGridProperty(gridRunsPerChannel, gridRunsPerChannelId);
                                }
                            }
                        }
                        if (e.keyCode == 120) {
                            selrow = cell.row;
                            gitems = LicenseeDetailsgridData[cell.row];
                            selectedrow = LicenseeDetailsgridData[selrow];
                            if (gridLicenseeAllocation.getColumns()[cell.cell].id == "Licesee") {
                                if (gridLicenseeAllocation.getCellEditor() != null) {
                                    var fieldName = gridLicenseeAllocation.getColumns()[gridLicenseeAllocation.getActiveCell().cell].field;
                                    if (gridLicenseeAllocation.getCellEditor().getValue() != null) {
                                        LicenseeDetailsgridData[args.row][gridLicenseeAllocation.getColumns()[args.cell].field] = gridLicenseeAllocation.getCellEditor().getValue().toUpperCase();
                                    }
                                }
                                cellvalue = LicenseeDetailsgridData[args.row][gridLicenseeAllocation.getColumns()[args.cell].field];
                                LicenseeType = "LINEAR";
                                if (gridLicenseeAllocation.getEditorLock().isActive())
                                    gridLicenseeAllocation.getEditorLock().deactivate(gridLicenseeAllocation.getEditController());
                                LOVLicensee(LicenseeType, cellvalue);
                                // $(divLicenseeLOVId).dialog("open");
                            }
                            if (gridLicenseeAllocation.getColumns()[cell.cell].id == "ChannelService") {
                                cellvalue = LicenseeDetailsgridData[args.row][gridLicenseeAllocation.getColumns()[args.cell].field];
                                if (gridLicenseeAllocation.getEditorLock().isActive())
                                    gridLicenseeAllocation.getEditorLock().deactivate(gridLicenseeAllocation.getEditController());
                                LOVChannelService();
                                // $(divChannelServiceLOVId).dialog("open");
                            }
                        }
                    }
                });

                gridRunsPerChannel.onKeyDown.subscribe(function (e, args) {
                    //   alert("main function gridRunsPerChannel onkeydown called");
                    var GridData = gridRunsPerChannel.getData();
                    if (GridData != "") {
                        nochanges = false;
                        var cell = gridRunsPerChannel.getCellFromEvent(e);
                        if (e.shiftKey && e.keyCode == 117) {
                            //  alert("shift+f6 has been called");
                            if (RunsPerChannelgridData[cell.row].PersistFlag == 0) {
                                RunsPerChannelgridData.splice([cell.row], 1);
                                if (RunsPerChannelgridData.length > 0) {
                                    gridRunsPerChannel.invalidate();
                                    gridRunsPerChannel.render();
                                    if (gridRunsPerChannel.getSelectedRows() == undefined) {
                                        gridRunsPerChannel.setSelectedRows([(RunsPerChannelgridData.length - 1), 0]);
                                    }
                                    SetNewRunsPerChannelDetails((RunsPerChannelgridData.length - 1));
                                }
                                else {
                                    gridRunsPerChannel.setData(RunsPerChannelGridEmptyRow);
                                    gridRunsPerChannel.render();
                                    SetEmptyGridProperty(gridRunsPerChannel, gridRunsPerChannelId);
                                }
                            }
                            else {
                                //  RunsPerChannelgridData[cell.row].PersistFlag = 2;
                                var selectedpg = gridProgrammeParticulars.getSelectedRows();
                                var selectedLc = gridLicenseeAllocation.getSelectedRows();
                                for (var i = 0; i < ProgrammeVOModifiedData.length; i++) {
                                    if (ProgrammeVOModifiedData[i].Id == ProgrammeParticulargridData[selectedpg].Id) {
                                        if (ProgrammeVOModifiedData[i].LicenseeAllocationData != null) {
                                            for (var j = 0; j < ProgrammeVOModifiedData[i].LicenseeAllocationData.length; j++) {
                                                if (ProgrammeVOModifiedData[i].LicenseeAllocationData[j].Id == LicenseeDetailsgridData[selectedLc].Id) {
                                                    if (ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData != null) {
                                                        for (var k = 0; k < ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData.length; k++) {
                                                            if (ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData[k].Id == RunsPerChannelgridData[cell.row].Id) {
                                                                ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData[k].PersistFlag = 2;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                RunsPerChannelgridData.splice([cell.row], 1);
                                if (RunsPerChannelgridData.length > 0) {
                                    gridRunsPerChannel.invalidate();
                                    gridRunsPerChannel.render();
                                    if (gridRunsPerChannel.getSelectedRows() == undefined) {
                                        gridRunsPerChannel.setSelectedRows([(RunsPerChannelgridData.length - 1), 0]);
                                    }
                                    SetNewRunsPerChannelDetails((RunsPerChannelgridData.length - 1));
                                }
                                else {
                                    gridRunsPerChannel.setData(RunsPerChannelGridEmptyRow);
                                    gridRunsPerChannel.render();
                                    SetEmptyGridProperty(gridRunsPerChannel, gridRunsPerChannelId);
                                }
                            }
                        }
                        if (e.keyCode == 120) {
                            selrow = cell.row;
                            gitems = RunsPerChannelgridData[cell.row];
                            if (gitems != undefined) {
                                selectedrow = RunsPerChannelgridData[selrow];
                                if (gridRunsPerChannel.getColumns()[cell.cell].id == "Channel") {
                                    cellvalue = RunsPerChannelgridData[args.row][gridRunsPerChannel.getColumns()[args.cell].field];
                                    if (gridRunsPerChannel.getEditorLock().isActive())
                                        gridRunsPerChannel.getEditorLock().deactivate(gridRunsPerChannel.getEditController());
                                    LOVChannelList(cellvalue);
                                    //                               $(divChannelListLOVId).dialog("open");
                                }
                            }
                        }
                    }
                });

                gridCatchUpLicenseeAllocation.onKeyDown.subscribe(function (e, args) {
                    //  alert("main function gridCatchUpLicenseeAllocation onkeydown called");
                    var GridData = gridCatchUpLicenseeAllocation.getData();
                    if (GridData != "") {
                        nochanges = false;
                        var cell = gridCatchUpLicenseeAllocation.getCellFromEvent(e);
                        if (e.shiftKey && e.keyCode == 117) {
                            //  alert("shift+f6 has been called");
                            if (CatchUpLicenseeAllocationgridData[args.row].PersistFlag == 0) {
                                CatchUpLicenseeAllocationgridData.splice([args.row], 1);
                                if (CatchUpLicenseeAllocationgridData.length > 0) {
                                    gridCatchUpLicenseeAllocation.invalidate();
                                    gridCatchUpLicenseeAllocation.render();
                                    if (gridCatchUpLicenseeAllocation.getSelectedRows() == undefined) {
                                        gridCatchUpLicenseeAllocation.setSelectedRows([(CatchUpLicenseeAllocationgridData.length - 1), 0]);
                                    }
                                    ShowCatchupLicenseeAllocationDetails((CatchUpLicenseeAllocationgridData.length - 1));
                                }
                                else {
                                    gridCatchUpLicenseeAllocation.setData(CatchUpLicenseeAllocationGridEmptyRow);
                                    gridCatchUpLicenseeAllocation.render();
                                    SetEmptyGridProperty(gridCatchUpLicenseeAllocation, gridCatchUpLicenseeAllocationId);

                                    gridPlatformRights.setData(PlatformRightsGridEmptyRow);
                                    gridPlatformRights.render();
                                    SetEmptyGridProperty(gridPlatformRights, gridPlatformRightsId);
                                }
                            }
                            else {
                                //   CatchUpLicenseeAllocationgridData[cell.row].PersistFlag = 2;
                                var selectedpg = gridProgrammeParticulars.getSelectedRows();
                                for (var i = 0; i < ProgrammeVOModifiedData.length; i++) {
                                    if (ProgrammeVOModifiedData[i].Id == ProgrammeParticulargridData[selectedpg].Id) {
                                        if (ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList != null) {
                                            for (var j = 0; j < ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList.length; j++) {
                                                if (ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].Id == CatchUpLicenseeAllocationgridData[args.row].Id &&
                                                ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MapId == CatchUpLicenseeAllocationgridData[args.row].MapId) {
                                                    ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].PersistFlag = 2;
                                                }
                                            }
                                        }
                                    }
                                }
                                CatchUpLicenseeAllocationgridData.splice([args.row], 1);
                                if (CatchUpLicenseeAllocationgridData.length > 0) {
                                    gridCatchUpLicenseeAllocation.invalidate();
                                    gridCatchUpLicenseeAllocation.render();
                                    if (gridCatchUpLicenseeAllocation.getSelectedRows() == undefined) {
                                        gridCatchUpLicenseeAllocation.setSelectedRows([(CatchUpLicenseeAllocationgridData.length - 1), 0]);
                                    }
                                    ShowCatchupLicenseeAllocationDetails((LicenseeDetailsgridData.length - 1));
                                }
                                else {
                                    gridCatchUpLicenseeAllocation.setData(CatchUpLicenseeAllocationGridEmptyRow);
                                    gridCatchUpLicenseeAllocation.render();
                                    SetEmptyGridProperty(gridCatchUpLicenseeAllocation, gridCatchUpLicenseeAllocationId);

                                    gridPlatformRights.setData(PlatformRightsGridEmptyRow);
                                    gridPlatformRights.render();
                                    SetEmptyGridProperty(gridPlatformRights, gridPlatformRightsId);
                                }
                            }
                        }
                        if (e.keyCode == 120) {
                            selrow = cell.row;
                            gitems = CatchUpLicenseeAllocationgridData[cell.row];
                            selectedrow = CatchUpLicenseeAllocationgridData[selrow];
                            if (gridCatchUpLicenseeAllocation.getColumns()[cell.cell].id == "Licesee") {
                                if (gridCatchUpLicenseeAllocation.getCellEditor() != null) {
                                    var fieldName = gridCatchUpLicenseeAllocation.getColumns()[gridCatchUpLicenseeAllocation.getActiveCell().cell].field;
                                    if (gridCatchUpLicenseeAllocation.getCellEditor().getValue() != null) {
                                        CatchUpLicenseeAllocationgridData[args.row][gridCatchUpLicenseeAllocation.getColumns()[args.cell].field] = gridCatchUpLicenseeAllocation.getCellEditor().getValue().toUpperCase();
                                    }
                                }
                                cellvalue = CatchUpLicenseeAllocationgridData[args.row][gridCatchUpLicenseeAllocation.getColumns()[args.cell].field];
                                if (gridCatchUpLicenseeAllocation.getEditorLock().isActive())
                                    gridCatchUpLicenseeAllocation.getEditorLock().deactivate(gridCatchUpLicenseeAllocation.getEditController());
                                LicenseeType = "CATCHUP";
                                LOVLicensee(LicenseeType, cellvalue);
                                // $(divLicenseeLOVId).dialog("open");
                            }
                        }
                    }
                });

                gridPlatformRights.onKeyDown.subscribe(function (e, args) {
                    //  alert("main function gridPlatformRights onkeydown called");
                    var GridData = gridPlatformRights.getData();
                    if (GridData != "") {
                        nochanges = false;
                        var cell = gridPlatformRights.getCellFromEvent(e);
                        if (e.shiftKey && e.keyCode == 117) {
                            //  alert("shift+f6 has been called");
                            if (PlatfromRightsAllocationgridData[args.row].PersistFlag == 0) {
                                PlatfromRightsAllocationgridData.splice([args.row], 1);
                                if (PlatfromRightsAllocationgridData.length > 0) {
                                    gridPlatformRights.invalidate();
                                    gridPlatformRights.render();
                                    if (gridPlatformRights.getSelectedRows() == undefined) {
                                        gridPlatformRights.setSelectedRows([(PlatfromRightsAllocationgridData.length - 1), 0]);
                                    }
                                    SetNewMediaPlatformDetails((PlatfromRightsAllocationgridData.length - 1));
                                }
                                else {
                                    gridPlatformRights.setData(PlatformRightsGridEmptyRow);
                                    gridPlatformRights.render();
                                    SetEmptyGridProperty(gridPlatformRights, gridPlatformRightsId);
                                }
                            }
                            else {
                                //   PlatfromRightsAllocationgridData[cell.row].PersistFlag = 2;
                                var selectedpg = gridProgrammeParticulars.getSelectedRows();
                                var SelectedLc = gridCatchUpLicenseeAllocation.getSelectedRows();
                                for (var i = 0; i < ProgrammeVOModifiedData.length; i++) {
                                    if (ProgrammeVOModifiedData[i].Id == ProgrammeParticulargridData[selectedpg].Id) {
                                        if (ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList != null) {
                                            for (var j = 0; j < ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList.length; j++) {
                                                if (ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].Id == CatchUpLicenseeAllocationgridData[SelectedLc].Id) {
                                                    if (ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList != null) {
                                                        for (var k = 0; k < ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList.length; k++) {
                                                            if (ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].Id == PlatfromRightsAllocationgridData[args.row].Id) {
                                                                ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].PersistFlag = 2;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                PlatfromRightsAllocationgridData.splice([args.row], 1);
                                if (PlatfromRightsAllocationgridData.length > 0) {
                                    gridPlatformRights.invalidate();
                                    gridPlatformRights.render();
                                    if (gridPlatformRights.getSelectedRows() == undefined) {
                                        gridPlatformRights.setSelectedRows([(PlatfromRightsAllocationgridData.length - 1), 0]);
                                    }
                                    SetNewMediaPlatformDetails((PlatfromRightsAllocationgridData.length - 1));
                                }
                                else {
                                    gridPlatformRights.setData(PlatformRightsGridEmptyRow);
                                    gridPlatformRights.render();
                                    SetEmptyGridProperty(gridPlatformRights, gridPlatformRightsId);
                                }
                            }
                        }
                        if (e.keyCode == 120) {
                            selrow = cell.row;
                            gitems = PlatfromRightsAllocationgridData[cell.row];
                            selectedrow = PlatfromRightsAllocationgridData[selrow];
                            if (gridPlatformRights.getColumns()[cell.cell].id == "PlatformCode") {
                                cellvalue = PlatfromRightsAllocationgridData[args.row][gridPlatformRights.getColumns()[args.cell].field];
                                if (gridPlatformRights.getEditorLock().isActive())
                                    gridPlatformRights.getEditorLock().deactivate(gridPlatformRights.getEditController());
                                LOVPlatformRights();
                                // $(divPlateformRightsId).dialog("open");
                            }
                        }
                    }
                });

            },
            error: function () {
                RemoveProgressBar();
                showMessage("Some exception occured.Please contact the Administrator.", "error");
            }
        }); //end of ajax call

        function LOVTypeShow() {
            var columns = [
                                  { id: "CodeValue", name: "CodeValue", field: "CodeValue" },
                                  { id: "CodeDescription", name: "CodeDescription", field: "CodeDescription" }
                              ];

            var actionParameters = null;
            var title = "Programme Type";
            var listName = null;
            var idfield = "CodeValue";
            ShowDealMemoLookup(GetTypeShowLOVListUrl, actionParameters, columns, "ProgrammeTypeColumn", idfield, title, listName);
        };

        function LOVProgrammeTitle(Type, Cellvalue) {
            if (IsSeries == "N") {
                var columns = [
                                  { id: "WT_Text", name: "Title", field: "WT_Text" },
                                  { id: "DMProgrammme_Type", name: "Type", field: "DMProgrammme_Type" },
                                  { id: "Production_Year", name: "Prod. Year", field: "Production_Year" },
                                  { id: "DMGenRefNo", name: "Ref No", field: "DMGenRefNo" }
                              ];
                var actionParameters = { "TypeHint": Type, "TitleHint": cellvalue };
                var title = "Matching Titles";
                var listName = null;
                var idfield = "WT_Text";
                ShowDealMemoLookup(GetTitleListUrl, actionParameters, columns, "ProgrammeTitleColumn", idfield, title, listName);
            }
            else {
                var columns = [
                                  { id: "Title", name: "Series Titles", field: "Title" }
                              ];
                var actionParameters = { "TypeHint": Type, "TitleHint": cellvalue };
                var title = "Matching Titles";
                var listName = null;
                var idfield = "Title";
                ShowDealMemoLookup(GetTitleListUrl, actionParameters, columns, "ProgrammeTitleColumn", idfield, title, listName);
            }
        }

        function LOVEventType() {
            var columns = [
                                  { id: "CodeValue", name: "CodeValue", field: "CodeValue" },
                                  { id: "CodeDescription", name: "CodeDescription", field: "CodeDescription" }
                              ];
            var actionParameters = null;
            var title = "Event Type";
            var listName = null;
            var idfield = "CodeValue";
            ShowDealMemoLookup(GetEventTypeLOVListUrl, actionParameters, columns, "ProgrammeEventTypeColumn", idfield, title, listName);
        };

        function LOVProgramCategory() {
            var columns = [
                                  { id: "ProgrammeCategoryCode", name: "Programme Category Code", field: "ProgrammeCategoryCode" },
                                  { id: "ProgrammeCategoryDescription", name: "Programme Category Description", field: "ProgrammeCategoryDescription" }
                              ];
            var actionParameters = null;
            var title = "Program Category";
            var listName = null;
            var idfield = "ProgrammeCategoryCode";
            ShowDealMemoLookup(GetProgramCategoryLOVListUrl, actionParameters, columns, "ProgramCategoryColumn", idfield, title, listName);
        };

        function LOVBOCategory() {
            var columns = [
                                  { id: "BOCategoryCode", name: "BO Category Code", field: "BOCategoryCode" },
                                  { id: "BOCategoryDescription", name: "BO Category Description", field: "BOCategoryDescription" }
                              ];
            var actionParameters = null;
            var title = "BO Category";
            var listName = null;
            var idfield = "BOCategoryCode";
            ShowDealMemoLookup(GetBOCategoryLOVListUrl, actionParameters, columns, "ProgramBOCategoryColumn", idfield, title, listName);
        };

        function LOVLicensee(LicenseeType, cellvalue) {
            var columns = [
                                  { id: "ShortName", name: "ShortName", field: "ShortName" },
                                  { id: "Name", name: "Name", field: "Name" }
                              ];
            if (LicenseeType == "LINEAR") {
                var actionParameters = { "hintLicensee": cellvalue, "LeeType": LicenseeType.toString() };
                var title = "Licensees";
                var listName = null;
                var idfield = "ShortName";
                ShowDealMemoLookup(getLicenseeListUrl, actionParameters, columns, "ProgramLinearLicenseeColumn", idfield, title, listName);
            }
            if (LicenseeType == "CATCHUP") {
                var actionParameters = { "hintLicensee": cellvalue, "LeeType": LicenseeType.toString() };
                var title = "Licensees";
                var listName = null;
                var idfield = "ShortName";
                ShowDealMemoLookup(getLicenseeListUrl, actionParameters, columns, "ProgramCatchUpLicenseeColumn", idfield, title, listName);
            }
        };

        function LOVChannelService() {
            var columns = [
                                  { id: "ChannelServiceCode", name: "Short Name", field: "ChannelServiceCode" },
                                  { id: "ChannelorService", name: "Type", field: "ChannelorService" },
                                  { id: "ChannelServiceName", name: "Name", field: "ChannelServiceName" }
                         ];

            var actionParameters = null;
            var title = "Channels & Services";
            var listName = null;
            var idfield = "ChannelServiceCode";
            ShowDealMemoLookup(getChannelServiceListUrl, actionParameters, columns, "ProgramChannelServiceColumn", idfield, title, listName);

        };

        function LOVChannelList(cellvalue) {
            var selectedRow = gridLicenseeAllocation.getSelectedRows();
            var columns = [
                                  { id: "ChannelID", name: "Channel ID", field: "ChannelID" },
                                  { id: "ChannelName", name: "Channel Name", field: "ChannelName" }
                              ];
            var actionParameters = { "ChannelService": LicenseeDetailsgridData[selectedRow].ChannelService.toString(), "hintChannel": cellvalue, "Type": $("#TypeComboSelection").val() };
            var title = "Channels";
            var listName = null;
            var idfield = "ChannelID";
            ShowDealMemoLookup(getChannelListUrl, actionParameters, columns, "ProgramChannelListColumn", idfield, title, listName);
        };

        function LOVPlatformRights() {
            var SelectedCatchUpLicensee = gridCatchUpLicenseeAllocation.getSelectedRows();
            var allocationId = CatchUpLicenseeAllocationgridData[SelectedCatchUpLicensee].Id;
            var columns = [
                                  { id: "ServiceCode", name: "Media Service Code", field: "ServiceCode" },
                                  { id: "PlatformCode", name: "Media Platform Code", field: "PlatformCode" }
                              ];
            var actionParameters = { "DMNumber": $("#DMVo_DMNumber").val(), "AllocationId": allocationId };
            var title = "Catch-Up Platforms";
            var listName = null;
            var idfield = "PlatformCode";
            ShowDealMemoLookup(GetPlateFormRightsListUrl, actionParameters, columns, "ProgramPlateformRightsColumn", idfield, title, listName);
        };

    });

    function SetProgramTitleDetails(ActiveRow, cellvalue) {
        var errorMsg = null;
        $.ajax({
            async: false,
            url: GetTitleListUrl,
            type: "POST",
            dataType: 'Json',
            data: { "TypeHint": ProgrammeParticulargridData[ActiveRow].Type, "TitleHint": cellvalue },
            async: false,
            cache: false,

            success: function (data) {
                var TitleData = data;
                var IsSeriesTitle = ProgrammeParticulargridData[ActiveRow].IsSeries == true ? "Y" : "N";
                if (TitleData != null) {
                    if (TitleData.length > 0) {
                        if (cellvalue == (IsSeriesTitle == "N" ? TitleData[0].WT_Text : TitleData[0].Title)) {
                            if ((IsSeriesTitle == "N" ? TitleData[0].DMGenRefNo : TitleData[0].Id) == -1) {
                                showMessage("Ambiguous programme name.Press List for lookup", "information");
                            }
                            else {
                                ProgrammeParticulargridData[ActiveRow].Title = ProgrammeParticulargridData[args.row].Title.toUpperCase();
                                ProgrammeParticulargridData[ActiveRow].RefNo = IsSeriesTitle == "N" ? TitleData[0].DMGenRefNo : TitleData[0].Id;
                                ProgrammeParticulargridData[ActiveRow].ReleaseYear = TitleData[0].Production_Year;
                                ProgrammeParticulargridData[ActiveRow].CategoryCode = TitleData[0].CategoryCode;
                                ProgrammeParticulargridData[ActiveRow].BOCategory = TitleData[0].BOCategory;
                                ProgrammeParticulargridData[ActiveRow].BORevenueUSD = TitleData[0].BORevenueUSD;
                                ProgrammeParticulargridData[ActiveRow].BORevenueZAR = TitleData[0].BORevenueZAR;
                                ProgrammeParticulargridData[ActiveRow].SportType_Genre = IsSeriesTitle == "N" ? TitleData[0].SportType_Genre : "-";
                                ProgrammeParticulargridData[ActiveRow].SubGenre = IsSeriesTitle == "N" ? TitleData[0].Genre : "-";
                                ProgrammeParticulargridData[ActiveRow].TertiaryGenre = IsSeriesTitle == "N" ? TitleData[0].TertiaryGenre : "-";
                                ProgrammeParticulargridData[ActiveRow].EventType = IsSeriesTitle == "N" ? TitleData[0].Event_Type : "-";
                                ProgrammeParticulargridData[ActiveRow].Duration = IsSeriesTitle == "N" ? TitleData[0].Duration : "0000:00:00";

                                gridProgrammeParticulars.setData(ProgrammeParticulargridData);
                                gridProgrammeParticulars.render();
                                errorMsg = "Title Accepted.";
                            }
                        }
                    }
                }
                if (errorMsg == null || errorMsg == "" || errorMsg == "null") {
                    if (cellvalue.indexOf("%") == -1) {
                        if (IsSeriesTitle == "Y") {
                            $.noty.closeAll();
                            noty({
                                text: 'This series does not exist. Would you like to add it',
                                modal: true,
                                type: 'alert',
                                title: 'Series does not exist',
                                buttons: [
                                                            { addClass: 'inputButton', text: 'Yes', onClick: function ($noty) {
                                                                ProgrammeParticulargridData[ActiveRow].Title = cellvalue;
                                                                ProgrammeParticulargridData[ActiveRow].RefNo = 0;
                                                                ProgrammeParticulargridData[ActiveRow].SportType_Genre = "-";
                                                                ProgrammeParticulargridData[ActiveRow].SubGenre = "-";
                                                                ProgrammeParticulargridData[ActiveRow].TertiaryGenre = "-";
                                                                ProgrammeParticulargridData[ActiveRow].EventType = "-";
                                                                ProgrammeParticulargridData[ActiveRow].Duration = "0000:00:00";

                                                                gridProgrammeParticulars.setData(ProgrammeParticulargridData);
                                                                gridProgrammeParticulars.render();
                                                                $noty.close();

                                                            }
                                                            },
                                                           { addClass: 'inputButton', text: 'No', onClick: function ($noty) {
                                                               ProgrammeParticulargridData[ActiveRow].Title = null;
                                                               ProgrammeParticulargridData[ActiveRow].RefNo = 0;
                                                               ProgrammeParticulargridData[ActiveRow].SportType_Genre = "-";
                                                               ProgrammeParticulargridData[ActiveRow].SubGenre = "-";
                                                               ProgrammeParticulargridData[ActiveRow].TertiaryGenre = "-";
                                                               ProgrammeParticulargridData[ActiveRow].EventType = "-";
                                                               ProgrammeParticulargridData[ActiveRow].Duration = "0000:00:00";

                                                               gridProgrammeParticulars.setData(ProgrammeParticulargridData);
                                                               gridProgrammeParticulars.render();
                                                               $noty.close();
                                                           }
                                                           }
                                                         ]
                            });
                        }
                        if (IsSeriesTitle == "N") {
                            $.noty.closeAll();
                            noty({
                                text: 'There are no programmes that match this hint. Would you like the system to create a programme of this title right now, using a set of default values?(Can be edited later using Programme Maintenance)',
                                modal: true,
                                type: 'alert',
                                buttons: [
                                                            { addClass: 'inputButton', text: 'Yes', onClick: function ($noty) {
                                                                ProgrammeParticulargridData[ActiveRow].Title = cellvalue;
                                                                ProgrammeParticulargridData[ActiveRow].RefNo = 0;
                                                                ProgrammeParticulargridData[ActiveRow].SportType_Genre = "-";
                                                                ProgrammeParticulargridData[ActiveRow].SubGenre = "-";
                                                                ProgrammeParticulargridData[ActiveRow].TertiaryGenre = "-";
                                                                ProgrammeParticulargridData[ActiveRow].EventType = "-";
                                                                ProgrammeParticulargridData[ActiveRow].Duration = "0000:00:00";

                                                                gridProgrammeParticulars.setData(ProgrammeParticulargridData);
                                                                gridProgrammeParticulars.render();
                                                                $noty.close();

                                                            }
                                                            },
                                                           { addClass: 'inputButton', text: 'No', onClick: function ($noty) {
                                                               ProgrammeParticulargridData[ActiveRow].Title = null;
                                                               ProgrammeParticulargridData[ActiveRow].RefNo = 0;
                                                               ProgrammeParticulargridData[ActiveRow].SportType_Genre = "-";
                                                               ProgrammeParticulargridData[ActiveRow].SubGenre = "-";
                                                               ProgrammeParticulargridData[ActiveRow].TertiaryGenre = "-";
                                                               ProgrammeParticulargridData[ActiveRow].EventType = "-";
                                                               ProgrammeParticulargridData[ActiveRow].Duration = "0000:00:00";

                                                               gridProgrammeParticulars.setData(ProgrammeParticulargridData);
                                                               gridProgrammeParticulars.render();
                                                               $noty.close();
                                                           }
                                                           }
                                                         ]
                            });
                        }
                    }
                    else {
                        showMessage("Entered titles may not contain the % sign.Use % sign for query purposes onlys", "information");
                    }
                    errorMsg = null;
                }
            },
            error: function () {
                showMessage("Some exception occured.Please contact the Administrator.", "error");
            }
        });
    };

    function SetLookupDataToInvokerProgramParticulars(SelectedRowData, lookupInvokerControl) {

        // Type LOV
        if (lookupInvokerControl == "ProgrammeTypeColumn") {
            if (!gridProgrammeParticulars.getEditorLock().isActive()) {
                gridProgrammeParticulars.getEditorLock().activate(gridProgrammeParticulars.getEditController());
            }
            var selectedRowId = gridProgrammeParticulars.getSelectedRows();
            var selectedrow = ProgrammeParticulargridData[selectedRowId];
            var itemtoupdate = { "Type": SelectedRowData.CodeValue,
                "SeriesTitle": SelectedRowData.Attribute == "Y" ? "" : "NON SERIES",
                "PersistFlag": $("#DMVo_DMNumber").val() != "" ? (selectedrow.PersistFlag == 3 ? parseInt("1") : selectedrow.PersistFlag) : selectedrow.PersistFlag
            };
            $.extend(gitems, itemtoupdate);
            gitems = { "Type": SelectedRowData.CodeValue,
                "Title": selectedrow.Title,
                "RefNo": selectedrow.RefNo,
                "ReleaseYear": selectedrow.ReleaseYear,
                "CategoryCode": selectedrow.CategoryCode,
                "BOCategory": selectedrow.BOCategory,
                "BORevenueUSD": selectedrow.BORevenueUSD,
                "BORevenueZAR": selectedrow.BORevenueZAR,
                "SportType_Genre": selectedrow.SportType_Genre,
                "SubGenre": selectedrow.SubGenre,
                "TertiaryGenre": selectedrow.TertiaryGenre,
                "EventType": selectedrow.EventType,
                "Duration": selectedrow.Duration,
                "TotalPrice": selectedrow.TotalPrice,
                "SeriesTitle": SelectedRowData.Attribute == "Y" ? "" : "NON SERIES",
                "PersistFlag": $("#DMVo_DMNumber").val() != "" ? (selectedrow.PersistFlag == 3 ? parseInt("1") : selectedrow.PersistFlag) : selectedrow.PersistFlag
            };
            selectedrow.IsSeries = SelectedRowData.Attribute == "Y" ? true : false;
            if (!gridProgrammeParticulars.getEditorLock().isActive()) {
                gridProgrammeParticulars.getEditorLock().activate(gridProgrammeParticulars.getEditController());
            }
            gridProgrammeParticulars.setData(ProgrammeParticulargridData);
            gridProgrammeParticulars.render();
            gridProgrammeParticulars.focus();
            gridProgrammeParticulars.setOptions({ editable: true });
            ShowProgrammeParticularDetails(selectedRowId[0]);
            if (selectedrow.Id != 0) {
                if (ProgrammeVOModifiedData != null) {
                    for (var i = 0; i < ProgrammeVOModifiedData.length; i++) {
                        if (ProgrammeVOModifiedData[i].Id == selectedrow.Id) {
                            ProgrammeVOModifiedData[i].Type = SelectedRowData.CodeValue;
                            ProgrammeVOModifiedData[i].PersistFlag = ProgrammeVOModifiedData[i].PersistFlag == 3 ? parseInt("1") : ProgrammeVOModifiedData[i].PersistFlag;
                        }
                    }
                }
            }
        }
        if (lookupInvokerControl == "ProgrammeTitleColumn") {
            if (!gridProgrammeParticulars.getEditorLock().isActive()) {
                gridProgrammeParticulars.getEditorLock().activate(gridProgrammeParticulars.getEditController());
            }
            var selectedRowId = gridProgrammeParticulars.getSelectedRows();
            var selectedrow = ProgrammeParticulargridData[selectedRowId];
            if (IsSeries == "N") {
                if (SelectedRowData.Duration == "") {
                    SelectedRowData.Duration = "0000:00:00";
                }
            }
            var itemtoupdate = { "Title": IsSeries == "N" ? SelectedRowData.WT_Text : SelectedRowData.Title,
                "RefNo": IsSeries == "N" ? SelectedRowData.DMGenRefNo : SelectedRowData.Id,
                "ReleaseYear": IsSeries == "N" ? SelectedRowData.Production_Year : SelectedRowData.Production_Year,
                "CategoryCode": IsSeries == "N" ? SelectedRowData.CategoryCode : SelectedRowData.CategoryCode,
                "BOCategory": IsSeries == "N" ? SelectedRowData.BOCategory : SelectedRowData.BOCategory,
                "BORevenueUSD": IsSeries == "N" ? SelectedRowData.BORevenueUSD : SelectedRowData.BORevenueUSD,
                "BORevenueZAR": IsSeries == "N" ? SelectedRowData.BORevenueZAR : SelectedRowData.BORevenueZAR,
                "SportType_Genre": IsSeries == "N" ? SelectedRowData.SportType_Genre : "-",
                "SubGenre": IsSeries == "N" ? SelectedRowData.Genre : "-",
                "TertiaryGenre": IsSeries == "N" ? SelectedRowData.TertiaryGenre : "",
                "EventType": IsSeries == "N" ? SelectedRowData.Event_Type : "-",
                "Duration": IsSeries == "N" ? SelectedRowData.Duration : "0000:00:00",
                "PersistFlag": $("#DMVo_DMNumber").val() != "" ? (selectedrow.PersistFlag == 3 ? parseInt("1") : selectedrow.PersistFlag) : selectedrow.PersistFlag
            };
            $.extend(gitems, itemtoupdate);
            gitems = { "Type": selectedrow.Type,
                "Title": IsSeries == "N" ? SelectedRowData.WT_Text : SelectedRowData.Title,
                "RefNo": IsSeries == "N" ? SelectedRowData.DMGenRefNo : SelectedRowData.Id,
                "ReleaseYear": IsSeries == "N" ? SelectedRowData.Production_Year : SelectedRowData.Production_Year,
                "CategoryCode": IsSeries == "N" ? SelectedRowData.CategoryCode : SelectedRowData.CategoryCode,
                "BOCategory": IsSeries == "N" ? SelectedRowData.BOCategory : SelectedRowData.BOCategory,
                "BORevenueUSD": IsSeries == "N" ? SelectedRowData.BORevenueUSD : SelectedRowData.BORevenueUSD,
                "BORevenueZAR": IsSeries == "N" ? SelectedRowData.BORevenueZAR : SelectedRowData.BORevenueZAR,
                "SportType_Genre": IsSeries == "N" ? SelectedRowData.SportType_Genre : "-",
                "SubGenre": IsSeries == "N" ? SelectedRowData.Genre : "-",
                "TertiaryGenre": IsSeries == "N" ? SelectedRowData.TertiaryGenre : "",
                "EventType": IsSeries == "N" ? SelectedRowData.Event_Type : "-",
                "Duration": IsSeries == "N" ? SelectedRowData.Duration : "0000:00:00",
                "TotalPrice": selectedrow.TotalPrice,
                "SeriesTitle": selectedrow.SeriesTitle,
                "PersistFlag": $("#DMVo_DMNumber").val() != "" ? (selectedrow.PersistFlag == 3 ? parseInt("1") : selectedrow.PersistFlag) : selectedrow.PersistFlag
            };
            gridProgrammeParticulars.setData(ProgrammeParticulargridData);
            gridProgrammeParticulars.render();
            gridProgrammeParticulars.setOptions({ editable: true });
        }
        if (lookupInvokerControl == "ProgrammeEventTypeColumn") {
            if (!gridProgrammeParticulars.getEditorLock().isActive()) {
                gridProgrammeParticulars.getEditorLock().activate(gridProgrammeParticulars.getEditController());
            }
            var cdata = gridProgrammeParticulars.getData();
            var selectedRowId = gridProgrammeParticulars.getSelectedRows();
            var selectedrow = ProgrammeParticulargridData[selectedRowId];
            var itemtoupdate = { "EventType": SelectedRowData.CodeValue,
                "PersistFlag": $("#DMVo_DMNumber").val() != "" ? (selectedrow.PersistFlag == 3 ? parseInt("1") : selectedrow.PersistFlag) : selectedrow.PersistFlag
            };
            $.extend(gitems, itemtoupdate);
            gitems = { "Type": selectedrow.Type,
                "Title": selectedrow.Title,
                "RefNo": selectedrow.RefNo,
                "ReleaseYear": selectedrow.ReleaseYear,
                "CategoryCode": selectedrow.CategoryCode,
                "BOCategory": selectedrow.BOCategory,
                "BORevenueUSD": selectedrow.BORevenueUSD,
                "BORevenueZAR": selectedrow.BORevenueZAR,
                "SportType_Genre": selectedrow.SportType_Genre,
                "SubGenre": selectedrow.SubGenre,
                "TertiaryGenre": selectedrow.TertiaryGenre,
                "EventType": SelectedRowData.CodeValue,
                "Duration": selectedrow.Duration,
                "TotalPrice": selectedrow.TotalPrice,
                "SeriesTitle": selectedrow.SeriesTitle,
                "PersistFlag": $("#DMVo_DMNumber").val() != "" ? (selectedrow.PersistFlag == 3 ? parseInt("1") : selectedrow.PersistFlag) : selectedrow.PersistFlag
            };
            gridProgrammeParticulars.setData(ProgrammeParticulargridData);
            gridProgrammeParticulars.render();
            gridProgrammeParticulars.setOptions({ editable: true });
            ShowProgrammeParticularDetails(selectedRowId[0]);
            if (selectedrow.Id != 0) {
                if (ProgrammeVOModifiedData != null) {
                    for (var i = 0; i < ProgrammeVOModifiedData.length; i++) {
                        if (ProgrammeVOModifiedData[i].Id == selectedrow.Id) {
                            ProgrammeVOModifiedData[i].EventType = SelectedRowData.CodeValue;
                            ProgrammeVOModifiedData[i].PersistFlag = ProgrammeVOModifiedData[i].PersistFlag == 3 ? parseInt("1") : ProgrammeVOModifiedData[i].PersistFlag;
                        }
                    }
                }
            }
        }
        if (lookupInvokerControl == "ProgramCategoryColumn") {
            if (!gridProgrammeParticulars.getEditorLock().isActive()) {
                gridProgrammeParticulars.getEditorLock().activate(gridProgrammeParticulars.getEditController());
            }
            var selectedRowId = gridProgrammeParticulars.getSelectedRows();
            var selectedrow = ProgrammeParticulargridData[selectedRowId];
            var itemtoupdate = { "CategoryCode": SelectedRowData.ProgrammeCategoryCode,
                "PersistFlag": $("#DMVo_DMNumber").val() != "" ? (selectedrow.PersistFlag == 3 ? parseInt("1") : selectedrow.PersistFlag) : selectedrow.PersistFlag
            };
            $.extend(gitems, itemtoupdate);
            gitems = { "Type": selectedrow.Type,
                "Title": selectedrow.Title,
                "RefNo": selectedrow.RefNo,
                "ReleaseYear": selectedrow.ReleaseYear,
                "CategoryCode": SelectedRowData.ProgrammeCategoryCode,
                "BOCategory": selectedrow.BOCategory,
                "BORevenueUSD": selectedrow.BORevenueUSD,
                "BORevenueZAR": selectedrow.BORevenueZAR,
                "SportType_Genre": selectedrow.SportType_Genre,
                "SubGenre": selectedrow.SubGenre,
                "TertiaryGenre": selectedrow.TertiaryGenre,
                "EventType": selectedrow.EventType,
                "Duration": selectedrow.Duration,
                "TotalPrice": selectedrow.TotalPrice,
                "SeriesTitle": selectedrow.SeriesTitle,
                "PersistFlag": $("#DMVo_DMNumber").val() != "" ? (selectedrow.PersistFlag == 3 ? parseInt("1") : selectedrow.PersistFlag) : selectedrow.PersistFlag
            };
            gridProgrammeParticulars.setData(ProgrammeParticulargridData);
            gridProgrammeParticulars.render();
            gridProgrammeParticulars.setOptions({ editable: true });
            ShowProgrammeParticularDetails(selectedRowId[0]);
            if (selectedrow.Id != 0) {
                if (ProgrammeVOModifiedData != null) {
                    for (var i = 0; i < ProgrammeVOModifiedData.length; i++) {
                        if (ProgrammeVOModifiedData[i].Id == selectedrow.Id) {
                            ProgrammeVOModifiedData[i].CategoryCode = SelectedRowData.ProgrammeCategoryCode;
                            ProgrammeVOModifiedData[i].PersistFlag = ProgrammeVOModifiedData[i].PersistFlag == 3 ? parseInt("1") : ProgrammeVOModifiedData[i].PersistFlag;
                        }
                    }
                }
            }
        }
        if (lookupInvokerControl == "ProgramBOCategoryColumn") {
            if (!gridProgrammeParticulars.getEditorLock().isActive()) {
                gridProgrammeParticulars.getEditorLock().activate(gridProgrammeParticulars.getEditController());
            }
            var selectedRowId = gridProgrammeParticulars.getSelectedRows();
            var selectedrow = ProgrammeParticulargridData[selectedRowId];
            var itemtoupdate = { "BOCategory": SelectedRowData.BOCategoryCode,
                "PersistFlag": $("#DMVo_DMNumber").val() != "" ? (selectedrow.PersistFlag == 3 ? parseInt("1") : selectedrow.PersistFlag) : selectedrow.PersistFlag
            };
            $.extend(gitems, itemtoupdate);
            gitems = { "Type": selectedrow.Type,
                "Title": selectedrow.Title,
                "RefNo": selectedrow.RefNo,
                "ReleaseYear": selectedrow.ReleaseYear,
                "CategoryCode": selectedrow.CategoryCode,
                "BOCategory": SelectedRowData.BOCategoryCode,
                "BORevenueUSD": selectedrow.BORevenueUSD,
                "BORevenueZAR": selectedrow.BORevenueZAR,
                "SportType_Genre": selectedrow.SportType_Genre,
                "SubGenre": selectedrow.SubGenre,
                "TertiaryGenre": selectedrow.TertiaryGenre,
                "EventType": selectedrow.EventType,
                "Duration": selectedrow.Duration,
                "TotalPrice": selectedrow.TotalPrice,
                "SeriesTitle": selectedrow.SeriesTitle,
                "PersistFlag": $("#DMVo_DMNumber").val() != "" ? (selectedrow.PersistFlag == 3 ? parseInt("1") : selectedrow.PersistFlag) : selectedrow.PersistFlag
            };
            gridProgrammeParticulars.setData(ProgrammeParticulargridData);
            gridProgrammeParticulars.render();
            gridProgrammeParticulars.setActiveCell(selectedrow, 5);
            gridProgrammeParticulars.setOptions({ editable: true });
            ShowProgrammeParticularDetails(selectedRowId[0]);
            if (selectedrow.Id != 0) {
                if (ProgrammeVOModifiedData != null) {
                    for (var i = 0; i < ProgrammeVOModifiedData.length; i++) {
                        if (ProgrammeVOModifiedData[i].Id == selectedrow.Id) {
                            ProgrammeVOModifiedData[i].BOCategory = SelectedRowData.BOCategoryCode;
                            ProgrammeVOModifiedData[i].PersistFlag = ProgrammeVOModifiedData[i].PersistFlag == 3 ? parseInt("1") : ProgrammeVOModifiedData[i].PersistFlag;
                        }
                    }
                }
            }
        }
        if (lookupInvokerControl == "ProgramLinearLicenseeColumn") {
            if (!gridLicenseeAllocation.getEditorLock().isActive()) {
                gridLicenseeAllocation.getEditorLock().activate(gridLicenseeAllocation.getEditController());
            }
            var selectedRowId = gridLicenseeAllocation.getSelectedRows();
            var selectedrow = LicenseeDetailsgridData[selectedRowId];
            var itemtoupdate = { "Licesee": SelectedRowData != null ? SelectedRowData.ShortName : null,
                "strAllocation": (selectedrow.strAllocation == "" || selectedrow.strAllocation == null || selectedrow.strAllocation == "null") ? "0.0000" : selectedrow.strAllocation,
                "Cost_Runs": (selectedrow.Cost_Runs == "" || selectedrow.Cost_Runs == null || selectedrow.Cost_Runs == "null") ? parseInt("7") : selectedrow.Cost_Runs,
                "Max_channel_Service": (selectedrow.Max_channel_Service == "" || selectedrow.Max_channel_Service == null || selectedrow.Max_channel_Service == "null") ? parseInt("50") : selectedrow.Max_channel_Service,
                "Max_channel_Number": (selectedrow.Max_channel_Number == "" || selectedrow.Max_channel_Number == null || selectedrow.Max_channel_Number == "null") ? parseInt("15") : selectedrow.Max_channel_Number,
                "PersistFlag": $("#DMVo_DMNumber").val() != "" ? (selectedrow.PersistFlag == 3 ? parseInt("1") : selectedrow.PersistFlag) : selectedrow.PersistFlag
            };
            $.extend(gitems, itemtoupdate);
            gitems = { "Licesee": SelectedRowData != null ? SelectedRowData.ShortName : null,
                "strAllocation": (selectedrow.strAllocation == "" || selectedrow.strAllocation == null || selectedrow.strAllocation == "null") ? "0.0000" : selectedrow.strAllocation,
                "ChannelRuns": selectedrow.ChannelRuns,
                "BlackDays": selectedrow.BlackDays,
                "ChannelService": selectedrow.ChannelService,
                "TBA": selectedrow.TBA,
                "StartDate": selectedrow.StartDate,
                "EndDate": selectedrow.EndDate,
                "No_Months": selectedrow.No_Months,
                "No_Days": selectedrow.No_Days,
                "Cost_Runs": (selectedrow.Cost_Runs == "" || selectedrow.Cost_Runs == null || selectedrow.Cost_Runs == "null") ? parseInt("7") : selectedrow.Cost_Runs,
                "Max_channel_Service": (selectedrow.Max_channel_Service == "" || selectedrow.Max_channel_Service == null || selectedrow.Max_channel_Service == "null") ? parseInt("50") : selectedrow.Max_channel_Service,
                "Max_channel_Number": (selectedrow.Max_channel_Number == "" || selectedrow.Max_channel_Number == null || selectedrow.Max_channel_Number == "null") ? parseInt("15") : selectedrow.Max_channel_Number,
                "PersistFlag": $("#DMVo_DMNumber").val() != "" ? (selectedrow.PersistFlag == 3 ? parseInt("1") : selectedrow.PersistFlag) : selectedrow.PersistFlag
            };
            gridLicenseeAllocation.setData(LicenseeDetailsgridData);
            gridLicenseeAllocation.render();
            gridLicenseeAllocation.setOptions({ editable: true });
            var selectedpg = gridProgrammeParticulars.getSelectedRows();
            for (var i = 0; i < ProgrammeVOModifiedData.length; i++) {
                if (ProgrammeVOModifiedData[i].Id == ProgrammeParticulargridData[selectedpg].Id) {
                    if (ProgrammeVOModifiedData[i].LicenseeAllocationData != null) {
                        for (var j = 0; j < ProgrammeVOModifiedData[i].LicenseeAllocationData.length; j++) {
                            if (ProgrammeVOModifiedData[i].LicenseeAllocationData[j].Id == selectedrow.Id) {
                                ProgrammeVOModifiedData[i].LicenseeAllocationData[j].Licesee = SelectedRowData.ShortName;
                                ProgrammeVOModifiedData[i].LicenseeAllocationData[j].PersistFlag = ProgrammeVOModifiedData[i].LicenseeAllocationData[j].PersistFlag == 3 ? parseInt("1") : ProgrammeVOModifiedData[i].LicenseeAllocationData[j].PersistFlag; 
                            }
                        }
                    }
                }
            }
        }
        if (lookupInvokerControl == "ProgramCatchUpLicenseeColumn") {
            if (!gridCatchUpLicenseeAllocation.getEditorLock().isActive())
                gridCatchUpLicenseeAllocation.getEditorLock().activate(gridCatchUpLicenseeAllocation.getEditController());
            var selectedRowId = gridCatchUpLicenseeAllocation.getSelectedRows();
            var selectedrow = CatchUpLicenseeAllocationgridData[selectedRowId];
            var itemtoupdate = { "Licesee": SelectedRowData.ShortName,
                "strAllocation": (selectedrow.strAllocation == "" || selectedrow.strAllocation == null || selectedrow.strAllocation == "null") ? "0.0000" : selectedrow.strAllocation,
                "PersistFlag": $("#DMVo_DMNumber").val() != "" ? (selectedrow.PersistFlag == 3 ? parseInt("1") : selectedrow.PersistFlag) : selectedrow.PersistFlag
            };
            $.extend(gitems, itemtoupdate);
            gitems = { "Licesee": SelectedRowData.ShortName,
                "strAllocation": (selectedrow.strAllocation == "" || selectedrow.strAllocation == null || selectedrow.strAllocation == "null") ? "0.0000" : selectedrow.strAllocation,
                "TBA": selectedrow.TBA,
                "StartDate": selectedrow.StartDate,
                "EndDate": selectedrow.EndDate,
                "No_Months": selectedrow.No_Months,
                "No_Days": selectedrow.No_Days,
                "CostedViewingPeriod": selectedrow.CostedViewingPeriod,
                "MaxViewingPeriodDays": selectedrow.MaxViewingPeriodDays,
                "MaxViewingPeriod": selectedrow.MaxViewingPeriod,
                "NonConsecutiveMonth": selectedrow.NonConsecutiveMonth,
                "PersistFlag": $("#DMVo_DMNumber").val() != "" ? (selectedrow.PersistFlag == 3 ? parseInt("1") : selectedrow.PersistFlag) : selectedrow.PersistFlag
            };
            gridCatchUpLicenseeAllocation.setData(CatchUpLicenseeAllocationgridData);
            gridCatchUpLicenseeAllocation.render();
            gridCatchUpLicenseeAllocation.setOptions({ editable: true });
            var selectedpg = gridProgrammeParticulars.getSelectedRows();
            for (var i = 0; i < ProgrammeVOModifiedData.length; i++) {
                if (ProgrammeVOModifiedData[i].Id == ProgrammeParticulargridData[selectedpg].Id) {
                    if (ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList != null) {
                        for (var j = 0; j < ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList.length; j++) {
                            if (ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].Id == selectedrow.Id) {
                                ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].Licesee = SelectedRowData.ShortName;
                                ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].PersistFlag = ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].PersistFlag == 3 ? parseInt("1") : ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].PersistFlag; 
                            }
                        }
                    }
                }
            }

        }
        if (lookupInvokerControl == "ProgramChannelServiceColumn") {
            if (!gridLicenseeAllocation.getEditorLock().isActive()) {
                gridLicenseeAllocation.getEditorLock().activate(gridLicenseeAllocation.getEditController());
            }
            var selectedRowId = gridLicenseeAllocation.getSelectedRows();
            var selectedrow = LicenseeDetailsgridData[selectedRowId];
            var itemtoupdate = { "ChannelService": SelectedRowData.ChannelServiceCode,
                "PersistFlag": $("#DMVo_DMNumber").val() != "" ? (selectedrow.PersistFlag == 3 ? parseInt("1") : selectedrow.PersistFlag) : selectedrow.PersistFlag
            };
            $.extend(gitems, itemtoupdate);
            gitems = { "Licesee": selectedrow.Licesee,
                "strAllocation": selectedrow.strAllocation,
                "ChannelRuns": selectedrow.ChannelRuns,
                "BlackDays": selectedrow.BlackDays,
                "ChannelService": SelectedRowData.ChannelServiceCode,
                "TBA": selectedrow.TBA,
                "StartDate": selectedrow.StartDate,
                "EndDate": selectedrow.EndDate,
                "No_Months": selectedrow.No_Months,
                "No_Days": selectedrow.No_Days,
                "Cost_Runs": selectedrow.Cost_Runs,
                "Max_channel_Service": selectedrow.Max_channel_Service,
                "Max_channel_Number": selectedrow.Max_channel_Number,
                "PersistFlag": $("#DMVo_DMNumber").val() != "" ? (selectedrow.PersistFlag == 3 ? parseInt("1") : selectedrow.PersistFlag) : selectedrow.PersistFlag
            };
            gridLicenseeAllocation.setData(LicenseeDetailsgridData);
            gridLicenseeAllocation.render();
            gridLicenseeAllocation.setOptions({ editable: true });
            for (var i = 0; i < LicenseeDetailsgridData.length; i++) {
                if (i != selectedRowId[0]) {
                    if (LicenseeDetailsgridData[selectedRowId].ChannelService != null && LicenseeDetailsgridData[selectedRowId].ChannelService != "" && LicenseeDetailsgridData[selectedRowId].ChannelService != "null") {
                        if (LicenseeDetailsgridData[selectedRowId].ChannelService.toUpperCase() == LicenseeDetailsgridData[i].ChannelService && LicenseeDetailsgridData[selectedRowId].Licesee == LicenseeDetailsgridData[i].Licesee) {
                            LicenseeDetailsgridData[selectedRowId].ChannelService = null;
                            gridLicenseeAllocation.setData(LicenseeDetailsgridData);
                            gridLicenseeAllocation.render();
                            gridLicenseeAllocation.setOptions({ editable: true });
                            showMessage("Allocation already exists for this licensee.", "information");
                            break;
                        }
                    }
                }
            }
            var selectedpg = gridProgrammeParticulars.getSelectedRows();
            for (var i = 0; i < ProgrammeVOModifiedData.length; i++) {
                if (ProgrammeVOModifiedData[i].Id == ProgrammeParticulargridData[selectedpg].Id) {
                    if (ProgrammeVOModifiedData[i].LicenseeAllocationData != null) {
                        for (var j = 0; j < ProgrammeVOModifiedData[i].LicenseeAllocationData.length; j++) {
                            if (ProgrammeVOModifiedData[i].LicenseeAllocationData[j].Id == selectedrow.Id) {
                                ProgrammeVOModifiedData[i].LicenseeAllocationData[j].ChannelService = SelectedRowData.ChannelServiceCode;
                                ProgrammeVOModifiedData[i].LicenseeAllocationData[j].PersistFlag = ProgrammeVOModifiedData[i].LicenseeAllocationData[j].PersistFlag == 3 ? parseInt("1") : ProgrammeVOModifiedData[i].LicenseeAllocationData[j].PersistFlag; 
                            }
                        }
                    }
                }
            }
        }
        if (lookupInvokerControl == "ProgramChannelListColumn") {
            if (!gridRunsPerChannel.getEditorLock().isActive()) {
                gridRunsPerChannel.getEditorLock().activate(gridRunsPerChannel.getEditController());
            }
            var selectedRowId = gridRunsPerChannel.getSelectedRows();
            var selectedrow = RunsPerChannelgridData[selectedRowId];
            var itemtoupdate = { "Channel": SelectedRowData.ChannelID,
                "Runs": (selectedrow.Runs == "" || selectedrow.Runs == null || selectedrow.Runs == "null") ? parseInt("1") : selectedrow.Runs,
                "PersistFlag": $("#DMVo_DMNumber").val() != "" ? (selectedrow.PersistFlag == 3 ? parseInt("1") : selectedrow.PersistFlag) : selectedrow.PersistFlag
            };
            $.extend(gitems, itemtoupdate);
            gitems = { "Channel": SelectedRowData.ChannelID,
                "Max_channel_Number": selectedrow.Max_channel_Number,
                "Cost": selectedrow.Cost,
                "Runs": (selectedrow.Runs == "" || selectedrow.Runs == null || selectedrow.Runs == "null") ? parseInt("1") : selectedrow.Runs,
                "CostingRuns": selectedrow.CostingRuns,
                "PersistFlag": $("#DMVo_DMNumber").val() != "" ? (selectedrow.PersistFlag == 3 ? parseInt("1") : selectedrow.PersistFlag) : selectedrow.PersistFlag
            };
            gridRunsPerChannel.setData(RunsPerChannelgridData);
            gridRunsPerChannel.render();
            gridRunsPerChannel.setOptions({ editable: true });

            var TotalRuns = null;
            if (gridRunsPerChannel.getData() != "") {
                if (RunsPerChannelgridData != null) {
                    for (var i = 0; i < RunsPerChannelgridData.length; i++) {
                        TotalRuns = TotalRuns + RunsPerChannelgridData[i].Runs;
                    }
                    if (TotalRuns == null) {
                        $("#txtTotalRuns").val(0);
                    }
                    else {
                        $("#txtTotalRuns").val(TotalRuns);
                        var selectedRow = gridLicenseeAllocation.getSelectedRows();
                        if (selectedRow != null) {
                            LicenseeDetailsgridData[selectedRow].ChannelRuns = TotalRuns;
                            if (LicenseeDetailsgridData[selectedRow].PersistFlag == 3) {
                                LicenseeDetailsgridData[selectedRow].PersistFlag = parseInt("1");
                            }
                            gridLicenseeAllocation.setData(LicenseeDetailsgridData);
                            gridLicenseeAllocation.render();
                            var selectedPg = gridProgrammeParticulars.getSelectedRows();
                            if (ProgrammeParticulargridData[selectedPg].Id != 0) {
                                if (ProgrammeVOModifiedData != null) {
                                    for (var i = 0; i < ProgrammeVOModifiedData.length; i++) {
                                        if (ProgrammeVOModifiedData[i].Id == ProgrammeParticulargridData[selectedPg].Id) {
                                            for (var j = 0; j < ProgrammeVOModifiedData[i].LicenseeAllocationData.length; j++) {
                                                if (ProgrammeVOModifiedData[i].LicenseeAllocationData[j].Id == LicenseeDetailsgridData[selectedRow].Id) {
                                                    ProgrammeVOModifiedData[i].LicenseeAllocationData[j].PersistFlag = LicenseeDetailsgridData[selectedRow].PersistFlag;
                                                    ProgrammeVOModifiedData[i].LicenseeAllocationData[j].ChannelRuns = columnId == "ChannelRuns" ? cellvalue : LicenseeDetailsgridData[selectedRow].ChannelRuns;
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
            var selectedpg = gridProgrammeParticulars.getSelectedRows();
            var selectedLc = gridLicenseeAllocation.getSelectedRows();
            for (var i = 0; i < ProgrammeVOModifiedData.length; i++) {
                if (ProgrammeVOModifiedData[i].Id == ProgrammeParticulargridData[selectedpg].Id) {
                    if (ProgrammeVOModifiedData[i].LicenseeAllocationData != null) {
                        for (var j = 0; j < ProgrammeVOModifiedData[i].LicenseeAllocationData.length; j++) {
                            if (ProgrammeVOModifiedData[i].LicenseeAllocationData[j].Id == LicenseeDetailsgridData[selectedLc].Id) {
                                if (ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData != null) {
                                    for (var k = 0; k < ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData.length; k++) {
                                        if (ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData[k].Id == selectedrow.Id) {
                                            ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData[k].Channel = SelectedRowData.ChannelID;
                                            ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData[k].PersistFlag = ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData[k].PersistFlag == 3 ? parseInt("1") : ProgrammeVOModifiedData[i].LicenseeAllocationData[j].RunsPerChannelData[k].PersistFlag; 
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (lookupInvokerControl == "ProgramPlateformRightsColumn") {
            if (!gridPlatformRights.getEditorLock().isActive())
                gridPlatformRights.getEditorLock().activate(gridPlatformRights.getEditController());
            var selectedRowId = gridPlatformRights.getSelectedRows();
            var selectedrow = PlatfromRightsAllocationgridData[selectedRowId];
            var itemtoupdate = { "PlatformCode": SelectedRowData.PlatformCode,
                "IsSelected": (selectedrow.IsSelected == false) ? true : selectedrow.IsSelected,
                "PersistFlag": $("#DMVo_DMNumber").val() != "" ? (selectedrow.PersistFlag == 3 ? parseInt("1") : selectedrow.PersistFlag) : selectedrow.PersistFlag
            };
            $.extend(gitems, itemtoupdate);
            gitems = { "PlatformCode": SelectedRowData.PlatformCode,
                "IsSelected": selectedrow.IsSelected,
                "PersistFlag": $("#DMVo_DMNumber").val() != "" ? (selectedrow.PersistFlag == 3 ? parseInt("1") : selectedrow.PersistFlag) : selectedrow.PersistFlag
            };
            gridPlatformRights.setData(PlatfromRightsAllocationgridData);
            gridPlatformRights.render();
            gridPlatformRights.setOptions({ editable: true });
            var selectedPg = gridProgrammeParticulars.getSelectedRows();
            var selectedLc = gridCatchUpLicenseeAllocation.getSelectedRows();
            if (ProgrammeParticulargridData[selectedPg].Id != 0) {
                if (ProgrammeVOModifiedData != null) {
                    for (var i = 0; i < ProgrammeVOModifiedData.length; i++) {
                        if (ProgrammeVOModifiedData[i].Id == ProgrammeParticulargridData[selectedPg].Id) {
                            for (var j = 0; j < ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList.length; j++) {
                                if (ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].Id == CatchUpLicenseeAllocationgridData[selectedLc].Id) {
                                    if (ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList != null) {
                                        for (var k = 0; k < ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList.length; k++) {
                                            if (ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].Id == PlatfromRightsAllocationgridData[selectedRowId].Id &&
                                                ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].MapId == PlatfromRightsAllocationgridData[selectedRowId].MapId) {
                                                ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].PlatformCode = SelectedRowData.PlatformCode;
                                                ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].IsSelected = PlatfromRightsAllocationgridData[selectedRowId].IsSelected;
                                                ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].PersistFlag = ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].PersistFlag == 3 ? parseInt("1") : ProgrammeVOModifiedData[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].PersistFlag; 
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
    };
