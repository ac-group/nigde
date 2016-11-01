function poli(points) {
    
    "use strict";

var coords = new Array();
$.each(points, function(index, value) {

                    coords.push(ol.proj.transform(value.split(' '), 'EPSG:900913', 'EPSG:3857'));
                });

    setTimeout(function () {

//        $('body').removeClass('notransition');
        coords.pop();
        var respgeom = new ol.geom.Polygon([coords]);
    //    respgeom = ol.proj.transform(respgeom, 'EPSG:900913', 'EPSG:3857');
        console.log(coords);
        var feature = new ol.Feature({
            geometry: respgeom,
              style: new ol.style.Style({
                fill: new ol.style.Fill({
                  color: 'rgba(255, 255, 255, 0.6)'
                }),
                stroke: new ol.style.Stroke({
                  color: '#319FD3',
                  width: 1
                })
        })
    });
        
        
        var vectorSource= new ol.source.Vector({
            features: [feature]
            });

        var vectorLayer = new ol.layer.Vector({
                source: vectorSource
            });

        var projection = new ol.proj.Projection({
                code: 'EPSG:900913',
                units: 'm'
              });

        var wmsSource = new ol.source.TileWMS({
            url: '/wms',
   //         url: 'http://212.26.144.110/geowebcache/service/wms',
//            url: 'http://212.26.144.107:8092/vector/geoserver/gwc/service/wms',
            //   url: 'http://192.168.33.51/geowebcache/service/wms',
            params: {'LAYERS': 'kadastr', 'VERSION': '1.1.1', 'TILED': 'true', 'TRANSPARENT': 'true', 'WIDTH': '256', 'HEIGHT': '256'}, //, CQL_FILTER:'koatuu=3520386800'
//            projection: 'EPSG:900913',
            serverType: 'geoserver',
            crossOrigin: '',
            projection: projection,
        });
        
        var wmsLayer = new ol.layer.Tile({
            source: wmsSource,
            visible: 1,
            
            
 //           extent: map.getView().calculateExtent(map.getSize()),
//            imageSize: [192,192]
        });

        var osmLayer = new ol.layer.Tile({
            source: new ol.source.OSM(),
            visible: 1
        });
        

        
        var view = new ol.View({
            center: [3402365.0030297646, 6523441.741970081],
//            extent: [1894415.3090198075, 5741949.564782439, 4910314.6970397215, 7304933.919157723],
//            projection: projection,
//            extent: respgeom.getExtent,
            zoom: 16
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
        


        var map = new ol.Map({
            target: "mapView",
            layers: [
//                   new ol.layer.Tile({ source: new ol.source.MapQuest({layer: 'sat'}) }), 
//                   new ol.layer.Tile({ source: new ol.source.MapQuest({layer: 'hyb'}) }),
                osmLayer,
//                wmsLayer,
                vectorLayer
            ],

            view: view,
        });

        $('div.mapPlaceholder').remove();
 //       map.getView().fitExtent(wmsSource.getExtent(), map.getSize());
        
   //      view.fit(respgeom.getExtent, map.getSize());

//console.log(view.getResolution());


    }, 300);
}
