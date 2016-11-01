var map;
var lay = 'wms1';
var osmLayer;
var googleLayer;

function swtch(layer) {
    lay = layer;
    var art = ['wms1', 'wms2', 'wms3', 'wms4', 'wms5', 'wms6', 'wms7', 'wms8', 'wms9', 'wms10'];
    map.getLayers().forEach(function (l, i) {
        if (($.inArray(l.get('name'), art)) > -1) {
            if (l.get('name') !== layer)
            {
                l.setVisible(false);
            } else
            {
                l.setVisible(true);
            }
//      if(l.get('name')==='google')
//        {  l.setVisible(true); }
        }
    });

}
function showUP(layer,elem) {
    lay = layer;
    var art = ['wms1', 'wms2', 'wms3', 'wms4', 'wms5', 'wms6', 'wms7', 'wms8', 'wms9', 'wms10', 'wms11'];
    map.getLayers().forEach(function (l, i) {
        if (($.inArray(l.get('name'), art)) > -1) {
            if (l.get('name') === layer)
            {
                l.setVisible(true);
                // addclass(.on_layer)
                $(elem).addClass('on_layer');
            } 
        }
    });
}
function showDOWN(layer) {
    lay = layer;
    var art = ['wms1', 'wms2', 'wms3', 'wms4', 'wms5', 'wms6', 'wms7', 'wms8', 'wms9', 'wms10'];
    map.getLayers().forEach(function (l, i) {
        if (($.inArray(l.get('name'), art)) > -1) {
            if (l.get('name') === layer)
            {
                l.setVisible(false);
            } 
        }
    });
}

function toggleOL(layer,elem) {
    var art = ['wms1', 'wms2', 'wms3', 'wms4', 'wms5', 'wms6', 'wms7', 'wms8', 'wms9', 'wms10', 'wms11'];
    map.getLayers().forEach(function (l, i) {
        if (($.inArray(l.get('name'), art)) > -1) {
            if (l.get('name') === layer)
            {
                if(l.getVisible() == true) {
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

$(function () {
    "use strict";
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
            windowHeight = window.innerHeight;
            windowWidth = $(window).width();
            contentHeight = windowHeight - $('#header').height();
            contentWidth = $('#content').width();

            $('#leftSide').height(windowHeight);
            $('#rightSide').height(windowHeight);
            $('.closeLeftSide').height(contentHeight);
            $('#wrapper').height(contentHeight);
            $('#mapView').height(windowHeight);
            $('#content').height(contentHeight);
            $('#external_control').css({top: windowHeight / 2});
//        setTimeout(function () {
//            $('.commentsFormWrapper').width(contentWidth);
//        }, 300);

            if (map) {
//            google.maps.event.trigger(map, 'resize');
                map.updateSize();

            }

            // Add custom scrollbar for left side navigation
            if (windowWidth > 767) {
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
            }
        }

        windowResizeHandler();
        $(window).resize(function () {
            windowResizeHandler();
        });
        var navExpanded = true;

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

            console.log(filterstr);
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

            console.log(filterstr);
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
            wmsSource4.updateParams({
                CQL_FILTER: filterstr
            });
        });

        $('#accordion').on('hidden.bs.collapse', toggleDOWN);
        $('#accordion').on('shown.bs.collapse', toggleUP);
$('a.accordion-toggle').on('click',function(){
    if($(this).hasClass('active')) {
        toggleOL($(this).attr('href').substr(1), $(this));
    } else {
        showUP($(this).attr('href').substr(1), $(this));
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

        windowResizeHandler();

        $('.selectpicker').selectpicker('refresh');

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
                                            }
                                            else if (goi.ikk) {
                                                str = goi.ikk;
                                            }
                                            else if (goi.rajonunion) {
                                                str = goi.rajonunion;
                                            }
                                            else {
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
//var w = $(window).width();
//var h = $(window).height();
        var wmsSource = new ol.source.ImageWMS({
            url: '/kmda/wms',
            //         url: 'http://212.26.144.110/geowebcache/service/wms',
//            url: 'http://212.26.144.107:8092/vector/geoserver/gwc/service/wms',
            //   url: 'http://192.168.33.51/geowebcache/service/wms',
            params: {'LAYERS': 'kmda:kmda_l_orenda', 'VERSION': '1.1.1', 'TILED': true, 'WIDTH': 768, 'HEIGHT': 520, 'BBOX': '3365331.64184455,6509557.90965887,3417855.95133155,6545186.44247934', 'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
//            projection: 'EPSG:900913',
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
//            extent: [3365331.64184455,6509557.90965887,3417855.95133155,6545186.44247934],
            }});

        var wmsLayer = new ol.layer.Image({
            source: wmsSource,
            visible: 1,
            name: 'wms1',
            //           extent: map.getView().calculateExtent(map.getSize()),
//            imageSize: [192,192]
        });

        var wmsSource2 = new ol.source.ImageWMS({
            url: '/kmda/wms',
            //         url: 'http://212.26.144.110/geowebcache/service/wms',
//            url: 'http://212.26.144.107:8092/vector/geoserver/gwc/service/wms',
            //   url: 'http://192.168.33.51/geowebcache/service/wms',
            params: {'LAYERS': 'kmda:kmda_l_komunal', 'VERSION': '1.1.1', 'TILED': 'true', 'FORMAT': 'image/png8', 'WIDTH': 768, 'HEIGHT': 520, 'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
//            projection: 'EPSG:900913',
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }});

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
            params: {'LAYERS': 'kmda:kmda_l_privat', 'VERSION': '1.1.1', 'TILED': 'true', 'FORMAT': 'image/png8', 'WIDTH': 768, 'HEIGHT': 520, 'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
//            projection: 'EPSG:900913',
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }});

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
            params: {'LAYERS': 'kmda:kmda_l_komunal_org', 'VERSION': '1.1.1', 'TILED': 'true', 'FORMAT': 'image/png8', 'WIDTH': 768, 'HEIGHT': 520, 'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
//            projection: 'EPSG:900913',
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }});

        var wmsLayer4 = new ol.layer.Image({
            source: wmsSource4,
            visible: 0,
            name: 'wms4'

                    //           extent: map.getView().calculateExtent(map.getSize()),
//            imageSize: [192,192]
        });

        var wmsSource5 = new ol.source.TileWMS({
            url: '/kmda/wms',
            params: {'LAYERS': 'kmda:kmda_l_building', 'VERSION': '1.1.1', 'TILED': 'true', 'FORMAT': 'image/png8', 'WIDTH': 716, 'HEIGHT': 768, 'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }});

        var wmsLayer5 = new ol.layer.Tile({
            source: wmsSource5,
            visible: 0,
            name: 'wms5'
        });
        var wmsSource6 = new ol.source.TileWMS({
            url: '/kmda/wms',
            params: {'LAYERS': 'kmda:kmda_l_street', 'VERSION': '1.1.1', 'TILED': 'true', 'FORMAT': 'image/png8', 'WIDTH': 716, 'HEIGHT': 768, 'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }});

        var wmsLayer6 = new ol.layer.Tile({
            source: wmsSource6,
            visible: 0,
            name: 'wms6'
        });
        var wmsSource7 = new ol.source.ImageWMS({
            url: '/kyiv.recl/wms',
            params: {'LAYERS': 'kyiv.recl:reclama', 'VERSION': '1.1.1', 'TILED': 'true', 'FORMAT': 'image/png8', 'WIDTH': 768, 'HEIGHT': 758, 'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }});

        var wmsLayer7 = new ol.layer.Image({
            source: wmsSource7,
            visible: 0,
            name: 'wms7'
        }); 
        var wmsSource8 = new ol.source.TileWMS({
            url: '/kmda/wms',
            params: {'LAYERS': 'kmda:kmda_l_function', 'VERSION': '1.1.1', 'TILED': 'true', 'FORMAT': 'image/png8', 'WIDTH': 765, 'HEIGHT': 768, 'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }});

        var wmsLayer8 = new ol.layer.Tile({
            source: wmsSource8,
            visible: 0,
            name: 'wms8'
        });
        var wmsSource9 = new ol.source.TileWMS({
            url: '/kmda/wms',
            params: {'LAYERS': 'kmda:kmda_l_land', 'VERSION': '1.1.1', 'TILED': 'true', 'FORMAT': 'image/png8', 'WIDTH': 768, 'HEIGHT': 730, 'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }});

        var wmsLayer9 = new ol.layer.Tile({
            source: wmsSource9,
            visible: 0,
            name: 'wms9'
        });
        var wmsSource10 = new ol.source.TileWMS({
            url: '/kmda/wms',
            params: {'LAYERS': 'kmda:kmda_l_muo', 'VERSION': '1.1.1', 'TILED': 'true', 'FORMAT': 'image/png8', 'WIDTH': 768, 'HEIGHT': 727, 'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }});

        var wmsLayer10 = new ol.layer.Tile({
            source: wmsSource10,
            visible: 0,
            name: 'wms10'
        });
        
        var wmsSource11 = new ol.source.TileWMS({
            url: '/dzk',
            params: {'LAYERS': 'kadastr', 'VERSION': '1.1.1', 'TILED': 'true', 'FORMAT': 'image/png', 'WIDTH': 256, 'HEIGHT': 256, 'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
            }});

        var wmsLayer11 = new ol.layer.Tile({
            source: wmsSource11,
            visible: 0,
            name: 'wms11'
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
                url: '/ortho2k_2015/{z}/{x}/{-y}.jpg',
                crossOrigin: 'null',

            }),
            name: 'kiev2015',
            visible: 0,
        });

        var view = new ol.View({
            center: [3396647.44192, 6527057.33961],
            extent: [3365331.64184455, 6509557.90965887, 3417855.95133155, 6545186.44247934],
//            extent: [1894415.3090198075, 5741949.564782439, 4910314.6970397215, 7304933.919157723],
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
        var container = document.getElementById('popup');
        var content = document.getElementById('popup-content');
        var closer = document.getElementById('popup-closer');

        closer.onclick = function () {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
        };

        var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        }));

//        var gmap = new google.maps.Map(document.getElementById('gmap'), {
//            disableDefaultUI: true,
//            keyboardShortcuts: false,
//            draggable: false,
//            disableDoubleClickZoom: true,
//            scrollwheel: false,
//            streetViewControl: false
//          });
        googleLayer = new olgm.layer.Google({name: 'google', visible:0, mapTypeId: google.maps.MapTypeId.SATELLITE});
//osmLayer.setVisible(false);
//googleLayer.setVisible(false);

        map = new ol.Map({
//            interactions: olgm.interaction.defaults(),
            target: "mapView",
            layers: [
//                   new ol.layer.Tile({ source: new ol.source.MapQuest({layer: 'sat'}) }), 
//                   new ol.layer.Tile({ source: new ol.source.MapQuest({layer: 'hyb'}) }),
                googleLayer,
//                satLayer,
                osmLayer,
                kiev2006Layer,
                kiev2015Layer,

                wmsLayer5,
                wmsLayer6,
                wmsLayer7,
                wmsLayer8,
                wmsLayer9,
                wmsLayer10,
                wmsLayer11,
                
                wmsLayer,
                wmsLayer2,
                wmsLayer3,
                wmsLayer4,
            ],
            overlays: [overlay],
            view: view,
            controls: [],
        });
//  var zoomslider = new ol.control.ZoomSlider();
//  map.addControl(zoomslider);
        var external_control = new ol.control.Zoom({
            target: document.getElementById('external_control')
        });
        map.addControl(external_control);

        var olGM = new olgm.OLGoogleMaps({map: map}); // map is the ol.Map instance
        olGM.activate();

        $('div.mapPlaceholder').remove();

        //       map.getView().fitExtent(wmsSource.getExtent(), map.getSize());

//         map.getView().fitExtent(wmsLayer.getExtent(), map.getSize());
//var extente = [3365331.64184455,6509557.90965887,3417855.95133155,6545186.44247934];
//map.getView().fitExtent(extente, map.getSize());
        $('#bazlayer .selectpicker').on('change', function ()
        {
            //     console.log($( "select option:selected" ).val());
            var selected = $(this).find('option:selected').val();
//    alert(selected);
        var art = ['osm', 'google','kiev2006','kiev2015'];
        map.getLayers().forEach(function (l, i) {
            if (($.inArray(l.get('name'), art)) > -1) {
                if (l.get('name') !== selected)
                {
                    l.setVisible(false);
                } else
                {
                    l.setVisible(true);
                }
    //      if(l.get('name')==='google')
    //        {  l.setVisible(true); }
            }
        });
    });

        var rightNav = false;


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
//      document.getElementById('popup').innerHTML = '';
            var viewResolution = /** @type {number} */ (view.getResolution());

            if (lay == "wms1") {
                var url = wmsSource.getGetFeatureInfoUrl(
                        evt.coordinate, viewResolution, 'EPSG:900913',
                        {'INFO_FORMAT': 'application/json'});



            }
            if (lay == "wms2") {
                var url = wmsSource2.getGetFeatureInfoUrl(
                        evt.coordinate, viewResolution, 'EPSG:900913',
                        {'INFO_FORMAT': 'application/json'});
            }
            if (lay == "wms3") {
                var url = wmsSource3.getGetFeatureInfoUrl(
                        evt.coordinate, viewResolution, 'EPSG:900913',
                        {'INFO_FORMAT': 'application/json'});
            }
            if (lay == "wms4") {
                var url = wmsSource4.getGetFeatureInfoUrl(
                        evt.coordinate, viewResolution, 'EPSG:900913',
                        {'INFO_FORMAT': 'application/json'});
            }
            if (lay == "wms7") {
                var url = wmsSource7.getGetFeatureInfoUrl(
                        evt.coordinate, viewResolution, 'EPSG:900913',
                        {'INFO_FORMAT': 'application/json'});
            }
            var infocontainer = document.getElementById('information');

            $.ajax({
                url: url,
                dataType: 'json',
//          jsonpCallback: 'parseResponse'
            }).then(function (response) {
                //         var result = parser.readFeatures(response);
                //         console.log(response);
                if (response.features.length) {
                    if (!rightNav) {
                        $("#rightSide").addClass("expanded");
                        $("#rightSwitch").addClass("expanded");
                        $("#rightblur").addClass("expanded");
                        rightNav = true;
                    }

                    var name;
                    if((name=response.features[0].properties.ObjectName) === undefined) {
                        if((name = response.features[0].properties.objectname) === undefined){
                            name = response.features[0].properties.orgname;
                        }
                    }
                    if(!name) {
                        name='';
                    }
                    var infostr = "<div class='rhead'>" + name + "<div>";
                    var districtname;
                    if((districtname=response.features[0].properties.DistrictName) === undefined) {
                        districtname = response.features[0].properties.district;
                    }
                    var addrstreet;
                    if((addrstreet=response.features[0].properties.ObjectAddrStreet) === undefined) {
                        if((addrstreet = response.features[0].properties.street) === undefined) {
                            addrstreet =  response.features[0].properties.adress;
                        }
                    }    
                    var housenum;
                    if((housenum=response.features[0].properties.ObjectAddrNumber) === undefined) {
                        housenum = response.features[0].properties.house;
                    }  
                    if(districtname) {
                        infostr += districtname;
                    }
                    if(addrstreet) {
                        infostr += " " + addrstreet;
                    }
                    if(housenum) {
                        infostr += housenum;
                    }
                    infostr += "</div></div>";
                    
                    var ownership;
                    if((ownership=response.features[0].properties.OrgOwnership) === undefined) {
                        ownership = response.features[0].properties.ownership;
                    }   
                    if(ownership) {
                    infostr += "<div class='rinfo'>Форма власнотi<div>" + ownership + "</div></div>";
                }
                    var sqrtotal;
                    if((sqrtotal=response.features[0].properties.SqrTotal) === undefined) {
                        sqrtotal = response.features[0].properties.sqrtotal;
                    }   
                    if(sqrtotal) {
                    infostr += "<div class='rinfo'>Загальна площа (кв. м.)<div>" + sqrtotal + "</div></div>";
                }
                    var costbalance;
                    if ((costbalance=response.features[0].properties.CostBalans) === undefined) {
                        costbalance=response.features[0].properties.costbalans;
                }
                    if(costbalance) {
                        infostr += "<div class='rinfo'>Балансова вартiсть (тис. грн.)<div>" + costbalance + "</div></div>";
                    }

                    var busage;
                    if ((busage=response.features[0].properties.BuildingUsage) === undefined) {
                        busage=response.features[0].properties.purpose;
                }       
                if(busage) {
                    infostr += "<div class='rinfo'>Призначення<div>" + busage + "</div></div>";
                }
                var bkind;
                if((bkind=response.features[0].properties.BuildingKind)==undefined) {
                    bkind = response.features[0].properties.kind;
                } 
                if(bkind) {
                    infostr += "<div class='rinfo'>Вид об'єкту<div>" + bkind + "</div></div>";
                }
                var btype;
                if((btype=response.features[0].properties.BuildingType)==undefined) {
                    btype = response.features[0].properties.btype;
                }
                if(btype) {
                    infostr += "<div class='rinfo'>Тип об'єкту<div>" + btype + "</div></div>";
                }
                var btech;
                if((btech=response.features[0].properties.BTS_NAME)==undefined) {
                    btech = response.features[0].properties.btechstate;
                }        
                if(btech) {
                    infostr += "<div class='rinfo'>Стан об'єкту<div>" + btech + "</div></div><hr class='divider1'>";
                }
                    infostr += "<div class='rdown'><a href='javascript:void(0)'>СТВОРИТИ ЗАЯВКУ</a></div>"
                    infocontainer.innerHTML = infostr;
                } else {
                    infocontainer.innerHTML = '&nbsp;';
                    if (rightNav) {
                        $("#rightSide").removeClass("expanded");
                        $("#rightSwitch").removeClass("expanded");
                        $("#rightblur").removeClass("expanded");
                        rightNav = false;
                    }
                }
            });

        });
        $("#rightClose").on('click', function () {
            $("#rightSide").removeClass("expanded");
            rightNav = false;
            $("#rightSwitch").removeClass("expanded");
            $("#rightblur").removeClass("expanded");
        });

    }, 300);
});