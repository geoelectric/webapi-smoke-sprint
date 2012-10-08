
function ok(value, msg) {
  var result = {
   "type": "ok",
   "result": value ? true : false, 
   "msg": msg  
  };
  postMsg(result);
}

function is(value1, value2, msg) {
  var result = {
   "type": "is",
   "result": [value1, value2],
   "msg": msg 
  };
  postMsg(result);

}


function sleep(delay)
{
    var start = Date.now();
    while (Date.now() < start + delay);
}

function force_prompt(allow) {
  SpecialPowers.setBoolPref("geo.prompt.testing" , true);
  SpecialPowers.setBoolPref("geo.prompt.testing.allow", allow);
}

function reset_prompt() {
  SpecialPowers.setBoolPref("geo.prompt.testing" , false);
  SpecialPowers.setBoolPref("geo.prompt.testing.allow", false);
}


function start_sending_garbage()
{
  netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
  var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
  prefs.setCharPref("geo.wifi.uri", "http://mochi.test:8888/tests/dom/tests/mochitest/geolocation/network_geolocation.sjs?action=respond-garbage");

  // we need to be sure that all location data has been purged/set.
  sleep(1000);
}

function stop_sending_garbage()
{
  netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
  var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
  prefs.setCharPref("geo.wifi.uri", "http://mochi.test:8888/tests/dom/tests/mochitest/geolocation/network_geolocation.sjs");

  // we need to be sure that all location data has been purged/set.
  sleep(1000);
}

function stop_geolocationProvider()
{
  netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
  var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
  prefs.setCharPref("geo.wifi.uri", "http://mochi.test:8888/tests/dom/tests/mochitest/geolocation/network_geolocation.sjs?action=stop-responding");

  // we need to be sure that all location data has been purged/set.
  sleep(1000);
}

function worse_geolocationProvider()
{
  netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
  var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
  prefs.setCharPref("geo.wifi.uri", "http://mochi.test:8888/tests/dom/tests/mochitest/geolocation/network_geolocation.sjs?action=worse-accuracy");
}

function resume_geolocationProvider()
{
  SpecialPowers.setCharPref('geo.wifi.uri', 
                  "http://mochi.test:8888/tests/dom/tests/mochitest/geolocation/network_geolocation.sjs");
}

function delay_geolocationProvider(delay)
{
  netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
  var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
  prefs.setCharPref("geo.wifi.uri", "http://mochi.test:8888/tests/dom/tests/mochitest/geolocation/network_geolocation.sjs?delay=" + delay);
}

function check_geolocation(location) {

  ok(location, "Check to see if this location is non-null");

  ok("timestamp" in location, "Check to see if there is a timestamp");

  // eventually, coords may be optional (eg, when civic addresses are supported)
  ok("coords" in location, "Check to see if this location has a coords");

  var coords = location.coords;

  ok("latitude" in coords, "Check to see if there is a latitude");
  ok("longitude" in coords, "Check to see if there is a longitude");
  ok("accuracy" in coords, "Check to see if there is a accuracy");
  
  ok (location.coords.latitude  == 37.41857, "lat matches known value " + location.coords.latitude);
  ok (location.coords.longitude == -122.08768833333333, "lon matches known value");
}
