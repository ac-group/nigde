var map;
var coordinate;
var trackLayer;
var marker;
var searchMarker;
var osmLayer;
// var googleLayer;
var art = ['parcelSidebar', 'vectorVinSidebar', 'wms3', 'orto10000sidebar', 'orto2000sidebar', 'dynamicSidebar', 'gryntSidebar', 'razgrafkaSidebar', 'boundVinSidebar', 'vinOrtoSidebar', 'topoVinSidebar', 'hydroVinSidebar', 'geodeticSidebar', 'buildingsVinSidebar', 'fencesVinSidebar', 'engcommVinSidebar', 'vegetVinSidebar', 'streetsVinSidebar', 'transportVinSidebar'];
var md;


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

function layersOff(map) {
    $('.mdl-navigation__level3').click(function () {

        if ($(this).hasClass('active')) {

            $(this).closest('.mdl-navigation__level2').prev().find('.layersOff').show().children('label').addClass('is-checked');
        } else {
            var isActive = false;

            $(this).closest('.mdl-navigation__level2').find('a.mdl-navigation__link').each(function () {
                if ($(this).hasClass('active')) {
                    isActive = true;
                    return false;
                }
            });

            if (isActive == false) {

                $(this).closest('.mdl-navigation__level2').prev().find('.layersOff').hide().removeClass('is-checked');


            }
        }
    });

//    $('.mdl-navigation__level1').prepend('<div class="layersOff"><label class="mdl-checkbox mdl-js-checkbox" for="checkbox2"><input type="checkbox" id="checkbox2" class="mdl-checkbox__input"><span class="mdl-checkbox__label"></span></label></div></label>');
    $('.mdl-navigation__level1').prepend('<div class="layersOff"><label class="mdl-checkbox mdl-js-checkbox" for="checkbox2"><input type="checkbox" id="checkbox2" class="mdl-checkbox__input"><span class="mdl-checkbox__label"></span><span class="mdl-checkbox__focus-helper"></span><span class="mdl-checkbox__box-outline"><span class="mdl-checkbox__tick-outline"></span></label></div>');
    $('.layersOff').on('mousedown', function (event) {
        var layersName = [];
        $(this).parents('.mdl-navigation__level1').next().find('a.mdl-navigation__link').each(function () {

            $(this).next('form').slideUp(500);
            $(this).removeClass('active');
            $(this).children('.ui-slider').hide();
            $(this).children('.legend-button').hide();
            if ($(this).children('.legend-button').hasClass('active')) {
                $('.legend-button').removeClass('active')
                $('.new_legend').hide();
            }
            layersName.push($(this).attr('href').substring(1));
        });

        if ($(this).parents('.mdl-navigation__level1').next('.mdl-navigation__level2').css('display') == 'none') {
            $(this).parents('.mdl-navigation__level1').removeClass('active');
        }

        if (layersName.length > 0) {
            map.getLayers().forEach(function (layer) {
                if (layer.get('name') != undefined) {
                    if ((layersName.indexOf(layer.get('name'))) != -1) {
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

function getLayerName() {

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


        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $('.new_legend').hide();
            $('.legend').hide();
        } else {
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
            $('.new_legent_title').text('Умовні знаки (' + layerName + ')');
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
function checkBin(n) {
    return/^[01]{1,64}$/.test(n)
}
function checkDec(n) {
    return/^[0-9]{1,64}$/.test(n)
}
function checkHex(n) {
    return/^[0-9A-Fa-f]{1,64}$/.test(n)
}
function pad(s, z) {
    s = "" + s;
    return s.length < z ? pad("0" + s, z) : s
}
function unpad(s) {
    s = "" + s;
    return s.replace(/^0+/, '')
}

//Decimal operations
function Dec2Bin(n) {
    if (!checkDec(n) || n < 0)
        return 0;
    return n.toString(2)
}
function Dec2Hex(n) {
    if (!checkDec(n) || n < 0)
        return 0;
    return n.toString(16)
}

//Binary Operations
function Bin2Dec(n) {
    if (!checkBin(n))
        return 0;
    return parseInt(n, 2).toString(10)
}
function Bin2Hex(n) {
    if (!checkBin(n))
        return 0;
    return parseInt(n, 2).toString(16)
}

//Hexadecimal Operations
function Hex2Bin(n) {
    if (!checkHex(n))
        return 0;
    return parseInt(n, 16).toString(2)
}
function Hex2Dec(n) {
    if (!checkHex(n))
        return 0;
    return parseInt(n, 16).toString(10)
}

function getParameterByName(name, url) {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function parsemaplinkURL() {
    var regex = new RegExp(/\/maplink\/([0-9.]+)\/([0-9.]+)\/([0-9.]+)\/([0-9a-fA-F]+)$/),
            result = regex.exec(window.location.href);
    return result;
}

function select(element) {
    var selectedText;

    if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        element.focus();
        element.setSelectionRange(0, element.value.length);

        selectedText = element.value;
    } else {
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

function geolocation(map) {


    if ($('#main_tt4').hasClass('active')) {

        var view = map.getView();

        // set up the geolocation api to track our position
        var geolocation = new ol.Geolocation({
            tracking: true,
            projection: view.getProjection()
        });

        // bind the view's projection
        // when we get a position update, add the coordinate to the track's
        // geometry and recenter the view
        if (marker === undefined) {
            $('#location').show();
            marker = new ol.Overlay({
                element: document.getElementById('location'),
                positioning: 'center-center',
            });
        }
        map.addOverlay(marker);

        geolocation.on('change:position', function () {

            coordinate = geolocation.getPosition();
            view.setCenter(coordinate);
            marker.setPosition(coordinate)
        });
        view.setCenter(coordinate);
        view.setZoom(14);
    } else {
        map.removeOverlay(marker);
    }
}


$(function () {
    md = new MobileDetect(window.navigator.userAgent);




    $('#main_tt7').on('click', function () {
        $('#modal-help').toggleClass('open');
    });

    $("#save_map_url").on('click', function () {
        if($('.mdl-layout__drawer').hasClass('left_menu_open')){
           $('#modal-copy .dialog_window_publication_bids_list_copy').css('left','315px');
        }else{
            $('#modal-copy .dialog_window_publication_bids_list_copy').css('left','625px');
        }
        var coord = map.getView().getCenter();
        var t = ol.proj.transform(coord, 'EPSG:900913', 'EPSG:4326');
        if ($('.language_container i').text() == "UA") {
            var str = window.location.protocol + "//" + window.location.hostname + "/uk/maplink/" + map.getView().getZoom() + "/" + t[1] + "/" + t[0] + "/";
        } else {
            var str = window.location.protocol + "//" + window.location.hostname + "/en/maplink/" + map.getView().getZoom() + "/" + t[1] + "/" + t[0] + "/";
        }
        var temp = '';
        map.getLayers().forEach(function (l, i) {
            if (l.getVisible()) {
                temp += 1;
            } else {
                temp += 0;
            }
        });

        str += Bin2Hex(temp.slice(0, -1));
        $('#permlink').val(str);
        $('#modal-copy').toggleClass('open');
    });
    //   Вызываем модальное окно для статистики по ДТП
    //   $('#orto10000base i').tooltip();
    $('body').click(function () {
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


    $('.mdl-menu .material-icons:not(.buffer)').on('click', function (event) {
//        console.log('sds');
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
        $('.bid_list_button').click(function () {
            var height = $('.layersAll').height()
//            console.log($('.layersAll').height());
            if ($('.bid_list').hasClass('open')) {
//                console.log($('.layersAll').height());
//                console.log($('.bid_list-content').height());

                $('.layersAll').height(height - 180);
            } else {
                $('.layersAll').height(height + 180);
            }
        });
        $('.language_container').click(function () {
            if ($('.language_container i').text() == "UA") {
                $('.language_container i').text("EN")
                $('.language_container .mdl-tooltip').text("English");
                if (window.location.pathname.indexOf('/uk') === 0) {
                    window.location.replace('/en' + window.location.pathname.substr(3));
                } else {
                    if (window.location.pathname === "/") {
                        window.location.replace('/en');
                    } else {
                        window.location.replace('/en' + window.location.pathname);
                    }
                }
            } else {
                $('.language_container i').text("UA");
                $('.language_container .mdl-tooltip').text("Українською");

                window.location.replace('/uk' + window.location.pathname.substr(3));

            }
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
            $('.head_block_logo').css('left', (windowWidth - logoWidth) / 2);
            var carousel_block_height = $('.carousel-block').height();
            if ($('.carousel-block').closest('.bx-wrapper').css('display') == 'none') {
                carousel_block_height = 0;
            }
            $('.layersAll').height(windowHeight - $('.bid_list').height() - $('.mdl-layout-title').height());

            var right_menu_content_block = windowHeight - $('.right_menu_footer-block').height() - $('.right_menu_title-block').height() - carousel_block_height;
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


        var projection = new ol.proj.Projection({
            code: 'EPSG:900913',
            units: 'm'
        });
        var popup = new ol.Overlay({
            element: document.getElementById('popup')
        })

        var vectorVinSidebarWms = new ol.source.TileWMS({
            url: '/geoserver/nsdi/wms',
            params: {
                'LAYERS': 'nsdi:nsdi',
                'ALIAS': 'Векторна карта',
                'ALIAS_E': 'Vector Map',
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

        var boundVinSidebarWms = new ol.source.TileWMS({
            url: '/geoserver/nsdi/wms',
            params: {
                'LAYERS': 'nsdi_admin',
                'ALIAS': 'Адміністративні одиниці',
                'ALIAS_E': 'Boundary administrative',
                'VERSION': '1.1.0',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 768,
                'HEIGHT': 509,
                'CRS': 'EPSG:3857',
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var boundVinSidebar = new ol.layer.Tile({
            source: boundVinSidebarWms,
            visible: 0,
            name: 'boundVinSidebar'
        });

        var hydroVinSidebarWms = new ol.source.TileWMS({
            url: '/geoserver/nsdi/wms',
            params: {
                'LAYERS': 'nsdi:hydro_polygon',
                'ALIAS': 'Гідрографія',
                'ALIAS_E': 'Hydrography',
                'VERSION': '1.1.0',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 768,
                'HEIGHT': 667,
                'CRS': 'EPSG:3857',
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var hydroVinSidebar = new ol.layer.Tile({
            source: hydroVinSidebarWms,
            visible: 0,
            name: 'hydroVinSidebar'
        });

        var buildingVinSidebarWms = new ol.source.TileWMS({
            url: '/geoserver/nsdi/wms',
            params: {
                'LAYERS': 'nsdi_building_part',
                'ALIAS': 'Будівлі та їх частини',
                'ALIAS_E': 'Building',
                'VERSION': '1.1.0',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 768,
                'HEIGHT': 697,
                'CRS': 'EPSG:3857',
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var buildingVinSidebar = new ol.layer.Tile({
            source: buildingVinSidebarWms,
            visible: 0,
            name: 'buildingsVinSidebar'
        });

       /* var fencesVinSidebarWms = new ol.source.TileWMS({
            url: '/geoserver/nsdi/wms',
            params: {
                'LAYERS': 'nsdi:fences',
                'ALIAS': 'Огорожі',
                'ALIAS_E': 'Fences',
                'VERSION': '1.1.0',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 768,
                'HEIGHT': 699,
                'CRS': 'EPSG:3857',
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var fencesVinSidebar = new ol.layer.Tile({
            source: fencesVinSidebarWms,
            visible: 0,
            name: 'fencesVinSidebar'
        });*/

        var engcommVinSidebarWms = new ol.source.TileWMS({
            url: '/geoserver/nsdi/wms',
            params: {
                'LAYERS': 'nsdi_engineering_communication',
                'ALIAS': 'Інженерні комунікації',
                'ALIAS_E': 'Engineering Communication (Building)',
                'VERSION': '1.1.0',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 768,
                'HEIGHT': 694,
                'CRS': 'EPSG:3857',
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var engcommVinSidebar = new ol.layer.Tile({
            source: engcommVinSidebarWms,
            visible: 0,
            name: 'engcommVinSidebar'
        });
        
        var vegetVinSidebarWms = new ol.source.TileWMS({
            url: '/geoserver/nsdi/wms',
            params: {
                'LAYERS': 'nsdi_vegetation',
                'ALIAS': 'Рослинність',
                'ALIAS_E': 'Vegetation',
                'VERSION': '1.1.0',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 768,
                'HEIGHT': 703,
                'CRS': 'EPSG:3857',
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var vegetVinSidebar = new ol.layer.Tile({
            source: vegetVinSidebarWms,
            visible: 0,
            name: 'vegetVinSidebar'
        });
        
        var razgrafkaSidebarWms = new ol.source.TileWMS({
            url: '/geoserver/nsdi/wms',
            params: {
                'LAYERS': 'nsdi:razgrafka1942_ua',
                'ALIAS':'Разграфка (Україна 1942)',
                'ALIAS_E': 'Geographical GRID (Ukraine 1942)',
                'VERSION': '1.1.0',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 768,
                'HEIGHT': 601,
                'CRS': 'EPSG:900913',
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var razgrafkaSidebar = new ol.layer.Tile({
            source: razgrafkaSidebarWms,
            visible: 0,
            name: 'razgrafkaSidebar'
        });

        var geodeticSidebarWms = new ol.source.TileWMS({
            url: '/geoserver/nsdi/wms',
            params: {
                'LAYERS': 'nsdi:dgm',
                'ALIAS': 'Державна геодезична мережа',
                'ALIAS_E': 'State geodetic network',
                'VERSION': '1.1.0',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 768,
                'HEIGHT': 515,
                'CRS': 'EPSG:900913',
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var geodeticSidebar = new ol.layer.Tile({
            source: geodeticSidebarWms,
            visible: 0,
            name: 'geodeticSidebar'
        });

        var gryntSidebarWms = new ol.source.TileWMS({
            url: 'http://map.land.gov.ua/geowebcache/service/wms',
            params: {
                'LAYERS': 'grunt',
                'ALIAS': 'Грунти',
                'ALIAS_E': 'Soils',
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
            url: '/dzkc',
            params: {
                'LAYERS': 'kadastr',
                'ALIAS': 'Кадастровий поділ',
                'ALIAS_E': 'Cadastral Division',
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
                'ALIAS': 'Динамічна карта',
                'ALIAS_E': 'Dynamic Map',
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
        
       /* var streetsSidebarWms = new ol.source.TileWMS({
            url: '/geoserver/wms',
            params: {
                'LAYERS': 'nsdi_street',
                'ALIAS': 'Вулична мережа',
                'ALIAS_E': 'Street network',
                'VERSION': '1.1.1',
                'TILED': 'true',
                'FORMAT': 'image/png',
                'WIDTH': 768,
                'HEIGHT': 692,
                'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });
        var streetsVinSidebar = new ol.layer.Tile({
            source: streetsSidebarWms,
            visible: 0,
            name: 'streetsVinSidebar'
        });*/

        var transportSidebarWms = new ol.source.TileWMS({
            url: '/geoserver/nsdi/wms',
            params: {
                'LAYERS': 'nsdi_transport_network',
                'ALIAS': 'Транспортна мережа',
                'ALIAS_E': 'Transport network',
                'VERSION': '1.1.0',
                'TILED': 'true',
                'FORMAT': 'image/png8',
                'WIDTH': 768,
                'HEIGHT': 557,
                'CRS': 'EPSG:900913',
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }
        });

        var transportVinSidebar = new ol.layer.Tile({
            source: transportSidebarWms,
            visible: 0,
            name: 'transportVinSidebar'
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
                url: 'http://212.26.144.103/map/ortho2k_all/{z}/{x}/{-y}.jpg',
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
                params: {
                    'ALIAS': 'Топографічна карта',
                    'ALIAS_E': 'Topographic map'
                }
            }),
            name: 'topoVinSidebar',
            visible: 0,
        });
        var topoUA = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'http://map.land.gov.ua/map/topo100k_all/{z}/{x}/{-y}.jpg',
                crossOrigin: 'null'
            }),
            name: 'topoUA',
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
                alias: 'Ортофотоплан'
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

        var googleLayer = new olgm.layer.Google({name: 'google', visible: 0, mapTypeId: google.maps.MapTypeId.SATELLITE});
        var googleHybridLayer = new olgm.layer.Google({
            name: 'googlehybrid',
            visible: 0,
            mapTypeId: google.maps.MapTypeId.HYBRID
        });


        map = new ol.Map({

            target: "mapView",
            layers: [
                topoVin,
                topoUA,
                googleLayer,
                googleHybridLayer,
                osmLayer,
                emptyRelief,
                cycleLayer,
                pubLayer,
                kiev2006Layer,
                vin2015Layer,
                vectorVinSidebar,
                vinOrtoSidebar,
                orto10000sidebar,
                orto2000sidebar,
                dynamicSidebar,
                gryntSidebar,
                boundVinSidebar,
                emptyLayer,
                topoVinSidebar,
                hydroVinSidebar,
                razgrafkaSidebar,
                geodeticSidebar,
                buildingVinSidebar,
               // fencesVinSidebar,
                engcommVinSidebar,
                vegetVinSidebar,
               // streetsVinSidebar,
                transportVinSidebar,
                parcelSidebar
            ],
//            view: view,
            controls: ol.control.defaults().extend([
                new ol.control.ScaleLine({
                    className: 'ol-scale-line',
                    target: document.getElementById('scale-line')})
            ]),
        });

        var getPar = parsemaplinkURL();

        if ((getPar === null) || (getPar.length !== 5)) {
            var view = new ol.View({
                center: [3170647.44192, 6315057.33961],
                zoom: 12,
                minZoom: 2
            });
        } else {

            getPar[4] = pad(Hex2Bin(getPar[4]), map.getLayers().getArray().length);

            var t = ol.proj.transform([getPar[3], -getPar[2]], 'EPSG:4326', 'EPSG:900913');

            var view = new ol.View({
                center: [t[0], -t[1]],
                zoom: getPar[1],
                minZoom: 2
            });
            var ic = 0;

            map.getLayers().forEach(function (l, i) {

                if (getPar[4].charAt(ic) == 1) {
                    l.setVisible(true);
                    if (($.inArray(l.get('name'), art)) > -1) {
                    
                    $('#' + l.get('name')).addClass('active').closest('.mdl-navigation__level2').prev().closest('.mdl-navigation__level1').addClass('active');
//                    $('#' + l.get('name')).closest('.mdl-navigation__level2').prev().find('.layersOff').show().children('label').addClass('is-checked');


                    } 
                    else {
// Set base layer switcher title
                        $('#map_mode').val($("li.mdl-menu__item[data-val='" + l.get('name') + "']").text()); 
                    }
                } else {
                    l.setVisible(false);
                }
                ic++;

            });

        }
        map.setView(view);


        addSlider(map);
        map.addOverlay(popup);

        // console.log(isMobile.any()+'sdsddssxxx');
        if (md.mobile() !== null) {
            $('.ol-zoom').hide();
        }

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
        $('#main_tt9').on('click', function () {
            window.print();
        });
        map.addControl(overview);
        $('.ol-zoom-in').after('<button class="ol-zoom-all" type="button" id="ol-zoom-all" tabindex="0"><i class="material-icons">language</i></button> ' +
            '<div class="mdl-tooltip main_mdl-tooltip" data-mdl-for="ol-zoom-all">Показати повністю</div>');
        $('.ol-overviewmap button').attr("id", "ol-overviewmap");
        $('.ol-overviewmap button').append('<div class="mdl-tooltip main_mdl-tooltip" data-mdl-for="ol-overviewmap" >Оглядова карта</div>');
        $('.ol-zoom-in').attr("id", "ol-zoom-in");
        if ($('.language_container i').text() == "UA") {
        $('.ol-zoom-in').append('<div class="mdl-tooltip main_mdl-tooltip" data-mdl-for="ol-zoom-in" >Збільшити</div>');

        $('.ol-zoom-out').attr("id", "ol-zoom-out");
        $('.ol-zoom-out').append('<div class="mdl-tooltip main_mdl-tooltip" data-mdl-for="ol-zoom-out" >Зменшити</div>');
    } else {
        $('.ol-zoom-in').append('<div class="mdl-tooltip main_mdl-tooltip" data-mdl-for="ol-zoom-in" >Enlarge</div>');
        $('.ol-zoom-out').attr("id", "ol-zoom-out");
        $('.ol-zoom-out').append('<div class="mdl-tooltip main_mdl-tooltip" data-mdl-for="ol-zoom-out" >Decrease</div>');        
    }



        var olGM = new olgm.OLGoogleMaps({map: map}); // map is the ol.Map instance
        olGM.activate();
        $('div.mapPlaceholder').remove();
        windowResizeHandler();
        // addLegend(map);
        addMeasure(map);
        layersOff(map);

        $('#main_tt4').on('click', function () {
            $('#main_tt4').toggleClass('active');
            geolocation(map);
        });

        $('.ol-zoom-all').on('mousedown', function(){
           $(this).addClass('active');
        });
        $('.ol-zoom-all').on('mouseup', function(){
            $(this).removeClass('active');
        });

        $('.ol-zoom-all').on('click', function(){
            var view = new ol.View({
                center: [3506000, 6125000],
                zoom: 6
            });
            map.setView(view);
        });





        // unitsSelect.bindTo('value', scaleLineControl, 'metric');

        $('.zoomOff .mdl-checkbox').on('mouseup', function () {
            // $('.account_block').toggleClass('close');
            $('.ol-zoom').toggleClass('hide');
            // console.log($('#checkbox-zoom').attr('checked'));
        });
        $('.centerOff .mdl-checkbox').on('mouseup', function () {
            // $('.account_block').toggleClass('close');
            $('.map-center').toggleClass('hide');
            // console.log($('#checkbox-zoom').attr('checked'));
        });

        $('.map_mode_select li').on('click', function (event) {
            var selected = $(this).attr('data-val');
            var artbaz = ['pub', 'osm', 'OpenCycleMap', 'google', 'googlehybrid', 'vin2015', 'kiev2006', 'emptyRelief', 'emptyLayer', 'topoVin', 'topoUA'];
            map.getLayers().forEach(function (l, i) {
                if (($.inArray(l.get('name'), artbaz)) > -1) {
                    if (l.get('name') !== selected) {

                        l.setVisible(false);
                    } else {
                        //    console.log(l.get('name'));
                        if (l.get('name') == 'OpenCycleMap' || l.get('name') == 'osm') {
                            $('.osm-copyright').show();
                        } else {
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

        var coord = ol.proj.transform([center[0], center[1]], 'EPSG:900913', 'EPSG:4326');
        $('.x').text(coord[0].toFixed(4));
        $('.y').text(coord[1].toFixed(4));

        map.on('pointerdrag', function (evt) {
            center = map.getView().getCenter();
            coord = ol.proj.transform([center[0], center[1]], 'EPSG:900913', 'EPSG:4326');
            $('.x').text(coord[0].toFixed(4));
            $('.y').text(coord[1].toFixed(4));
        });

        map.on('moveend', function (evt) {
            center = map.getView().getCenter();
            coord = ol.proj.transform([center[0], center[1]], 'EPSG:900913', 'EPSG:4326');
            $('.x').text(coord[0].toFixed(4));
            $('.y').text(coord[1].toFixed(4));
        });
        //end--Додати координати центра карти//



        var sliderInfo;
        var sliderCarousel;
        map.on('singleclick', function (evt) {

            if (!$('#length').hasClass('active') && !$('#area').hasClass('active')) {

                var viewResolution = (view.getResolution());
                var infocontainer = $('#information');
                var url;
                var flah = false;
                var infostr = "";
                var layerAlias;
                var indic;
                var count = 0;

                map.getLayers().forEach(function (l, i) {
                    if ((($.inArray(l.get('name'), art)) > -1) && (l.getVisible())) {

                        if (l.getSource().getParams().ALIAS) {
                            if ($('.language_container i').text() == "UA") {
                            layerAlias = l.getSource().getParams().ALIAS;
                        } else {
                            layerAlias = l.getSource().getParams().ALIAS_E;
                        }
                        } else {
                            layerAlias = "Не визначено";
                        }
                        if (sliderInfo != undefined) {
                            sliderInfo.destroySlider();
                        }
                        if (sliderCarousel != undefined) {
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
                                }
                                infostr += '<div>'
                                infostr += "<div class='right_menu_title-block'><span class='layer-alias'><p> " + layerAlias + "</p></span>";
//                                infostr += "<span class='title'>" + "name" + "</span>";
//                                    infostr += "<span class='adrs'>" + "address" + "</span>";
                                infostr += "</div><div class='right_menu_content-block'>";
                                for (var key in response.features[i].properties) {
                                    if((response.features[i].properties[key] != null) && (response.features[i].properties[key] != 0)) {
                                        infostr += "<span class='right_menu_content-title'>" + key + "</span><span class='right_menu_content-description'>" + response.features[i].properties[key] + "</span>";
                                    }
                                }
                                infostr += "</div></div></div>";
                            }
//конец провеки json
                        });

                    }
                });
                if (infostr != "" && $('.right_menu').hasClass('close')) {
                    $('.right_menu').toggleClass('close');
                    //  $('.bid_list').toggleClass('close');
                    $('.main_search_container').toggleClass('close');
                    $('.ol-overviewmap').toggleClass('close');
                    $('.account_container').toggleClass('close');
                    $('.language_container').toggleClass('close');
                    $('.right_menu_button').show();
                } else if (!$('.right_menu').hasClass('close') && infostr == "") {
                    $('.right_menu').toggleClass('close');
                    //    $('.bid_list').toggleClass('close');
                    $('.main_search_container').toggleClass('close');
                    $('.right_menu_button').hide();
                    $('.ol-overviewmap').toggleClass('close');
                    $('.account_container').toggleClass('close');
                    $('.language_container').toggleClass('close');
                }
                if (infostr == "") {
                    $('.right_menu_button').hide();
                }
                setTimeout(function () {
                    if (flah) {

                        $('ol.carousel-indicators').html(indic);
                        $('#information').html(infostr);
                        if ($('div').is('.carousel-block')) {
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

        //Зумувати до початкового екстенту//
       $('#main_tt12').on('mousedown', function () {
           $(this).toggleClass('active');
           var viewIn = map.getView();
           var bounce = ol.animation.bounce({
               resolution: viewIn.getResolution()*2
           });
           var pan = ol.animation.pan({ source: viewIn.getCenter() });
           var zoom = ol.animation.zoom({ resolution: viewIn.getResolution()  });
           map.beforeRender(pan, zoom, bounce);
           var viewTo = new ol.View({
                center: [3170647.44192, 6315057.33961],
                zoom: 12

           });
            map.setView(viewTo);
        });
        $('#main_tt12').on('mouseup', function () {
            $(this).toggleClass('active');
        });
        //END Зумувати то початкового екстенту//

        //Автозаповнення адреси
        var input = document.getElementById('main_search_input');
        var searchBox = new google.maps.places.Autocomplete(input);

        var dialog = document.querySelector('dialog');
        dialog.querySelector('.btn-cancel').addEventListener('click', function() {
            dialog.close();
        });
        $('.main_search_block').click(function () {
            if(!$('.main_search_block').hasClass('open')){
                if(searchMarker !== undefined){
                    map.removeOverlay(searchMarker);
                }
            }
        });

        $('#main_search_input').bind("enterKey", function (e) {
            $('.pac-container').remove();
            //console.log(searchBox);
            var searchval = $('#main_search_input').val();


            var input = document.getElementById('main_search_input');
            var searchBox = new google.maps.places.Autocomplete(input);
//            console.log(searchval);
            $.ajax({
                url: 'https://maps.googleapis.com/maps/api/geocode/json',
                data: {'address': searchval},
                success: function (data) {
                    if(data.status == 'ZERO_RESULTS'){
                        dialog.showModal();
                        if(searchMarker !== undefined){
                            map.removeOverlay(searchMarker);
                        }
                    }else{
                        if(searchMarker !== undefined){
                            map.removeOverlay(searchMarker);
                        }
                        var sourceProj = map.getView().getProjection();
                        var c1 = ol.proj.transform([data.results[0].geometry.viewport.northeast.lng, data.results[0].geometry.viewport.northeast.lat], 'EPSG:4326', 'EPSG:900913');
                        var c2 = ol.proj.transform([data.results[0].geometry.viewport.southwest.lng, data.results[0].geometry.viewport.southwest.lat], 'EPSG:4326', 'EPSG:900913');
                        var fitextent = [c1[0], c1[1], c2[0], c2[1]];


                        map.getView().fit(fitextent, map.getSize());
                        if(searchMarker === undefined){
                            searchMarker = new ol.Overlay({
                                element: document.getElementById('searchLocation'),
                                positioning: 'center-center',
                            });
                        }
                        map.addOverlay(searchMarker);
                        var position = ol.proj.transform([data.results[0].geometry.location.lng,data.results[0].geometry.location.lat], 'EPSG:4326', 'EPSG:900913');
                        searchMarker.setPosition(position);
                        $('#searchLocation').show();
                    }

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
    });
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
    $('#erase').on('mousedown', function () {
        $(this).addClass('active');

    });
    $('#erase').on('mouseup', function () {
        $('.measure').removeClass('active');
        $('.tooltip.tooltip-static').remove();
        map.removeInteraction(draw);
        source.clear();
    });

    $('.measure:not(#erase)').on('click', function (e) {

        if ($(this).hasClass('active')) {
            $(this).removeClass('active')
            $('.tooltip.tooltip-static').remove();
        } else {
            source.clear();
            $('.measure').removeClass('active')
            $('.tooltip.tooltip-static').remove();

            $(this).addClass('active')
            map.removeInteraction(draw);
        }
        if ($(this).hasClass('active')) {
            typeSelect = $(this).attr('id')

            addInteraction();
        } else {
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
                    listener = sketch.getGeometry().on('change', function (evt) {
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
                function () {
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