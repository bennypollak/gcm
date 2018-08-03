var debug = 0;
var map;

var startPoint = null;
var endPoint = null;
var fromMarker = null;
var toMarker = null;
var started = false;
var allMarkers = []

function clearAll() {
  for (var i = 0; i < allMarkers.length; i++) {
    allMarkers[i].setMap(null)
  }
  allMarkers = []
}

function position(point) {
  return {
    lat: point.latLng.lat(),
    lng: point.latLng.lng()
  }
}

function enterEnd() {
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
  var marker = new google.maps.Marker({
    position: point,
    map: map
  });
  allMarkers.push(marker)
  return marker
}

function drawPL(pl, color, geodesic) {
  var poly = new google.maps.Polyline({
    path: pl,
    geodesic: geodesic,
    strokeColor: color,
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  poly.setMap(map);
  allMarkers.push(poly)
}

function onLoad() {
  document.getElementById("clear").addEventListener("click", function() {
    clearAll()
  });
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 0,
      lng: 0
    },
    streetViewControl: false,
    zoomControl: true,
    zoom: 1
  })
  map.addListener('click', function(point) {
    if (point) {
      if (!started) {
        fromPoint = position(point)
        fromMarker = drawMarker(fromPoint)
        allMarkers.push(fromMarker)
        started = true;
      } else {
        toPoint = position(point)
        toMarker = drawMarker(toPoint)
        allMarkers.push(toMarker)
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
