        var HistoryGridData = [];
        var historyGrid;
        var gridContainerDivHistoryGrid = "#HistoryGrid";

        var hcolumns = [
    { id: "FromStatus", name: "From Status", field: "FromStatus" },
    { id: "Action", name: "Action", field: "Action" },
    { id: "ToStatus", name: "To Status", field: "ToStatus" },
    { id: "EntryDate", name: "Entry Date", field: "EntryDate", formatter: Slick.Formatters.Date},
    { id: "User", name: "User", field: "User" },
    { id: "QAComment", name: "QA Comments", field: "QAComment" }
  ];

        var hoptions = {
            enableCellNavigation: true,
            editable: false,
            enableColumnReorder: false,
            forceFitColumns: true
        };

        $(function () {

            gridwidth = $("#HistoryGrid").width();
            $("#HistoryGrid").css({ "width": gridwidth - 1 + "px" });

            loadHistory();
        });


        function loadHistory() {

            $.ajax({
                url: GetHistoryactionurl,
                type: "GET",
                dataType: 'Json',
                data: "dmNumber=" + $("#DMVo_DMNumber").val(),

                success: function (data) {
                    HistoryGridData = data;
                    historyGrid = new Slick.Grid("#HistoryGrid", HistoryGridData, hcolumns, hoptions);
                    historyGrid.setSelectionModel(new Slick.RowSelectionModel());
                    historyGrid.setSelectedRows([0, 0]);

                    if (HistoryGridData.length > 0)
                        setfooter(gridContainerDivHistoryGrid, 1, HistoryGridData.length);
                    else
                        setfooter(gridContainerDivHistoryGrid, 0, 0);

                    historyGrid.onClick.subscribe(function (e, args) {
                        var cell = historyGrid.getCellFromEvent(e);
                        var row = cell.row;
                        historyGrid.setSelectionModel(new Slick.RowSelectionModel());
                        setfooter(gridContainerDivHistoryGrid, args.row + 1, HistoryGridData.length);

                    });
                },
                error: function () {
                    //alert("error");
                }
            });
        }