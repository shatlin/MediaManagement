var columnFilters = {};
var griddiv;

var lookupGridOptions =
        {
            enableCellNavigation: true,
            enableColumnReorder: false,
            forceFitColumns: true,
            multiColumnSort: true,
            editable: true,
            autoEdit: true,
            asyncEditorLoading: false,
            showHeaderRow: true,
            explicitInitialization: true 

        };

function setfooter(gridContainerDiv, selectedrow, totalrows) {
    var footerid = gridContainerDiv + "footer";
    $(footerid).remove();
    $(gridContainerDiv).after('<div style="margin:5px 5px 5px 5px;" id="' + footerid.substring(1) + '">' + "Total number of rows displayed :" + selectedrow + "/" + totalrows + '</div>');
}

function setPopupFooter(gridContainerDiv, totalrows) {
    var footerid = gridContainerDiv + "footer";
    $(footerid).remove();
    $(gridContainerDiv).after('<div style="margin:5px 5px 5px 5px;" id="' + footerid.substring(1) + '">' + "Total number of rows displayed :" + totalrows + '</div>');
}

//function filter(item) {


//    for (var columnId in columnFilters) {
//        if (columnId !== undefined && columnFilters[columnId] !== "") {
//            var c = grid.getColumns()[grid.getColumnIndex(columnId)];

//            //if not type casted to string, number filtering will throw error
//            if (String(item[c.field].toUpperCase()).indexOf(columnFilters[columnId].toUpperCase()) != 0) 
//            {
////                if (String(item[c.field]).indexOf(columnFilters[columnId]) != 0) 
//                {
//                    return false;
//                }
//            }

//        }
//    }
//    return true;
//}
function filter(item) {
    for (var columnId in columnFilters) {
        if (columnId !== undefined && columnFilters[columnId] !== "") {
            var c = grid.getColumns()[grid.getColumnIndex(columnId)];

            //if not type casted to string, number filtering will throw error
            if (String(item[c.field].toUpperCase()).indexOf(columnFilters[columnId].toUpperCase()) != 0) {
                //if (String(item[c.field]).indexOf(columnFilters[columnId]) != 0) 
                // {
                return false;
                //  }
            }

        }
    }
    return true;
}

//function filter(item) {
//    //debugger;

//    for (var columnId in columnFilters) {
//        if (columnId !== undefined && columnFilters[columnId] !== "") {
//            var c = Rgrid.getColumns()[Rgrid.getColumnIndex(columnId)];

//            if (item[c.field].indexOf(columnFilters[columnId].toUpperCase()) != 0) {
//                return false;
//            }

//        }
//    }
//    return true;
//}


function SortGrid(args, dataView) {
    var cols = args.sortCols;
    dataView.sort(function (dataRow1, dataRow2) {
        for (var i = 0, l = cols.length; i < l; i++) {
            var field = cols[i].sortCol.field;
            var sign = cols[i].sortAsc ? 1 : -1;

            var value1 = dataRow1[field], value2 = dataRow2[field];

            var result = (value1 == value2 ? 0 : (value1 > value2 ? 1 : -1)) * sign;
            if (result != 0) {
                return result;
            }
        }
        return 0;
    });

}

function FilterGrid(grid, dataView) {

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

            columnFilters[columnId] = $.trim($(this).val());
            //alert(columnFilters[columnId]);    
            dataView.refresh();
        }
    });

    grid.onHeaderRowCellRendered.subscribe(function (e, args) {

        $(args.node).empty();
        $("<input type='text'>")
           .data("columnId", args.column.id)
           .val(columnFilters[args.column.id])
           .appendTo(args.node);
    });

}

function FilterGridWithRowCount(grid, dataView, gridContainerDiv) {

    dataView.onRowCountChanged.subscribe(function (e, args) {
        grid.updateRowCount();
        grid.render();
        var row = 0;
        if (grid.getSelectedRows() != null) {
            row = grid.getSelectedRows()[0];
        }
        if ((row == null))
            row = 0;
        if (row > dataView.getLength()) {
            row = 1;
            grid.setActiveCell(1, 0);
            grid.editActiveCell();
            grid.render();
        }
        setfooter(gridContainerDiv, row, dataView.getLength());
    });

    dataView.onRowsChanged.subscribe(function (e, args) {
        grid.invalidateRows(args.rows);
        grid.render();
    });


    $(grid.getHeaderRow()).delegate(":input", "change keyup", function (e) {

        var columnId = $(this).data("columnId");

        if (columnId != null) {

            columnFilters[columnId] = $.trim($(this).val());
            //alert(columnFilters[columnId]);    
            dataView.refresh();
        }
    });

    grid.onHeaderRowCellRendered.subscribe(function (e, args) {

        $(args.node).empty();
        $("<input type='text'>")
           .data("columnId", args.column.id)
           .val(columnFilters[args.column.id])
           .appendTo(args.node);
    });

}
function setfooterwithAddnewRow(gridContainerDiv, selectedrow, totalrows) {
    var footerid = gridContainerDiv + "footer";
    $(footerid).remove();
    $(gridContainerDiv).after('<div style="margin:5px 5px 5px 5px;" id="' + footerid.substring(1) + '">' + "Total number of rows displayed :" + selectedrow + "/" + totalrows - 1 + '</div>');
}


function CreateEmptyGrid(gridContainerDiv, emptyrow, columns, options) {

    var grid = new Slick.Grid(gridContainerDiv, emptyrow, columns, options);
    setfooter(gridContainerDiv, 0, 0);
    return grid;
}

function DisableToggleButton(ToggleButton, status) {
    if (ToggleButton.length > 0) //if user passed a non empty toggle button parameter
    {
        $(ToggleButton).prop("disabled", status);
        if (status == true) {
            $(ToggleButton).attr("class", "inputButtonDisable");
        }
        else {
            $(ToggleButton).attr("class", "inputButton");
        }
    }

}

function ShowProgressBar(progressbar_x, progressbar_y) {

    var div = document.createElement('div');
    var progbarheight = 75;
    var progbarwidth = 70;
    div.setAttribute('id', 'Progress');
    div.innerHTML = "<center><table style='vertical-align:middle;';padding:0px;margin:0px;><tr><td style='vertical-align:middle;width:40%'><img src=" + "../../Content/images/loading.gif" + " /></td><td style='vertical-align:middle;width:60%;font-size:11px;'>Loading...</td></tr></table></center>";

    $(div).dialog(
    {
        autoOpen: false,
        modal: false,
        resizable: false,
        closeOnEscape: false,
        height: progbarheight,
        width: progbarwidth,
        position: [(progressbar_x - progbarwidth), progressbar_y - (progbarheight / 2)],
        open: function (event, ui) {

            $(".ui-dialog-content").css("padding", 0);
            $(".ui-dialog-titlebar-close", this.parentNode).hide();
            $(".ui-dialog-titlebar", this.parentNode).hide();
        }


    });

    $(div).dialog("open");
    //  $("body").css("cursor", "wait");

}

function RemoveProgressBar() {
    $("#Progress").dialog("close");
    $("#Progress").remove();
    //    $("body").css("cursor", "auto");
}


function ShowProgressBarWithMsg(message)
{

    var div = document.createElement('div');
    var progbarheight = 75;
    var progbarwidth = 70;
    div.setAttribute('id', 'Progress');
    div.innerHTML = "<center><table style='vertical-align:middle;';padding:0px;margin:0px;><tr><td style='vertical-align:middle;width:40%'><img src=" + "../../Content/images/loading.gif" + " /></td><td style='vertical-align:middle;width:60%;font-size:11px;'>" + message + "...</td></tr></table></center>";

    $(div).dialog(
    {
        autoOpen: false,
        modal: false,
        resizable: false,
        closeOnEscape: false,
        height: progbarheight,
        width: progbarwidth,
      
        open: function (event, ui)
        {

            $(".ui-dialog-content").css("padding", 0);
            $(".ui-dialog-titlebar-close", this.parentNode).hide();
            $(".ui-dialog-titlebar", this.parentNode).hide();
        }


    });

    $(div).dialog("open");
    //  $("body").css("cursor", "wait");

}


if (typeof String.prototype.trim != "function")
{
    String.prototype.trim = function ()
    {
        return this.replace(/^\s+|\s+$/g, '');
    };
}



function SetNonStandardDialogStyles() {



    $(".ui-dialog  ").css("-moz-border-radius", "5px");
    $(".ui-dialog  ").css("-webkit-border-radius", "5px");
    $(".ui-dialog  ").css("-khtml-border-radius", "5px");
    $(".ui-dialog ").css("border-radius", "8px");

    $(".ui-dialog  .ui-widget-content ").css("background-color", "transparent");
    $(".ui-dialog").css("box-shadow", "  2px 2px 5px #333");
    $(".ui-dialog  ").css({ "padding": "10px" });
    if ($.browser.msie)
    {
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
    
    //$(".ui-dialog").css("-ms-filter", "progid:DXImageTransform.Microsoft.gradient(startColorstr=#d8d8d8,endColorstr=#868688)");
    //$(".ui-dialog").css("filter", "progid:DXImageTransform.Microsoft.gradient(startColorstr=#d8d8d8,endColorstr=#868688);");
   


}


function CreateLookupHtml(gridheight, gridwidth) {
    griddiv = "<div id='ShowLookup' style='display: none;padding:0px;vertical-align:middle;' title='Location'>" +
     "<div id='placeholder' style='vertical-align:middle;padding:0px;height:25px important;'>" +
     "<table class='tableLayout' style='vertical-align:middle;'><tr><td>" +
     "<div id='gridLookup' class='GridContainer' style='margin:0 auto;vertical-align:middle;'>" +
     "</div></td></tr></table></div></div>"

    $("body").append(griddiv);
    $("#ShowLookup").css('height', gridheight);
    $("#ShowLookup").css('width', gridwidth);
    $("#gridLookup").css('height', gridheight - 100);
    $("#gridLookup").css('width', gridwidth);

}

function SetDialogStyles(title) {
    //$("span.ui-dialog-title").text(title);
    $(".ui-dialog  ").css("-moz-border-radius", "5px");
    $(".ui-dialog  ").css("-webkit-border-radius", "5px");
    $(".ui-dialog  ").css("-khtml-border-radius", "5px");
    $(".ui-dialog ").css("border-radius", "8px");

    $(".ui-dialog  .ui-widget-content ").css("background-color", "transparent");
    $(".ui-dialog").css("box-shadow", "  2px 2px 5px #333");
    $(".ui-dialog  ").css({ "padding": "10px" });


    if ($.browser.msie)
    {
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



var DialogcommonVars = {
    autoOpen: false,

    modal: true,
    resizable: false,
    dialogClass: "PlaceHolderPopup",
    show: {
        effect: 'fade',
        duration: 350
    },
    hide: {
        effect: 'fade',
        duration: 350
    }
};






function ShowLookup(lookupInvokerControl, actionUrl, actionParameters, columns, options, idfield, gridwidth, gridheight, title) {

    CreateLookupHtml(gridheight, gridwidth);


    var lookupgridvalue;
    var colFilters = {};

    options = lookupGridOptions;

    $('#ShowLookup').dialog(DialogcommonVars,
    {

        height: gridheight + 50,
        width: gridwidth + 15,
        modal: true,
        title:title,
        open: function (event, ui) {

            SetDialogStyles(title);

            var grid;
            ShowProgressBar();

            $.ajax({
                url: actionUrl,
                type: "GET",
                dataType: 'Json',
                data: actionParameters,
                cache: false,
                success: function (data) {



                    dataView = new Slick.Data.DataView();
                    grid = new Slick.Grid("#gridLookup", dataView, columns, options);
                    grid.setSelectionModel(new Slick.RowSelectionModel());
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

                    grid.onHeaderRowCellRendered.subscribe(function (e, args) {
                        $(args.node).empty();
                        $("<input type='text'>")
                       .data("columnId", args.column.id)
                       .val(colFilters[args.column.id])
                       .appendTo(args.node);
                    });



                    grid.onActiveCellChanged.subscribe(function (e, args) {

                        if (grid.getActiveCell() != null) {
                            lookupgridvalue = dataView.getItem(grid.getActiveCell().row)[idfield];
                        }

                    });




                    grid.onKeyDown.subscribe(function (e, args) {
                        if (e.keyCode == 13) {
                            AssignLookupData(lookupInvokerControl, lookupgridvalue);
                        }
                    });

                    grid.onDblClick.subscribe(function (e, args) {
                        AssignLookupData(lookupInvokerControl, lookupgridvalue);
                    });

                    grid.onSort.subscribe(function (e, args) {

                        SortGrid(args, dataView);

                    });

//                    function filter(item) {


//                        for (var columnId in colFilters) {
//                            if (columnId !== undefined && colFilters[columnId] !== "") {
//                                var c = grid.getColumns()[grid.getColumnIndex(columnId)];

//                                //if not type casted to string, number filtering will throw error
//                                if (String(item[c.field]).indexOf(colFilters[columnId].toUpperCase()) != 0) {
//                                    if (String(item[c.field]).indexOf(colFilters[columnId]) != 0) {
//                                        return false;
//                                    }
//                                }

//                            }
//                        }
//                        return true;
//                    }

                    dataView.onRowCountChanged.subscribe(function (e, args) {
                        grid.updateRowCount();
                        grid.render();
//                        var totalrecord = $('<br/><label>&nbsp;&nbsp;&nbsp;&nbsp;Total number of rows displayed: ' + dataView.getLength() + '</label><br/>');
//                        $('#placeholder').append(totalrecord);
                        setPopupFooter('#placeholder', dataView.getLength());
                    });
                    function filter(item) {
                        for (var columnId in colFilters) {
                            if (columnId !== undefined && colFilters[columnId] !== "") {
                                var c = grid.getColumns()[grid.getColumnIndex(columnId)];

                                //if not type casted to string, number filtering will throw error
                                if (String(item[c.field].toUpperCase()).indexOf(colFilters[columnId].toUpperCase()) != 0) {
                                    //if (String(item[c.field]).indexOf(colFilters[columnId]) != 0) 
                                    // {
                                    return false;
                                    //  }
                                }

                            }
                        }
                        return true;
                    }


                    grid.init();
                    dataView.beginUpdate();
                    dataView.setItems(data, idfield);
                    dataView.setFilter(filter);
                    dataView.refresh();
                    dataView.endUpdate();
                    grid.setActiveCell(0, 0);
                    var rowCount = 0;
                    if (data != null) {
                        rowCount = data.length;
                        lookupgridvalue = data[0][idfield];
                    }
                    setPopupFooter('#placeholder', rowCount);
//                    var totalrecord = $('<br/><label>&nbsp;&nbsp;&nbsp;&nbsp;Total number of rows displayed: ' + rowCount + '</label><br/>');
//                    $('#placeholder').append(totalrecord);

                    RemoveProgressBar();
                    grid.focus();
                }, //end of success
                error: function () {
                    RemoveProgressBar();
                    alert("error");
                } //end of error
            });  //end of ajax call

        },

        buttons: {
            "OK": function () {
                AssignLookupData(lookupInvokerControl, lookupgridvalue);
            },
            "Cancel": function () {
                $(this).dialog("close");
                RemoveProgressBar();
                $('#ShowLookup').remove();
                $(lookupInvokerControl).focus();
            }
        },
        close: function () {
            RemoveProgressBar();
            $('#ShowLookup').remove();
            $(lookupInvokerControl).focus();

        }

    });

    $('#ShowLookup').dialog("open");


};

function AssignLookupData(lookupInvokerControl, lookupgridvalue) {
    $(lookupInvokerControl).val(lookupgridvalue);
    RemoveProgressBar();
    $(lookupInvokerControl).focus();
    $('#ShowLookup').dialog("close");
};


function CloseLookup() {

    $("#ShowLookup").dialog("close");
    //$('#ShowLookup').remove();
};

function ShowCommonLookup(actionUrl, actionParameters, columns, lookupInvokerControl, idfield, title, listName) {
  
    var lookUpData=[];
    var i;
    //ShowPopupDataFetchingBar();
 //  setTimeout(function() {
    $.ajax({
        url: actionUrl,
        type: "GET",
        dataType: 'Json',
        async: false,
        cache: false,
        data: actionParameters,
        success: function (myData) {
            lookUpData = DisplayLookupWithExistingData(columns, lookupInvokerControl, idfield, title, listName, myData);
            RemoveProgressBar();
            if (myData.AppMessages != null) {
                DisplayAppMessages(myData.AppMessages);
            }
        }, //end of success
        error: function () {
            RemoveProgressBar();
            alert("error");
        } //end of error
    });    //end of ajax call
  // },1)
    return lookUpData;
};

function ShowPopupDataFetchingBar(progressbar_x, progressbar_y)
{

 var div = document.createElement('div');
    var progbarheight = 75;
    var progbarwidth = 110;
    div.setAttribute('id', 'Progress');
    div.innerHTML = "<center><table style='vertical-align:middle;';padding:0px;margin:0px;><tr><td style='vertical-align:middle;width:40%'><img src=" + "../../Content/images/loading.gif" + " /></td><td style='vertical-align:middle;width:60%;font-size:11px;'>Fetching Data...</td></tr></table></center>";

    $(div).dialog(
    {
        autoOpen: false,
        modal: false,
        resizable: false,
        closeOnEscape: false,
        height: progbarheight,
        width: progbarwidth+50,
        position: [(progressbar_x - progbarwidth), progressbar_y - (progbarheight / 2)],
        open: function (event, ui) {

            $(".ui-dialog-content").css("padding", 0);
            $(".ui-dialog-titlebar-close", this.parentNode).hide();
            $(".ui-dialog-titlebar", this.parentNode).hide();
          
                
        }


    });

    $(div).dialog("open");
    return 1;
    //  $("body").css("cursor", "wait");
}

function DisplayLookupWithExistingData(columns, lookupInvokerControl, idfield, title, listName, myData) {


    var options = lookupGridOptions;
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
        title: title,
        open: function (event, ui) {


            SetDialogStyles(title);


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
                SelectedRowData = lookUpDataView.getItem(lookUpGrid.getActiveCell().row);
                SetLookupDataToInvoker(SelectedRowData, lookupInvokerControl);
                //$('#ShowLookup').dialog("close");
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

            //           function filter(item) {


            //    for (var columnId in colFilters) {
            //        if (columnId !== undefined && colFilters[columnId] !== "") {
            //            var c = grid.getColumns()[grid.getColumnIndex(columnId)];

            //            //if not type casted to string, number filtering will throw error
            //            if (String(item[c.field].toUpperCase()).indexOf(colFilters[columnId].toUpperCase()) != 0) 
            //            {
            ////                if (String(item[c.field]).indexOf(columnFilters[columnId]) != 0) 
            //                {
            //                    return false;
            //                }
            //            }

            //        }
            //    }
            //    return true;
            //}

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
                            //if (String(item[c.field]).indexOf(colFilters[columnId]) != 0) 
                            // {
                            return false;
                            //  }
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
            lookUpGrid.setActiveCell(0, 0);   //uncommented by sagar for default selection row
            var rowCount = 0
            if (lookUpData != null) {
                rowCount = lookUpData.length;
                SelectedRowData = lookUpData[0]; //uncommented by sagar for default selection row
            }
            setPopupFooter('#placeholder', rowCount);
            //            var totalrecord = $('<br/><label>&nbsp;&nbsp;&nbsp;&nbsp;Total number of rows displayed: ' + rowCount + '</label><br/>');

            //            $('#placeholder').append(totalrecord);
            RemoveProgressBar();
            lookUpGrid.focus();

        },

        buttons: {
            "OK": function () {
                SelectedRowData = lookUpDataView.getItem(lookUpGrid.getActiveCell().row)
                SetLookupDataToInvoker(SelectedRowData, lookupInvokerControl);
                CloseLookup();
            },
            "Cancel": function () {
                SetLookupDataToInvoker(null, lookupInvokerControl);
                CloseLookup();
            }
        },
        close: function () {
            SetLookupDataToInvoker(null, lookupInvokerControl);
            //   CloseLookup();
        }
    });

    $('#ShowLookup').dialog("open");
//    alert("look up data in display");
//    alert(JSON.stringify(lookUpData));
    return lookUpData;
}





//old code

function ShowLookupDesc(lookupInvokerControl, lookupDescriptionControl, actionUrl, actionParameters, columns, options, idfield, idFieldDesc, gridwidth, gridheight, title) {

    CreateLookupHtml(gridheight, gridwidth);

    var lookupgridvalue;
    var lookupgridDesc;
    var colFilters = {};
    options = lookupGridOptions;



    $('#ShowLookup').dialog(DialogcommonVars,
    {

        height: gridheight + 50,
        width: gridwidth + 15,
        title:title,
        open: function (event, ui) {

            SetDialogStyles(title);
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

                    dataView = new Slick.Data.DataView();
                    grid = new Slick.Grid("#gridLookup", dataView, columns, options);
                    grid.setSelectionModel(new Slick.RowSelectionModel());

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

                    grid.onHeaderRowCellRendered.subscribe(function (e, args) {
                        $(args.node).empty();
                        $("<input type='text'>")
           .data("columnId", args.column.id)
           .val(colFilters[args.column.id])
           .appendTo(args.node);
                    });



                    grid.onActiveCellChanged.subscribe(function (e, args) {

                        if (grid.getActiveCell() != null) {
                            lookupgridvalue = dataView.getItem(grid.getActiveCell().row)[idfield];
                            lookupgridDesc = dataView.getItem(grid.getActiveCell().row)[idFieldDesc];
                        }

                    });


                    grid.onDblClick.subscribe(function (e, args) {

                        $(lookupInvokerControl).val(lookupgridvalue);
                        $(lookupDescriptionControl).val(lookupgridDesc);
                        $(lookupInvokerControl).focus();
                        $('#ShowLookup').dialog("close");
                        // $('#ShowLookup').remove();


                    });


                    grid.onKeyDown.subscribe(function (e, args) {
                        if (e.keyCode == 13) {
                            $(lookupInvokerControl).val(lookupgridvalue);
                            $(lookupDescriptionControl).val(lookupgridDesc);
                            $(lookupInvokerControl).focus();
                            $('#ShowLookup').dialog("close");
                            //$('#ShowLookup').remove();
                        }
                    });




                    grid.onSort.subscribe(function (e, args) {

                        SortGrid(args, dataView);

                    });
                    function filter(item) {
                        for (var columnId in colFilters) {
                            if (columnId !== undefined && colFilters[columnId] !== "") {
                                var c = lookUpGrid.getColumns()[lookUpGrid.getColumnIndex(columnId)];

                                //if not type casted to string, number filtering will throw error
                                if (String(item[c.field].toUpperCase()).indexOf(colFilters[columnId].toUpperCase()) != 0) {
                                    //if (String(item[c.field]).indexOf(colFilters[columnId]) != 0) 
                                    // {
                                    return false;
                                    //  }
                                }

                            }
                        }
                        return true;
                    }

                    //         function filter(item) {


                    //    for (var columnId in colFilters) {
                    //        if (columnId !== undefined && colFilters[columnId] !== "") {
                    //            var c = grid.getColumns()[grid.getColumnIndex(columnId)];

                    //            //if not type casted to string, number filtering will throw error
                    //            if (String(item[c.field].toUpperCase()).indexOf(colFilters[columnId].toUpperCase()) != 0) 
                    //            {
                    ////                if (String(item[c.field]).indexOf(columnFilters[columnId]) != 0) 
                    //                {
                    //                    return false;
                    //                }
                    //            }

                    //        }
                    //    }
                    //    return true;
                    //}


                    grid.init();
                    dataView.beginUpdate();
                    dataView.setItems(data, idfield);
                    dataView.setFilter(filter);


                    dataView.refresh();
                    dataView.endUpdate();
                    grid.setActiveCell(0, 0);

                    var rowCount = 0;
                    if (data != null) {
                        rowCount = data.length;
                        lookupgridvalue = dataView.getItem(0)[idfield];
                        lookupgridDesc = dataView.getItem(0)[idFieldDesc];
                    }
                    var totalrecord = $('<br/><label>&nbsp;&nbsp;&nbsp;&nbsp;Total number of rows displayed: ' + rowCount + '</label><br/>');
                    $('#placeholder').append(totalrecord);
                    RemoveProgressBar();
                    grid.focus();
                },
                error: function () {
                    RemoveProgressBar();
                    alert("error");
                } //end of error
            });  //end of ajax call
        },

        buttons: {
            "OK": function () {

                $(lookupInvokerControl).val(lookupgridvalue);
                $(lookupDescriptionControl).val(lookupgridDesc);
                $(lookupInvokerControl).focus();
                $('#ShowLookup').dialog("close");
                //$('#ShowLookup').remove();
            },
            "Cancel": function () {
                $(this).dialog("close");
                $('#ShowLookup').remove();
            }
        },
        close: function () {
            $('#ShowLookup').remove();

        }

    });

    $('#ShowLookup').dialog("open");


};






function ShowLookupForGrid(actionUrl, actionParameters, columns, lookupInvokerColumn, idfield, gridwidth, gridheight, title, listName) {
var colFilters = {};
    CreateLookupHtml(gridheight, gridwidth);
    var selectedvalue = "";
    var lookUpData = "";
    $('#ShowLookup').dialog(DialogcommonVars,
    {

        height: gridheight + 50,
        width: gridwidth + 15,
        title: title,
        open: function (event, ui) {



            SetDialogStyles(title);
            var myData = [];
            var lookUpGrid;
            var colFilters = {};
            var lookUpDataView = "";

            var options = lookupGridOptions;

            ShowProgressBar();
            $.ajax({
                url: actionUrl,
                type: "GET",
                dataType: 'Json',
                data: actionParameters,
                cache: false,
                success: function (myData) {
                    if ((listName != null) && listName != "") {
                        lookUpData = myData[listName];
                    }
                    else
                        lookUpData = myData;

                    lookUpDataView = new Slick.Data.DataView();
                    lookUpGrid = new Slick.Grid("#ShowLookup", lookUpDataView, columns, options);
                    lookUpGrid.setSelectionModel(new Slick.RowSelectionModel());


                    lookUpGrid.onClick.subscribe(function (e, args) {
                        var cell = lookUpGrid.getCellFromEvent(e);
                        var row = cell.row;
                        selectedvalue = lookUpData[row];
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
                            SetLookupDataToGrid(selectedvalue, lookupInvokerColumn)
                            $("#ShowLookup").dialog("close");
                        }
                    });

                    lookUpGrid.onHeaderRowCellRendered.subscribe(function (e, args) {
                        $(args.node).empty();
                        $("<input type='text'>")
                           .data("columnId", args.column.id)
                           .val(colFilters[args.column.id])
                           .appendTo(args.node);
                    });

            


         function filter(item) {


    for (var columnId in colFilters) {
        if (columnId !== undefined && colFilters[columnId] !== "") {
            var c = grid.getColumns()[grid.getColumnIndex(columnId)];

            //if not type casted to string, number filtering will throw error
            if (String(item[c.field].toUpperCase()).indexOf(colFilters[columnId].toUpperCase()) != 0) 
            {
//                if (String(item[c.field]).indexOf(columnFilters[columnId]) != 0) 
                {
                    return false;
                }
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
                    lookUpGrid.setActiveCell(0, 0);
                    var rowCount = 0
                    if (lookUpData != null) {
                        rowCount = lookUpData.length;
                        selectedvalue = lookUpData[0];
                    }
                    var totalrecord = $('<br/><label>&nbsp;&nbsp;&nbsp;&nbsp;Total number of rows displayed: ' + rowCount + '</label><br/>');

                    $('#placeholder').append(totalrecord);
                    RemoveProgressBar();
                    lookUpGrid.focus();
                }, //end of success
                error: function () {
                    RemoveProgressBar();
                    alert("error");
                } //end of error
            });  //end of ajax call
        },

        buttons: {
            "OK": function () {
                RemoveProgressBar();
                $("#ShowLookup").dialog("close");
                SetLookupDataToGrid(selectedvalue, lookupInvokerColumn);
            },
            "Cancel": function () {
                RemoveProgressBar();
                $(this).dialog("close");
                $('#ShowLookup').remove();
            }
        },
        close: function () {
            RemoveProgressBar();
            $('#ShowLookup').remove();
        }
    });

    $('#ShowLookup').dialog("open");

};


/// Sagar's original code

//function ShowLookupForGrid(actionUrl, actionParameters, columns, lookupInvokerColumn, idfield, gridwidth, gridheight, title, listName) {

//    var div = document.createElement('div');
//    div.setAttribute('id', 'ShowLookup');


//    var selectedvalue = "";
//    var lookUpData = "";
//    $(div).dialog(
//    {

//        autoOpen: false,
//        height: gridheight,
//        width: gridwidth,
//        modal: true,

//        open: function (event, ui) {

//            $("span.ui-dialog-title").text(title);
//            $(".ui-dialog-content").css("padding", 0);
//            var myData = [];
//            var lookUpGrid;
//            var colFilters = {};
//            var lookUpDataView = "";

//            var options =
//        {
//            enableCellNavigation: true,
//            enableColumnReorder: false,
//            forceFitColumns: true,
//            multiColumnSort: true,
//            editable: false,
//            asyncEditorLoading: false,
//            showHeaderRow: true,
//            explicitInitialization: true

//        };

//            ShowProgressBar();
//            $.ajax({
//                url: actionUrl,
//                type: "GET",
//                dataType: 'Json',
//                data: actionParameters,
//                success: function (myData) {
//                    if ((listName != null) && listName != "") {
//                        lookUpData = myData[listName];
//                    }
//                    else
//                        lookUpData = myData;

//                    lookUpDataView = new Slick.Data.DataView();
//                    lookUpGrid = new Slick.Grid("#ShowLookup", lookUpDataView, columns, options);
//                    lookUpGrid.setSelectionModel(new Slick.RowSelectionModel());


//                    lookUpGrid.onClick.subscribe(function (e, args) {
//                        var cell = lookUpGrid.getCellFromEvent(e);
//                        var row = cell.row;
//                        selectedvalue = lookUpData[row];
//                    });

//                    lookUpGrid.onSort.subscribe(function (e, args) {
//                        SortGrid(args, lookUpDataView);
//                    });
//                    lookUpDataView.onRowCountChanged.subscribe(function (e, args) {
//                        lookUpGrid.updateRowCount();
//                        lookUpGrid.render();
//                    });

//                    lookUpDataView.onRowsChanged.subscribe(function (e, args) {
//                        lookUpGrid.invalidateRows(args.rows);
//                        lookUpGrid.render();
//                    });


//                    $(lookUpGrid.getHeaderRow()).delegate(":input", "change keyup", function (e) {
//                        var columnId = $(this).data("columnId");
//                        if (columnId != null) {
//                            colFilters[columnId] = $.trim($(this).val());
//                            lookUpDataView.refresh();
//                        }
//                    });

//                    lookUpGrid.onKeyDown.subscribe(function (e, args) {
//                        if (e.keyCode == 13) {
//                            SetLookupDataToGrid(selectedvalue, lookupInvokerColumn)
//                             $("#ShowLookup").dialog("close");
//                        }
//                    });

//                    lookUpGrid.onHeaderRowCellRendered.subscribe(function (e, args) {
//                        $(args.node).empty();
//                        $("<input type='text'>")
//                           .data("columnId", args.column.id)
//                           .val(colFilters[args.column.id])
//                           .appendTo(args.node);
//                    });

//                    function filter(item) {
//                        for (var columnId in colFilters) {
//                            if (columnId !== undefined && colFilters[columnId] !== "") {
//                                var c = lookUpGrid.getColumns()[lookUpGrid.getColumnIndex(columnId)];

//                                //if not type casted to string, number filtering will throw error
//                                if (String(item[c.field]).indexOf(colFilters[columnId].toUpperCase()) != 0) {
//                                    if (String(item[c.field]).indexOf(colFilters[columnId]) != 0) {
//                                        return false;
//                                    }
//                                }

//                            }
//                        }
//                        return true;
//                    }

//                    lookUpGrid.init();
//                    lookUpDataView.beginUpdate();
//                    lookUpDataView.setItems(lookUpData, idfield);
//                    lookUpDataView.setFilter(filter);
//                    lookUpDataView.endUpdate();
//                    lookUpGrid.setActiveCell(0, 0);
//                    var rowCount = 0
//                    if (lookUpData != null) {
//                        rowCount = lookUpData.length;
//                        selectedvalue = lookUpData[0];
//                    }
//                    setPopupFooter("#ShowLookup", rowCount);
//                    RemoveProgressBar();
//                    lookUpGrid.focus();
//                }, //end of success
//                error: function () {
//                    RemoveProgressBar();
//                    alert("error");
//                } //end of error
//            });  //end of ajax call
//        },

//        buttons: {
//            "Ok": function () {
//                RemoveProgressBar();
//                  $("#ShowLookup").dialog("close");
//                SetLookupDataToGrid(selectedvalue, lookupInvokerColumn);
//            },
//            "Cancel": function () {
//                RemoveProgressBar();
//                $(this).dialog("close");
//                $(div).remove();
//            }
//        },
//        close: function () {
//            RemoveProgressBar();
//            $(div).remove();
//        }
//    });

//    $(div).dialog("open");
//};


/// A  single common lookup method

//function ShowCommonLookup(actionUrl, actionParameters, columns, lookupInvokerControl, idfield, title, listName) {
//    var options = lookupGridOptions;
//    var myData = [];
//    var lookUpData=[];
//    var lookUpGrid;
//    var colFilters = {};
//    var lookUpDataView = "";
//    var SelectedRowDta;
//    var gridwidth = 1000;
//    var gridheight = 500;
//    CreateLookupHtml(gridheight, gridwidth);

//    $('#ShowLookup').dialog(DialogcommonVars,
//    {

//        height: gridheight + 50,
//        width: gridwidth + 15,
//        open: function (event, ui) {


//            SetDialogStyles(title);




//            ShowProgressBar();
//            $.ajax({
//                url: actionUrl,
//                type: "GET",
//                dataType: 'Json',
//                data: actionParameters,
//                              success: function (myData) {
//                    if ((listName != null) && listName != "") {
//                        lookUpData = myData[listName];
//                    }
//                    else
//                        lookUpData = myData;

//                    lookUpDataView = new Slick.Data.DataView();
//                    lookUpGrid = new Slick.Grid("#gridLookup", lookUpDataView, columns, options);
//                    lookUpGrid.setSelectionModel(new Slick.RowSelectionModel());


//                    //                    lookUpGrid.onClick.subscribe(function (e, args) {
//                    //                        var cell = lookUpGrid.getCellFromEvent(e);
//                    //                        var row = cell.row;
//                    //                        SelectedRowData = lookUpData[row];
//                    //                    });


//                    lookUpGrid.onActiveCellChanged.subscribe(function (e, args) {

//                        if (lookUpGrid.getActiveCell() != null) {

//                            SelectedRowData = lookUpDataView.getItem(lookUpGrid.getActiveCell().row);

//                        }

//                    });


//                    lookUpGrid.onDblClick.subscribe(function (e, args) {
//                        SetLookupDataToInvoker(SelectedRowData, lookupInvokerControl);
//                        CloseLookup();
//                    });



//                    lookUpGrid.onSort.subscribe(function (e, args) {
//                        SortGrid(args, lookUpDataView);
//                    });

//                    lookUpDataView.onRowCountChanged.subscribe(function (e, args) {
//                        lookUpGrid.updateRowCount();
//                        lookUpGrid.render();
//                    });

//                    lookUpDataView.onRowsChanged.subscribe(function (e, args) {
//                        lookUpGrid.invalidateRows(args.rows);
//                        lookUpGrid.render();
//                    });


//                    $(lookUpGrid.getHeaderRow()).delegate(":input", "change keyup", function (e) {
//                        var columnId = $(this).data("columnId");
//                        if (columnId != null) {
//                            colFilters[columnId] = $.trim($(this).val());
//                            lookUpDataView.refresh();
//                        }
//                    });

//                    lookUpGrid.onKeyDown.subscribe(function (e, args) {
//                        if (e.keyCode == 13) {
//                            SetLookupDataToInvoker(SelectedRowData, lookupInvokerControl);
//                            CloseLookup();
//                        }
//                    });

//                    lookUpGrid.onHeaderRowCellRendered.subscribe(function (e, args) {
//                        $(args.node).empty();
//                        $("<input type='text'>")
//                           .data("columnId", args.column.id)
//                           .val(colFilters[args.column.id])
//                           .appendTo(args.node);
//                    });

//                    function filter(item) {
//                        for (var columnId in colFilters) {
//                            if (columnId !== undefined && colFilters[columnId] !== "") {
//                                var c = lookUpGrid.getColumns()[lookUpGrid.getColumnIndex(columnId)];

//                                //if not type casted to string, number filtering will throw error
//                                if (String(item[c.field]).indexOf(colFilters[columnId].toUpperCase()) != 0) {
//                                    if (String(item[c.field]).indexOf(colFilters[columnId]) != 0) {
//                                        return false;
//                                    }
//                                }

//                            }
//                        }
//                        return true;
//                    }

//                    lookUpGrid.init();
//                    lookUpDataView.beginUpdate();
//                    lookUpDataView.setItems(lookUpData, idfield);
//                    lookUpDataView.setFilter(filter);
//                    lookUpDataView.endUpdate();
//                    //   lookUpGrid.setActiveCell(0, 0);
//                    var rowCount = 0
//                    if (lookUpData != null) {
//                        rowCount = lookUpData.length;
//                        //  SelectedRowData = lookUpData[0];
//                    }
//                    var totalrecord = $('<br/><label>&nbsp;&nbsp;&nbsp;&nbsp;Total number of rows displayed: ' + rowCount + '</label><br/>');

//                    $('#placeholder').append(totalrecord);
//                    RemoveProgressBar();
//                    lookUpGrid.focus();
//                }, //end of success
//                error: function () {
//                    RemoveProgressBar();
//                    alert("error");
//                } //end of error
//            });  //end of ajax call
//        },

//        buttons: {
//            "Ok": function () {
//                RemoveProgressBar();
//                SetLookupDataToInvoker(SelectedRowData, lookupInvokerControl);
//                CloseLookup();
//            },
//            "Cancel": function () {
//                RemoveProgressBar();
//                CloseLookup();
//            }
//        },
//        close: function () {
//            RemoveProgressBar();
//            CloseLookup();
//        }
//    });

//    $('#ShowLookup').dialog("open");
//    return lookUpData;
//};




