var map;
var lay = 'wms1';
var osmLayer;
var googleLayer;

function swtch(layer){ 
    lay = layer;

    map.getLayers().forEach(function(l, i) {
      if(l.get('name')!==layer && l.get('name')!=='osm' && l.get('name')!=='google')
        { l.setVisible(false); } else
        {  l.setVisible(true); }
//      if(l.get('name')==='google')
//        {  l.setVisible(true); }
    });
    
  }

function zlist() {
    $('html, body').css("cursor", "wait");
    $.ajax({
        type: "POST",
        url: "/resp/",        
        success: function(data) {
            if (data.success == true) {
                $('#alert_placeholder').html('<div class="alert alert-info fade in"><a class="close" data-dismiss="alert">×</a><span>'+data.str+'</span></div>');
                
               
            } 
            $('html, body').css("cursor", "auto");
        },
        error: function() {
            $('html, body').css("cursor", "auto");
        }
    });
}
function zlistall() {
    $('html, body').css("cursor", "wait");
    $.ajax({
        type: "POST",
        url: "/resp/all",        
        success: function(data) {
            if (data.success == true) {
                $('#alert_placeholder').html('<div class="alert alert-info fade in"><a class="close" data-dismiss="alert">×</a><span>'+data.str+'</span></div>');
                
               
            } 
            $('html, body').css("cursor", "auto");
        },
        error: function() {
            $('html, body').css("cursor", "auto");
        }
    });
}
function reque(koatuu) {
//    console.log(koatuu);
    
    $.ajax({
           type: "POST",
           url: "/resp/create",
           data: JSON.stringify({ "koatuu" : koatuu, "price" : "30" }),
           contentType: "application/json",
           dataType: "json",
           success: function(data) 
                        { if (data.success == true) 
                            { 
                                overlay.setPosition(undefined);
                                $('#alert_placeholder').html('<div class="alert alert-success fade in"><a class="close" data-dismiss="alert">×</a><span>'+ koatuu + '<button onclick="pay(\'' + data.id + '\');"> Отримати адресу </button></span></div>');
                            }
                          if (data.success == false) {
                            overlay.setPosition(undefined);
                            $('#alert_placeholder').html('<div class="alert alert-danger fade in"><a class="close" data-dismiss="alert">×</a><span>Ліміт вичерпано</span></div>');                              
                          }
                        },
           error: function() { 
               console.log('error');
            },
       });
}

function pay(id) {
    $.ajax({
        type: "POST",
        url: "/resp/" + id + "/mail",
        data: id
    })
    $('#alert_placeholder').html('');
}

function togg(f) {
    if(f===1){
      googleLayer.setVisible(true);
      osmLayer.setVisible(false);
  } else {
      googleLayer.setVisible(false);
      osmLayer.setVisible(true);      
    }
}

  $(window).resize(function(){
        $('.ol-zoom').css({
                position:'absolute',
        //        left: ($(document).width() - $('.ol-zoom').outerWidth())/2,
                top: ($(window).height() - $('.ol-zoom').outerHeight())/2
        });
        $("#mapView").height($( window ).height());
});  
        
$(function () {
    "use strict";

    setTimeout(function () {
        
        $(window).resize();
        
        $("#searchstring").mask("9999999999:99:999:9999");
        
        $("#searchbutton").on('click',
            function() {
                if($("#searchstring").val()!='') {

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
                                              if(data.data) {
                                                var goi = $.parseJSON(data.data);

                                                var regex = /[0-9]{10}:[0-9]{2}:[0-9]{3}:[0-9]{4}/g;
                                                var regex2 = /\u0422\u0438\u043f \u0432\u043b\u0430\u0441\u043d\u043e\u0441\u0442\u0456:<\/div>(.*?)<\/li>/;
                                                var regex3 = /<div class=\"label\">\u0426\u0456\u043b\u044c\u043e\u0432\u0435 \u043f\u0440\u0438\u0437\u043d\u0430\u0447\u0435\u043d\u043d\u044f:<\/div>(.*?)<\/li>/
                                                var str;

                                                if(goi.dilanka) {
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
                                                    if(regex2.exec(str)!=null) {
                                                        koatuu = koatuu + ' ' + regex2.exec(str)[1];
                                                    }
                                                    if(regex3.exec(str)!=null) {
                                                        koatuu = koatuu + ' ' + regex3.exec(str)[1];
                                                    }                                                    
                                 //                   console.log(regex2.exec(str)[1]);
                                                    if(koatuu) {
                                                        if(data.username != '') {
                                                    //        $('#alert_placeholder').html('<div class="alert alert-success fade in"><a class="close" data-dismiss="alert">×</a><span>'+ koatuu + '<button>Pay</button></span></div>');
                                                            koatuu = koatuu + '<button type="button" onclick="reque(\'' + nom + '\');">Замовити, ' +  data.username + '</button>';
                                                        } 
                                                        content.innerHTML = ol.coordinate.toStringHDMS(ol.proj.transform(evt, 'EPSG:3857', 'EPSG:4326')) + '  ' + koatuu;
                                                        overlay.setPosition(evt); 
                                                        view.setCenter(evt);
                                                    } else { $('#alert_placeholder').html(''); }
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
                        error: function() { $('html, body').css("cursor", "auto"); }
                    });
                }
            }
        );
//        $('body').removeClass('notransition');
        var satLayer = new ol.layer.Tile({visible: false, source: new ol.source.MapQuest({layer: 'sat'}), name: 'sat'});

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

        var wmsSource = new ol.source.TileWMS({
            url: '/kmda/wms',
   //         url: 'http://212.26.144.110/geowebcache/service/wms',
//            url: 'http://212.26.144.107:8092/vector/geoserver/gwc/service/wms',
            //   url: 'http://192.168.33.51/geowebcache/service/wms',
            params: {'LAYERS': 'kmda:kmda_layer2', 'VERSION': '1.1.0', 'TILED': 'true', 'FORMAT': 'image/png8', 'WIDTH': 768, 'HEIGHT': 520, 'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
//            projection: 'EPSG:900913',
            serverType: 'geoserver',
            crossOrigin: '',
            projection: projection,
        }});
        
        var wmsLayer = new ol.layer.Tile({
            source: wmsSource,
            visible: 1,
            name: 'wms1'
            
 //           extent: map.getView().calculateExtent(map.getSize()),
//            imageSize: [192,192]
        });
        
        var wmsSource2 = new ol.source.TileWMS({
            url: '/kmda/wms',
   //         url: 'http://212.26.144.110/geowebcache/service/wms',
//            url: 'http://212.26.144.107:8092/vector/geoserver/gwc/service/wms',
            //   url: 'http://192.168.33.51/geowebcache/service/wms',
            params: {'LAYERS': 'kmda:kmda_layer', 'VERSION': '1.1.0', 'TILED': 'true', 'FORMAT': 'image/png8', 'WIDTH': 768, 'HEIGHT': 520, 'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
//            projection: 'EPSG:900913',
            serverType: 'geoserver',
            crossOrigin: '',
            projection: projection,
        }});
        
        var wmsLayer2 = new ol.layer.Tile({
            source: wmsSource2,
            visible: 0,
            name: 'wms2'
            
 //           extent: map.getView().calculateExtent(map.getSize()),
//            imageSize: [192,192]
        });

        var wmsSource3 = new ol.source.TileWMS({
            url: '/kmda/wms',
   //         url: 'http://212.26.144.110/geowebcache/service/wms',
//            url: 'http://212.26.144.107:8092/vector/geoserver/gwc/service/wms',
            //   url: 'http://192.168.33.51/geowebcache/service/wms',
            params: {'LAYERS': 'kmda:kmda_layer_privat', 'VERSION': '1.1.0', 'TILED': 'true', 'FORMAT': 'image/png8', 'WIDTH': 768, 'HEIGHT': 520, 'CRS': 'EPSG:900913', //, CQL_FILTER:'koatuu=3520386800'
//            projection: 'EPSG:900913',
            serverType: 'geoserver',
            crossOrigin: '',
            projection: projection,
        }});
        
        var wmsLayer3 = new ol.layer.Tile({
            source: wmsSource3,
            visible: 0,
            name: 'wms3'
            
 //           extent: map.getView().calculateExtent(map.getSize()),
//            imageSize: [192,192]
        });
        
        osmLayer = new ol.layer.Tile({
            source: new ol.source.OSM(),
            visible: 0,
            name: 'osm',
        });
        

        
        var view = new ol.View({
            center: [3396647.44192, 6527057.33961],
            extent: [3365331.64184455,6509557.90965887,3417855.95133155,6545186.44247934],
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
        
        closer.onclick = function() {
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
googleLayer = new olgm.layer.Google({name:'google',mapTypeId: google.maps.MapTypeId.HYBRID});
//osmLayer.setVisible(false);
//googleLayer.setVisible(false);
        map = new ol.Map({
//            interactions: olgm.interaction.defaults(),
            target: "mapView",
            layers: [
//                   new ol.layer.Tile({ source: new ol.source.MapQuest({layer: 'sat'}) }), 
//                   new ol.layer.Tile({ source: new ol.source.MapQuest({layer: 'hyb'}) }),
                googleLayer,
                satLayer,
                osmLayer,
                wmsLayer,
                wmsLayer2,
                wmsLayer3,
 //               googleLayer,
 //               gmlLayer

            ],
            overlays: [overlay],
            view: view,
        });

var olGM = new olgm.OLGoogleMaps({map: map}); // map is the ol.Map instance
olGM.activate();

        $('div.mapPlaceholder').remove();

 //       map.getView().fitExtent(wmsSource.getExtent(), map.getSize());
        
//         map.getView().fitExtent(wmsLayer.getExtent(), map.getSize());


            map.on('singleclick', function(evt) {
      //      document.getElementById('popup').innerHTML = '';
            var viewResolution = /** @type {number} */ (view.getResolution());

   
                if(lay=="wms1") {
                    var url = wmsSource.getGetFeatureInfoUrl(
                    evt.coordinate, viewResolution, 'EPSG:900913',
                    {'INFO_FORMAT': 'text/html'});
                }
                if(lay=="wms2") {
                    var url = wmsSource2.getGetFeatureInfoUrl(
                    evt.coordinate, viewResolution, 'EPSG:900913',
                    {'INFO_FORMAT': 'text/html'});    
                }
                if(lay=="wms3") {
                    var url = wmsSource3.getGetFeatureInfoUrl(
                    evt.coordinate, viewResolution, 'EPSG:900913',
                    {'INFO_FORMAT': 'text/html'});                        
                }
               
            if (url) {
                content.innerHTML  = '<iframe seamless src="' + url + '"></iframe>';
    //            content.innerHTML = ol.coordinate.toStringHDMS(ol.proj.transform(evt, 'EPSG:3857', 'EPSG:4326'));
                overlay.setPosition(evt.coordinate);
            }
          });


//        $('#_submit').click(function (e) {
//            e.preventDefault();
//            $.ajax({
//                type: "POST",
//                url: '/login_check',
//                data: $('#signinform').serialize(),
//                dataType: "json",
//                success: function (data, status, object) {
// //                   console.log(data);
//                    if(data.success == true) {
//                        $('#mini-login-right').html('<a href="/logout" class = "btn btn-lg btn-primary" id="signbutton" role = "button"><span class="glyphicon glyphicon-eye-open"></span></a>');
//                    }
//                    $('#signin').modal('toggle');
//                },
//                error: function (data, status, object) {
//                    console.log(data.message);
//                    $('#signin').modal('toggle');
//                    
//                }
//            });
//        });

//        var gmlLayer = new ol.layer.Vector({
//          source: new ol.source.Vector(),
//          map: map,
//          style: new ol.style.Style({
//            stroke: new ol.style.Stroke({
//              color: '#f00',
//              width: 1
//            }),
//            fill: new ol.style.Fill({
//              color: 'rgba(255,0,0,0.1)'
//            })
//          })
//        });


    }, 300);
});
