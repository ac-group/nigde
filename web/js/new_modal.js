(function($) {

    $('#sample5').change(function() {
        if ($('#sample5').val() == 'погодинна') {
            $('.hour_inp').addClass('visible');
        } else {
            $('.hour_inp').removeClass('visible');
        }
    });

    var prizn_count = 0;

    $('.prizn_add').click(function(){

        var prizn_elem = '<div class="input_div w100">';
        prizn_elem += '<div class="mdl-textfield mdl-js-textfield has-placeholder is-upgraded">';
        prizn_elem += '<input class="mdl-textfield__input" type="text" id="right_input_17_'+prizn_count+'" placeholder="Цільове призначення" />';
        prizn_elem += '<label class="mdl-textfield__label" for="right_input_17_'+prizn_count+'"></label>';
        prizn_elem += '</div>';
        prizn_elem += '<button class="mdl-button mdl-js-button mdl-button--icon prizn_delete">';
        prizn_elem += '<i class="material-icons">remove</i>';
        prizn_elem += '</button>';
        prizn_elem += '</div>';
        $(this).parent('.w100').parent('.prizn_child').append(prizn_elem);
        prizn_count = prizn_count + 1;
    });


    $("body").on("click", ".prizn_delete", function() {
        $(this).parent('.w100').remove();
    });

    $("body").on("focus", ".w100 .mdl-textfield", function() {
        $(this).addClass('is-focused');
    });
    $("body").on("focusout", ".w100 .mdl-textfield", function() {
        $(this).removeClass('is-focused');
    });


})(jQuery);
