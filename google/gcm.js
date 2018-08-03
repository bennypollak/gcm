    //<![CDATA[

    var debug = 0;
    var map;

    var startPoint = null;
    var endPoint = null;
    var fromMarker = null;
    var toMarker = null;
    var started = false;

    function position(point) {
      return {
        lat: point.latLng.lat(),
        lng: point.latLng.lng()
      }
    }

    function enterEnd() {
      map.closeInfoWindow();
      //map.centerAndZoom(getCenterLatLng(startPoint, endPoint), map.getZoomLevel());
      //drawLines(startPoint, endPoint);
      startPoint = null;
      endPoint = null;
      started = false;
    }

    function drawLines(from, to) {
      var pls = [from, to];
      drawPL(pls, '#0000FF', false)
      drawPL(pls, '#FF0000', true)
      fromMarker = toMarker = null
    }

    function drawMarker(point) {
      return marker = new google.maps.Marker({
        position: point,
        map: map
      });
    }

    function drawPL(pl, color, geodesic) {
      var flightPath = new google.maps.Polyline({
        path: pl,
        geodesic: geodesic,
        strokeColor: color,
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      flightPath.setMap(map);
    }

    function onLoad() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: 0,
          lng: 0
        },
        streetViewControl: false,
        zoomControl: true,
        zoom:1
      })
      map.addListener('click', function(point) {
        if (point) {
          if (!started) {
            fromPoint = position(point)
            fromMarker = drawMarker(fromPoint)
            started = true;
          } else {
            toPoint = position(point)
            toMarker = drawMarker(toPoint)
            started = false
            drawLines(fromPoint, toPoint);
          }
        }
      });
      var ptNY = new google.maps.Point(-73.98193359375, 40.697299008636755);
      var ptLondon = new google.maps.Point(0, 51.45400691005981);
      var from = ptNY;
      var to = ptLondon;
      var pl = [{
          lat: from.y,
          lng: from.x
        },
        {
          lat: to.y,
          lng: to.x
        }
      ]
      fromMarker = drawMarker(pl[0])
      toMarker = drawMarker(pl[1])
      drawLines(pl[0], pl[1])

    }

    //]]>
