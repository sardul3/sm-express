/**
 * Creates a new marker and adds it to a group
 * @param {H.map.Group} group       The group holding the new marker
 * @param {H.geo.Point} coordinate  The location of the marker
 * @param {String} html             Data associated with the marker
 */
function addMarkerToGroup(group, coordinate, html) {
  var marker = new H.map.Marker(coordinate);
  // add custom data to the marker
  marker.setData(html);
  group.addObject(marker);
}

/**
 * Add two markers showing the position of Liverpool and Manchester City football clubs.
 * Clicking on a marker opens an infobubble which holds HTML content related to the marker.
 * @param  {H.Map} map      A HERE Map instance within the application
 */
function addInfoBubble(map) {
  var group = new H.map.Group();

  map.addObject(group);

  // add 'tap' event listener, that opens info bubble, to the group
  group.addEventListener('tap', function (evt) {
    // event target is the marker itself, group is a parent event target
    // for all objects that it contains
    var bubble =  new H.ui.InfoBubble(evt.target.getPosition(), {
      // read custom data
      content: evt.target.getData()
    });
    // show info bubble
    ui.addBubble(bubble);
  }, false);

  addMarkerToGroup(group, {lat: 32.503760 , lng:-92.128475},
    "<div>Smokers's Express #2"+
    '</div><div >318-322-3037<br><a href=\'http://www.mcfc.co.uk\' >Visit Us</a></div>');

  addMarkerToGroup(group, {lat:32.488610, lng:-92.155700},
    "<div>Smokers's Express #5" +
    '</div><div >318-361-9331<br><a href=\'http://www.liverpoolfc.tv\' >Visit Us</a></div>');

  addMarkerToGroup(group, {lat:32.480830, lng:-91.861060},
    "<div>Start's Travel Plaza" +
      '</div><div >318-728-4956<br><a href=\'http://www.liverpoolfc.tv\' >Visit Us </a></div>');

}
/**
 * Boilerplate map initialization code starts below:
 */

// initialize communication with the platform
var platform = new H.service.Platform({
  app_id: 'CdkOznC3n1CtbhbGhn9N',
  app_code: '8iNnbF_W9aePrJjnWOjjoQ',
  useHTTPS: true
});
var pixelRatio = window.devicePixelRatio || 1;
var defaultLayers = platform.createDefaultLayers({
  tileSize: pixelRatio === 1 ? 256 : 512,
  ppi: pixelRatio === 1 ? undefined : 320
});

// initialize a map - this map is centered over Europe
var map = new H.Map(document.getElementById('map'),
  defaultLayers.normal.map,{
  center: {lat: 32.519550 , lng: -92},
  zoom: 12,
  pixelRatio: pixelRatio
});

window.addEventListener('resize', function () {
    map.getViewPort().resize();
});

// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// create default UI with layers provided by the platform
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Now use the map as required...
addInfoBubble(map);
