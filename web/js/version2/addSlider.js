function addSlider(map) {

var flag_slide = true;

    //Показываем/убираем слайдер
    $('.mdl-navigation__level2>a.mdl-navigation__level3').on('click', function () {
        if ($(this).hasClass('active')) {
           // console.log($(this).children('div.slider'));
            if( $(this).children('div').hasClass('slider_tr')  ){
                $(this).children('div.slider_tr').show();
            }

        } else {
            $(this).children('div.slider_tr').hide();
        }
    });

    //Добавляем слайдер для каждого слоя где есть дочерный div с склассом "slider" и id =  "slider_" + "id" слоя.
    // пример - <div id="slider_dynamicSidebar" class="slider"></div>

    $.each($('.mdl-navigation__level2>a.mdl-navigation__level3'), function (index, value) {
        if($(this).children('div').hasClass('slider_tr')){
            var elem = $(this);
            var idLayer = $(this).attr('id');
            //var idSlider = 'slider_' + idLayer;
            map.getLayers().forEach(function (layer, i) {
                if(idLayer == layer.get('name')){
                    console.log(elem.children('div.slider_tr'));
                    var slider = elem.children('div.slider_tr').slider({
                        value: layer.getOpacity() * 100,
                        range: "min"
                    })
                    slider.on('slide', function (ev, ui) {
                        layer.setOpacity(ui.value / 100);
                    });
                }
            });
        }
    })
}
