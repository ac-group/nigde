var map;
var coordinate;
var trackLayer;
var marker;
var osmLayer;
var googleLayer;
var art = ['parcelSidebar', 'vectorVinSidebar', 'wms3', 'orto10000sidebar', 'orto2000sidebar', 'dynamicSidebar', 'gryntSidebar', 'vinOrtoSidebar', 'topoVinSidebar'];


function showUP(layer, elem) {


    map.getLayers().forEach(function (l, i) {
        if (($.inArray(l.get('name'), art)) > -1) {
            if (l.get('name') === layer) {
                l.setVisible(true);
                // addclass(.on_layer)
                $(elem).addClass('on_layer');
            }
        }
    });
}
function showDOWN(layer) {


    map.getLayers().forEach(function (l, i) {
        if (($.inArray(l.get('name'), art)) > -1) {
            if (l.get('name') === layer) {
                l.setVisible(false);
            }
        }
    });
}

function toggleOL(layer, elem) {

    map.getLayers().forEach(function (l, i) {
        if (($.inArray(l.get('name'), art)) > -1) {
            if (l.get('name') === layer ) {
                if (l.getVisible() == true && !elem.hasClass('active')) {
                    l.setVisible(false);
                    // delclass(.on_layer)
                    $(elem).removeClass('on_layer');
                } else {
                    l.setVisible(true);
                }
            }
        }
    });
}

function toggleChevron(e) {
    $(e.target)
        .prev('.panel-heading')
        .find("i.indicator")
        .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
}

function toggleUP(e) {
    //   var id = $('#accordion .in').parent().attr("id");
    var trg = $(e.target)
        .prev('.panel-heading');
    trg.find("a")
        .addClass('active');
    trg.find("i.indicator")
        .addClass('active');
//    swtch($(e.target).attr('id'));
}

function toggleDOWN(e) {
    var trg = $(e.target)
        .prev('.panel-heading');
    trg.find("a")
        .removeClass('active');
    trg.find("i.indicator")
        .removeClass('active');
}

function layersOff(map){
    $('.mdl-navigation__level3').click(function () {

        if($(this).hasClass('active')){

            $(this).closest('.mdl-navigation__level2').prev().find('.layersOff').show().children('label').addClass('is-checked');
        }else{
            var isActive = false;

            $(this).closest('.mdl-navigation__level2').find('a.mdl-navigation__link').each(function(){
               if($(this).hasClass('active')){
                   isActive = true;
                   return false;
               }
            });

            if(isActive == false){

                $(this).closest('.mdl-navigation__level2').prev().find('.layersOff').hide().removeClass('is-checked');


            }
        }
    });

//    $('.mdl-navigation__level1').prepend('<div class="layersOff"><label class="mdl-checkbox mdl-js-checkbox" for="checkbox2"><input type="checkbox" id="checkbox2" class="mdl-checkbox__input"><span class="mdl-checkbox__label"></span></label></div></label>');
    $('.mdl-navigation__level1').prepend('<div class="layersOff"><label class="mdl-checkbox mdl-js-checkbox" for="checkbox2"><input type="checkbox" id="checkbox2" class="mdl-checkbox__input"><span class="mdl-checkbox__label"></span><span class="mdl-checkbox__focus-helper"></span><span class="mdl-checkbox__box-outline"><span class="mdl-checkbox__tick-outline"></span></label></div>');
    $('.layersOff').on('mousedown',function (event) {
        var layersName = [];
        $(this).parents('.mdl-navigation__level1').next().find('a.mdl-navigation__link').each(function(){
            //console.log(this);
            $(this).next('form').slideUp(500);
            $(this).removeClass('active');
            $(this).children('.ui-slider').hide();
            $(this).children('.legend-button').hide();
            if($(this).children('.legend-button').hasClass('active')){
               $('.legend-button').removeClass('active')
                $('.new_legend').hide();
            }
            layersName.push($(this).attr('href').substring(1));
        });

        if( $(this).parents('.mdl-navigation__level1').next('.mdl-navigation__level2').css('display') == 'none'){
            $(this).parents('.mdl-navigation__level1').removeClass('active');
        }

        if(layersName.length > 0){
            map.getLayers().forEach(function(layer) {
                if(layer.get('name') != undefined){
                    if((layersName.indexOf(layer.get('name'))) != -1 ){
                        layer.setVisible(false);
                    }
                }
            });
        }
        $('#slider_wms3').hide();
        $(this).prop('checked', false).hide();
        event.stopPropagation();
    });

}

function getLayerName(){

}

function addLegend(map) {
    var urlGeoServer = '/geoserver';
    var layerOn = '';
    var url = '';
    $('.mdl-navigation__level3').prepend('<button class="legend-button mdl-button mdl-js-button mdl-button--icon new_menu_but" data-upgraded=",MaterialButton"><i class="material-icons">keyboard_arrow_right</i></button>');

    $('.mdl-navigation__level3').click(function () {
        if ($(this).hasClass('active')) {
            $(this).children('.legend-button').show();
        } else {
            $(this).children('.legend-button').hide();
        }
    });
    var ifChange = false;
    $('.legend-button').click(function (event) {


        if($(this).hasClass("active")){
            $(this).removeClass("active");
            $('.new_legend').hide();
            $('.legend').hide();
        }else{
            $('.legend-button').removeClass('active');
            $(this).addClass("active");
            $('.new_legend').show();


            layerName = $(this).parent().attr('href');
            layerName = layerName.substring(1);
            map.getLayers().forEach(function (layer) {
                if (layer.get('name') == layerName) {
                    layerOn = layer.getSource().getParams().LAYERS;
                }
            });
            var layerName = $(this).parent().text();
            var reg = /[a-zA-Z0-9._]/gi;
            layerName = layerName.replace(reg, '');
            layerName = layerName.trim();
            url = urlGeoServer + '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=50&HEIGHT=30&LAYER=' + layerOn;
            $('.new_legent_title').text('Умовні знаки (' + layerName+')');
            $('.new_legend img').attr('src', url);
        }

        ifChange = true;
        event.stopPropagation();

    });

    $('input[name=legend-radio]').change(function (event) {

        if (ifChange == false) {
            $('.legend').hide();
            $(this).removeAttr("checked");
            $(this).next().removeClass('active');
        } else {
            $('.arrow_box').removeClass('active');
            $(this).next().addClass('active');
            $('.legend').show();
            layerName = $('input[name=legend-radio]:checked').parent().attr('href');
            layerName = layerName.substring(1);
            map.getLayers().forEach(function (layer) {
                if (layer.get('name') == layerName) {
                    layerOn = layer.getSource().getParams().LAYERS;
                }
            });
            var layerName = $(this).parent().text();
            var reg = /[a-zA-Z0-9._]/gi;
            layerName = layerName.replace(reg, '');
            layerName = layerName.trim();
            url = urlGeoServer + '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=50&HEIGHT=30&LAYER=' + layerOn;
            $('.legend').html('Умовні знаки (' + layerName + ')<br><img  src="' + url + '">')
        }
    });

}
function checkIp() {
    var idTicketit = $('#id_ticketit').val();
    var checkIp;
    $.ajax({
        url: '/checkIp',
        type: 'POST',
        async: false,
        dataType: "json",
        data: {
            'idTicketit': idTicketit
        },
        success: function (data) {
            checkIp = data.ifIp;
        }
    });
    return checkIp;
}

//Useful Functions
function checkBin(n){return/^[01]{1,64}$/.test(n)}
function checkDec(n){return/^[0-9]{1,64}$/.test(n)}
function checkHex(n){return/^[0-9A-Fa-f]{1,64}$/.test(n)}
function pad(s,z){s=""+s;return s.length<z?pad("0"+s,z):s}
function unpad(s){s=""+s;return s.replace(/^0+/,'')}

//Decimal operations
function Dec2Bin(n){if(!checkDec(n)||n<0)return 0;return n.toString(2)}
function Dec2Hex(n){if(!checkDec(n)||n<0)return 0;return n.toString(16)}

//Binary Operations
function Bin2Dec(n){if(!checkBin(n))return 0;return parseInt(n,2).toString(10)}
function Bin2Hex(n){if(!checkBin(n))return 0;return parseInt(n,2).toString(16)}

//Hexadecimal Operations
function Hex2Bin(n){if(!checkHex(n))return 0;return parseInt(n,16).toString(2)}
function Hex2Dec(n){if(!checkHex(n))return 0;return parseInt(n,16).toString(10)}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function parsemaplinkURL() {
    var regex = new RegExp(/\/maplink\/([0-9.]+)\/([0-9.]+)\/([0-9.]+)\/([0-9.]+)\/([0-9.]+)$/),
        result = regex.exec(window.location.href);
        return result;
}

function select(element) {
    var selectedText;

    if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        element.focus();
        element.setSelectionRange(0, element.value.length);

        selectedText = element.value;
    }
    else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }

        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);

        selectedText = selection.toString();
    }

    return selectedText;
}

function geolocation(map){

    if($('#main_tt4').hasClass('active')){

        var trackStyle = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'rgba(0,0,255,1.0)',
                width: 3,
                lineCap: 'round'
            })
        });

        // use a single feature with a linestring geometry to display our track
        var trackFeature = new ol.Feature({
            geometry: new ol.geom.LineString([])
        });

        // we'll need a vector layer to render it
        console.log(trackLayer);
        if(trackLayer === undefined){
            trackLayer = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: [trackFeature]
                }),
                style: trackStyle
            });
        }
        map.addLayer(trackLayer);
        console.log(trackLayer);


        var view = map.getView();

        // set up the geolocation api to track our position
        var geolocation = new ol.Geolocation({
            tracking: true,
            projection: view.getProjection()
        });

        // bind the view's projection

        // when we get a position update, add the coordinate to the track's
        // geometry and recenter the view
        if(marker === undefined){
            $('#location').show();
            marker = new ol.Overlay({
                element: document.getElementById('location'),
                positioning: 'center-center',
            });
           // console.log($('#location').getAttribute('display'));
         //
        }
        map.addOverlay(marker);

        geolocation.on('change:position', function () {
            coordinate = geolocation.getPosition();
            console.log(coordinate);
            view.setCenter(coordinate);
            marker.setPosition(coordinate)
            trackFeature.getGeometry().appendCoordinate(coordinate);
        });
        view.setCenter(coordinate);
        var deviceOrientation = new ol.DeviceOrientation({
            tracking: true
        });
        deviceOrientation.on('change:heading', onChangeHeading);
        function onChangeHeading(event) {
            var heading = event.target.getHeading();
            view.setRotation(-heading);
        }
    } else {
        console.log(marker);
        console.log(trackLayer);
        map.removeLayer(trackLayer);
        map.removeOverlay(marker);
    }

}


$(function () {
    $('#main_tt7').on('click', function(){
        $('#modal-help').toggleClass('open');
    });

    $("#save_map_url").on('click', function() {
          var coord =  map.getView().getCenter();
          var t = ol.proj.transform(coord,'EPSG:900913','EPSG:4326');
          var str = window.location.protocol + "//" + window.location.hostname+"/maplink/"+map.getView().getZoom()+"/"+t[1]+"/"+t[0]+"/";
            var temp='';
            map.getLayers().forEach(function (l, i) {
            if (($.inArray(l.get('name'), art)) > -1) {
                if(l.getVisible()) {
                    temp+=1;
                } else { 
                    temp+=0;
                }
            }
          });

            str+=Bin2Hex(temp);
            var artbaz = ['pub', 'osm', 'OpenCycleMap', 'google', 'googlehybrid', 'vin2015', 'kiev2006','emptyRelief', 'emptyLayer', 'topoVin'];

            temp='';
            map.getLayers().forEach(function (l, i) {
                if (($.inArray(l.get('name'), artbaz)) > -1) {
                        if(l.getVisible()) {
                        temp+=1;
                    } else { 
                        temp+=0;
                    }
                }
            });             
            str+="/"+Bin2Hex(temp);
          $('#permlink').val(str);
          $('#modal-copy').toggleClass('open');
    });
 //   Вызываем модальное окно для статистики по ДТП
 //   $('#orto10000base i').tooltip();
$('body').click(function(){
    $('.tooltip-info').removeClass('active');
});
/*$('.map_mode_select ul li i').on('click', function(){
    console.log('sds');

});*/
   /* $('.tooltip-info').hover(function(){
        $('.mdl-tooltip').removeClass('is-active');

    })*/
    new Clipboard('.material-icons.buffer');
new Clipboard('.btn-copy');

    /*$('.map_mode_select .mdl-menu__item div .material-icons').click(function(){

        var target = document.getElementById("hiddenText");
        target.textContent = "sdssdsdss";
        console.log(target.textContent);
        select(target);
        document.execCommand("copy");


    });*/




    $('.mdl-menu .material-icons:not(.buffer)').on('click', function (event) {
        console.log('sds');
        if (!$(this).next().hasClass('active')) {
            $('.tooltip-info').removeClass('active');
        }
        $(this).next('.tooltip-info').toggleClass('active');
        event.stopPropagation();
    })

    $('.mdl-navigation__level3 .material-icons:not(.buffer)').on('click', function (event) {
        //console.log('sds');
        if (!$(this).parent().next().hasClass('active')) {
            $('.tooltip-info').removeClass('active');
        }
        $(this).parent().next('.tooltip-info').toggleClass('active');
        event.stopPropagation();
    })

    //$('#modal-help').modal();


//    $('.carousel').carousel();
    setTimeout(function () {

//        $('.ol-zoom').css({
//        //        position:'absolute',
//        //        left: ($(document).width() - $('.ol-zoom').outerWidth())/2,
//                top: '300 px;'
//        });       

        var windowHeight;
        var windowWidth;
        var contentHeight;
        var contentWidth;
        var isDevice = true;
        $('.bid_list_button').click(function(){
            var height = $('.layersAll').height()
            console.log($('.layersAll').height());
            if($('.bid_list').hasClass('open')){
                console.log($('.layersAll').height());
                console.log($('.bid_list-content').height());

                $('.layersAll').height(height-180);
            }else{
                $('.layersAll').height(height+180);
            }
        });
        $('.language_container').click(function(){
            if($('.language_container i').text()=="UA"){
                $('.language_container i').text("EN")
                $('.language_container .mdl-tooltip').text("English");
            }else{
                $('.language_container i').text("UA");
                $('.language_container .mdl-tooltip').text("Українською");
            }
            console.log($('.language_container i').text())
        });
        // calculations for elements that changes size on window resize
        var windowResizeHandler = function () {
            windowHeight = $(window).height();
            windowWidth = $(window).width();
            contentHeight = windowHeight - $('header').height();
            //contentWidth = windowWidth - $('.demo-drawer').width();
            //$('#leftSide').height(windowHeight);
            //$('#rightSide').height(windowHeight);
            //$('.closeLeftSide').height(contentHeight);
            $('#wrapper').height(contentHeight);

            $('#mapView').height(contentHeight);
            $('#wrapper').width(windowWidth);
            $('#content').height(contentHeight);
            $('#external_control').css({top: windowHeight / 2});
            var mapCenterWidth = $('.map-center').width();
            var mapCenterHeigth = $('.map-center').width();
            $('.map-center').css('left', (windowWidth - mapCenterWidth) / 2);
            $('.map-center').css('top', (windowHeight - mapCenterHeigth) / 2);

            var logoWidth = $('.head_block_logo').width();
            $('.head_block_logo').css('left', (windowWidth -logoWidth)/2);
            var carousel_block_height = $('.carousel-block').height();
            if($('.carousel-block').closest('.bx-wrapper').css('display') == 'none'){
                carousel_block_height = 0;
            }
            $('.layersAll').height(windowHeight-$('.bid_list').height()-$('.mdl-layout-title').height());

            var right_menu_content_block = windowHeight-$('.right_menu_footer-block').height()- $('.right_menu_title-block').height()-carousel_block_height;
            $('.right_menu_content-block').css('height', right_menu_content_block);
            $('.right_menu_content-block').closest('.bx-viewport').height(windowHeight - $('.right_menu_footer-block').height());

            if ($('.mdl-card__title').is(':visible')) {
                $('.mdl-card__supporting-text').height(windowHeight - $('.mdl-card__title').height() - $('.demo-card__title').height() - $('.mdl-card__actions').height() * 2.6);
            } else {
                $('.mdl-card__supporting-text').height(windowHeight - $('.demo-card__title').height() - $('.mdl-card__actions').height() * 2.1);
            }
            //$(".item").height(windowHeight- $('.mdl-card__actions').height() * 2);
//            
//            $('#carousel-main').height(windowHeight - $('div.mdl-card__title').height() - $('.mdl-card__actions').height() * 2);
//        setTimeout(function () {
//            $('.commentsFormWrapper').width(contentWidth);
//        }, 300);

            if (map) {
//            google.maps.event.trigger(map, 'resize');
                map.updateSize();

            }

            // Add custom scrollbar for left side navigation
           /* if (windowWidth > 767) {
                $('.bigNav').slimScroll({
                    height: contentHeight - $('.leftUserWraper').height()
                });
            } else {
                $('.bigNav').slimScroll({
                    height: contentHeight
                });
            }
            if ($('.bigNav').parent('.slimScrollDiv').size() > 0) {
                $('.bigNav').parent().replaceWith($('.bigNav'));
                if (windowWidth > 767) {
                    $('.bigNav').slimScroll({
                        height: contentHeight - $('.leftUserWraper').height()
                    });
                } else {
                    $('.bigNav').slimScroll({
                        height: contentHeight
                    });
                }
            }*/
        }


        $(window).resize(function () {
            windowResizeHandler();
        });
        var navExpanded = true;
        $('#information').on('click', function (event) {
            if (event.target.classList.contains('voting') == true) {
                var votingRes = event.target.name;
                var idTicketit = $('#id_ticketit').val();
                $.ajax({
                    url: '/voting',
                    type: 'POST',
                    dataType: "json",
                    data: {
                        'votingRes': votingRes,
                        'idTicketit': idTicketit
                    },
                    success: function (data) {
                        $('.votingAll').hide();
                        $('.votingAll').after('<div class="title votingMessage" id="votingMessage" >Дякуємо, що прийняли участь в опитуванні.</div>')
                        $('.votingMessage').after(votingResult());
                    }

                });
            }
        });

        $('.fl1').on('change', function () {
            var filterstr = '';
            $('select.fl1').each(function (i, elem) {
                if (filterstr === '') {
                    if ($(elem).val()) {
                        filterstr = "(" + $(elem).attr('id') + "='" + $(elem).val().toUpperCase() + "')";
                    }
                } else {
                    if ($(elem).val()) {
                        filterstr += " AND (" + $(elem).attr('id') + "='" + $(elem).val().toUpperCase() + "')";
                    }
                }
            });
            $('input[type=text].fl1').each(function (i, elem) {
                var tmp = '';
                if ($.isNumeric($(elem).val()) && ($(elem).val() > 0)) {
                    if ($(elem).attr('id').substr(0, 3) == 'min') {
                        tmp = "(" + $(elem).attr('id').substr(3) + ">'" + $(elem).val() + "')";
                    }
                    if ($(elem).attr('id').substr(0, 3) == 'max') {
                        tmp = "(" + $(elem).attr('id').substr(3) + "<'" + $(elem).val() + "')";
                    }
                    if (filterstr === '') {
                        filterstr = tmp;
                    } else {
                        filterstr += " AND " + tmp;
                    }
                }
            });
            wmsSource.updateParams({
                CQL_FILTER: filterstr
            });
        });

        $('.fl2').on('change', function () {
            var filterstr = '';
            $('select.fl2').each(function (i, elem) {
                if (filterstr === '') {
                    if ($(elem).val()) {
                        filterstr = "(" + $(elem).attr('id') + "='" + $(elem).val().toUpperCase() + "')";
                    }
                } else {
                    if ($(elem).val()) {
                        filterstr += " AND (" + $(elem).attr('id') + "='" + $(elem).val().toUpperCase() + "')";
                    }
                }
            });
            $('input[type=text].fl2').each(function (i, elem) {
                var tmp = '';
                if ($.isNumeric($(elem).val()) && ($(elem).val() > 0)) {
                    if ($(elem).attr('id').substr(0, 3) == 'min') {
                        tmp = "(" + $(elem).attr('id').substr(3) + ">'" + $(elem).val() + "')";
                    }
                    if ($(elem).attr('id').substr(0, 3) == 'max') {
                        tmp = "(" + $(elem).attr('id').substr(3) + "<'" + $(elem).val() + "')";
                    }
                    if (filterstr === '') {
                        filterstr = tmp;
                    } else {
                        filterstr += " AND " + tmp;
                    }
                }
            });

//            console.log(filterstr);
            wmsSource2.updateParams({
                CQL_FILTER: filterstr
            });
        });

        $('.fl3').on('change', function () {
            var filterstr = '';
            $('select.fl3').each(function (i, elem) {
                if (filterstr === '') {
                    if ($(elem).val()) {
                        filterstr = "(" + $(elem).attr('id') + "='" + $(elem).val().toUpperCase() + "')";
                    }
                } else {
                    if ($(elem).val()) {
                        filterstr += " AND (" + $(elem).attr('id') + "='" + $(elem).val().toUpperCase() + "')";
                    }
                }
            });
            $('input[type=text].fl3').each(function (i, elem) {
                var tmp = '';
                if ($.isNumeric($(elem).val()) && ($(elem).val() > 0)) {
                    if ($(elem).attr('id').substr(0, 3) == 'min') {
                        tmp = "(" + $(elem).attr('id').substr(3) + ">'" + $(elem).val() + "')";
                    }
                    if ($(elem).attr('id').substr(0, 3) == 'max') {
                        tmp = "(" + $(elem).attr('id').substr(3) + "<'" + $(elem).val() + "')";
                    }
                    if (filterstr === '') {
                        filterstr = tmp;
                    } else {
                        filterstr += " AND " + tmp;
                    }
                }
            });
            wmsSource3.updateParams({
                CQL_FILTER: filterstr
            });
        });

        $('.fl4').on('change', function () {
            var filterstr = '';
            $('select.fl4').each(function (i, elem) {
                if (filterstr === '') {
                    if ($(elem).val()) {
                        filterstr = "(" + $(elem).attr('id') + "='" + $(elem).val().toUpperCase() + "')";
                    }
                } else {
                    if ($(elem).val()) {
                        filterstr += " AND (" + $(elem).attr('id') + "='" + $(elem).val().toUpperCase() + "')";
                    }
                }
            });
            $('input[type=text].fl4').each(function (i, elem) {
                var tmp = '';
                if ($.isNumeric($(elem).val()) && ($(elem).val() > 0)) {
                    if ($(elem).attr('id').substr(0, 3) == 'min') {
                        tmp = "(" + $(elem).attr('id').substr(3) + ">'" + $(elem).val() + "')";
                    }
                    if ($(elem).attr('id').substr(0, 3) == 'max') {
                        tmp = "(" + $(elem).attr('id').substr(3) + "<'" + $(elem).val() + "')";
                    }
                    if (filterstr === '') {
                        filterstr = tmp;
                    } else {
                        filterstr += " AND " + tmp;
                    }
                }
            });
            wmsSource4.updateParams({
                CQL_FILTER: filterstr
            });
        });

        $('.fl8').on('change', function () {
            var filterstr = '';
            $('select.fl8').each(function (i, elem) {
                if (filterstr === '') {
                    if ($(elem).val()) {
                        filterstr = "(" + $(elem).attr('id') + "='" + $(elem).val() + "')";
                    }
                } else {
                    if ($(elem).val()) {
                        filterstr += " AND (" + $(elem).attr('id') + "='" + $(elem).val() + "')";
                    }
                }
                if ($(elem).val() == "") {
                    filterstr = "notview";
                }
            });
            $('input[type=text].fl8').each(function (i, elem) {
                var tmp = '';
                if ($.isNumeric($(elem).val()) && ($(elem).val() > 0)) {
                    if ($(elem).attr('id').substr(0, 3) == 'min') {
                        tmp = "(" + $(elem).attr('id').substr(3) + ">'" + $(elem).val() + "')";
                    }
                    if ($(elem).attr('id').substr(0, 3) == 'max') {
                        tmp = "(" + $(elem).attr('id').substr(3) + "<'" + $(elem).val() + "')";
                    }
                    if (filterstr === '') {
                        filterstr = tmp;
                    } else {
                        filterstr += " AND " + tmp;
                    }
                }
            });
//            console.log(filterstr);
            if (filterstr == "notview") {
                wmsSource8.updateParams({CQL_FILTER: null});
            } else {
                wmsSource8.updateParams({
                    CQL_FILTER: filterstr
                });
            }
        });

        $('.fl19').on('change', function () {
            var filterstr = '';
            $('select.fl19').each(function (i, elem) {
                if (filterstr === '') {
                    if ($(elem).val()) {
                        filterstr = "(" + $(elem).attr('id') + "='" + $(elem).val() + "')";
                    }
                } else {
                    if ($(elem).val()) {
                        filterstr += " AND (" + $(elem).attr('id') + "='" + $(elem).val() + "')";
                    }
                }
            });
            if (filterstr == "") {
                filterstr = "notview";
            }

            $('input[type=text].fl19').each(function (i, elem) {
                var tmp = '';
                if ($.isNumeric($(elem).val()) && ($(elem).val() > 0)) {
                    if ($(elem).attr('id').substr(0, 3) == 'min') {
                        tmp = "(" + $(elem).attr('id').substr(3) + ">'" + $(elem).val() + "')";
                    }
                    if ($(elem).attr('id').substr(0, 3) == 'max') {
                        tmp = "(" + $(elem).attr('id').substr(3) + "<'" + $(elem).val() + "')";
                    }
                    if (filterstr === '') {
                        filterstr = tmp;
                    } else {
                        filterstr += " AND " + tmp;
                    }
                }
            });
            if (filterstr == "notview") {
                wmsSource19.updateParams({CQL_FILTER: null});
            } else {
                wmsSource19.updateParams({
                    CQL_FILTER: filterstr
                });
            }
        });
//        $('#accordion').on('hidden.bs.collapse', toggleDOWN);
//        $('#accordion').on('shown.bs.collapse', toggleUP);
//        $('a.accordion-toggle').on('click', function () {
        $('a.mdl-navigation__link').on('click', function () {
            toggleOL($(this).attr('href').substr(1), $(this));
           /* if ($(this).hasClass('active') == false && $(this).find('.arrow_box').hasClass('active')) {
                $('.legend').hide();
                $(this).find('.legend-radio').hide();
                $(this).find('.legend-radio').removeAttr('checked');
                $(this).find('.arrow_box').removeClass('active');
                $(this).find('.arrow_box').hide();
            }*/

            if ($(this).next().find('a.mdl-navigation__link').hasClass('active') && $(this).hasClass('active') == false) {
                $(this).addClass('active');
            }
        });



        $('.navHandler, .closeLeftSide').click(function () {
            if (!navExpanded) {
                $('.logo').addClass('expanded');

                $('#leftSide').addClass('expanded');
                if (windowWidth < 768) {
                    $('.closeLeftSide').show();
                }
                $('#bazlayer').addClass('expanded');
                $('#external_control').addClass('expanded');
                $('.hasSub').addClass('hasSubActive');
                $('.leftNav').addClass('bigNav');
                $('#tools').addClass('expanded');
                if (windowWidth > 767) {
                    $('.full').addClass('m-full');
                }
                windowResizeHandler();
                navExpanded = true;
            } else {
                $('.logo').removeClass('expanded');
                $('#leftSide').removeClass('expanded');
                $('.closeLeftSide').hide();
                $('#bazlayer').removeClass('expanded');
                $('#external_control').removeClass('expanded');
                $('.hasSub').removeClass('hasSubActive');
                $('.bigNav').slimScroll({destroy: true});
                $('.leftNav').removeClass('bigNav');
                $('#tools').removeClass('expanded');
                $('.leftNav').css('overflow', 'visible');
                $('.full').removeClass('m-full');
                navExpanded = false;
            }
        });

        var fullm = false;
        $('#fullm').click(function () {
            if (!fullm) {
                $('#content').hide();

                $('#mapView').addClass('expanded');
                $('#mapView').css("width", "100%");
                fullm = true;
                windowResizeHandler();
            } else {
                $('#mapView').removeClass('expanded');
                $('#mapView').css("width", "50%");
                $('#content').show();
                fullm = false;
                windowResizeHandler();
            }
        });

        //windowResizeHandler();

//        $('.selectpicker').selectpicker('refrjesh');

        $("#searchstring").mask("9999999999:99:999:9999");

        $("#searchbutton").on('click',
            function () {
                if ($("#searchstring").val() != '') {

                    $('html, body').css("cursor", "wait");
                    $.ajax({
                        url: '/find-Parcel',
                        type: 'GET',
                        data: {
                            'cadnum': $("#searchstring").val()
                        },
                        success: function (data) {
                            var box = [data.data[0].st_xmin, data.data[0].st_ymin, data.data[0].st_xmax, data.data[0].st_ymax];
                            //                           var areaExtent = ol.extent.applyTransform(box, ol.proj.getTransform('EPSG:4326', 'EPSG:3857'));
                            view.fit(box, map.getSize());
                            view.setZoom(16);
//                            iconFeature.setGeometry(new ol.geom.Point( view.getCenter()) );
//                            gmlSource.addFeature(iconFeature); 
                            var evt = view.getCenter();
                            $('html, body').css("cursor", "wait");
                            $.ajax({
                                type: 'GET',
                                //                url: 'http://portal.dzk.gov.ua/kadastrova-karta/getobjectinfo',
                                url: '/getobjectinfo',
                                data: {
                                    'x': evt[1],
                                    'y': evt[0],
                                    'layer': 'kadastr',
                                    'zoom': 16
                                },
                                success: function (data) {

                                    //                data = $.parseJSON(JSON.stringify(data));
                                    // console.log(data);
                                    if (data.data) {
                                        var goi = $.parseJSON(data.data);

                                        var regex = /[0-9]{10}:[0-9]{2}:[0-9]{3}:[0-9]{4}/g;
                                        var regex2 = /\u0422\u0438\u043f \u0432\u043b\u0430\u0441\u043d\u043e\u0441\u0442\u0456:<\/div>(.*?)<\/li>/;
                                        var regex3 = /<div class=\"label\">\u0426\u0456\u043b\u044c\u043e\u0432\u0435 \u043f\u0440\u0438\u0437\u043d\u0430\u0447\u0435\u043d\u043d\u044f:<\/div>(.*?)<\/li>/
                                        var str;

                                        if (goi.dilanka) {
                                            str = goi.dilanka;
                                        } else if (goi.ikk) {
                                            str = goi.ikk;
                                        } else if (goi.rajonunion) {
                                            str = goi.rajonunion;
                                        } else {
                                            str = goi.obl;
                                        }

                                        if (str) {
                                            var koatuu = regex.exec(str);
                                            var nom = koatuu;
                                            //koatuu = koatuu + ' ' + regex2.exec(str)[1] + ' ' + regex3.exec(str)[1]
                                            if (regex2.exec(str) != null) {
                                                koatuu = koatuu + ' ' + regex2.exec(str)[1];
                                            }
                                            if (regex3.exec(str) != null) {
                                                koatuu = koatuu + ' ' + regex3.exec(str)[1];
                                            }
                                            //                   console.log(regex2.exec(str)[1]);
                                            if (koatuu) {
                                                if (data.username != '') {
                                                    //        $('#alert_placeholder').html('<div class="alert alert-success fade in"><a class="close" data-dismiss="alert">Ã—</a><span>'+ koatuu + '<button>Pay</button></span></div>');
                                                    koatuu = koatuu + '<button type="button" onclick="reque(\'' + nom + '\');">Ð—Ð°Ð¼Ð¾Ð²Ð¸Ñ‚Ð¸, ' + data.username + '</button>';
                                                }
                                                content.innerHTML = ol.coordinate.toStringHDMS(ol.proj.transform(evt, 'EPSG:3857', 'EPSG:4326')) + '  ' + koatuu;
                                                overlay.setPosition(evt);
                                                view.setCenter(evt);
                                            } else {
                                                $('#alert_placeholder').html('');
                                            }
                                        }
                                        //         console.log(data);
                                    }
                                    $('html, body').css("cursor", "auto");
                                },
                                error: function () {
                                    $('html, body').css("cursor", "auto");
                                }

                            });
                            //        content.innerHTML = $("#searchstring").val();
                            //        overlay.setPosition(view.getCenter());
                            $('html, body').css("cursor", "auto");
                        },
                        error: function () {
                            $('html, body').css("cursor", "auto");
                        }
                    });
                }
            }
        );

//        $('body').removeClass('notransition');
//        var satLayer = new ol.layer.Tile({visible: false, source: new ol.source.MapQuest({layer: 'sat'}), name: 'sat'});

        //var satLayer = new ol.layer.Tile({
        //    source: new ol.source.BingMaps({
        //      culture: 'ru',
        //      key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
        //      imagerySet: 'AerialWithLabels',
        //  }),
        //    visible: 0
        //});
        var projection = new ol.proj.Projection({
            code: 'EPSG:900913',
            units: 'm'
        });
        var popup = new ol.Overlay({
            element: document.getElementById('popup')
        })
//var w = $(window).width();
//var h = $(window).height();
/*        var wmsSource = new ol.source.ImageWMS({
            url: '/kmda/wms',
            //         url: 'http://212.26.144.110/geowebcache/service/wms',
//            url: 'http://212.26.144.107:8092/vector/geoserver/gwc/service/wms',
            //   url: 'http://192.168.33.51/geowebcache/service/wms',
            params: {
                'LAYERS': 'kmda:kmda_l_orenda',
                'ALIAS':'Власність',
                'VERSION': '1.1.1',
                'TILED': true,
                'WIDTH': 768,
                'HEIGHT': 520,
                'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
//            projection: 'EPSG:900913',
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
//            extent: [3365331.64184455,6509557.90965887,3417855.95133155,6545186.44247934],
            }
        });

        var wmsLayer = new ol.layer.Image({
            source: wmsSource,
            visible: 0,
            name: 'wms1',
            //           extent: map.getView().calculateExtent(map.getSize()),
//            imageSize: [192,192]
        });*/

        var vectorVinSidebarWms = new ol.source.TileWMS({
            url: '/geoserver/nsdi/wms',
            params: {
                'LAYERS': 'nsdi:nsdi',
                'ALIAS':'Векторна карта',
                'VERSION': '1.1.1',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 702,
                'HEIGHT': 768,
                'CRS': 'EPSG:900913',
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var vectorVinSidebar = new ol.layer.Tile({
            source: vectorVinSidebarWms,
            visible: 0,
            name: 'vectorVinSidebar'
        });

        var gryntSidebarWms = new ol.source.TileWMS({
            url: 'http://212.26.144.103/geowebcache/service/wms',
            params: {
                'LAYERS': 'grunt',
                'ALIAS':'Грунти',
                'VERSION': '1.1.1',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 702,
                'HEIGHT': 768,
                'CRS': 'EPSG:900913',
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var gryntSidebar = new ol.layer.Tile({
            source: gryntSidebarWms,
            visible: 0,
            name: 'gryntSidebar'
        });

        var parcelSidebarWms = new ol.source.TileWMS({
            url: '/dzk',
            params: {
                'LAYERS': 'kadastr',
                'ALIAS':'Кадастровий поділ',
                'VERSION': '1.1.1',
                'TILED': 'true',
                'FORMAT': 'image/png',
                'WIDTH': 256,
                'HEIGHT': 256,
                'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var parcelSidebar = new ol.layer.Tile({
            source: parcelSidebarWms,
            visible: 0,
            name: 'parcelSidebar'
        });

        var dynamicSidebarWms = new ol.source.TileWMS({
            url: 'http://212.26.144.103/geoserver/dzk/wms',
            params: {
                'LAYERS': 'dzk:osm',
                'ALIAS':'Динамічна карта',
                'VERSION': '1.1.1',
                'TILED': 'true',
                'FORMAT': 'image/png',
                'WIDTH': 702,
                'HEIGHT': 768,
                'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var dynamicSidebar = new ol.layer.Tile({
            source: dynamicSidebarWms,
            visible: 0,
            name: 'dynamicSidebar'
        });

        var osmLayer = new ol.layer.Tile({
            source: new ol.source.OSM({
                url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            }),
           // visible: 1,
            name: 'osm',
            visible: 0,

        });

        var pubLayer = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'http://212.26.144.103/map/dzk_overview/{z}/{x}/{-y}.png',
                crossOrigin: 'null',
            }),
            name: 'pub',
            visible: 1,
        });

        var kiev2006Layer = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'http://map.land.gov.ua/map/ortho10k_all/{z}/{x}/{-y}.jpg',
                crossOrigin: 'null'
            }),
            name: 'kiev2006',
            visible: 0,
        });

        var orto10000sidebar = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'http://map.land.gov.ua/map/ortho10k_all/{z}/{x}/{-y}.jpg',
                crossOrigin: 'null'
            }),
            name: 'orto10000sidebar',
            visible: 0,
        });

        var orto2000sidebar = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'http://map.land.gov.ua/map/ortho2k_all/{z}/{x}/{-y}.jpg',
                crossOrigin: 'null'
            }),
            name: 'orto2000sidebar',
            visible: 0,
        });
        var topoVin = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'http://212.26.144.103/map/topo2k_vyn/{z}/{x}/{y}.png',
                crossOrigin: 'null'
            }),
            name: 'topoVin',
            visible: 0,
        });

        var topoVinSidebar = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'http://212.26.144.103/map/topo2k_vyn/{z}/{x}/{y}.png',
                crossOrigin: 'null',
                params:{
                 'ALIAS':'Топографічна карта'
                }
            }),
            name: 'topoVinSidebar',
            visible: 0,
        });


        var vin2015Layer = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'http://212.26.144.103/map/ortho2k_vyn/{z}/{x}/{-y}.png',
                crossOrigin: 'null',
            }),
            name: 'vin2015',
            visible: 0,
        });

        var vinOrtoSidebar = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'http://212.26.144.103/map/ortho2k_vyn/{z}/{x}/{-y}.png',
                crossOrigin: 'null',
            }),
            name: 'vinOrtoSidebar',
            visible: 0,
            params: {
                alias:'Ортофотоплан'
            }
        });


        var emptyRelief = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'http://212.26.144.103/map/relief/{z}/{x}/{y}.png',
                crossOrigin: 'null',
            }),
            name: 'emptyRelief',
            visible: 0,
        });

        var emptyLayer = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'http://212.26.144.103/files/404-tile707.png',
                crossOrigin: 'null',
            }),
            name: 'emptyLayer',
            visible: 0,
        });


       /* var gryntSidebar = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'http://map.land.gov.ua/geowebcache/service/wms/{z}/{x}/{-y}.png',
                crossOrigin: 'null',
            }),
            name: 'gryntSidebar',
            visible: 0,
        });
*/
        var dzk_overview = new ol.layer.Tile({
            source: new ol.source.XYZ({
//                url: '/ortho2k_2015/{z}/{x}/{-y}.jpg',
                url: 'http://212.26.144.103/map/dzk_overview/{z}/{x}/{-y}.png',
                crossOrigin: 'null',
            }),
            name: 'dzk_overview',
            visible: 0,
        });

        var kiev2015Layer = new ol.layer.Tile({
            source: new ol.source.XYZ({
//                url: '/ortho2k_2015/{z}/{x}/{-y}.jpg',
                url: 'http://map.land.gov.ua/map/ortho_kiev/{z}/{x}/{-y}.jpg',
                crossOrigin: 'null',
            }),
            name: 'kiev2015',
            visible: 0,
        });

        /**
         * Create an overlay to anchor the popup to the map.
         */
//        var container = document.getElementById('popup');
//        var content = document.getElementById('popup-content');
//        var closer = document.getElementById('popup-closer');
//
//        closer.onclick = function () {
//            overlay.setPosition(undefined);
//            closer.blur();
//            return false;
//        };

//        var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
//            element: container,
//            autoPan: true,
//            autoPanAnimation: {
//                duration: 250
//            }
//        }));

//        var gmap = new google.maps.Map(document.getElementById('gmap'), {
//            disableDefaultUI: true,
//            keyboardShortcuts: false,
//            draggable: false,
//            disableDoubleClickZoom: true,
//            scrollwheel: false,
//            streetViewControl: false
//          });


        var cycleLayer = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=b29e6bf28b894c94958bfd507072f4c8',
                crossOrigin: 'null',
            }),
            name: 'OpenCycleMap',
            visible: 0,
        });                        
        
        googleLayer = new olgm.layer.Google({name: 'google', visible: 0, mapTypeId: google.maps.MapTypeId.SATELLITE});
        var googleHybridLayer = new olgm.layer.Google({
            name: 'googlehybrid',
            visible: 0,
            mapTypeId: google.maps.MapTypeId.HYBRID
        });


        map = new ol.Map({

            target: "mapView",
            layers: [
                topoVin,
                googleLayer,
                googleHybridLayer,
//                satLayer,
                osmLayer,
                emptyRelief,
                cycleLayer,
                pubLayer,
                kiev2006Layer,
                vin2015Layer,
                parcelSidebar,
                vectorVinSidebar,
                vinOrtoSidebar,
                orto10000sidebar,
                orto2000sidebar,
                dynamicSidebar,
                gryntSidebar,
                emptyLayer,
                topoVinSidebar,

            ],
//            view: view,
            controls: ol.control.defaults().extend([
                new ol.control.ScaleLine({
                    className: 'ol-scale-line',
                    target: document.getElementById('scale-line')})
            ]),
        });
                var getPar = parsemaplinkURL();

        if((getPar === null) || (getPar.length!==6)) {        
        var view = new ol.View({
            center: [3170647.44192, 6315057.33961],
            zoom: 12,
            minZoom: 2
        });
        } else {
            getPar[4]=pad(Hex2Bin(getPar[4]),8);
            getPar[5]=pad(Hex2Bin(getPar[5]),10);
     //       console.log(getPar[5]);
        var t =  ol.proj.transform([getPar[3],-getPar[2]],'EPSG:4326','EPSG:900913');

        var view = new ol.View({
            center: [t[0],-t[1]],
            zoom: getPar[1],
            minZoom: 2  
            });
          ic=0;
            var artbaz = ['pub', 'osm', 'OpenCycleMap', 'google', 'googlehybrid', 'vin2015', 'kiev2006','emptyRelief', 'emptyLayer', 'topoVin'];
            map.getLayers().forEach(function (l, i) {
                if (($.inArray(l.get('name'), artbaz)) > -1) {
                    if(getPar[5].charAt(ic)==1) {
                        l.setVisible(true);
                    } else {
                    l.setVisible(false);
                }
                    ic++;                    
                }
        });  
            var ic = 0;
            map.getLayers().forEach(function (l, i) {
            if (($.inArray(l.get('name'), art)) > -1) {
                if(getPar[4].charAt(ic)==1) {
                    l.setVisible(true);
                } else {
                    l.setVisible(false);
                }
                ic++;
            }
          });
        }
        map.setView(view);

        $('#vinOrtoSidebar').on('click',function(){
            if($(this).hasClass('active')){
                $('#slider_vinOrtoSidebar').show();
            }else{
                $('#slider_vinOrtoSidebar').hide();
            }
        });

        var sliderVinOrto = $('#slider_vinOrtoSidebar').slider({
            value: vinOrtoSidebar.getOpacity()*100,
            range: "min"

        })

        sliderVinOrto.on('slide', function(ev, ui) {
            vinOrtoSidebar.setOpacity(ui.value/100);
            //ev.stopPropagation();
        });

        $('#topoVinSidebar').on('click',function(){
            if($(this).hasClass('active')){
                $('#slider_topoVinSidebar').show();
            }else{
                $('#slider_topoVinSidebar').hide();
            }
        });

        var sliderTopoVin = $('#slider_topoVinSidebar').slider({
            value: topoVinSidebar.getOpacity()*100,
            range: "min"

        })

        sliderTopoVin.on('slide', function(ev, ui) {
            topoVinSidebar.setOpacity(ui.value/100);
            //ev.stopPropagation();
        });

        $('#orto10000').on('click',function(){
            if($(this).hasClass('active')){
                $('#slider_orto10000sidebar').show();
            }else{
                $('#slider_orto10000sidebar').hide();
            }
        });

        var sliderOrto10000 = $('#slider_orto10000sidebar').slider({
            value: orto10000sidebar.getOpacity()*100,
            range: "min"

        })
        sliderOrto10000.on('slide', function(ev, ui) {
            orto10000sidebar.setOpacity(ui.value/100);
            //ev.stopPropagation();
        });


       /* $('#slider_wms3').on('mousedown', function(event){
            event.stopPropagation();
        })*/




        map.addOverlay(popup);
//  var zoomslider = new ol.control.ZoomSlider();
//  map.addControl(zoomslider);
        var external_control = new ol.control.Zoom({
            target: document.getElementById('external_control')
        });
        map.addControl(external_control);
        var overview = new ol.control.OverviewMap({
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            target: 'map',
            label: '«',
            collapseLabel: '»',
        });
        $('#main_tt9').on('click', function(){
           window.print();
        });
        map.addControl(overview);
        //$('.ol-overviewmap').addClass('ol-rotate');
        //$('.ol-control').addClass('left_menu_open');

        $('.ol-overviewmap button').attr("id", "ol-overviewmap");
        $('.ol-overviewmap button').append('<div class="mdl-tooltip main_mdl-tooltip" data-mdl-for="ol-overviewmap" >Оглядова карта</div>');
        $('.ol-zoom-in').attr("id", "ol-zoom-in");
        $('.ol-zoom-in').append('<div class="mdl-tooltip main_mdl-tooltip" data-mdl-for="ol-zoom-in" >Збільшити</div>');
        $('.ol-zoom-out').attr("id", "ol-zoom-out");
        $('.ol-zoom-out').append('<div class="mdl-tooltip main_mdl-tooltip" data-mdl-for="ol-zoom-out" >Зменшити</div>')



        var olGM = new olgm.OLGoogleMaps({map: map}); // map is the ol.Map instance
        olGM.activate();
        $('div.mapPlaceholder').remove();
        windowResizeHandler();
       // addLegend(map);
        addMeasure(map);
        layersOff(map);

       $('#main_tt4').on('click', function(){
               $('#main_tt4').toggleClass('active');
               geolocation(map);
       });





       // unitsSelect.bindTo('value', scaleLineControl, 'metric');

        $('.zoomOff .mdl-checkbox').on('mouseup', function(){
           // $('.account_block').toggleClass('close');
            $('.ol-zoom').toggleClass('hide');
           // console.log($('#checkbox-zoom').attr('checked'));
        });
        $('.centerOff .mdl-checkbox').on('mouseup', function(){
            // $('.account_block').toggleClass('close');
            $('.map-center').toggleClass('hide');
            // console.log($('#checkbox-zoom').attr('checked'));
        });

        $('.map_mode_select li').on('click', function(event){
            var selected = $(this).attr('data-val');
            var artbaz = ['pub', 'osm', 'OpenCycleMap', 'google', 'googlehybrid', 'vin2015', 'kiev2006','emptyRelief', 'emptyLayer', 'topoVin'];
            map.getLayers().forEach(function (l, i) {
                if (($.inArray(l.get('name'), artbaz)) > -1) {
                    if (l.get('name') !== selected) {

                        l.setVisible(false);
                    } else {
                    //    console.log(l.get('name'));
                        if (l.get('name') == 'OpenCycleMap' || l.get('name') == 'osm') {
                            $('.osm-copyright').show();
                        }else{
                            $('.osm-copyright').hide();
                        }
                        l.setVisible(true);

                    }
                }
            });
        });

        $('#bazlayer select').change();


        //Додати координати центра карти//
        var center = map.getView().getCenter();

        var coord = ol.proj.transform([center[0], center[1]],'EPSG:900913','EPSG:4326');
        $('.x').text(coord[0].toFixed(4));
        $('.y').text(coord[1].toFixed(4));

        map.on('pointerdrag', function(evt){
            center = map.getView().getCenter();
            coord = ol.proj.transform([center[0], center[1]],'EPSG:900913','EPSG:4326');
            $('.x').text(coord[0].toFixed(4));
            $('.y').text(coord[1].toFixed(4));
        });

        map.on('moveend', function(evt){
            center = map.getView().getCenter();
            coord = ol.proj.transform([center[0], center[1]],'EPSG:900913','EPSG:4326');
            $('.x').text(coord[0].toFixed(4));
            $('.y').text(coord[1].toFixed(4));
        });
        //end--Додати координати центра карти//



        var sliderInfo;
        var sliderCarousel;
        map.on('singleclick', function (evt) {

            if(!$('#length').hasClass('active') && !$('#area').hasClass('active')){

            var viewResolution = (view.getResolution());
            var infocontainer = $('#information');
            var url;
            var flah = false;
            var infostr="";
            var layerAlias;
            var indic;
            var count = 0;

            map.getLayers().forEach(function (l, i) {
                if ((($.inArray(l.get('name'), art)) > -1) && (l.getVisible())) {

                    if(l.getSource().getParams().ALIAS){
                        layerAlias = l.getSource().getParams().ALIAS;
                    }else{
                        layerAlias = "Не визначено";
                    }
                    if(sliderInfo != undefined){
                        sliderInfo.destroySlider();
                    }
                    if(sliderCarousel != undefined){
                       // sliderCarousel.destroySlider();
                    }
                    url = l.getSource().getGetFeatureInfoUrl(
                        evt.coordinate, viewResolution, 'EPSG:900913',
                        {'INFO_FORMAT': 'application/json'});
                    //var fitextent  = [3399302.74458409,6523059.490493268,3400267.76206619,6524024.507975368];
                    //map.getView().fit(fitextent, map.getSize());
                    //console.log(l.getSource().getExtent());
                    $.ajax({
                        url: url,
                        async: false,
                        dataType: 'json',
//          jsonpCallback: 'parseResponse'
                    }).then(function (response) {
                        //         var result = parser.readFeatures(response);
//                        temp_photo = response.features[0].properties.objectid;
                      //  console.log(response);

                        for (var i = 0; i < response.features.length; i++) {

                            if (!flah) {
                                flah = true;
                            } else {
                                /*infostr += "<div class='item'>";
                                infostr += "<div class='mdl-card__title mdl-card--expand mdl-color--teal-300'></div>";
                                indic += '<li data-target="#carousel-example-generic" data-slide-to="' + count + '"></li>';*/
                            }
                      if(response.features[0].properties.objectid) {
                      $('#orendadocnew').attr('action', 'orendadoc/'+response.features[0].properties.objectid+'/new');
                  }
                            var name;
                            if ((name = response.features[i].properties.ObjectName) === undefined) {
                                if ((name = response.features[i].properties.objectname) === undefined) {
                                    if ((name = response.features[i].properties.orgname) === undefined) {
                                        if ((name = response.features[i].properties.function_z) === undefined) {
                                            if ((name = response.features[i].properties.name) === undefined) {
                                                if ((name = response.features[i].properties.obj_name) === undefined) {
                                                    if ((name = response.features[i].properties.name1) === undefined) {
                                                        if ((name = response.features[i].properties.objectname) === undefined) {
                                                            if ((name = response.features[i].properties.sname) === undefined) {
                                                                name = response.features[i].properties.subject;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (response.features[i].properties.full_name) {
                                name = response.features[i].properties.full_name;
                            }
                            if (response.features[i].properties.addr_number) {
                                name += ", " + response.features[i].properties.addr_number;
                            }
                            if (!name) {
                                name = '';
                            }
                            infostr += '<div>'

                            if (response.features[i].properties.html != undefined) {
                                var pattern = /http:[^ >]+[^>]*jpeg|http:[^ >]+[^>]*png.*?/g;
                                var src = response.features[i].properties.html.match(pattern);

                                if(src != null){
                                    infostr += '<div class="carousel-block">';
                                    src.forEach(function(item){
                                        infostr += '<li><img src="'+item+'" alt=""></li>'
                                    });
                                    infostr += '</div>';
                                }/*else{
                                    infostr += '<div><div class="carousel-block"><li><img src="/img/example.jpg" alt=""></li><li><img src="/img/example.jpg" alt=""></li></div>';
                                }*/
                            }/* else{
                                infostr += '<div><div class="carousel-block"><li><img src="/img/example.jpg" alt=""></li><li><img src="/img/example.jpg" alt=""></li></div>';
                            }*/
                            infostr += "<div class='right_menu_title-block'><span class='layer-alias'><p> " + layerAlias + "</p></span>";
                            infostr += "<span class='title'>" + name + "</span>";

                            var districtname;
                            if ((districtname = response.features[i].properties.DistrictName) === undefined) {
                                if ((districtname = response.features[i].properties.district) === undefined) {
                                    if ((districtname = response.features[i].properties.type_str) === undefined) {
                                        districtname = ' ';
                                    }
                                }
                            }
                            var addrstreet;
                            if ((addrstreet = response.features[i].properties.ObjectAddrStreet) === undefined) {
                                if ((addrstreet = response.features[i].properties.street) === undefined) {
                                    if ((addrstreet = response.features[i].properties.adress) === undefined) {
                                        if ((addrstreet = response.features[i].properties.name_str) === undefined) {
                                            if ((addrstreet = response.features[i].properties.street) === undefined) {
                                                addrstreet = response.features[i].properties.long;
                                            }
                                        }
                                    }
                                }
                            }
                            var housenum;
                            if ((housenum = response.features[i].properties.ObjectAddrNumber) === undefined) {
                                if ((housenum = response.features[i].properties.house) === undefined) {
                                    if ((housenum = response.features[i].properties.num_str) === undefined) {
                                        if ((housenum = response.features[i].properties.house) === undefined) {
                                            housenum = response.features[i].properties.lat;
                                        }
                                    }
                                }
                            }

                            if (districtname && addrstreet && housenum) {
                                infostr += "<span class='adrs'>" + districtname + " " + addrstreet + " " + housenum + "</span>";
                            }
                            if (response.features[i].properties.reclAdress !== undefined) {
                                infostr += "<span class='adrs'>" + response.features[i].properties.reclAdress + "</span>";
                            }
                            if (response.features[i].properties.code_addro !== undefined) {
                                infostr += "<span class='adrs'>" + response.features[i].properties.code_addrn + " " + response.features[i].properties.code_addro + "</span>";
                            }
                            if (response.features[i].properties.address !== undefined) {
                                infostr += "<span class='adrs'>" + response.features[i].properties.address + "</span>";
                            }

                            infostr += "</div><div class='right_menu_content-block'>";
                            if (response.features[i].properties.cadnum != undefined) {
                                infostr += "<span class='right_menu_content-title'>Кадастровий номер</span><span class='right_menu_content-description'>" + response.features[i].properties.cadnum + "</span>";
                            }
                            var ownership;
                            if ((ownership = response.features[i].properties.OrgOwnership) === undefined) {
                                ownership = response.features[i].properties.ownership;
                            }
                            if (ownership) {
                                infostr += "<span class='right_menu_content-title'>Форма власностi</span><span class='right_menu_content-description'>" + ownership + "</span>";
                            }
                            if (response.features[i].properties.right_type !== undefined) {
                                infostr += "<span class='right_menu_content-title'>Права власностi</span><span class='right_menu_content-description'>" + response.features[i].properties.right_type + "</span>";
                            }
                            if (response.features[i].properties.type !== undefined) {
                                infostr += "<span class='right_menu_content-title'>Тип</span><span class='right_menu_content-description'>" + response.features[i].properties.type + "</span>";
                            }
                            if (response.features[i].properties.reclType !== undefined) {
                                infostr += "<span class='right_menu_content-title'>Тип</span><span class='right_menu_content-description'>" + response.features[i].properties.reclType + "</span>";
                            }
                            if (response.features[i].properties.reclOwner !== undefined) {
                                infostr += "<span class='right_menu_content-title'>Замовник</span><span class='right_menu_content-description'>" + response.features[i].properties.reclOwner + "</span>";
                            }
                            if (response.features[i].properties.zamovn_b !== undefined) {
                                infostr += "<span class='right_menu_content-title'>Замовник</span><span class='right_menu_content-description'>" + response.features[i].properties.zamovn_b + "</span>";
                            }

                            if (response.features[i].properties.zamovnyk !== undefined) {
                                infostr += "<span class='right_menu_content-title'>Замовник</span><span class='right_menu_content-description'>"  + response.features[i].properties.zamovnyk + "</span>";
                            }
                            if (response.features[i].properties.rozrobnik_ !== undefined) {
                                infostr += "<span class='right_menu_content-title'>Розробник</span><span class='right_menu_content-description'>"  + response.features[i].properties.rozrobnik_ + "</span>";
                            }
                            var sqrtotal;
                            if ((sqrtotal = response.features[i].properties.SqrTotal) === undefined) {
                                if ((sqrtotal = response.features[i].properties.sqrtotal) === undefined) {
                                    if ((sqrtotal = response.features[i].properties.area) === undefined) {
                                        if ((sqrtotal = response.features[i].properties.arearishkr) === undefined) {
                                            if ((sqrtotal = response.features[i].properties.reclArea) === undefined) {
                                                sqrtotal = response.features[i].properties.aqrtotal;
                                            }
                                        }
                                    }
                                }
                            }
                            if (sqrtotal) {
                                infostr += "<span class='right_menu_content-title'>Загальна площа (кв. м.)</span><span class='right_menu_content-description'>"  + sqrtotal + "</span>";
                            }
                            var costbalance;
                            if ((costbalance = response.features[i].properties.CostBalans) === undefined) {
                                costbalance = response.features[i].properties.costbalans;
                            }
                            if (costbalance) {
                                infostr += "<span class='right_menu_content-title'>Балансова вартiсть (тис. грн.)</span><span class='right_menu_content-description'>"  + costbalance + "</span>";
                            }

                            var busage;
                            if ((busage = response.features[i].properties.BuildingUsage) === undefined) {
                                if ((busage = response.features[i].properties.purpose) === undefined) {
                                    if ((busage = response.features[i].properties.startfunc) === undefined) {
                                        busage = response.features[i].properties.industryname;
                                    }
                                }
                            }
                            if (busage) {
                                infostr += "<span class='right_menu_content-title'>Призначення</span><span class='right_menu_content-description'>"  + busage + "</span>";
                            }
                            var bkind;
                            if ((bkind = response.features[i].properties.BuildingKind) == undefined) {
                                if ((bkind = response.features[i].properties.kind) == undefined) {
                                    bkind = response.features[i].properties.p0003;
                                }
                            }
                            if (bkind) {
                                infostr += "<span class='right_menu_content-title'>Вид об'єкту</span><span class='right_menu_content-description'>"  + bkind + "</span>";
                            }
                            var btype;
                            if ((btype = response.features[i].properties.BuildingType) == undefined) {
                                if ((btype = response.features[i].properties.btype) == undefined) {
                                    if (response.features[i].properties.p0010 !== undefined) {
                                        btype = response.features[i].properties.p0010 + " " + response.features[i].properties.p0013;
                                    }
                                    if (btype === undefined) {
                                        btype = response.features[i].properties.kindname;
                                    }
                                    if (btype === undefined) {
                                        btype = response.features[i].properties.occupationname;
                                    }
                                }
                            }
                            if (btype) {
                                infostr += "<span class='right_menu_content-title'>Тип об'єкту</span><span class='right_menu_content-description'>"  + btype + "</span>";
                            }
                            var btech;
                            if ((btech = response.features[i].properties.BTS_NAME) == undefined) {
                                btech = response.features[i].properties.btechstate;
                            }
                            if (btech) {
                                infostr += "<span class='right_menu_content-title'>Стан об'єкту</span><span class='right_menu_content-description'>"  + btech + "</span>";
                            }
                            if (response.features[i].properties.link != undefined) {
                                if (response.features[i].properties.name_obj != undefined) {
                                    infostr += "<span class='right_menu_content-title'>Посилання на документ</span>";
                                } else {
                                    infostr += "<span class='right_menu_content-title'>" + response.features[i].properties.name_obj + "</span>";
                                }
                                infostr += "<span class='right_menu_content-description'><a target='_blank' href='/PDF/" + response.features[i].properties.id_region + "/" + response.features[i].properties.link + "'>" + response.features[i].properties.doc_type + "</a></span>";
                            }
                            if (response.features[i].properties.num_in != undefined) {
                                infostr += "<span class='right_menu_content-title'>Вхідний номер</span><span class='right_menu_content-description'>" + response.features[i].properties.num_in + "</span>";
                            }
                            if (response.features[i].properties.data_in != undefined) {
                                infostr += "<span class='right_menu_content-title'>Вхідна дата</span><span class='right_menu_content-description'>" + response.features[i].properties.data_in + "</span>";
                            }
                            if (response.features[i].properties.num_out != undefined) {
                                infostr += "<span class='right_menu_content-title'>Вихідний номер</span><span class='right_menu_content-description'>" + response.features[i].properties.num_out + "</span>";
                            }
                            if (response.features[i].properties.data_out != undefined) {
                                infostr += "<span class='right_menu_content-title'>Вихідна дата</span><span class='right_menu_content-description'>"+ response.features[i].properties.data_out + "</span>";
                            }
                            if (response.features[i].properties.cad_num_z != undefined) {
                                infostr += "<span class='right_menu_content-title'>Кадастровий номер</span><span class='right_menu_content-description'>" + response.features[i].properties.cad_num_z + "</span>";
                            }

                            if (response.features[i].properties.chanfunc != undefined) {
                                infostr += "<span class='right_menu_content-title'>Нова функція території за генеральним планом міста</span><span class='right_menu_content-description'>" + response.features[i].properties.chanfunc + "</span>";
                            }
                            if (response.features[i].properties.code_func1 != undefined) {
                                infostr += "<span class='right_menu_content-title'>Код нової функції</span><span class='right_menu_content-description'>" + response.features[i].properties.code_func1 + "</span>";
                            }

                            if (response.features[i].properties.nrishkmda != undefined) {
                                infostr += "<span class='right_menu_content-title'>Номер рішення КМДА</span><span class='right_menu_content-description'>" + response.features[i].properties.nrishkmda + "</span>";
                            }

                            if (response.features[i].properties.n_rish_kmr != undefined) {
                                infostr += "<span class='right_menu_content-title'>Номер рішення Київради про затвердження</span><span class='right_menu_content-description'>" + response.features[i].properties.n_rish_kmr + "</span>";
                            }
                            if (response.features[i].properties.rayon_b != undefined) {
                                infostr += "<span class='right_menu_content-title'>Адмінрайон міста</span><span class='right_menu_content-description'>" + response.features[i].properties.rayon_b + "</span>";
                            }
                            if (response.features[i].properties.rozrobnik_doc != undefined) {
                                infostr += "<span class='right_menu_content-title'>Розробник містобудівної документації</span><span class='right_menu_content-description'>" + response.features[i].properties.rozrobnik_doc + "</span>";
                            }
                            if (response.features[i].properties.reestrazno != undefined) {
                                infostr += "<span class='right_menu_content-title'>Реєстраціний номер</span><span class='right_menu_content-description'>" + response.features[i].properties.reestrazno + "</span>";
                            }

                            if (response.features[i].properties.stadia_roz != undefined) {
                                infostr += "<span class='right_menu_content-title'>Стадія розроблення </span><span class='right_menu_content-description'>" + response.features[i].properties.stadia_roz + "</span>";
                            }
                            if (response.features[i].properties.type_b != undefined) {
                                infostr += "<span class='right_menu_content-title'>Тип містобудівної документації</span><span class='right_menu_content-description'>" + response.features[i].properties.type_b + "</span>";
                            }

                            if (response.features[i].properties.daterihkr != undefined) {
                                infostr += "<span class='right_menu_content-title'>Дата рішення КМДА</span><span class='right_menu_content-description'>" + response.features[i].properties.daterihkr + "</span>";
                            }
                            if (response.features[i].properties.group_name != null) {
                                infostr += "<span class='right_menu_content-title'>Назва групи</span><span class='right_menu_content-description'>" + response.features[i].properties.group_name + "</span>";
                            }
                            if (response.features[i].properties.pidstavaza != null) {
                                infostr += "<span class='right_menu_content-title'>Підстава внесення</span><span class='right_menu_content-description'>" + response.features[i].properties.pidstavaza + "</span>";
                            }
                            if (response.features[i].properties.code != null) {
                                infostr += "<span class='right_menu_content-title'>Код</span><span class='right_menu_content-description'>" + response.features[i].properties.code + "</span>";
                            }
                            if (response.features[i].properties.status != undefined) {
                                infostr += "<span class='right_menu_content-title'>Статус</span><span class='right_menu_content-description'>" + response.features[i].properties.status + "</span>";
                            }
                            if (response.features[i].properties.zamovn != undefined) {
                                infostr += "<span class='right_menu_content-title'>Замовник</span><span class='right_menu_content-description'>" + response.features[i].properties.zamovn + "</span>";
                            }
                            if (response.features[i].properties.p_name != undefined) {
                                infostr += "<span class='right_menu_content-title'>Місце розташування</span><span class='right_menu_content-description'>" + response.features[i].properties.p_name + "</span>";
                            }
                            if (response.features[i].properties.content != undefined) {
                                infostr += "<span class='right_menu_content-title'>Опис</span><span class='right_menu_content-description'>" + response.features[i].properties.content + "</span>";
                            }

                            if (response.features[i].properties.inv_number != null) {
                                infostr += "<span class='right_menu_content-title'>Інвентарний номер</span><span class='right_menu_content-description'>" + response.features[i].properties.inv_number + "</span>";
                            }
                            if (response.features[i].properties.priority_name != undefined) {
                                infostr += "<span class='right_menu_content-title'>Статус</span><span class='right_menu_content-description'>" + response.features[i].properties.priority_name + "</span>";
                            }
                            /*if (response.features[i].properties.priority_id != undefined) {
                             infostr += "<small> Статус</small>";
                             switch(response.features[i].properties.priority_id) {
                             case 1:
                             infostr += "<h5>Внесено</h5>";
                             break;
                             case 2:
                             infostr += "<h5>Перевірено</h5>";
                             break;
                             default:
                             infostr += "<h5>Не визначено</h5>";
                             }
                             }*/
                            if (response.features[i].properties.p_mode != undefined) {
                                infostr += "<span class='right_menu_content-title'>Форма паркування</span><span class='right_menu_content-description'>" + response.features[i].properties.p_mode + "</span>";
                            }

                            if (response.features[i].properties.p_zone != undefined) {
                                infostr += "<span class='right_menu_content-title'>Номер зони</span><span class='right_menu_content-description'>" + response.features[i].properties.p_zone + "</span>";
                            }

                            if (response.features[i].properties.area_project != undefined) {
                                infostr += "<span class='right_menu_content-title'>Проектна площа ремонту (кв. м.)</span><span class='right_menu_content-description'>" + response.features[i].properties.area_project + "</span>";
                            }
                            if (response.features[i].properties.area_fact != undefined) {
                                infostr += "<span class='right_menu_content-title'>Фактична площа ремонту (кв. м.)</span><span class='right_menu_content-description'>" + response.features[i].properties.area_fact + "</span>";
                            }
                            if (response.features[i].properties.cost_repairs != undefined) {
                                infostr += "<span class='right_menu_content-title'>Проектна вартість ремонту (тис. грн.)</span><span class='right_menu_content-description'>" + response.features[i].properties.cost_repairs + "</span>";
                            }
                            if (response.features[i].properties.cost_repairs_fact != undefined) {
                                infostr += "<span class='right_menu_content-title'>Фактична вартість ремонту (тис. грн.)</span><span class='right_menu_content-description'>" + response.features[i].properties.cost_repairs_fact + "</span>";
                            }

                            if (response.features[i].properties.field_1 != undefined) {
                                infostr += "<span class='right_menu_content-title'>Ідентифікатор об'єкта</span><span class='right_menu_content-description'>" + response.features[i].properties.field_1 + "</span>";
                            }
                            if (response.features[i].properties.field_2 != undefined) {
                                infostr += "<span class='right_menu_content-title'>Номер ПВ-ВП</span><span class='right_menu_content-description'>" + response.features[i].properties.field_2 + "</span>";
                            }
                            if (response.features[i].properties.field_3 != undefined) {
                                infostr += "<span class='right_menu_content-title'>Тип опори</span><span class='right_menu_content-description'>" + response.features[i].properties.field_3 + "</span>";
                            }
                            if (response.features[i].properties.field_4 != undefined) {
                                infostr += "<span class='right_menu_content-title'>Дата установки опори</span><span class='right_menu_content-description'>" + response.features[i].properties.field_4 + "</span>";
                            }
                            if (response.features[i].properties.field_5 != undefined) {
                                infostr += "<span class='right_menu_content-title'>Кронштейн</span><span class='right_menu_content-description'>" + response.features[i].properties.field_5 + "</span>";
                            }
                            if (response.features[i].properties.field_6 != undefined) {
                                infostr += "<span class='right_menu_content-title'>Тип світильника</span><span class='right_menu_content-description'>" + response.features[i].properties.field_6 + "</span>";
                            }
                            if (response.features[i].properties.field_7 != undefined) {
                                infostr += "<span class='right_menu_content-title'>Дата установки світильника</span><span class='right_menu_content-description'>" + response.features[i].properties.field_7 + "</span>";
                            }
                            if (response.features[i].properties.field_8 != undefined) {
                                infostr += "<span class='right_menu_content-title'>Дата установки ламп</span><span class='right_menu_content-description'>" + response.features[i].properties.field_8 + "</span>";
                            }
                            if (response.features[i].properties.field_9 != undefined) {
                                infostr += "<span class='right_menu_content-title'>Номер опори</span><span class='right_menu_content-description'>" + response.features[i].properties.field_9 + "</span>";
                            }
                            if (response.features[i].properties.agreement_number) {
                                infostr += "<span class='right_menu_content-title'>Номер договору</span><span class='right_menu_content-description'>" + response.features[i].properties.agreement_number + "</span>";
                            }
                            if (response.features[i].properties.agreement_date) {
                                infostr += "<span class='right_menu_content-title'>Дата договору</span><span class='right_menu_content-description'>" + response.features[i].properties.agreement_date + "</span>";
                            }
                            if (response.features[i].properties.sqr_rent) {
                                infostr += "<span class='right_menu_content-title'>Площа оренди</span><span class='right_menu_content-description'>" + response.features[i].properties.sqr_rent + " (кв. м.)</span>";
                            }
                            if (response.features[i].properties.reason) {
                                infostr += "<span class='right_menu_content-title'>Підстава</span><span class='right_menu_content-description'>" + response.features[i].properties.reason + "</span>";
                            }

                            if (response.features[i].properties.org_name) {
                                infostr += "<span class='right_menu_content-title'>Балансоутримувач</span><span class='right_menu_content-description'>" + response.features[i].properties.org_name + "</span>";
                            }
                            if (response.features[i].properties.region) {
                                infostr += "<span class='right_menu_content-title'>Район</span><span class='right_menu_content-description'>" + response.features[i].properties.region + "</span>";
                            }
                            if (response.features[i].properties.subject) {
                                infostr += "<span class='right_menu_content-title'>Суб'єкт господарювання</span><span class='right_menu_content-description'>" + response.features[i].properties.subject + "</span>";
                            }
                            if (response.features[i].properties.category_id >= 0) {
                                if (response.features[i].properties.id) {

                                    $('#id_ticketit').remove();
                                    $('#information').after("<input type='hidden' id = 'id_ticketit' name = 'id_ticketit' value='" + response.features[i].properties.id + "'>");
                                }
                                if (checkIp() == true) {
                                    if ($('body').is('#votingMessage')) {
                                        $('#votingMessage').remove();
                                    }

                                    infostr += votingResult();
                                } else {
                                    infostr += '<div class="votingAll btn-group btn-group-justified"><div class="btn-group"><input type="button" name="1" class="voting btn btn-success" value="Підтримую"></div><div class="btn-group"><input type="button" class="voting btn btn-danger" value="Не підтримую" name="0"></div></div>';
                                }
                            }

                            if (response.features[i].properties.tech) {
                                infostr += "<span class='right_menu_content-title'>Тех. облаштування</span><span class='right_menu_content-description'>" + response.features[i].properties.tech + "</span>";
                            }
                            if (response.features[i].properties.type) {
                                infostr += "<span class='right_menu_content-title'>Тип паркування</span><span class='right_menu_content-description'>" + response.features[i].properties.type + "</span>";
                            }
                            if (response.features[i].properties.zone) {
                                infostr += "<span class='right_menu_content-title'>Зона</span><span class='right_menu_content-description'>" + response.features[i].properties.zone + "</span>";
                            }
                            if (response.features[i].properties.payment_type) {
                                infostr += "<span class='right_menu_content-title'>Вид оплати</span><span class='right_menu_content-description'>" + response.features[i].properties.payment_type + "</span>";
                            }
                            if (response.features[i].properties.allsquare) {
                                infostr += "<span class='right_menu_content-title'>Площа (кв. м.)</span><span class='right_menu_content-description'>" + response.features[i].properties.allsquare + "</span>";
                            }
                            if (response.features[i].properties.cars) {
                                infostr += "<span class='right_menu_content-title'>Машиномісць</span><span class='right_menu_content-description'>" + response.features[i].properties.cars + "</span>";
                            }
                            if (response.features[i].properties.freesquare) {
                                infostr += "<span class='right_menu_content-title'>Безоплатне паркування (кв. м.)</span><span class='right_menu_content-description'>" + response.features[i].properties.freesquare + "</span>";
                            }

                            if (response.features[i].properties.mode) {
                                infostr += "<span class='right_menu_content-title'>Режим роботи</span><span class='right_menu_content-description'>" + response.features[i].properties.mode + "</span>";
                            }
                            if (response.features[i].properties.paysquare) {
                                infostr += "<span class='right_menu_content-title'>Для паркування (кв. м.)</span><span class='right_menu_content-description'>" + response.features[i].properties.paysquare + "</span>";
                            }
                            if (response.features[i].properties.privilege) {
                                infostr += "<span class='right_menu_content-title'>Кількість пільгових машиномісць</span><span class='right_menu_content-description'>" + response.features[i].properties.privilege + "</span>";
                            }
                            if (response.features[i].properties.price) {
                                infostr += "<span class='right_menu_content-title'>Вартість</span><span class='right_menu_content-description'>" + response.features[i].properties.price + "</span>";
                            }

                            if (response.features[i].properties.p_cost || response.features[i].properties.p_cost == 0) {
                                if (response.features[i].properties.p_cost == 0) {
                                    infostr += "<span class='right_menu_content-title'>Надходження(грн.)</span><span class='right_menu_content-description'>Інформація не надана КПТС</span>>";
                                } else {
                                    infostr += "<span class='right_menu_content-title'>Надходження (грн.)</span><span class='right_menu_content-description'>" + response.features[i].properties.p_cost + "</span>";
                                }
                            }
                            if (response.features[i].properties.objectid) {
                                $("#orendadoc").attr('href', "/orendadoc/" + response.features[i].properties.objectid + "/new");
                            }
                            infostr += "</div></div></div>";
                        }

                    });

                }
            });
            if(infostr != "" && $('.right_menu').hasClass('close')){
                $('.right_menu').toggleClass('close');
              //  $('.bid_list').toggleClass('close');
                $('.main_search_container').toggleClass('close');
                $('.ol-overviewmap').toggleClass('close');
                $('.account_container').toggleClass('close');
                $('.language_container').toggleClass('close');
                $('.right_menu_button').show();
            }else if(!$('.right_menu').hasClass('close') && infostr==""){
                $('.right_menu').toggleClass('close');
            //    $('.bid_list').toggleClass('close');
                $('.main_search_container').toggleClass('close');
                $('.right_menu_button').hide();
                $('.ol-overviewmap').toggleClass('close');
                $('.account_container').toggleClass('close');
                $('.language_container').toggleClass('close');
            }
            if(infostr==""){
                $('.right_menu_button').hide();
            }
            setTimeout(function () {
                if (flah) {

                    $('ol.carousel-indicators').html(indic);
                    $('#information').html(infostr);
                    if($('div').is('.carousel-block')){
                        sliderCarousel = $('.carousel-block').bxSlider();
                    }
                    sliderInfo = $('.info-slider').bxSlider({pager: false});
                    $('.mdl-card__supporting-text img:not(:first)').each(function (i, elem) {
                        $(this).hide().wrap("<a href='" + this.src + "' data-toggle='lightbox' data-gallery='multiimages'></a>");
                    });

//                    var wrp = "<a href='"+$('.mdl-card__supporting-text img').src+"'></a>";
//                    $('.mdl-card__supporting-text img').wrap(wrp);
                    if ($('.mdl-card__supporting-text img').filter(':first').attr("src") != null) {
                        var srcimg = 'url("' + $('.mdl-card__supporting-text img').filter(':first').attr('src') + '")';
                        $('.mdl-card__title').css("background-image", srcimg).show();

                        $('.mdl-card__title').wrap("<a href='" + $('.mdl-card__supporting-text img').filter(':first').attr('src') + "' data-toggle='lightbox' data-gallery='multiimages'></a>");
                        $('.mdl-card__supporting-text img').filter(':first').hide();
                    }

                    $('.demo-info').show();
                    windowResizeHandler();
                    $('#view-source').hide();
//                        rightNav = true;
//                    }
                } else {
                    //console.log("no" + infostr);
                    infocontainer.innerHTML = '&nbsp;';
//                    if (rightNav) {
//                        $("#rightSide").removeClass("expanded");
//                        $("#rightSwitch").removeClass("expanded");
//                        $("#rightblur").removeClass("expanded");
                    $('.demo-info').hide();
                    $('#view-source').show();
//                        rightNav = false;
//                    }
                }
            }, 300);
            }
        });
//        $("#rightClose").on('click', function () {
//            $("#rightSide").removeClass("expanded");
//            rightNav = false;
//            $("#rightSwitch").removeClass("expanded");
//            $("#rightblur").removeClass("expanded");
//        });
        $('#main_search_input').bind("enterKey", function (e) {
            var searchval = $('#main_search_input').val();
//            console.log(searchval);
            $.ajax({
                url: 'https://maps.googleapis.com/maps/api/geocode/json',
                data: { 'address': searchval + ' Винница' },
                success: function (data) {

                    var sourceProj = map.getView().getProjection();

                    var c1 = ol.proj.transform([data.results[0].geometry.viewport.northeast.lng,data.results[0].geometry.viewport.northeast.lat],'EPSG:4326','EPSG:900913');

                    var c2 = ol.proj.transform([data.results[0].geometry.viewport.southwest.lng,data.results[0].geometry.viewport.southwest.lat], 'EPSG:4326', 'EPSG:900913');

                    var fitextent = [c1[0],c1[1],c2[0],c2[1]];

                    map.getView().fit(fitextent, map.getSize());
                }
        })
        });
        $('#main_search_input').keyup(function (e) {
            if (e.keyCode == 13) {
                $(this).trigger("enterKey");
            }
        });




     /*   $('#main_search_input').bind("enterKey", function (e) {
            var searchval = $('#main_search_input').val();
//    console.log(searchval);
            $.ajax({hg
                url: '/search',
                type: 'POST',
                data: {searchstring: searchval},
                success: function (data) {
//            console.log(data.names);
                    var fitextent = [data[0], data[1], data[2], data[3]];
                    map.getView().fit(fitextent, map.getSize());

                    wmsSource15.updateParams({
                        CQL_FILTER: "id = " + data[4] // 10143
                    });
                    wmsLayer15.setVisible(true);

//            wmsSource6.updateParams({'LAYERS': 'kmda:kmda_l_street', 'VERSION': '1.1.1', 'TILED': 'true', 'FORMAT': 'image/png8', 'WIDTH': 768, 'HEIGHT': 396, 'CRS': 'EPSG:900913', 'STYLE': 'a_street_flash',//, CQL_FILTER:'koatuu=3520386800'
//                serverType: 'geoserver',
//                crossOrigin: '',
//                projection: projection,
//            });
//            map.render();
                },
                error: function () {
                    wmsLayer15.setVisible(false);
                }
            });
        });
        $('#main_search_input').keyup(function (e) {
            if (e.keyCode == 13) {
                $(this).trigger("enterKey");
            }
        });
        $('#main_search_input').autocomplete({
            source: '/autocomplete',
            minLength: 3,
            select: function (e, ui) {
                var value = ui.item.value;
                $.ajax({
                    url: '/search',
                    type: 'POST',
                    data: {searchstring: value},
                    success: function (data) {

                        var fitextent = [data[0], data[1], data[2], data[3]];
                        map.getView().fit(fitextent, map.getSize());

                        wmsSource15.updateParams({
                            CQL_FILTER: "id = " + data[4] // 10143
                        });
                        wmsLayer15.setVisible(true);
                    },
                    error: function () {

                    }
                });
            }
        });*/


    }, 300);


});

/*----Add measure (START)----*/
function addMeasure(map) {

    var source = new ol.source.Vector();
    var style = new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.4)',
        }),
        stroke: new ol.style.Stroke({
            color: '#09f',
            width: 3
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ffcc33'
            })
        })
    })
    var vector = new ol.layer.Vector({
        source: source,
        style: style
    });

    /**
     * The measure tooltip element.
     * @type {Element}
     */
    var measureTooltipElement;

    /**
     * Overlay to show the measurement.
     * @type {ol.Overlay}
     */
    var measureTooltip;
    /**
     * Currently drawed feature
     * @type {ol.Feature}
     */

    var sketch;
    /**
     * Element for currently drawed feature
     * @type {Element}
     */
    var sketchElement;
    var typeSelect;
    /**
     * handle pointer move
     * @param {Event} evt
     */
    var wgs84Sphere = new ol.Sphere(6378137);

    map.addLayer(vector);
    $('#erase').on('mousedown', function(){
        $(this).addClass('active');

    });
    $('#erase').on('mouseup', function(){
        $('.measure').removeClass('active');
        $('.tooltip.tooltip-static').remove();
        map.removeInteraction(draw);
        source.clear();
    });

    $('.measure:not(#erase)').on('click', function (e) {

        if($(this).hasClass('active')){
            $(this).removeClass('active')
            $('.tooltip.tooltip-static').remove();
        }else{
            source.clear();
            $('.measure').removeClass('active')
            $('.tooltip.tooltip-static').remove();

            $(this).addClass('active')
            map.removeInteraction(draw);
        }
        if($(this).hasClass('active')){
            typeSelect = $(this).attr('id')

            addInteraction();
        }else{
            map.removeInteraction(draw);
            source.clear();
        }
    });

    createMeasureTooltip();
    var draw; // global so we can remove it later
    function addInteraction() {
        var type = (typeSelect == 'area' ? 'Polygon' : 'LineString');
        draw = new ol.interaction.Draw({
            source: source,
            type: /** @type {ol.geom.GeometryType} */ (type),
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.4)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.7)',
                    lineDash: [10, 10],
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 5,
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 0, 0, 0.8)'
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    })
                })
            })
        });
        map.addInteraction(draw);
        var listener;
        draw.on('drawstart',
            function (evt) {
                sketch = evt.feature;
                var tooltipCoord = evt.coordinate;
                listener = sketch.getGeometry().on('change', function(evt) {
                    var geom = evt.target;
                    var output;
                    if (geom instanceof ol.geom.Polygon) {
                        output = formatArea(geom);
                        tooltipCoord = geom.getInteriorPoint().getCoordinates();
                    } else if (geom instanceof ol.geom.LineString) {
                        output = formatLength(geom);
                        tooltipCoord = geom.getLastCoordinate();
                    }
                    measureTooltipElement.innerHTML = output;
                    measureTooltip.setPosition(tooltipCoord);
                });
            }, this);
        draw.on('drawend',
            function() {
                measureTooltipElement.className = 'tooltip tooltip-static';
                measureTooltip.setOffset([0, -9]);
                // unset sketch
                sketch = null;
                // unset tooltip so that a new one can be created
                measureTooltipElement = null;
                createMeasureTooltip();
                ol.Observable.unByKey(listener);
            }, this);
    }

    /**
     * format length output
     * @param {ol.geom.LineString} line
     * @return {string}
     */

    var formatLength = function (line) {
        var length;
        var coordinates = line.getCoordinates();
        length = 0;
        var sourceProj = map.getView().getProjection();
        for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
            var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
            var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
            length += wgs84Sphere.haversineDistance(c1, c2);
        }
        var output;
        if (length > 100) {
            output = (Math.round(length / 1000 * 100) / 100) +
                ' ' + 'км';
        } else {
            output = (Math.round(length * 100) / 100) +
                ' ' + 'м';
        }
        return output;
    };

    /**
     * format length output
     * @param {ol.geom.Polygon} polygon
     * @return {string}
     */
    var formatArea = function (polygon) {
        var area;
        var sourceProj = map.getView().getProjection();
        var geom = /** @type {ol.geom.Polygon} */(polygon.clone().transform(
            sourceProj, 'EPSG:4326'));
        var coordinates = geom.getLinearRing(0).getCoordinates();
        area = Math.abs(wgs84Sphere.geodesicArea(coordinates));
        var output;
        if (area > 10000) {
            output = (Math.round(area / 1000000 * 100) / 100) +
                ' ' + 'км<sup>2</sup>';
        } else {
            output = (Math.round(area * 100) / 100) +
                ' ' + 'м<sup>2</sup>';
        }
        return output;
    };

    function createMeasureTooltip() {
        if (measureTooltipElement) {
            measureTooltipElement.parentNode.removeChild(measureTooltipElement);
        }
        measureTooltipElement = document.createElement('div');
        measureTooltipElement.className = 'tooltip tooltip-measure';
        measureTooltip = new ol.Overlay({
            element: measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        });
        map.addOverlay(measureTooltip);
    }

  /*  $('.measure').hover(function(){
       $(this).addClass('is-active');
    });
    $('.measure').mouseleave(function(){
        $(this).removeClass('is-active');
    });*/

    /*----Add measure (END)----*/

}