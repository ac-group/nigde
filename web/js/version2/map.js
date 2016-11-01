(function ($) {


    $(document).ready(function () {
        
        var projection = new ol.proj.Projection({
            code: 'EPSG:900913',
            units: 'm'
        });
        var wmsSource = new ol.source.ImageWMS({
            url: '/kmda/wms',
            params: {
                'LAYERS': 'kmda:kmda_l_orenda',
                'VERSION': '1.1.1',
                'TILED': true,
                'WIDTH': 768,
                'HEIGHT': 520,
                'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
                projection: projection,
                serverType: 'geoserver',
                crossOrigin: '',
                projection: projection,
//            extent: [3365331.64184455,6509557.90965887,3417855.95133155,6545186.44247934],
            }
        });

        var wmsLayer = new ol.layer.Image({
            source: wmsSource,
            visible: 1,
            name: 'wms1',
            //           extent: map.getView().calculateExtent(map.getSize()),
//            imageSize: [192,192]
        });
        var view = new ol.View({
            center: [3396647.44192, 6527057.33961],
            extent: [3347533.00, 6463838.00, 3457804.00, 6576380.00],
//            projection: projection,
            zoom: 12,
            minZoom: 2
        });
        var external_control = new ol.control.Zoom({
            target: document.getElementById('external_control')
        });
        osmLayer = new ol.layer.Tile({
            source: new ol.source.OSM(),
            visible: 1,
            name: 'osm',
        });
        map = new ol.Map({
            target: "mapView",
            layers: [
                osmLayer,
                wmsLayer
            ],
            view: view,
            controls: [external_control],
        });

        var windowResizeHandler = function () {
            document.body.style.overflow = 'hide';
            windowHeight = $(window).height();
            windowWidth = $(window).width();
            $('#mapView').height(windowHeight);
            $('#mapView').width(windowWidth);
//            contentWidth = windowWidth;
////            contentHeight = windowHeight - $('header').height();
//            $('#mapView').height(windowHeight);
//            if (!($('.right_menu').is('.close'))) {
//                contentWidth -= $('.right_menu').width(); 
//            }
//            if($('.left_menu').is('.left_menu_open')) {
//                contentWidth -= $('.left_menu').width(); 
//                $('mapView').css('margin-left', $('.left_menu').width());
//            }
//            $('#mapView').width(contentWidth);
            map.updateSize();
        };
//        

        windowResizeHandler();
        $(window).resize(function () {
            windowResizeHandler();
        });
//        $('.right_menu_button').click(function() { map.updateSize(); });
//        $('.mdl-button').click(function() { windowResizeHandler(); });
    
        map.on('singleclick', function (evt) {
            var viewResolution = (view.getResolution());
            var infolabel = '';
            var infoblock = '';
            map.getLayers().forEach(function (l, i) {
                if (l.get('name') == 'wms1') {
                    $.ajax({
                        url: l.getSource().getGetFeatureInfoUrl(
                                evt.coordinate, viewResolution, 'EPSG:900913',
                                {'INFO_FORMAT': 'application/json'}),
                        dataType: 'json',
                    }).then(function (response) {
                        for (var i = 0; i < response.features.length; i++) {

                            if (response.features[i].properties.objectname !== undefined)
                                infolabel += "<span class=\"title\">" + response.features[i].properties.objectname + "</span>";
                            if (response.features[i].properties.street !== undefined) {
                                infolabel += "<span class=\"adr\" style=\"margin-bottom: 15px;\">" + response.features[i].properties.street;
                                if (response.features[i].properties.house !== undefined)
                                    infolabel += " " + response.features[i].properties.house;
                                infolabel += "</span>";
                            }
                            if (response.features[i].properties.ownership !== undefined) 
                                infoblock += "<span class=\"right_menu_content-title\">Форма власності</span><span class=\"right_menu_content-description\">" + response.features[i].properties.ownership + "</span>";
                            if (response.features[i].properties.renter !== undefined) 
                                infoblock += "<span class=\"right_menu_content-title\">Загальна площа (кв. м.)</span><span class=\"right_menu_content-description\">" + response.features[i].properties.sqrtotal + "</span>";
                            if (response.features[i].properties.costbalans !== undefined) 
                                infoblock += "<span class=\"right_menu_content-title\">Балансова вартiсть (тис. грн.)</span><span class=\"right_menu_content-description\">" + response.features[i].properties.costbalans + "</span>";                            
                            if (response.features[i].properties.purpose !== undefined) 
                                infoblock += "<span class=\"right_menu_content-title\">Призначення</span><span class=\"right_menu_content-description\">" + response.features[i].properties.purpose + "</span>";                             
                            if (response.features[i].properties.kind !== undefined) 
                                infoblock += "<span class=\"right_menu_content-title\">Вид об'єкту</span><span class=\"right_menu_content-description\">" + response.features[i].properties.kind + "</span>";  
                            if (response.features[i].properties.btype !== undefined) 
                                infoblock += "<span class=\"right_menu_content-title\">Тип об'єкту</span><span class=\"right_menu_content-description\">" + response.features[i].properties.btype + "</span>";  
                            if (response.features[i].properties.btechstate !== undefined) 
                                infoblock += "<span class=\"right_menu_content-title\">Стан об'єкту</span><span class=\"right_menu_content-description\">" + response.features[i].properties.btechstate + "</span>";  
                            
                        i++;
                        }
                        if (response.features.length > 0) {
                            $(".right_menu_title-block").html(infolabel);
                            $("#reqobj_name").html(response.features[0].properties.objectname);
                            $("#reqobj_addr").html(response.features[0].properties.street+ ' ' + response.features[0].properties.house);
                            $("#reqobj_sqr").html(response.features[0].properties.sqrtotal);
                            $("#reqobj_sum").html(response.features[0].properties.costbalans);
                            $(".right_menu_content-block").html(infoblock);
                            $('.right_menu').removeClass('close');
                            $('#orendadocnew').attr('action', 'orendadoc/'+response.features[0].properties.objectid+'/new');

                        } else {
                            if (!$('.right_menu').hasClass('close'))
                                $('.right_menu').addClass('close');
                        }
                    });
                }
            });
        });
//        getmdlSelect.init('#orenda_doc_type_tip');
//    $('#orendadocnew').submit(function(e){
//        e.preventDefault();
//        $.ajax({
//            type: $(this).attr('method'),
//            url: $(this).attr('action'),
//            data: $(this).serialize()
//        })
//    });
  });






})(jQuery);
