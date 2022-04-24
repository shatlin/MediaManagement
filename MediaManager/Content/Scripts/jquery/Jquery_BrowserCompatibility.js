$(function () {
    /* ...AccountMenu.....*/
    if ($.browser.msie && $.browser.version.substr(0, 1) < 7) {
        $('li').has('ul').mouseover(function () {
            $(this).children('ul').show();
        }).mouseout(function () {
            $(this).children('ul').hide();
        })
    }
    /*...AccountMenu End.....*/

    /*...PlaceHoderBrowerCompatibility..... */
    var input = document.createElement("input");
    if (('placeholder' in input) == false) {
        $('[placeholder]').focus(function () {
            var i = $(this);
            if (i.val() == i.attr('placeholder')) {
                i.val('').removeClass('placeholder');
            }
        }).blur(function () {
            var i = $(this);
            if (i.val() == '' || i.val() == i.attr('placeholder')) {
                i.addClass('placeholder').val(i.attr('placeholder'));
            }
        }).blur().parents('form').submit(function () {
            $(this).find('[placeholder]').each(function () {
                var i = $(this);
                if (i.val() == i.attr('placeholder'))
                    i.val('');
            })
        });
        /*...PlaceHoderBrowerCompatibility End..... */
    }
});     