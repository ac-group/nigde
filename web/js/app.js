var map;

var osmLayer;
var googleLayer;
var art = ['wms1', 'wms2', 'wms3', 'wms4', 'wms5', 'wms6', 'wms7', 'wms8', 'wms9', 'wms10', 'wms11', 'wms12', 'wms13', 'wms14', 'wms15', 'wms16', 'wms17', 'wms19', 'wms20', 'wms21', 'wms22','wms23'];


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
            if (l.get('name') === layer) {
                if (l.getVisible() == true) {
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
    $('.mdl-navigation__level2 > .mdl-navigation__link').click(function () {
        if($(this).hasClass('active')){
            $(this).parent('.mdl-navigation__level2').prev().find('.layersOff').show();
            $('.layersOff input[type="checkbox"]').prop('checked',true);

        }else{
            var isActive = false;
            $(this).parent('.mdl-navigation__level2').find('a.mdl-navigation__link').each(function(){
               if($(this).hasClass('active')){
                   isActive = true;
                   return false;
               }
            });

            if(isActive == false){
                $(this).parent('.mdl-navigation__level2').prev().find('.layersOff').hide();
                $('.layersOff input[type="checkbox"]').prop('checked', false);
            }else{
                $('.layersOff input[type="checkbox"]').prop('checked', true);
            }
        }
    });

    $('.mdl-navigation__level1').prepend('<label data-toggle="tooltip" data-placement="bottom" title="Виключити шари"><div class="layersOff"><input id="check" type="checkbox" class=""  value=""><label for="check"></label></div></label>');

    $('.layersOff').on('mousedown',function (event) {
        var layersName = [];
        $(this).parents('.mdl-navigation__level1').next().find('a.mdl-navigation__link').each(function(){
            //console.log(this);
            $(this).next('form').slideUp(500);
            $(this).removeClass('active');
            $(this).find('.arrow_box').removeClass('active').hide();
            $('#legend').hide();
            layersName.push($(this).attr('href').substring(1));
        });

        $('input[name=legend-radio]').prop('checked', false);

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

        $(this).prop('checked', false).hide();
        event.stopPropagation();
    });

}



function addLegend(map) {
    var urlGeoServer = '/geoserver';
    var layerOn = '';
    var url = '';

    $('.mdl-navigation__level2 > .mdl-navigation__link').prepend(' <div class="arrow_box" ></div>');
    $('.mdl-navigation__level2 > .mdl-navigation__link').prepend('<input name="legend-radio"  class="legend-radio" data-toggle="tooltip" data-placement="bottom" title="Показати легенду"  type="radio">');
    $('.legend-radio').hide();
    $('.arrow_box').hide();
    $('.mdl-navigation__level2 > .mdl-navigation__link').click(function () {
        if ($(this).hasClass('active')) {
            $(this).find('.legend-radio').show();
            $(this).find('.arrow_box').show();
            $(this).addClass('active').show();
        } else {
            $(this).find('.legend-radio').hide();
            $(this).find('.arrow_box').hide();
        }

    });
    var ifChange = false;
    $('input[name=legend-radio]').mouseup(function (event) {
        if ($(this).prop('checked')) {
            $(this).removeAttr('checked');
            $(this).next().removeClass('active');
            $(this).prop('checked', false)
            ifChange = false;
        } else {
            $(this).next().addClass('active');
            ifChange = true;

        }
    });

    $('input[name=legend-radio]').click(function (event) {
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

function votingResult() {
    var voiceResult;
    var idTicketit = $('#id_ticketit').val();
    $.ajax({
        url: '/votingResult',
        type: 'POST',
        async: false,
        dataType: "json",
        data: {
            'idTicketit': idTicketit
        },
        success: function (data) {
            voiceResult = "<h5 style='font-weight: 600'>Результати опитування:</h5>"
            voiceResult += "<h5>Підтримали:<b style='color: green'>" + data.true + "</b></h5>"
            voiceResult += "<h5>Не підтримали:<b style='color: red'>" + data.false + "</b></h5>"
        }

    });
    return voiceResult;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(function () {
    "use strict";
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
                        $('.votingAll').after('<h4  id="votingMessage" >Дякуємо, що прийняли участь в опитуванні.<h4>')
                        $('#votingMessage').after(votingResult());
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

//            if ($(this).hasClass('active')) {
            toggleOL($(this).attr('href').substr(1), $(this));
//            } else {
//                showUP($(this).attr('href').substr(1), $(this));
//            }
            if ($(this).hasClass('active') == false && $(this).find('.arrow_box').hasClass('active')) {
                $('.legend').hide();
                $(this).find('.legend-radio').hide();
                $(this).find('.legend-radio').removeAttr('checked');
                $(this).find('.arrow_box').removeClass('active');
                $(this).find('.arrow_box').hide();
            }

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
        var wmsSource = new ol.source.ImageWMS({
            url: '/kmda/wms',
            //         url: 'http://212.26.144.110/geowebcache/service/wms',
//            url: 'http://212.26.144.107:8092/vector/geoserver/gwc/service/wms',
            //   url: 'http://192.168.33.51/geowebcache/service/wms',
            params: {
                'LAYERS': 'kmda:kmda_l_orenda',
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
        });

        var wmsSource2 = new ol.source.ImageWMS({
            url: '/kmda/wms',
            //         url: 'http://212.26.144.110/geowebcache/service/wms',
//            url: 'http://212.26.144.107:8092/vector/geoserver/gwc/service/wms',
            //   url: 'http://192.168.33.51/geowebcache/service/wms',
            params: {
                'LAYERS': 'kmda:kmda_orenda',
                'VERSION': '1.1.1',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 703,
                'HEIGHT': 768,
                'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
//            projection: 'EPSG:900913',
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var wmsLayer2 = new ol.layer.Image({
            source: wmsSource2,
            visible: 0,
            name: 'wms2'

            //           extent: map.getView().calculateExtent(map.getSize()),
//            imageSize: [192,192]
        });

        var wmsSource3 = new ol.source.ImageWMS({
            url: '/kmda/wms',
            //         url: 'http://212.26.144.110/geowebcache/service/wms',
//            url: 'http://212.26.144.107:8092/vector/geoserver/gwc/service/wms',
            //   url: 'http://192.168.33.51/geowebcache/service/wms',
            params: {
                'LAYERS': 'kmda:kmda_l_privat',
                'VERSION': '1.1.1',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 768,
                'HEIGHT': 520,
                'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
//            projection: 'EPSG:900913',
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var wmsLayer3 = new ol.layer.Image({
            source: wmsSource3,
            visible: 0,
            name: 'wms3'

            //           extent: map.getView().calculateExtent(map.getSize()),
//            imageSize: [192,192]
        });

        var wmsSource4 = new ol.source.ImageWMS({
            url: '/kmda/wms',
            //         url: 'http://212.26.144.110/geowebcache/service/wms',
//            url: 'http://212.26.144.107:8092/vector/geoserver/gwc/service/wms',
            //   url: 'http://192.168.33.51/geowebcache/service/wms',
            params: {
                'LAYERS': 'kmda:kmda_l_komunal_org',
                'VERSION': '1.1.1',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 768,
                'HEIGHT': 520,
                'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
//            projection: 'EPSG:900913',
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var wmsLayer4 = new ol.layer.Image({
            source: wmsSource4,
            visible: 0,
            name: 'wms4'

            //           extent: map.getView().calculateExtent(map.getSize()),
//            imageSize: [192,192]
        });

        var wmsSource5 = new ol.source.TileWMS({
            url: '/kmda/wms',
            params: {
                'LAYERS': 'kmda:kmda_l_building',
                'VERSION': '1.1.1',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 716,
                'HEIGHT': 768,
                'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var wmsLayer5 = new ol.layer.Tile({
            source: wmsSource5,
            visible: 0,
            name: 'wms5'
        });
        var wmsSource6 = new ol.source.TileWMS({
            url: '/kmda/wms',
            params: {
                'LAYERS': 'kmda:kmda_l_street',
                'VERSION': '1.1.1',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 716,
                'HEIGHT': 768,
                'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var wmsLayer6 = new ol.layer.Tile({
            source: wmsSource6,
            visible: 0,
            name: 'wms6'
        });
        var wmsSource7 = new ol.source.ImageWMS({
            url: '/kyiv.recl/wms',
            params: {
                'LAYERS': 'kyiv.recl:reclama',
                'VERSION': '1.1.1',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 768,
                'HEIGHT': 758,
                'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var wmsLayer7 = new ol.layer.Image({
            source: wmsSource7,
            visible: 0,
            name: 'wms7'
        });
        var wmsSource8 = new ol.source.TileWMS({
            url: '/kmda/wms',
            params: {
                'LAYERS': 'kmda:kmda_l_function',
                'VERSION': '1.1.1',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 765,
                'HEIGHT': 768,
                'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var wmsLayer8 = new ol.layer.Tile({
            source: wmsSource8,
            visible: 0,
            name: 'wms8'
        });
        var wmsSource9 = new ol.source.ImageWMS({
            url: '/kmda/wms',
            params: {
                'LAYERS': 'kmda:kmda_l_land',
                'VERSION': '1.1.1',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 768,
                'HEIGHT': 730,
                'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var wmsLayer9 = new ol.layer.Image({
            source: wmsSource9,
            visible: 0,
            name: 'wms9'
        });
        var wmsSource10 = new ol.source.TileWMS({
            url: '/kmda/wms',
            params: {
                'LAYERS': 'kmda:kmda_l_muo',
                'VERSION': '1.1.1',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 768,
                'HEIGHT': 727,
                'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var wmsLayer10 = new ol.layer.Tile({
            source: wmsSource10,
            visible: 0,
            name: 'wms10'
        });

        var wmsSource11 = new ol.source.TileWMS({
            url: '/dzk',
            params: {
                'LAYERS': 'kadastr',
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

        var wmsLayer11 = new ol.layer.Tile({
            source: wmsSource11,
            visible: 0,
            name: 'wms11'
        });
        var wmsSource12 = new ol.source.TileWMS({
            url: '/kmda/wms',
            params: {
                'LAYERS': 'kmda:kmda_l_scheme_dpt',
                'VERSION': '1.1.1',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 768,
                'HEIGHT': 711,
                'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var wmsLayer12 = new ol.layer.Tile({
            source: wmsSource12,
            visible: 0,
            name: 'wms12'
        });
        var wmsSource13 = new ol.source.TileWMS({
            url: '/kmda/wms',
            params: {
                'LAYERS': 'kmda:kmda_l_function_change',
                'VERSION': '1.1.1',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 768,
                'HEIGHT': 752,
                'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var wmsLayer13 = new ol.layer.Tile({
            source: wmsSource13,
            visible: 0,
            name: 'wms13'
        });

        var wmsSource14 = new ol.source.ImageWMS({
            url: '/kmda/wms',
            params: {
                'LAYERS': 'kmda:kmda_r_road',
                'VERSION': '1.1.1',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 768,
                'HEIGHT': 557,
                'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var wmsLayer14 = new ol.layer.Image({
            source: wmsSource14,
            visible: 0,
            name: 'wms14'
        });

        var wmsSource15 = new ol.source.TileWMS({
            url: '/kmda/wms',
            params: {
                'LAYERS': 'kmda:kmda_i_street_flash',
                'VERSION': '1.1.1',
                'TILED': 'false',
                'FORMAT': 'image/png8',
                'WIDTH': 716,
                'HEIGHT': 768,
                'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var wmsLayer15 = new ol.layer.Tile({
            source: wmsSource15,
            visible: 0,
            name: 'wms15'
        });

        var wmsSource16 = new ol.source.ImageWMS({
            url: '/kmda/wms',
            params: {
                'LAYERS': 'kmda:kmda_i_pole',
                'VERSION': '1.1.1',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 433,
                'HEIGHT': 768,
                'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var wmsLayer16 = new ol.layer.Image({
            source: wmsSource16,
            visible: 0,
            name: 'wms16'
        });

        var wmsSource17 = new ol.source.TileWMS({
            url: '/kmda/wms',
            params: {
                'LAYERS': 'kmda:kmda_t_station',
                'VERSION': '1.1.1',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 768,
                'HEIGHT': 757,
                'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var wmsLayer17 = new ol.layer.Tile({
            source: wmsSource17,
            visible: 0,
            name: 'wms17'
        });

        var wmsSource19 = new ol.source.TileWMS({
            url: '/kmda/wms',
            params: {
                'LAYERS': 'kmda:kmda_p_parkservice',
                'VERSION': '1.1.1',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 768,
                'HEIGHT': 608,
                'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var wmsLayer19 = new ol.layer.Tile({
            source: wmsSource19,
            visible: 0,
            name: 'wms19'
        });

        var wmsSource20 = new ol.source.TileWMS({
            url: '/kmda/wms',
            params: {
                'LAYERS': 'kmda:kmda_z_zelenbud',
                'VERSION': '1.1.1',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 330,
                'HEIGHT': 768,
                'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var wmsLayer20 = new ol.layer.Tile({
            source: wmsSource20,
            visible: 0,
            name: 'wms20'
        });

        var wmsSource21 = new ol.source.TileWMS({
            url: '/kmda/wms',
            params: {
                'LAYERS': 'kmda:kmda_t_station_bus',
                'VERSION': '1.1.1',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 768,
                'HEIGHT': 757,
                'CRS': 'EPSG:900913',
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var wmsLayer21 = new ol.layer.Tile({
            source: wmsSource21,
            visible: 0,
            name: 'wms21'
        });

        var wmsSource22 = new ol.source.TileWMS({
            url: '/kmda/wms',
            params: {
                'LAYERS': 'kmda:kmda_r_smartroads',
                'VERSION': '1.1.1',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 768,
                'HEIGHT': 433,
                'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });


        var wmsLayer22 = new ol.layer.Tile({
            source: wmsSource22,
            visible: 0,
            name: 'wms22'
        });

        var wmsSource23 = new ol.source.TileWMS({
            url: '/kmda/wms',
            params: {
                'LAYERS': 'kmda:kmda_l_monitoring',
                'VERSION': '1.1.1',
                'TILED': 'true',
                'FORMAT': 'image/png8',
//                'WIDTH': 768,
//                'HEIGHT': 433,
                'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });


        var wmsLayer23 = new ol.layer.Tile({
            source: wmsSource23,
            visible: 0,
            name: 'wms23'
        });
        
        osmLayer = new ol.layer.Tile({
            source: new ol.source.OSM(),
            visible: 1,
            name: 'osm',
        });


        var kiev2006Layer = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'http://map.land.gov.ua/map/ortho10k_all/{z}/{x}/{-y}.jpg',
                crossOrigin: 'null'
            }),
            name: 'kiev2006',
            visible: 0,
//            projection: projection,
//            tileUrlFunction: function(tileCoord) {
//                return urlTemplate.replace('{z}', (tileCoord[0] - 1).toString())
//                                  .replace('{x}', tileCoord[1].toString())
//                                  .replace('{y}', (-tileCoord[2] - 1).toString());
//              },
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
        var kiev2000Layer = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: '/topo2k_kyiv/{z}/{x}/{-y}.jpg',
                crossOrigin: 'null',
            }),
            name: 'kiev2000',
            visible: 0,
        });
        var view = new ol.View({
            center: [3396647.44192, 6527057.33961],
//            extent: [3365331.64184455, 6509557.90965887, 3417855.95133155, 6545186.44247934],
            extent: [3347533.00, 6463838.00, 3457804.00, 6576380.00],
//            projection: projection,
            zoom: 12,
            minZoom: 2
        });

//        var iconFeature = new ol.Feature();
//        var styleiconFeature =new ol.style.Style({
//                        image: new ol.style.Icon({
//                            opacity: 0.75,
//         //                   src: "data:image/svg+xml;base64," + btoa( svgto ),
//                            src: "/marker-new.png",
//                            size: [48,48],
//                            anchor: [0.5, 24],
//                            anchorXUnits: 'fraction',
//                            anchorYUnits: 'pixel',
//                          
//                        })
//                    });
//        iconFeature.setStyle(styleiconFeature);

//        var gmlSource = new ol.source.Vector();
//        var gmlLayer = new ol.layer.Vector({
//            source: gmlSource,
//            map: map,
//            style: new ol.style.Style({
//              stroke: new ol.style.Stroke({
//                color: '#f00',
//                width: 1
//              }),
//              fill: new ol.style.Fill({
//                color: 'rgba(255,0,0,0.1)'
//              })
//            })
//          });

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
        googleLayer = new olgm.layer.Google({name: 'google', visible: 0, mapTypeId: google.maps.MapTypeId.SATELLITE});
        var googleHybridLayer = new olgm.layer.Google({
            name: 'googlehybrid',
            visible: 0,
            mapTypeId: google.maps.MapTypeId.HYBRID
        });
//osmLayer.setVisible(false);
//googleLayer.setVisible(false);

        map = new ol.Map({
//            interactions: olgm.interaction.defaults(),
            target: "mapView",
            layers: [
//                   new ol.layer.Tile({ source: new ol.source.MapQuest({layer: 'sat'}) }), 
//                   new ol.layer.Tile({ source: new ol.source.MapQuest({layer: 'hyb'}) }),
                googleLayer,
                googleHybridLayer,
//                satLayer,
                osmLayer,
                kiev2000Layer,
                kiev2006Layer,
                kiev2015Layer,
                wmsLayer5,
                wmsLayer6,
                wmsLayer7,
                wmsLayer8,
                wmsLayer9,
                wmsLayer10,
                wmsLayer11,
                wmsLayer12,
                wmsLayer13,
                wmsLayer14,
                wmsLayer15,
                wmsLayer16,
                wmsLayer17,
                wmsLayer19,
                wmsLayer20,
                wmsLayer21,
                wmsLayer22,
                wmsLayer23,
                wmsLayer,
                wmsLayer2,
                wmsLayer3,
                wmsLayer4,

            ],
            //           overlays: [overlay],
            view: view,
            controls: [],
        });

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
            tipLabel: 'Оглядова карта'
        });

        map.addControl(overview);
        var olGM = new olgm.OLGoogleMaps({map: map}); // map is the ol.Map instance
        olGM.activate();
        $('div.mapPlaceholder').remove();
        windowResizeHandler();
        addLegend(map);
        addMeasure(map);
        layersOff(map);

        //       map.getView().fitExtent(wmsSource.getExtent(), map.getSize());

//         map.getView().fitExtent(wmsLayer.getExtent(), map.getSize());
//var extente = [3365331.64184455,6509557.90965887,3417855.95133155,6545186.44247934];
//map.getView().fitExtent(extente, map.getSize());
        $('#bazlayer select').on('change', function () {
            //     console.log($( "select option:selected" ).val());
            var selected = $(this).find('option:selected').val();
//    alert(selected);
            var artbaz = ['osm', 'google', 'googlehybrid', 'kiev2000', 'kiev2006', 'kiev2015'];
            map.getLayers().forEach(function (l, i) {
                if (($.inArray(l.get('name'), artbaz)) > -1) {
                    if (l.get('name') !== selected) {
                        l.setVisible(false);
                    } else {
                        l.setVisible(true);
                    }
                    //      if(l.get('name')==='google')
                    //        {  l.setVisible(true); }
                }
            });
            //  $('.gm-style').removeClass('gm-style');
        });

        $('#bazlayer select').change();
//        var rightNav = false;


//                map.on('pointermove', function(event) {
//                    var feature = map.forEachFeatureAtPixel(event.pixel, function(feature, layer) {
//                              return feature;
//                            }, null, function(layer) {
//                              return layer === wmsLayer;
//                            });
//                  var target = document.getElementById(map.getTarget());
//                  if (feature) {
//
//                  target.style.cursor = 'pointer';
//
//                  } else { 
//                      target.style.cursor = ''; 
//
//                  }
//                }); 

        map.on('singleclick', function (evt) {

//            $.ajax({
//                url: '/api/streettype.json',
//                type: 'GET',
//                success: function (data) {
//                    console.log(data);
//                },
//                error: function () {
//                    console.log('error');
//                }
//            });
//      document.getElementById('popup').innerHTML = '';
            var viewResolution = (view.getResolution());

//            var infocontainer = document.getElementById('information');
            var infocontainer = document.getElementById('information');
            var url;
            var flah = false;

            var infostr;

            var indic;
            var count = 0;
//            var temp_photo;
            map.getLayers().forEach(function (l, i) {
                if ((($.inArray(l.get('name'), art)) > -1) && (l.getVisible())) {
                    url = l.getSource().getGetFeatureInfoUrl(
                        evt.coordinate, viewResolution, 'EPSG:900913',
                        {'INFO_FORMAT': 'application/json'});
                    //var fitextent  = [3399302.74458409,6523059.490493268,3400267.76206619,6524024.507975368];
                    //map.getView().fit(fitextent, map.getSize());
                    //console.log(l.getSource().getExtent());
                    $.ajax({
                        url: url,
                        dataType: 'json',
//          jsonpCallback: 'parseResponse'
                    }).then(function (response) {
                        //         var result = parser.readFeatures(response);
                        //         console.log(response);
//                        temp_photo = response.features[0].properties.objectid;
                        for (var i = 0; i < response.features.length; i++) {
                            if (!flah) {
//                                infostr = "<div id='carousel-example-generic' class='carousel slide' data-ride='carousel' data-interval='3000' role='listbox'>";
//                                infostr += "<ol class='carousel-indicators'>" +
//                                        "<li data-target='carousel-example-generic' data-slide-to='0' class='active'></li>" +
//                                        "<li data-target='carousel-example-generic' data-slide-to='1'></li>" +
//                                        "</ol>";
//
//                                infostr += "<div class='carousel-inner'><div class='item active'>";
                                infostr = "<div class='item active'>";
                                infostr += "<div class='mdl-card__title mdl-card--expand mdl-color--teal-300'></div>";
                                indic = '<li data-target="#carousel-example-generic" data-slide-to="' + count + '" class="active"></li>';
                                flah = true;
                            } else {
                                infostr += "<div class='item'>";
                                infostr += "<div class='mdl-card__title mdl-card--expand mdl-color--teal-300'></div>";
                                indic += '<li data-target="#carousel-example-generic" data-slide-to="' + count + '"></li>';
                            }
                            count++;

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

                            //       infostr += "<div class='carousel-caption'>";
                            infostr += "<div class='demo-card__title mdl-card--expand mdl-color--teal-300'><h1>" + name + "</h1>";

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

//                            if (districtname) {
//                                infostr += districtname;
//                            }
//                            if (addrstreet) {
//                                infostr += " " + addrstreet;
//                            }
//                            if (housenum) {
//                                infostr += housenum;
//                            }
                            if (districtname && addrstreet && housenum) {
                                infostr += "<h2>" + districtname + " " + addrstreet + " " + housenum + "</h2>";
                            }
                            if (response.features[i].properties.reclAdress !== undefined) {
                                infostr += "<h2>" + response.features[i].properties.reclAdress + "</h2>";
                            }
                            if (response.features[i].properties.code_addro !== undefined) {
                                infostr += "<h2>" + response.features[i].properties.code_addrn + " " + response.features[i].properties.code_addro + "</h2>";
                            }
                            if (response.features[i].properties.address !== undefined) {
                                infostr += "<h2>" + response.features[i].properties.address + "</h2>";
                            }

                            infostr += "</div><div class='mdl-card__supporting-text mdl-color-text--grey-600'>";
                            if (response.features[i].properties.cadnum != undefined) {
                                infostr += "<small>Кадастровий номер</small><h5>" + response.features[i].properties.cadnum + "</h5>";
                            }
                            var ownership;
                            if ((ownership = response.features[i].properties.OrgOwnership) === undefined) {
                                ownership = response.features[i].properties.ownership;
                            }
                            if (ownership) {
                                infostr += "<small>Форма власностi</small><h5>" + ownership + "</h5>";
                            }
                            if (response.features[i].properties.right_type !== undefined) {
                                infostr += "<small>Права власностi</small><h5>" + response.features[i].properties.right_type + "</h5>";
                            }
                            if (response.features[i].properties.type !== undefined) {
                                infostr += "<small>Тип</small><h5>" + response.features[i].properties.type + "</h5>";
                            }
                            if (response.features[i].properties.reclType !== undefined) {
                                infostr += "<small>Тип</small><h5>" + response.features[i].properties.reclType + "</h5>";
                            }
                            if (response.features[i].properties.reclOwner !== undefined) {
                                infostr += "<small>Замовник</small><h5>" + response.features[i].properties.reclOwner + "</h5>";
                            }
                            if (response.features[i].properties.zamovn_b !== undefined) {
                                infostr += "<small>Замовник</small><h5>" + response.features[i].properties.zamovn_b + "</h5>";
                            }

                            if (response.features[i].properties.zamovnyk !== undefined) {
                                infostr += "<small>Замовник</small><h5>" + response.features[i].properties.zamovnyk + "</h5>";
                            }
                            if (response.features[i].properties.rozrobnik_ !== undefined) {
                                infostr += "<small>Розробник</small><h5>" + response.features[i].properties.rozrobnik_ + "</h5>";
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
                                infostr += "<small>Загальна площа (кв. м.)</small><h5>" + sqrtotal + "</h5>";
                            }
                            var costbalance;
                            if ((costbalance = response.features[i].properties.CostBalans) === undefined) {
                                costbalance = response.features[i].properties.costbalans;
                            }
                            if (costbalance) {
                                infostr += "<small>Балансова вартiсть (тис. грн.)</small><h5>" + costbalance + "</h5>";
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
                                infostr += "<small>Призначення</small><h5>" + busage + "</h5>";
                            }
                            var bkind;
                            if ((bkind = response.features[i].properties.BuildingKind) == undefined) {
                                if ((bkind = response.features[i].properties.kind) == undefined) {
                                    bkind = response.features[i].properties.p0003;
                                }
                            }
                            if (bkind) {
                                infostr += "<small>Вид об'єкту</small><h5>" + bkind + "</h5>";
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
                                infostr += "<small>Тип об'єкту</small><h5>" + btype + "</h5>";
                            }
                            var btech;
                            if ((btech = response.features[i].properties.BTS_NAME) == undefined) {
                                btech = response.features[i].properties.btechstate;
                            }
                            if (btech) {
                                infostr += "<small>Стан об'єкту</small><h5>" + btech + "</h5>";
                            }
                            if (response.features[i].properties.link != undefined) {
                                if (response.features[i].properties.name_obj != undefined) {
                                    infostr += "<small>Посилання на документ</small>";
                                } else {
                                    infostr += "<small>" + response.features[i].properties.name_obj + "</small>";
                                }
                                infostr += "<h5><a target='_blank' href='/PDF/" + response.features[i].properties.id_region + "/" + response.features[i].properties.link + "'>" + response.features[i].properties.doc_type + "</a></h5>";
                            }
                            if (response.features[i].properties.num_in != undefined) {
                                infostr += "<small>Вхідний номер</small><h5>" + response.features[i].properties.num_in + "</h5>";
                            }
                            if (response.features[i].properties.data_in != undefined) {
                                infostr += "<small>Вхідна дата</small><h5>" + response.features[i].properties.data_in + "</h5>";
                            }
                            if (response.features[i].properties.num_out != undefined) {
                                infostr += "<small>Вихідний номер</small><h5>" + response.features[i].properties.num_out + "</h5>";
                            }
                            if (response.features[i].properties.data_out != undefined) {
                                infostr += "<small>Вихідна дата</small><h5>" + response.features[i].properties.data_out + "</h5>";
                            }
                            if (response.features[i].properties.cad_num_z != undefined) {
                                infostr += "<small>Кадастровий номер</small><h5>" + response.features[i].properties.cad_num_z + "</h5>";
                            }

                            if (response.features[i].properties.chanfunc != undefined) {
                                infostr += "<small>Нова функція території за генеральним планом міста</small><h5>" + response.features[i].properties.chanfunc + "</h5>";
                            }
                            if (response.features[i].properties.code_func1 != undefined) {
                                infostr += "<small>Код нової функції</small><h5>" + response.features[i].properties.code_func1 + "</h5>";
                            }

                            if (response.features[i].properties.nrishkmda != undefined) {
                                infostr += "<small>Номер рішення КМДА</small><h5>" + response.features[i].properties.nrishkmda + "</h5>";
                            }

                            if (response.features[i].properties.n_rish_kmr != undefined) {
                                infostr += "<small>Номер рішення Київради про затвердження</small><h5>" + response.features[i].properties.n_rish_kmr + "</h5>";
                            }
                            if (response.features[i].properties.rayon_b != undefined) {
                                infostr += "<small>Адмінрайон міста</small><h5>" + response.features[i].properties.rayon_b + "</h5>";
                            }
                            if (response.features[i].properties.rozrobnik_doc != undefined) {
                                infostr += "<small>Розробник містобудівної документації</small><h5>" + response.features[i].properties.rozrobnik_doc + "</h5>";
                            }
                            if (response.features[i].properties.reestrazno != undefined) {
                                infostr += "<small>Реєстраціний номер</small><h5>" + response.features[i].properties.reestrazno + "</h5>";
                            }

                            if (response.features[i].properties.stadia_roz != undefined) {
                                infostr += "<small>Стадія розроблення </small><h5>" + response.features[i].properties.stadia_roz + "</h5>";
                            }
                            if (response.features[i].properties.type_b != undefined) {
                                infostr += "<small>Тип містобудівної документації</small><h5>" + response.features[i].properties.type_b + "</h5>";
                            }

                            if (response.features[i].properties.daterihkr != undefined) {
                                infostr += "<small>Дата рішення КМДА</small><h5>" + response.features[i].properties.daterihkr + "</h5>";
                            }
                            if (response.features[i].properties.group_name != null) {
                                infostr += "<small>Назва групи</small><h5>" + response.features[i].properties.group_name + "</h5>";
                            }
                            if (response.features[i].properties.pidstavaza != null) {
                                infostr += "<small>Підстава внесення</small><h5>" + response.features[i].properties.pidstavaza + "</h5>";
                            }
                            if (response.features[i].properties.code != null) {
                                infostr += "<small>Код</small><h5>" + response.features[i].properties.code + "</h5>";
                            }
                            if (response.features[i].properties.status != undefined) {
                                infostr += "<small>Статус</small><h5>" + response.features[i].properties.status + "</h5>";
                            }
                            if (response.features[i].properties.zamovn != undefined) {
                                infostr += "<small>Замовник</small><h5>" + response.features[i].properties.zamovn + "</h5>";
                            }
                            if (response.features[i].properties.p_name != undefined) {
                                infostr += "<small>Місце розташування</small><h5>" + response.features[i].properties.p_name + "</h5>";
                            }
                            if (response.features[i].properties.content != undefined) {
                                infostr += "<small>Опис</small><h5>" + response.features[i].properties.content + "</h5>";
                            }

                            if (response.features[i].properties.inv_number != null) {
                                infostr += "<small>Інвентарний номер</small><h5>" + response.features[i].properties.inv_number + "</h5>";
                            }
                            if (response.features[i].properties.priority_name != undefined) {
                                infostr += "<small>Статус</small><h5>" + response.features[i].properties.priority_name + "</h5>";
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
                                infostr += "<small>Форма паркування</small><h5>" + response.features[i].properties.p_mode + "</h5>";
                            }

                            if (response.features[i].properties.p_zone != undefined) {
                                infostr += "<small>Номер зони</small><h5>" + response.features[i].properties.p_zone + "</h5>";
                            }
                            if (response.features[i].properties.html != undefined) {
//                                var pattern = /<img (.+)>/ig;
//
//                                console.log(pattern.exec(response.features[i].properties.html));
                                infostr += "<div style='display:none;'>" + response.features[i].properties.html + "</div>";
                            }
                            if (response.features[i].properties.area_project != undefined) {
                                infostr += "<small>Проектна площа ремонту (кв. м.)</small><h5>" + response.features[i].properties.area_project + "</h5>";
                            }
                            if (response.features[i].properties.area_fact != undefined) {
                                infostr += "<small>Фактична площа ремонту (кв. м.)</small><h5>" + response.features[i].properties.area_fact + "</h5>";
                            }
                            if (response.features[i].properties.cost_repairs != undefined) {
                                infostr += "<small>Проектна вартість ремонту (тис. грн.)</small><h5>" + response.features[i].properties.cost_repairs + "</h5>";
                            }
                            if (response.features[i].properties.cost_repairs_fact != undefined) {
                                infostr += "<small>Фактична вартість ремонту (тис. грн.)</small><h5>" + response.features[i].properties.cost_repairs_fact + "</h5>";
                            }

                            if (response.features[i].properties.field_1 != undefined) {
                                infostr += "<small>Ідентифікатор об'єкта</small><h5>" + response.features[i].properties.field_1 + "</h5>";
                            }
                            if (response.features[i].properties.field_2 != undefined) {
                                infostr += "<small>Номер ПВ-ВП</small><h5>" + response.features[i].properties.field_2 + "</h5>";
                            }
                            if (response.features[i].properties.field_3 != undefined) {
                                infostr += "<small>Тип опори</small><h5>" + response.features[i].properties.field_3 + "</h5>";
                            }
                            if (response.features[i].properties.field_4 != undefined) {
                                infostr += "<small>Дата установки опори</small><h5>" + response.features[i].properties.field_4 + "</h5>";
                            }
                            if (response.features[i].properties.field_5 != undefined) {
                                infostr += "<small>Кронштейн</small><h5>" + response.features[i].properties.field_5 + "</h5>";
                            }
                            if (response.features[i].properties.field_6 != undefined) {
                                infostr += "<small>Тип світильника</small><h5>" + response.features[i].properties.field_6 + "</h5>";
                            }
                            if (response.features[i].properties.field_7 != undefined) {
                                infostr += "<small>Дата установки світильника</small><h5>" + response.features[i].properties.field_7 + "</h5>";
                            }
                            if (response.features[i].properties.field_8 != undefined) {
                                infostr += "<small>Дата установки ламп</small><h5>" + response.features[i].properties.field_8 + "</h5>";
                            }
                            if (response.features[i].properties.field_9 != undefined) {
                                infostr += "<small>Номер опори</small><h5>" + response.features[i].properties.field_9 + "</h5>";
                            }
                            if (response.features[i].properties.agreement_number) {
                                infostr += "<small>Номер договору</small><h5>" + response.features[i].properties.agreement_number + "</h5>";
                            }
                            if (response.features[i].properties.agreement_date) {
                                infostr += "<small>Дата договору</small><h5>" + response.features[i].properties.agreement_date + "</h5>";
                            }
                            if (response.features[i].properties.sqr_rent) {
                                infostr += "<small>Площа оренди</small><h5>" + response.features[i].properties.sqr_rent + " (кв. м.)</h5>";
                            }
                            if (response.features[i].properties.reason) {
                                infostr += "<small>Підстава</small><h5>" + response.features[i].properties.reason + "</h5>";
                            }

                            if (response.features[i].properties.org_name) {
                                infostr += "<small>Балансоутримувач</small><h5>" + response.features[i].properties.org_name + "</h5>";
                            }
                            if (response.features[i].properties.region) {
                                infostr += "<small>Район</small><h5>" + response.features[i].properties.region + "</h5>";
                            }
                            if (response.features[i].properties.subject) {
                                infostr += "<small>Суб'єкт господарювання</small><h5>" + response.features[i].properties.subject + "</h5>";
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
                                    infostr += '<div class="votingAll btn-group btn-group-justified"><div class="btn-group"><input type="button" name="1" class="voting btn btn-default " value="Підтримую"></div><div class="btn-group"><input type="button" class="voting btn btn-default" value="Не підтримую" name="0"></div></div>';
                                }
                            }

                            if (response.features[i].properties.tech) {
                                infostr += "<small>Тех. облаштування</small><h5>" + response.features[i].properties.tech + "</h5>";
                            }
                            if (response.features[i].properties.type) {
                                infostr += "<small>Тип паркування</small>" + response.features[i].properties.type + "</h5>";
                            }
                            if (response.features[i].properties.zone) {
                                infostr += "<small>Зона</small><h5>" + response.features[i].properties.zone + "</h5>";
                            }
                            if (response.features[i].properties.payment_type) {
                                infostr += "<small>Вид оплати</small><h5>" + response.features[i].properties.payment_type + "</h5>";
                            }
                            if (response.features[i].properties.allsquare) {
                                infostr += "<small>Площа (кв. м.)</small><h5>" + response.features[i].properties.allsquare + "</h5>";
                            }
                            if (response.features[i].properties.cars) {
                                infostr += "<small>Машиномісць</small><h5>" + response.features[i].properties.cars + "</h5>";
                            }
                            if (response.features[i].properties.freesquare) {
                                infostr += "<small>Безоплатне паркування (кв. м.)</small><h5>" + response.features[i].properties.freesquare + "</h5>";
                            }

                            if (response.features[i].properties.mode) {
                                infostr += "<small>Режим роботи</small><h5>" + response.features[i].properties.mode + "</h5>";
                            }
                            if (response.features[i].properties.paysquare) {
                                infostr += "<small>Для паркування (кв. м.)</small><h5>" + response.features[i].properties.paysquare + "</h5>";
                            }
                            if (response.features[i].properties.privilege) {
                                infostr += "<small>Кількість пільгових машиномісць</small><h5>" + response.features[i].properties.privilege + "</h5>";
                            }
                            if (response.features[i].properties.price) {
                                infostr += "<small>Вартість</small><h5>" + response.features[i].properties.price + "</h5>";
                            }

                            if (response.features[i].properties.p_cost || response.features[i].properties.p_cost == 0) {
                                if (response.features[i].properties.p_cost == 0) {
                                    infostr += "<small>Надходження(грн.)</small><h5>Інформація не надана КПТС</h5>";
                                } else {
                                    infostr += "<small>Надходження (грн.)</small><h5>" + response.features[i].properties.p_cost + "</h5>";
                                }
                            }
                            if (response.features[i].properties.objectid) {
                                $("#orendadoc").attr('href', "/orendadoc/" + response.features[i].properties.objectid + "/new");
                            }
                            //       infostr += "<div class='rdown'><a href='javascript:void(0)'>СТВОРИТИ ЗАЯВКУ</a></div></div>";
                            infostr += "</div></div>";
//                             $('<li data-target="#carousel-example-generic" data-slide-to="'+count+'"></li>').appendTo('.carousel-indicators');
//                             count++;
                        }

                    });

                }

            });

            setTimeout(function () {
                if (flah) {
//                    $.ajax({
//                        type: 'get',
//                        url: '/app_dev.php/getphoto/' + temp_photo,
//                    }).then(function(response) {
//                        console.log(response);
//                        $("div.mdl-card__title").css("background-image","data:image/jpeg;base64," + response);
//                    });
//                    console.log(indic);
//$('.carousel-indicators > li').first().addClass('active');
                    $('ol.carousel-indicators').html(indic);
                    infocontainer.innerHTML = infostr;

                    //                $('.mdl-card__actions').html("<a class='mdl-button mdl-js-button mdl-js-ripple-effect' href=/app_dev.php/orendadoc/"+ objectid +"/new>СТВОРИТИ ЗАЯВКУ</a>");
                    //$('.mdl-card__supporting-text').height($(window).height() - $('.mdl-card__title').height() - $('.demo-card__title').height() - $('.mdl-card__actions').height());                    
                    $('.carousel').carousel();
                    $(".carousel").carousel("pause").removeData();
                    $(".carousel").carousel(0);
// $('.mdl-card__supporting-text').height($(window).height() - $('.mdl-card__title').height() - $('.demo-card__title').height() - $('.mdl-card__actions').height());                   
//                    $("<a class='left carousel-control' href='#carousel-example-generic' role='button' data-slide='prev'>" +
//    "<span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span>" +
//    "<span class='sr-only'>Previous</span>" +
//  "</a>" +
//  "<a class='right carousel-control' href='#carousel-example-generic' role='button' data-slide='next'>" +
//    "<span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span>" +
//   " <span class='sr-only'>Next</span>").insertAfter(infocontainer);
//                    if (!rightNav) {
//                        $("#rightSide").addClass("expanded");
//                        $("#rightSwitch").addClass("expanded");
//                        $("#rightblur").addClass("expanded")
                    $('.mdl-card__supporting-text img:not(:first)').each(function (i, elem) {
                        $(this).hide().wrap("<a href='" + this.src + "' data-toggle='lightbox' data-gallery='multiimages'></a>");
//                                            $(this).click(function (e) {
//                    e.preventDefault();
//                    $(this).ekkoLightbox();
//                });
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
        });
//        $("#rightClose").on('click', function () {
//            $("#rightSide").removeClass("expanded");
//            rightNav = false;
//            $("#rightSwitch").removeClass("expanded");
//            $("#rightblur").removeClass("expanded");
//        });
        $('#search').bind("enterKey", function (e) {
            var searchval = $('#search').val();
//    console.log(searchval);
            $.ajax({
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
        $('#search').keyup(function (e) {
            if (e.keyCode == 13) {
                $(this).trigger("enterKey");
            }
        });
        $('#search').autocomplete({
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
        });


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

    $('.measure').hover(function(){
       $(this).addClass('is-active');
    });
    $('.measure').mouseleave(function(){
        $(this).removeClass('is-active');
    });

    /*----Add measure (END)----*/

}