/***
* Contains basic SlickGrid editors.
* @module Editors
* @namespace Slick
*/

(function ($) {

    // register namespace
    $.extend(true, window, {
        "Slick": {
            "Editors": {
                "Text": TextEditor,
                "Integer": IntegerEditor,
                "Date": DateEditor,
                "YesNoSelect": YesNoSelectEditor,
                "Checkbox": CheckboxEditor,
                "PercentComplete": PercentCompleteEditor,
                "LongText": LongTextEditor,
                "Select": selectRangeEditor
//                , "Double": DoubleEditor
            }
        }
    });



    //    function selectRangeEditor(args) {
    //        var ComboData = "";
    //        var $select;
    //        var defaultValue;
    //        var scope = this;
    //        this.init = function () {
    //            //Start of ajax call.
    //          
    //			$select = $(ComboList);
    //                    
    //                    $select.appendTo(args.container);
    //                    if(CurComboVal!=null || typeof CurComboVal!='undefined')
    //                    {
    //                        $select.val(CurComboVal);
    //                    }
    //                    $select.focus();
    //        };

    //        this.destroy = function () {
    //            CurComboText = $(".editor-yesno option:selected").text();
    //            CurComboVal = $select.val();
    //            $select.remove();
    //        };

    //        this.focus = function () {
    //            $select.focus();
    //        };

    //        this.loadValue = function (item) {
    //            //$select.val((defaultValue = item[args.column.field]) ? "--Select One--" : "--Select One--");           
    //            //$select.remove();
    //        };

    //        this.serializeValue = function () {
    //            //return ($select.val() == "-1");
    //        };

    //        this.applyValue = function (item, state) {
    //            //item[args.column.field] = $select.val();
    //            item[args.column.field] = $(".editor-yesno option:selected").text();
    //            CurComboText = $(".editor-yesno option:selected").text();
    //            CurComboVal = $select.val();
    //        };

    //        this.isValueChanged = function () {
    //        
    //            return ($select.val() != defaultValue);
    //        };

    //        this.validate = function () {
    //            if ($select.val() == "-1") {
    //                return {
    //                    valid: false,
    //                    msg: "Please select value"
    //                };
    //            }

    //            return {
    //                valid: true,
    //                msg: null
    //            };
    //        };
    //        this.init();
    //    }

    function selectRangeEditor(args) {
        var ComboData = "";
        var $select;
        var defaultValue;
        var scope = this;
        this.init = function () {
            //Start of ajax call.
            $.ajax({
                type: "GET",
                url: SelectedUrl,
                data: "{}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    //ComboData += "<option label='--Select One--' value='-1' selected='selected'>--Select One--</option>";
                    $.each(data, function (index, item) {
                        ComboData += "<option label='" + item.Val + "' value='" + item.ID + "'>" + item.Val + "</option>";
                    })
                    //End of ajax call.   
                    $select = $("<SELECT tabIndex='0' class='editor-yesno'>" + ComboData + "</SELECT>");
                    $select.appendTo(args.container);
                    $select.focus();
                }
            });
        };

        this.destroy = function () {
            $select.remove();
        };

        this.focus = function () {
            $select.focus();
        };

        this.loadValue = function (item) {
            $select.val((defaultValue = item[args.column.field]) ? "--Select One--" : "--Select One--");
            $select.val();
            $select.remove();
        };

        this.serializeValue = function () {
            return ($select.val() == "-1");
        };

        this.applyValue = function (item, state) {
            //item[args.column.field] = $select.val();
            item[args.column.field] = $(".editor-yesno option:selected").text();
            CurComboVal = $select.val();
        };

        this.isValueChanged = function () {
            return ($select.val() != defaultValue);
        };

        this.validate = function () {
            if ($select.val() == "-1") {
                return {
                    valid: false,
                    msg: "Please select value"
                };
            }

            return {
                valid: true,
                msg: null
            };
        };
        this.init();
    }



    function TextEditor(args) {
        var $input;
        var defaultValue;
        var scope = this;

        this.init = function () {
            $input = $("<INPUT type=text class='editor-text' />")
          .appendTo(args.container)
          .bind("keydown.nav", function (e) {
              if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
                  e.stopImmediatePropagation();
              }
          })
          .focus()
          .select();
        };

        this.destroy = function () {
            $input.remove();
        };

        this.focus = function () {
            $input.focus();
        };

        this.getValue = function () {
            return $input.val();
        };

        this.setValue = function (val) {
            $input.val(val);
        };

        this.loadValue = function (item) {

            defaultValue = item[args.column.field] || "";
            $input.val(defaultValue);
            $input[0].defaultValue = defaultValue;
            $input.select();
        };

        this.serializeValue = function () {
            return $input.val();
        };

        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };

        //        this.isValueChanged = function () {
        //        
        //            return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
        //        };


        this.isValueChanged = function () {

            var attuale = $input.val();

            if (attuale.length == 0) {

                return true;
            }

            if ((attuale.length > 0) && (attuale != defaultValue))
                return true;
            else if ((attuale == defaultValue) && (attuale.length > 0))
                return false;
            else if ((attuale.length == 0) && ((undefined === defaultValue) || (defaultValue == "")))
                return true;
            else
                return false;
        };

        this.validate = function () {
            if (args.column.validator) {
                var validationResults = args.column.validator($input.val());
                if (!validationResults.valid) {
                    return validationResults;
                }
            }

            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    }

    function IntegerEditor(args) {
        var $input;
        var defaultValue;
        var scope = this;

        this.init = function () {
            $input = $("<INPUT type=text class='editor-text' />");

            $input.bind("keydown.nav", function (e) {
                if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
                    e.stopImmediatePropagation();
                }
            });

            $input.appendTo(args.container);
            $input.focus().select();
        };

        this.destroy = function () {
            $input.remove();
        };

        this.focus = function () {
            $input.focus();
        };

        this.loadValue = function (item) {
            defaultValue = item[args.column.field];
            $input.val(defaultValue);
            $input[0].defaultValue = defaultValue;
            $input.select();
        };

        this.serializeValue = function () {
            return parseInt($input.val(), 10) || 0;
        };

        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };

        this.isValueChanged = function () {
            return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
        };

        this.validate = function () {
            if (isNaN($input.val())) {
                return {
                    valid: false,
                    msg: "Please enter a valid integer"
                };
            }

            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    }


//    function DoubleEditor(args) {
//        var $input;
//        var defaultValue;
//        var scope = this;

//        this.init = function () {
//            $input = $("<INPUT type=text class='editor-text' />");

//            $input.bind("keydown.nav", function (e) {
//                if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
//                    e.stopImmediatePropagation();
//                }
//            });

//            $input.appendTo(args.container);
//            $input.focus().select();
//        };

//        this.destroy = function () {
//            $input.remove();
//        };

//        this.focus = function () {
//            $input.focus();
//        };

//        this.loadValue = function (item) {
//            defaultValue = item[args.column.field];
//            $input.val(defaultValue);
//            $input[0].defaultValue = defaultValue;
//            $input.select();
//        };

//        this.serializeValue = function () {
//            return parseInt($input.val(), 10) || 0;
//        };

//        this.applyValue = function (item, state) {
//            item[args.column.field] = parseFloat(state.toString()).toFixed(4);           // state + ".0000";
//        };

//        this.isValueChanged = function () {
//            return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
//        };

//        this.validate = function () {
//            if (args.column.validator) {
//                var validationResults = args.column.validator($input.val());
//                if (!validationResults.valid) {
//                    return validationResults;
//                }
//            }

//            return {
//                valid: true,
//                msg: null
//            };
//        };

//        this.init();
//    }

    function DateEditor(args) {
        var $input;
        var defaultValue;
        var scope = this;
        var calendarOpen = false;

        this.init = function () {
            $input = $("<INPUT type=text class='editor-text' />");
            $input.appendTo(args.container);
            $input.focus().select();
            $input.datepicker({
                showOn: "button",
                buttonImageOnly: true,
                buttonImage: "../../Content/images/calendar.gif",
                beforeShow: function () {
                    calendarOpen = true
                },
                onClose: function () {
                    calendarOpen = false
                }
            });
            $input.width($input.width() - 18);
        };

        this.destroy = function () {
            $.datepicker.dpDiv.stop(true, true);
            $input.datepicker("hide");
            $input.datepicker("destroy");
            $input.remove();
        };

        this.show = function () {
            if (calendarOpen) {
                $.datepicker.dpDiv.stop(true, true).show();
            }
        };

        this.getValue = function () {
            return $input.val();
        };
        this.hide = function () {/// <reference path="slick.editors.js" />

            if (calendarOpen) {
                $.datepicker.dpDiv.stop(true, true).hide();
            }
        };

        this.position = function (position) {
            if (!calendarOpen) {
                return;
            }
            $.datepicker.dpDiv
          .css("top", position.top + 30)
          .css("left", position.left);
        };

        this.focus = function () {
            $input.focus();
        };

        this.loadValue = function (item) {
            defaultValue = item[args.column.field];
            $input.val(defaultValue);
            $input[0].defaultValue = defaultValue;
            $input.select();
        };

        this.serializeValue = function () {
            return $input.val();
        };

        this.applyValue = function (item, state) {
            var d = new Date(state);
            var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            if (d != "Invalid Date")
                item[args.column.field] = d.getDate() + "-" + month[d.getMonth()] + "-" + d.getFullYear();
            else
                item[args.column.field] = state;
        };

        this.isValueChanged = function () {
            return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
        };

        this.validate = function () {
            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    }

    function YesNoSelectEditor(args) {
        var $select;
        var defaultValue;
        var scope = this;

        this.init = function () {
            $select = $("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='yes'>Yes</OPTION><OPTION value='no'>No</OPTION></SELECT>");
            $select.appendTo(args.container);
            $select.focus();
        };

        this.destroy = function () {
            $select.remove();
        };

        this.focus = function () {
            $select.focus();
        };

        this.loadValue = function (item) {
            $select.val((defaultValue = item[args.column.field]) ? "yes" : "no");
            $select.select();
        };

        this.serializeValue = function () {
            return ($select.val() == "yes");
        };

        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };

        this.isValueChanged = function () {
            return ($select.val() != defaultValue);
        };

        this.validate = function () {
            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    }

    function CheckboxEditor(args) {
        var $select;
        var defaultValue;
        var scope = this;

        this.init = function () {
            $select = $("<INPUT type=checkbox value='true' class='editor-checkbox' hideFocus>");
            $select.appendTo(args.container);
            $select.focus();
        };

        this.destroy = function () {
            $select.remove();
        };

        this.focus = function () {
            $select.focus();
        };

        this.getValue = function () {
            return $select[0].defaultChecked;
        };

        this.loadValue = function (item) {
            defaultValue = item[args.column.field];
            if (defaultValue) {
                $select.attr("checked", "checked");
            } else {
                $select.removeAttr("checked");
            }
        };

        this.serializeValue = function () {
            return $select.attr("checked");
        };

        this.applyValue = function (item, state) {
            if (state == "checked") {
                item[args.column.field] = true;
            }
            else {
                item[args.column.field] = false;
            }
        };

        this.isValueChanged = function () {
            return ($select.attr("checked") != defaultValue);
        };

        this.validate = function () {
            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    }

    function PercentCompleteEditor(args) {
        var $input, $picker;
        var defaultValue;
        var scope = this;

        this.init = function () {
            $input = $("<INPUT type=text class='editor-percentcomplete' />");
            $input.width($(args.container).innerWidth() - 25);
            $input.appendTo(args.container);

            $picker = $("<div class='editor-percentcomplete-picker' />").appendTo(args.container);
            $picker.append("<div class='editor-percentcomplete-helper'><div class='editor-percentcomplete-wrapper'><div class='editor-percentcomplete-slider' /><div class='editor-percentcomplete-buttons' /></div></div>");

            $picker.find(".editor-percentcomplete-buttons").append("<button val=0>Not started</button><br/><button val=50>In Progress</button><br/><button val=100>Complete</button>");

            $input.focus().select();

            $picker.find(".editor-percentcomplete-slider").slider({
                orientation: "vertical",
                range: "min",
                value: defaultValue,
                slide: function (event, ui) {
                    $input.val(ui.value)
                }
            });

            $picker.find(".editor-percentcomplete-buttons button").bind("click", function (e) {
                $input.val($(this).attr("val"));
                $picker.find(".editor-percentcomplete-slider").slider("value", $(this).attr("val"));
            })
        };

        this.destroy = function () {
            $input.remove();
            $picker.remove();
        };

        this.focus = function () {
            $input.focus();
        };

        this.loadValue = function (item) {
            $input.val(defaultValue = item[args.column.field]);
            $input.select();
        };

        this.serializeValue = function () {
            return parseInt($input.val(), 10) || 0;
        };

        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };

        this.isValueChanged = function () {
            return (!($input.val() == "" && defaultValue == null)) && ((parseInt($input.val(), 10) || 0) != defaultValue);
        };

        this.validate = function () {
            if (isNaN(parseInt($input.val(), 10))) {
                return {
                    valid: false,
                    msg: "Please enter a valid positive number"
                };
            }

            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    }

    /*
    * An example of a "detached" editor.
    * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
    * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
    */
    function LongTextEditor(args) {
        var $input, $wrapper;
        var defaultValue;
        var scope = this;

        this.init = function () {
            var $container = $("body");

            $wrapper = $("<DIV style='z-index:10000;position:absolute;background:white;padding:5px;border:3px solid gray; -moz-border-radius:10px; border-radius:10px;'/>")
          .appendTo($container);

            $input = $("<TEXTAREA hidefocus rows=5 style='backround:white;width:250px;height:80px;border:0;outline:0'>")
          .appendTo($wrapper);

            $("<DIV style='text-align:right'><BUTTON  class='inputButton'>Save</BUTTON>  <BUTTON class='inputButton'>Cancel</BUTTON></DIV>")
          .appendTo($wrapper);

            $wrapper.find("button:first").bind("click", this.save);
            $wrapper.find("button:last").bind("click", this.cancel);
            $input.bind("keydown", this.handleKeyDown);

            scope.position(args.position);
            $input.focus().select();
        };

        this.handleKeyDown = function (e) {
            if (e.keyCode == 27) {
                $input.val(defaultValue);
                args.cancelChanges();
            }
            if (e.which == $.ui.keyCode.ENTER && e.ctrlKey) {
                scope.save();
            } else if (e.which == $.ui.keyCode.ESCAPE) {
                e.preventDefault();
                scope.cancel();
            } else if (e.which == $.ui.keyCode.TAB && e.shiftKey) {
                e.preventDefault();
                args.grid.navigatePrev();
            } else if (e.which == $.ui.keyCode.TAB) {
                e.preventDefault();
                args.grid.navigateNext();
            }
        };

        this.save = function () {
            args.commitChanges();
            $input.val(defaultValue);
            args.cancelChanges();
        };

        this.cancel = function () {
            $input.val(defaultValue);
            args.cancelChanges();
        };

        this.hide = function () {
            $wrapper.hide();
        };

        this.show = function () {
            $wrapper.show();
        };

        this.position = function (position) {
            $wrapper
          .css("top", position.top - 5)
          .css("left", position.left - 200)
        };

        this.destroy = function () {
            $wrapper.remove();
        };

        this.focus = function () {
            $input.focus();
        };

        this.loadValue = function (item) {
            $input.val(defaultValue = item[args.column.field]);
            $input.select();
        };

        this.serializeValue = function () {
            return $input.val();
        };

        this.getValue = function () {
            return $input.val();
        };

        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };

        this.isValueChanged = function () {
            return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
        };

        this.validate = function () {
            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    }
})(jQuery);
