var emptyrow = [];

$(function () {


    $("#btnTapeSearch").click(function (event) {
        SearchTapeResult();
    });

    //Function to show Enpty Grid.
    ShowEmptyGrid();
});


function ShowEmptyGrid() {
    var gridTapeSearch = "#gridTapeSearch";
    var visiblecolumns =
                            [
                            { id: "TapeNo", name: "Tape No.", field: "TapeNo" },
                                { id: "TapeTitle", name: "Tape Title", field: "TapeTitle" },
                                { id: "Type", name: "Media Type", field: "Type" },
                                { id: "Library", name: "Library", field: "Library" },
                                 { id: "TapType", name: "Storage", field: "TapType" }
                          ];

    var columns = [
                            { id: "TapeNo", name: "Tape No.", field: "TapeNo" },
                             { id: "TapeTitle", name: "Tape Title", field: "TapeTitle" },
                                { id: "Type", name: "Media Type", field: "Type" },
                                { id: "Library", name: "Library", field: "Library" },
                                 { id: "TapType", name: "Storage", field: "TapType" }
                          ];


    var options =
        {
            enableCellNavigation: true, enableColumnReorder: false, forceFitColumns: true

        };

    var actionParameters = {
        TapeTitle: $("#TapeTitle").val(),
        TapeNo: $("#TapeNo").val(),
        ProgrammeSearchTitle: $("#ProgrammeSearchTitle").val(),
        TapeType: $("#ddlTapeType").val()
    };

    //selected dmNumber from the grid will be available in the global variable 'selectedvalue' 
    var idfield = 'TMProgrammeTitle';
    var gridwidth = $(gridTapeSearch).width();
    var gridheight = 400;

    emptyrow[0] =
      {
          TapeNo: "",
          TapeTitle: "",
          Type: "",
          Library: "",
          TapType: ""
      };
    ShowGridTapeSearch("#gridTapeSearch", actionUrl, actionParameters, columns, visiblecolumns, options, idfield, gridwidth, gridheight, emptyrow);
};


function SearchTapeResult() {
    var gridTapeSearch = "#gridTapeSearch";
    var visiblecolumns =
                            [
                            { id: "TapeNo", name: "Tape No.", field: "TapeNo" },
                                { id: "TapeTitle", name: "Tape Title", field: "TapeTitle" },
                                { id: "Type", name: "Media Type", field: "Type" },
                                { id: "Library", name: "Library", field: "Library" },
                                 { id: "TapType", name: "Storage", field: "TapType" }
                          ];

    var columns = [
                            { id: "TapeNo", name: "Tape No.", field: "TapeNo" },
                             { id: "TapeTitle", name: "Tape Title", field: "TapeTitle" },
                                { id: "Type", name: "Media Type", field: "Type" },
                                { id: "Library", name: "Library", field: "Library" },
                                 { id: "TapType", name: "Storage", field: "TapType" }
                          ];


    var options =
        {
            enableCellNavigation: true, enableColumnReorder: false, forceFitColumns: true

        };

    var actionParameters = {
        TapeTitle: $("#TapeTitle").val(),
        TapeNo: $("#TapeNo").val(),
        ProgrammeSearchTitle: $("#ProgrammeSearchTitle").val(),
        TapeType: $("#ddlTapeType").val()
    };

    //selected dmNumber from the grid will be available in the global variable 'selectedvalue' 
    var idfield = 'TMProgrammeTitle';
    var gridwidth = $(gridTapeSearch).width();
    var gridheight = 400;
    ShowGridTapeSearch("#gridTapeSearch", actionUrl, actionParameters, columns, visiblecolumns, options, idfield, gridwidth, gridheight, null);
};

function ShowGridTapeSearch(gridContainerDiv, actionUrl, actionParameters, columns, visiblecolumns, options, idfield, gridwidth, gridheight, emptyrow) {

    var grid;
    var ProgrammeTitle;
    var myData = [];

    $(gridContainerDiv).css({ "width": gridwidth + "px", "height": gridheight });
    ShowProgressBar();
    if (emptyrow!= null) {
        grid = new Slick.Grid(gridContainerDiv, emptyrow, columns, options);
        RemoveProgressBar();
        $("#footer").css({ "width": gridwidth + "px", "visibility": "visible" });
        totalrecord = "Total number of rows displayed:0/" + myData.length;
        $("#TotalRecords").text(totalrecord);        
    }
    else {
        
        $.ajax({
            url: actionUrl,
            type: "GET",
            dataType: 'Json',
            data: actionParameters,

            success: function (data) {
                myData = data;
                var totalrecord;
                debugger;

                grid = new Slick.Grid(gridContainerDiv, myData, columns, options);

                grid.setSelectionModel(new Slick.RowSelectionModel());

                var rows = [];
                rows.push(0);
                grid.setSelectedRows(rows);
                grid.setColumns(visiblecolumns);
                selectedvalue = data[0.0][idfield];
                $("#footer").css({ "width": gridwidth + "px", "visibility": "visible" });
                totalrecord = "Total number of rows displayed:1/" + myData.length;
                $("#TotalRecords").text(totalrecord);

                //get cell text and bind to textbox.
                ProgrammeTitle = data[0.0].TMProgrammeTitle;
                $("#TapeTitle").val(ProgrammeTitle);

                grid.onClick.subscribe(function (e, args) {
                    var cell = grid.getCellFromEvent(e);
                    var row = cell.row;
                    totalrecord = "Total number of rows displayed:" + row + "/" + myData.length;
                    $("#TotalRecords").text(totalrecord);
                    ProgrammeTitle = data[cell.row].TMProgrammeTitle;
                    $("#TapeTitle").val(ProgrammeTitle);
                });
                RemoveProgressBar();
            },
            error: function () {
                alert("error fetching data.Please try again");
                RemoveProgressBar();
            }
        });
     }                            //end of jax call
    return selectedvalue;
};

function SaveResults() {
    var TapeTitle = $("#TapeTitle").val();
    var MediaType = $("#MediaType").val();
    var Barcode = $("#Barcode").val();
    var F = $("#F").val();
    var MediaFormat = $("#MediaFormat").val();
    var Subtitle = $("#Subtitle").val();
    var UMID = $("#UMID").val();
    var ddlAction = $("#ddlAction").val();
    var ddlTapeType = $("#ddlTapeType").val();
    var ddlLibrary = $("#ddlLibrary").val();
    var ddlTapeCategory = $("#ddlTapeCategory").val();
    var FormatType = $("#Type").val();
    var Length = $("#Length").val();
    var AspectRatio = $("#AspectRatio").val();
    var Comments = $("#Comments").val();
    var CourierCompany = $("#CourierCompanyList").val();
    var AirwaysBillNo = $("#AirwaysBillNo").val();
    var DeliveryNotes = $("#DeliveryNotes").val();
    var CourierInfoComments = $("#CourierInfoComments").val();
}