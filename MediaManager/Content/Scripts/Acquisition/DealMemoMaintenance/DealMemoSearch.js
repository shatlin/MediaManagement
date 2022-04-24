var selectedvalue = [];
    var resetflag = 0;

    var DMNumber_searchvalue;
    var contractnovalue;
    var statusvalue;
    var amortizationvalue;
    var fromdatevalue;
    var todatevalue;
    var baseaddress;
    //Deal Memo search result grid variables


    var selectedDMNo;    

    var gridContainerDiv;
    var ToggleButton;
    var columns;
    var options;
    var actionParameters;
    var idfield;
    var gridwidth;
    var gridheight;
    var emptyrow = [];
    var visiblecolumns;
    var dataView;
    var columnFilters = {};
    //End Deal Memo search result grid variables
//    function setfooter(gridContainerDiv, totalrows) {
//        var footerid = gridContainerDiv + "footer";
//        $(footerid).remove();
//        $(gridContainerDiv).after('<div style="margin:5px 5px 5px 5px;" id="' + footerid.substring(1) + '">' + "Total number of rows displayed :" + totalrows + '</div>');
//    }

    $(function () {

        baseaddress = (document.getElementById('viewdetailsLink')).href;
       
        $("#DMNumber_Search").focus();
        $('#viewdetails').prop("disabled", true);

        //Logic to reset date textbox if enter date is wrong
        function IsValidDate(str) {
            var m = str.match(/^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\-\d{4}$/);
            return (m) ? new Date(m[3], m[2] - 1, m[1]) : null;
        }

        $("#FromDate").blur(function () {
            var dateValue = $("#FromDate").val();
            if (!IsValidDate(dateValue) && dateValue != "")
                $("#FromDate").val("");

        });
        $("#ToDate").blur(function () {
            var dateValue = $("#ToDate").val();
            if (!IsValidDate(dateValue))
                $("#ToDate").datepicker("setDate", new Date());
        });

        $("#FromDate").datepicker({ dateFormat: 'dd-M-yy',
            changeMonth: true,
            changeYear: true
        }).datepicker("setDate", "");


        $("#ToDate").datepicker({ dateFormat: 'dd-M-yy',
            changeMonth: true,
            changeYear: true
        }).datepicker("setDate", new Date());


        $("#FromdateDateIcon").click(function () {
            $("#FromDate").datepicker("show");
        });

        $("#TodateDateIcon").click(function () {
            $("#ToDate").datepicker("show");
        });

        $("#AmortMethodLookupIcon").click(function () {
            OpenAmortizationLookup();
        });


        shortcut.add("F7", function () {

            ResetControls();

        });

        shortcut.add("F8", function () {
            DealMemoSearch();

        });
        shortcut.add("Enter", function () {
            DealMemoSearch();

        });

        shortcut.add("F9", function () {
            if ($("#AmortMethod").is(":focus")) {
                OpenAmortizationLookup();
            }

        });

       setGridParameters();
       DisplayGrid("");
       // LoadBlankgrid();
    });

    function validDateError() {
        var FromDateval = $("#FromDate").val();
        var Todateval = $("#ToDate").val();
        if (FromDateval < Todateval) {
                return true;
        }
        if (FromDateval > Todateval) {
                noty({ text: 'Enter valid Data range !', type: 'information', dismissQueue: false,
                    layout: 'bottom', theme: 'defaultTheme'
                });
                return false;
        }
//        if (FromDateval != "" && Todateval == "") {
//            noty({ text: 'Enter valid Data range !', type: 'information', dismissQueue: false,
//                layout: 'bottom', theme: 'defaultTheme'
//            });
//            return false;
//        }
        return true;
    }

    function setGridParameters() {
        //showing empty grid
        gridContainerDiv = "#grdSearchResults";
        ToggleButton = "#viewdetails";
        columns =
        [
            { id: "dmNo", name: "DM No", field: "DMNumber", sortable: true , cssClass:"cell-text-align"},
            { id: "contract", name: "Contract", field: "ContractNo", sortable: true },
            { id: "licensor", name: "Licensor", field: "LicenseNo", sortable: true },
            { id: "ContractEntity", name: "Contract Entity", field: "ContractEntity", sortable: true },
            { id: "MainLicensee", name: "Main Licensee", field: "MainLicensee", sortable: true },
            { id: "Method", name: "Method", field: "AmortMethod", sortable: true },
            { id: "date", name: "Date", field: "MemoDate", sortable: true },
            { id: "type", name: "Type", field: "Type", sortable: true },
            { id: "currency", name: "Currency", field: "Currency", sortable: true },
            { id: "status", name: "Status", field: "Status", sortable: true },
            { id: "SignQARequired", name: "SignQA Required?", field: "SignQARequired", sortable: true }
      ];

        visiblecolumns = null;

        options =
        {
            enableCellNavigation: true,
            enableColumnReorder: false,
            forceFitColumns: true,
            multiColumnSort: true,
            editable: true,
            asyncEditorLoading: false,           
            showHeaderRow: true,            
            explicitInitialization: true

        };

        actionParameters = {
            DMNumber_Search: $("#DMNumber_Search").val(),
            ContractNo: $("#ContractNo").val(),
            Status: $("#Status").val(),
            AmortMethod: $("#AmortMethod").val(),
            FromDate: $("#FromDate").val(),
            ToDate: $("#ToDate").val()
        };

        //selected dmNumber from the grid will be available in the global variable 'selectedvalue' 
        idfield = "DMNumber";
        gridwidth = 600;
        gridheight = 410;
    }

    function ResetButtonClick() {
        clearAllMessages();
        $("#DMNumber_Search").val("");
        $("#ContractNo").val("");
        $("#Status").val("All");
        $("#AmortMethod").val("");
        $("#FromDate").val("");
        $("#ToDate").val("");
       DisplayGrid("");

    }

    function viewDetails_click() {
//        if (selectedvalue != null) 
//        {
//          var path=baseaddress + '?DMNumber=' + selectedvalue[0] + '&Status=' + selectedvalue[1];
//          window.open(baseaddress + '?DMNumber=' + selectedvalue[0] + '&Status=' + selectedvalue[1]);
//      }
      if (selectedvalue != null) {
          var path = baseaddress + '?DMNumber=' + selectedvalue[0] + '&Status=' + selectedvalue[1];
          var height = screen.availHeight;
          var width = screen.availWidth;

          var fullscreen = (document.all) ? "no" : "yes";
          var resizable = "no";
          var toolbar = 1;
          var status = 1;
          var left = 0;
          var top = 0;

          //set window properties
          props = "toolbar=yes" + ",fullscreen=" + fullscreen + ",status=yes" + ",resizable=no" +",scrollbars=yes" + ",menubar=yes" + ",location=no" + ",";
          dims = "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top;

          var win = window.open(path,'_self',false, name, props + dims);
          win.resizeTo(width, height);
          win.location.href = path;
          win.focus();
      }
      else if (selectedvalue == null) {
          alert("Please select a row");
      }
    }


    function OpenAmortizationLookup() {

        var lookupInvokerControl = "#AmortMethod";
     

        var actionParameters = null;

        var columns = [
            { id: "FsrValue1", name: "FsrValue1", field: "FsrValue1" },
            { id: "FsrDesc1", name: "FsrDesc1", field: "FsrDesc1",width:200},
            { id: "FsrValue2", name: "FsrValue2", field: "FsrValue2" },
            { id: "FsrDesc2", name: "FsrDesc2", field: "FsrDesc2" ,width:200},
            { id: "FsrValue3", name: "FsrValue3", field: "FsrValue3" },
            { id: "FsrDesc3", name: "FsrDesc3", field: "FsrDesc3" },
            { id: "FsrValue4", name: "FsrValue4", field: "FsrValue4" },
            { id: "FsrDesc4", name: "FsrDesc4", field: "FsrDesc4" }

        ];

        var options = {
            enableCellNavigation: true,
            enableColumnReorder: false,
            forceFitColumns: true

        };

        //selected dmNumber from the grid will be available in the global variable 'selectedvalue' 
        var idfield = "FsrValue1";
        var gridwidth = 900;
        var gridheight = 500;
        var title = "Method Details";
        //ShowLookup(lookupInvokerControl, amortlookupactionUrl, actionParameters, columns, options, idfield, gridwidth, gridheight, title);
                
         ShowCommonLookup(amortlookupactionUrl, actionParameters, columns, lookupInvokerControl, idfield, title,null);
        
    };

    var SelectedRowData;
    function SetLookupDataToInvoker(SelectedRowData, lookupInvokerControl) {
        if (SelectedRowData != null) {
            $(lookupInvokerControl).val(SelectedRowData.FsrValue1);
        }
        $(lookupInvokerControl).focus();
    }


    function ResetControls() {
        if (resetflag == 0) {
            DMNumber_searchvalue = $("#DMNumber_Search").val();
            $("#DMNumber_Search").val("");
            contractnovalue = $("#ContractNo").val();
            $("#ContractNo").val("");
            statusvalue = $("#Status").val();
            $("#Status").val("");
            amortizationvalue = $("#AmortMethod").val();
            $("#AmortMethod").val("");
            fromdatevalue = $("#FromDate").val();
            $("#FromDate").val("");
            todatevalue = $("#ToDate").val();
            $("#ToDate").val("");
            DisplayGrid("");
            clearAllMessages();
            resetflag = 1;
        }
        else if (resetflag == 1) {
            $("#DMNumber_Search").val(DMNumber_searchvalue);
            $("#ContractNo").val(contractnovalue);
            $("#Status").val(statusvalue);
            $("#AmortMethod").val(amortizationvalue);
            $("#FromDate").val(fromdatevalue);
            $("#ToDate").val(todatevalue);
            resetflag = 0;
        }
    };



//    function DealMemoSearch() {     
//        clearAllMessages();
//        setGridParameters();
//        ShowProgressBar();
//        if (validDateError()) {
//            $.ajax({
//                url: dmsearchactionUrl,
//                type: "GET",
//                dataType: 'Json',
//                data: actionParameters,
//                success: function (data) {
//                    if (data.length > 0) {
//                        if (data[0].DMNumber == null) {
//                            showMessage("No matching records found.", "warning");
//                            setfooter(gridContainerDiv, 0, 0);
//                        }
//                        else {
//                            showMessage("Search Completed.", "information");
//                        }
//                    }
//                    gridwidth = $(gridContainerDiv).width();
//                    $(gridContainerDiv).css({ "width": gridwidth + "px", "height": gridheight });
//                    dataView = new Slick.Data.DataView();
//                    grid = new Slick.Grid(gridContainerDiv, dataView, columns, options);
//                    grid.setSelectionModel(new Slick.RowSelectionModel());
//                    if (visiblecolumns != null) {
//                        grid.setColumns(visiblecolumns);
//                    }
//                    grid.onClick.subscribe(function (e, args) {
//                        clearAllMessages();
//                        //                    var cell = grid.getCellFromEvent(e);
//                        //                    var row = cell.row;
//                        //                    selectedvalue[0] = data[cell.row][idfield];
//                        //                    selectedvalue[1] = data[cell.row].Status;
//                        //                    setfooter(gridContainerDiv, row + 1, data.length);
//                        //                    DisableToggleButton(ToggleButton, false);
//                        if ((data[0].DMNumber != "")) {
//                            if (grid.getActiveCell() != null) {
//                                selectedvalue[0] = dataView.getItem(grid.getActiveCell().row)[idfield];
//                                selectedvalue[1] = dataView.getItem(grid.getActiveCell().row).Status;
//                                setfooter(gridContainerDiv, grid.getActiveCell().row + 1, data.length);
//                                DisableToggleButton(ToggleButton, false);
//                            }
//                        }
//                        else {
//                            setfooter(gridContainerDiv, 0, 0);
//                            DisableToggleButton(ToggleButton, true);
//                        }
//                    });



//                    grid.onSelectedRowsChanged.subscribe(function (e, args) {
//                        clearAllMessages();
//                        //alert(JSON.stringify(grid.getSelectedRows()));
//                        if (grid.getActiveCell() != null) {
//                            selectedvalue[0] = dataView.getItem(grid.getActiveCell().row)[idfield];
//                            selectedvalue[1] = dataView.getItem(grid.getActiveCell().row).Status;
//                            setfooter(gridContainerDiv, grid.getActiveCell().row + 1, data.length);
//                            DisableToggleButton(ToggleButton, false);
//                        }
//                    });

//                    grid.onSort.subscribe(function (e, args) {
//                        clearAllMessages();
//                        SortGrid(args, dataView);
//                        grid.setActiveCell(0, 0);

//                    });
//                    FilterGridWithRowCount(grid, dataView, gridContainerDiv);
//                    grid.init();
//                    if (data.length == 0) {
//                        data = [];
//                        //data[0] = { "DMNumber": "", "ContractNo": "", "LicenseNo": "", "ContractEntity": "", "MainLicensee": "", "AmortMethod": "", "MemoDate": "", "Type": "", "Currency": "", "Status": "", "SignQARequired": "" };

//                        setfooter(gridContainerDiv, 0, 0);
//                        DisableToggleButton(ToggleButton, true);
//                    }
//                    else if (data[0].DMNumber == null) {
//                        setfooter(gridContainerDiv, 0, 0);
//                        DisableToggleButton(ToggleButton, true);
//                    }
//                    else {
//                        selectedvalue[0] = data[0.0][idfield];             //  selectedvalue = data[cell.row][idfield];
//                        selectedvalue[1] = data[0.0].Status;
//                        setfooter(gridContainerDiv, 1, data.length);
//                        DisableToggleButton(ToggleButton, false);
//                    }
//                    dataView.beginUpdate();
//                    dataView.setItems(data, 'DMNumber');
//                    dataView.setFilter(filter);
//                    dataView.endUpdate();
//                    var rows = [];
//                    rows.push(0);
//                    grid.setSelectedRows(rows);
//                },
//                error: function () {
//                    if ($.noty.closeAll()) {
//                        noty({ text: 'error fetching data.Please try again', type: 'warning', dismissQueue: false,
//                            layout: 'bottom', theme: 'defaultTheme'
//                        });
//                    }
//                }
//            });                                //end of ajax call
//        }
//        else {
//            DisplayGrid("");
//        }
//        RemoveProgressBar();
//    };

    function LoadBlankgrid() {

        columns1 =
        [
            { id: "dmNo", name: "DM No", field: "DMNumber"},
            { id: "contract", name: "Contract", field: "ContractNo"},
            { id: "licensor", name: "Licensor", field: "LicenseNo"},
            { id: "ContractEntity", name: "Contract Entity", field: "ContractEntity"},
            { id: "MainLicensee", name: "Main Licensee", field: "MainLicensee"},
            { id: "Method", name: "Method", field: "AmortMethod"},
            { id: "date", name: "Date", field: "MemoDate"},
            { id: "type", name: "Type", field: "Type"},
            { id: "currency", name: "Currency", field: "Currency"},
            { id: "status", name: "Status", field: "Status"},
            { id: "SignQARequired", name: "SignQA Required?", field: "SignQARequired"}
      ];
        emptyoptions = {
            enableCellNavigation: true,
            enableColumnReorder: false,
            forceFitColumns: true
        }
        idfield = "DMNumber";
        gridwidth = 600;
        gridheight = 410;
        gridContainerDiv = "#grdSearchResults";
        ToggleButton = "#viewdetails";
      var data = [];  
  //data[0] = { "DMNumber": "", "ContractNo": "", "LicenseNo": "", "ContractEntity": "", "MainLicensee": "", "AmortMethod": "", "MemoDate": "", "Type": "", "Currency": "", "Status": "", "SignQARequired": "" };
      grid = new Slick.Grid(gridContainerDiv, data, columns1, emptyoptions);
      setfooter(gridContainerDiv, 0, 0);
//        DisableToggleButton(ToggleButton1, true);
//        DisableToggleButton(ToggleButton2, true);
    }
    function DealMemoSearch() {
        clearAllMessages();
        setGridParameters();
        ShowProgressBar();
        if (validDateError()) {
            $.ajax({
                url: dmsearchactionUrl,
                type: "GET",
                dataType: 'Json',
                data: actionParameters,
                success: function (data)
                 {
                    if (data.length > 0) {
                        if (data[0].DMNumber == null) {
                            showMessage("No matching records found.", "warning");
                            setfooter(gridContainerDiv, 0, 0);
                            DisplayGrid("");
                        }
                        else {
                            showMessage("Search Completed.", "information");
                            DisplayGrid(data);
                        }
                    }                   
                   
                },
                error: function () {
                    if ($.noty.closeAll()) {
                        noty({ text: 'error fetching data.Please try again', type: 'warning', dismissQueue: false,
                            layout: 'bottom', theme: 'defaultTheme'
                        });
                    }
                }
            });                                //end of ajax call
        }
        else {
            DisplayGrid("");
        }
        RemoveProgressBar();
    };
    function DisplayGrid(data) {    
        gridwidth = $(gridContainerDiv).width();
        $(gridContainerDiv).css({ "width": gridwidth + "px", "height": gridheight });     
            dataView = new Slick.Data.DataView();
            grid = new Slick.Grid(gridContainerDiv, dataView, columns, options);
            grid.setSelectionModel(new Slick.RowSelectionModel());
            if (visiblecolumns != null) {
                grid.setColumns(visiblecolumns);
            }
            if ((grid.getSelectedRows() != null) && dataView.getItem(grid.getSelectedRows()) != null)             
            {
                selectedvalue[0] = dataView.getItem(getSelectedRows()[0])[idfield];
                selectedvalue[1] = dataView.getItem(getSelectedRows()[0]).Status;
            }
            grid.onClick.subscribe(function (e, args) {
                clearAllMessages();
                //                    var cell = grid.getCellFromEvent(e);
                //                    var row = cell.row;
                //                    selectedvalue[0] = data[cell.row][idfield];
                //                    selectedvalue[1] = data[cell.row].Status;
                //                    setfooter(gridContainerDiv, row + 1, data.length);
                //                    DisableToggleButton(ToggleButton, false);
                
                    if (grid.getActiveCell() != null) {

                        selectedvalue[0] = dataView.getItem(grid.getActiveCell().row)[idfield];
                        selectedvalue[1] = dataView.getItem(grid.getActiveCell().row).Status;
                        setfooter(gridContainerDiv, grid.getActiveCell().row + 1, data.length);
                        DisableToggleButton(ToggleButton, false);
                    }
              
            });
            
            grid.onSelectedRowsChanged.subscribe(function (e, args) {
                //alert(JSON.stringify(grid.getSelectedRows()));
                if (grid.getActiveCell() != null) {
                    selectedvalue[0] = dataView.getItem(grid.getActiveCell().row)[idfield];
                    selectedvalue[1] = dataView.getItem(grid.getActiveCell().row).Status;
                    setfooter(gridContainerDiv, grid.getActiveCell().row + 1, data.length);
                    DisableToggleButton(ToggleButton, false);
                }
            });

            grid.onSort.subscribe(function (e, args) {
                SortGrid(args, dataView);
                grid.setActiveCell(0, 0);

            });
            FilterGridWithRowCount(grid, dataView, gridContainerDiv);
            $(grid.getHeaderRow()).click(function () {
                DisableToggleButton(ToggleButton, true);
            });
            grid.init();
            if (data.length == 0) {
                data = [];
               // data[0] = { "DMNumber": "", "ContractNo": "", "LicenseNo": "", "ContractEntity": "", "MainLicensee": "", "AmortMethod": "", "MemoDate": "", "Type": "", "Currency": "", "Status": "", "SignQARequired": "" };

                setfooter(gridContainerDiv, 0, 0);
                DisableToggleButton(ToggleButton, true);
            }
            else {
                selectedvalue[0] = data[0.0][idfield];             //  selectedvalue = data[cell.row][idfield];
                selectedvalue[1] = data[0.0].Status;
                setfooter(gridContainerDiv, 1, data.length);
                DisableToggleButton(ToggleButton, false);
            }
            dataView.beginUpdate();
            dataView.setItems(data, 'DMNumber');
            dataView.setFilter(filter);
            dataView.endUpdate();
            var rows = [];
            rows.push(0);
            grid.setSelectedRows(rows);
              
    }